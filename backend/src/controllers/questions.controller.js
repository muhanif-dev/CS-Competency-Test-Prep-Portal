import Question from '../models/Question.js'

const MAX_QUESTIONS = 50

// GET /api/questions/quiz?competencyId=&topicId=&count=10&difficulty=Medium|Easy|Hard|Mixed
export async function getRandomQuiz(req, res) {
  try {
    const { competencyId, topicId, difficulty = 'Mixed' } = req.query
    const count = parseInt(req.query.count, 10) || 10
    const numberOfQuestions = Math.min(Math.max(count, 1), MAX_QUESTIONS)

    if (!competencyId || !topicId) {
      return res.status(400).json({
        error: 'competencyId aur topicId dono query params required hain.',
      })
    }

    const match = { competencyId, topicId }
    if (difficulty && difficulty !== 'Mixed') {
      match.difficulty = difficulty
    }

    const available = await Question.countDocuments(match)

    if (available === 0) {
      return res.status(404).json({
        error:
          'Is subject/topic ke liye database mein abhi koi MCQ mojood nahi hai. Pehlay questions add/seed karein.',
      })
    }

    if (available < numberOfQuestions) {
      return res.status(400).json({
        error: `Is topic ke liye sirf ${available} question(s) available hain, lekin ${numberOfQuestions} maange gaye hain. Kam number chunein ya pehlay aur MCQs add karein.`,
      })
    }

    const sampled = await Question.aggregate([
      { $match: match },
      { $sample: { size: numberOfQuestions } },
    ])

    const questions = sampled.map((q, index) => ({
      id: `q${index + 1}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty,
    }))

    return res.json({
      questions,
      meta: {
        competencyId,
        topicId,
        competencyArea: sampled[0]?.competencyName,
        topic: sampled[0]?.topicName,
        numberOfQuestions,
        difficulty,
        source: 'database',
        generatedAt: Date.now(),
      },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Quiz generate karte hue server error aya.' })
  }
}

// GET /api/questions/summary -> subject/topic wise count, admin/debug ke liye
export async function getSubjectsSummary(req, res) {
  try {
    const summary = await Question.aggregate([
      {
        $group: {
          _id: { competencyId: '$competencyId', topicId: '$topicId' },
          competencyName: { $first: '$competencyName' },
          topicName: { $first: '$topicName' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.competencyId': 1, '_id.topicId': 1 } },
    ])
    return res.json(summary)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Summary fetch karte hue error aya.' })
  }
}

// POST /api/questions -> single question add karne ke liye (naya subject/topic add karte waqt)
export async function createQuestion(req, res) {
  try {
    const question = await Question.create(req.body)
    return res.status(201).json(question)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

// POST /api/questions/bulk -> ek sath bohat sare questions add karne ke liye
// body: { "questions": [ {...}, {...} ] }
export async function bulkCreateQuestions(req, res) {
  try {
    const { questions } = req.body
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: '"questions" array required hai aur khali nahi honi chahiye.' })
    }
    const created = await Question.insertMany(questions, { ordered: false })
    return res.status(201).json({ inserted: created.length })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}