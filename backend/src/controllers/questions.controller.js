import DatabaseQuestion from "../models/DatabaseQuestion.js";
import CybersecurityQuestion from "../models/CybersecurityQuestion.js";
import OperatingSystemQuestion from "../models/operatingSystemQuestion.js";
import ComputerNetworksQuestion from '../models/ComputerNetworksQuestion.js'

const MAX_QUESTIONS = 50;

const questionModels = {
  databases: DatabaseQuestion,
  "cyber-security": CybersecurityQuestion,
  "operating-systems": OperatingSystemQuestion,
 'computer-networks': ComputerNetworksQuestion,};

export async function getRandomQuiz(req, res) {
  try {
    const { competencyId, difficulty = "Mixed" } = req.query;

    const count = parseInt(req.query.count, 10) || 10;

    const numberOfQuestions = Math.min(Math.max(count, 1), MAX_QUESTIONS);

    if (!competencyId) {
      return res.status(400).json({
        error: "A competency area is required to generate a quiz.",
      });
    }

    const QuestionModel = questionModels[competencyId];

    if (!QuestionModel) {
      return res.status(404).json({
        error: `Quiz generation is not currently available for this subject. ${competencyId}`,
      });
    }

    const match = {};

    if (difficulty && difficulty !== "Mixed") {
      match.difficulty = difficulty;
    }

    const available = await QuestionModel.countDocuments(match);

    if (available === 0) {
      return res.status(404).json({
        error:
          "No practice questions are currently available for this subject.",
      });
    }

    if (available < numberOfQuestions) {
      return res.status(400).json({
        error: `Only ${available} practice questions are currently available for this subject. Please reduce the requested number of questions.`,
      });
    }

    const sampled = await QuestionModel.aggregate([
      {
        $match: match,
      },
      {
        $sample: {
          size: numberOfQuestions,
        },
      },
    ]);

    const questions = sampled.map((q, index) => ({
      id: `q${index + 1}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || "",
      difficulty: q.difficulty,
    }));

    return res.json({
      questions,

      meta: {
        competencyId,
        competencyArea: sampled[0]?.competencyName,
        numberOfQuestions,
        difficulty,
        source: "database",
        generatedAt: Date.now(),
      },
    });
  } catch (err) {
    console.error("Quiz generation error:", err);

    return res.status(500).json({
      error: "We could not generate the quiz right now. Please try again later.",
    });
  }
}

export async function getSubjectsSummary(req, res) {
  try {
    const summary = [];

    // -----------------------------
    // DATABASE
    // -----------------------------

    const databaseCount = await DatabaseQuestion.countDocuments();

    if (databaseCount > 0) {
      summary.push({
        _id: "databases",
        competencyName: "Databases",
        count: databaseCount,
      });
    }

    // -----------------------------
    // CYBER SECURITY
    // -----------------------------

    const cybersecurityCount = await CybersecurityQuestion.countDocuments();

    if (cybersecurityCount > 0) {
      summary.push({
        _id: "cyber-security",
        competencyName: "Cyber Security",
        count: cybersecurityCount,
      });
    }
    

    // -----------------------------
    // Operating System
    // -----------------------------

    const operatingSystemCount = await OperatingSystemQuestion.countDocuments();

    if (operatingSystemCount > 0) {
      summary.push({
        _id: "operating-system",
        competencyName: "Operating System",
        count: operatingSystemCount,
      });
    }


    return res.json(summary);
  } catch (err) {
    console.error("Summary error:", err);

    return res.status(500).json({
      error: "We could not fetch the summary right now. Please try again later.",
    });
  }
}

// POST /api/questions
export async function createQuestion(req, res) {
  try {
    const { competencyId } = req.body;

    const QuestionModel = questionModels[competencyId];

    if (!QuestionModel) {
      return res.status(400).json({
        error: `The selected competency area is not supported.`,
      });
    }

    const question = await QuestionModel.create(req.body);

    return res.status(201).json(question);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

// POST /api/questions/bulk
export async function bulkCreateQuestions(req, res) {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        error: 'A non-empty questions list is required.',
      });
    }

    const groupedQuestions = {};

    // Group questions by competencyId.
    for (const question of questions) {
      const { competencyId } = question;

      if (!questionModels[competencyId]) {
        continue;
      }

      if (!groupedQuestions[competencyId]) {
        groupedQuestions[competencyId] = [];
      }

      groupedQuestions[competencyId].push(question);
    }

    let totalInserted = 0;

    for (const [competencyId, subjectQuestions] of Object.entries(
      groupedQuestions,
    )) {
      const QuestionModel = questionModels[competencyId];

      const created = await QuestionModel.insertMany(subjectQuestions, {
        ordered: false,
      });

      totalInserted += created.length;
    }

    return res.status(201).json({
      inserted: totalInserted,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}
