import { Router } from 'express'
import {
  getRandomQuiz,
  getSubjectsSummary,
  createQuestion,
  bulkCreateQuestions,
} from '../controllers/questions.controller.js'

const router = Router()

router.get('/quiz', getRandomQuiz)
router.get('/summary', getSubjectsSummary)
router.post('/', createQuestion)
router.post('/bulk', bulkCreateQuestions)

export default router