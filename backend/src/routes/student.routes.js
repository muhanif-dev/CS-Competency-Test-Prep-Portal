import express from 'express'
import { requireStudent } from '../middleware/requireStudent.js'
import {
  submitQuizAttempt,
  getStudentDashboard,
  getLeaderboard,
} from '../controllers/student.controller.js'

const router = express.Router()

// POST /api/student/quiz-attempt  (protected)
router.post('/quiz-attempt', requireStudent, submitQuizAttempt)

// GET /api/student/dashboard  (protected)
router.get('/dashboard', requireStudent, getStudentDashboard)

// GET /api/leaderboard  (public)
router.get('/leaderboard', getLeaderboard)

export default router
