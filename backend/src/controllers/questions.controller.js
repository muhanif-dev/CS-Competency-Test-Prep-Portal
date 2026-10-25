import DatabaseQuestion from "../models/DatabaseQuestion.js";
import CybersecurityQuestion from "../models/CybersecurityQuestion.js";
import OperatingSystemQuestion from "../models/operatingSystemQuestion.js";
import ComputerNetworksQuestion from '../models/ComputerNetworksQuestion.js';
import WebDevelopmentQuestion from '../models/WebDevelopmentQuestion.js';
import ProblemSolvingQuestion from '../models/ProblemSolvingQuestion.js';
import ProgrammingQuestion from '../models/ProgrammingQuestion.js';
import SoftwareEngineeringQuestion from '../models/SoftwareEngineeringQuestion.js';
import AiMlQuestion from '../models/AiMlQuestion.js';
import DsaQuestion from '../models/DsaQuestion.js';

const MAX_QUESTIONS = 100;

const questionModels = {
  databases: DatabaseQuestion,
  "cyber-security": CybersecurityQuestion,
  "operating-systems": OperatingSystemQuestion,
  'computer-networks': ComputerNetworksQuestion,
  'web-development': WebDevelopmentQuestion,
  'problem-solving-analytical-skills': ProblemSolvingQuestion,
  'programming-cpp-java-python': ProgrammingQuestion,
  'software-engineering': SoftwareEngineeringQuestion,
  'ai-machine-learning-data-analytics': AiMlQuestion,
  'data-structures-algorithms': DsaQuestion,
};

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

    const match = {};
    if (difficulty && difficulty !== "Mixed") {
      match.difficulty = difficulty;
    }

    // ----------------------------------------------------
    // ALL SUBJECTS (FULL MOCK TEST)
    // ----------------------------------------------------
    if (competencyId === 'all' || competencyId === 'all-subjects') {
      const allModels = Object.values(questionModels);
      const perModel = Math.max(1, Math.ceil(numberOfQuestions / allModels.length));

      const sampledArrays = await Promise.all(
        allModels.map(model =>
          model.aggregate([
            { $match: match },
            { $sample: { size: perModel } }
          ])
        )
      );

      let combined = sampledArrays.flat();

      if (combined.length === 0) {
        return res.status(404).json({
          error: "No practice questions are currently available across subjects.",
        });
      }

      // Fisher-Yates shuffle
      for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
      }

      combined = combined.slice(0, numberOfQuestions);

      const questions = combined.map((q, index) => ({
        id: `q${index + 1}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || "",
        difficulty: q.difficulty,
        competencyName: q.competencyName,
        competencyId: q.competencyId,
      }));

      return res.json({
        questions,
        meta: {
          competencyId: 'all',
          competencyArea: 'All Subjects (Full Mock Test)',
          numberOfQuestions: questions.length,
          difficulty,
          source: "database",
          generatedAt: Date.now(),
        },
      });
    }

    // ----------------------------------------------------
    // SINGLE SUBJECT
    // ----------------------------------------------------
    const QuestionModel = questionModels[competencyId];

    if (!QuestionModel) {
      return res.status(404).json({
        error: `Quiz generation is not currently available for this subject.`,
      });
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
      competencyName: q.competencyName,
      competencyId: q.competencyId,
    }));

    return res.json({
      questions,
      meta: {
        competencyId,
        competencyArea: sampled[0]?.competencyName,
        numberOfQuestions: questions.length,
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

    const subjectConfigs = [
      { id: 'databases', name: 'Databases', model: DatabaseQuestion },
      { id: 'cyber-security', name: 'Cyber Security', model: CybersecurityQuestion },
      { id: 'operating-systems', name: 'Operating Systems', model: OperatingSystemQuestion },
      { id: 'computer-networks', name: 'Computer Networks and Cloud Computing', model: ComputerNetworksQuestion },
      { id: 'web-development', name: 'Web Development', model: WebDevelopmentQuestion },
      { id: 'problem-solving-analytical-skills', name: 'Problem Solving and Analytical Skills', model: ProblemSolvingQuestion },
      { id: 'programming-cpp-java-python', name: 'Programming (C++/Java/Python)', model: ProgrammingQuestion },
      { id: 'software-engineering', name: 'Software Engineering', model: SoftwareEngineeringQuestion },
      { id: 'ai-machine-learning-data-analytics', name: 'AI / Machine Learning and Data Analytics', model: AiMlQuestion },
      { id: 'data-structures-algorithms', name: 'Data Structures & Algorithms', model: DsaQuestion },
    ];

    for (const cfg of subjectConfigs) {
      const count = await cfg.model.countDocuments();
      if (count > 0) {
        summary.push({
          _id: cfg.id,
          competencyName: cfg.name,
          count,
        });
      }
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

    for (const question of questions) {
      const { competencyId } = question;
      if (!questionModels[competencyId]) continue;

      if (!groupedQuestions[competencyId]) {
        groupedQuestions[competencyId] = [];
      }
      groupedQuestions[competencyId].push(question);
    }

    let totalInserted = 0;

    for (const [competencyId, subjectQuestions] of Object.entries(groupedQuestions)) {
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
