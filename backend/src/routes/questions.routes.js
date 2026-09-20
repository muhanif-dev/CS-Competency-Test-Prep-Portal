import express from 'express'

import {
  getRandomQuiz,
  getSubjectsSummary,
  createQuestion,
  bulkCreateQuestions,
} from '../controllers/questions.controller.js'

const router = express.Router()

// GET /api/questions/quiz
router.get('/quiz', getRandomQuiz)

// GET /api/questions/summary
router.get('/summary', getSubjectsSummary)

// POST /api/questions
router.post('/', createQuestion)

// POST /api/questions/bulk
router.post('/bulk', bulkCreateQuestions)

export default router