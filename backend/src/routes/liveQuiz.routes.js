import express from 'express'
import {
  startLiveQuiz,
  submitLiveAnswer,
  completeLiveQuiz,
  getLiveQuizStatus,
} from '../controllers/liveQuiz.controller.js'

const router = express.Router()

// POST /api/live-quiz/start - Student starts a live quiz session
router.post('/start', startLiveQuiz)

// POST /api/live-quiz/:attemptId/answer - Submit an answer or timeout for a question
router.post('/:attemptId/answer', submitLiveAnswer)

// POST /api/live-quiz/:attemptId/complete - Explicitly finalize the quiz
router.post('/:attemptId/complete', completeLiveQuiz)

// GET /api/live-quiz/:attemptId/status - Student checks announcement status
router.get('/:attemptId/status', getLiveQuizStatus)

export default router
