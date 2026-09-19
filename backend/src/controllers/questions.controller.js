import Question from '../models/Question.js'

const MAX_QUESTIONS = 50

// GET /api/questions/quiz?competencyId=&count=10&difficulty=Medium|Easy|Hard|Mixed
// Poori subject (competencyId) se random questions - koi topic select nahi karna hota.
export async function getRandomQuiz(req, res) {
  try {
    const { competencyId, difficulty = 'Mixed' } = req.query
    const count = parseInt(req.query.count, 10) || 10
    const numberOfQuestions = Math.min(Math.max(count, 1), MAX_QUESTIONS)

    if (!competencyId) {
      return res.status(400).json({
        error: 'competencyId query param required hai.',
      })
    }

    const match = { competencyId }
    if (difficulty && difficulty !== 'Mixed') {
      match.difficulty = difficulty
    }

    const available = await Question.countDocuments(match)

    if (available === 0) {
      return res.status(404).json({
        error: 'Is subject ke liye database mein abhi koi MCQ mojood nahi hai. Pehlay questions add/seed karein.',
      })
    }

    if (available < numberOfQuestions) {
      return res.status(400).json({
        error: `Is subject ke liye sirf ${available} question(s) available hain, lekin ${numberOfQuestions} maange gaye hain.`,
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
      explanation: q.explanation || '',
      difficulty: q.difficulty,
    }))

    return res.json({
      questions,
      meta: {
        competencyId,
        competencyArea: sampled[0]?.competencyName,
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

// GET /api/questions/summary -> subject wise count, admin/debug ke liye
export async function getSubjectsSummary(req, res) {
  try {
    const summary = await Question.aggregate([
      {
        $group: {
          _id: '$competencyId',
          competencyName: { $first: '$competencyName' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])
    return res.json(summary)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Summary fetch karte hue error aya.' })
  }
}

export async function createQuestion(req, res) {
  try {
    const question = await Question.create(req.body)
    return res.status(201).json(question)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

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