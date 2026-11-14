import express from 'express'

import {
  getRandomQuiz,
  getSubjectsSummary,
  createQuestion,
  bulkCreateQuestions,
} from '../controllers/questions.controller.js'
import { requireStudent } from '../middleware/requireStudent.js'
import { requireAdmin } from '../utils/adminAuth.js'

const router = express.Router()

// GET /api/questions/quiz (requires student authentication)
router.get('/quiz', requireStudent, getRandomQuiz)

// GET /api/questions/summary (public for browsing subjects)
router.get('/summary', getSubjectsSummary)

// POST /api/questions (requires admin authentication)
router.post('/', requireAdmin, createQuestion)

// POST /api/questions/bulk (requires admin authentication)
router.post('/bulk', requireAdmin, bulkCreateQuestions)

export default router