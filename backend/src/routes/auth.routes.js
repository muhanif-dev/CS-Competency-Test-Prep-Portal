import express from 'express'
import { register, login, getMe } from '../controllers/auth.controller.js'
import { requireStudent } from '../middleware/requireStudent.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', register)

// POST /api/auth/login
router.post('/login', login)

// GET /api/auth/me  (protected)
router.get('/me', requireStudent, getMe)

export default router
