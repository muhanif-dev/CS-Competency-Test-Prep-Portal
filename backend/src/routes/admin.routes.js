import express from 'express'
import {
  adminLogin,
  getAdminProfile,
  getAdminAttempts,
  getAdminAttemptDetails,
  toggleAnnounceAttempt,
  bulkToggleAnnounce,
  deleteAdminAttempt,
  deleteAllAdminAttempts,
  getAdminStudents,
  deleteAdminStudent,
} from '../controllers/admin.controller.js'
import { requireAdmin } from '../utils/adminAuth.js'

const router = express.Router()

// Public endpoint for admin authentication
router.post('/login', adminLogin)

// Protected admin endpoints
router.get('/me', requireAdmin, getAdminProfile)
router.get('/live-quiz/attempts', requireAdmin, getAdminAttempts)
router.get('/live-quiz/attempts/:attemptId', requireAdmin, getAdminAttemptDetails)
router.patch('/live-quiz/attempts/:attemptId/announce', requireAdmin, toggleAnnounceAttempt)
router.post('/live-quiz/announce-all', requireAdmin, bulkToggleAnnounce)
router.delete('/live-quiz/attempts', requireAdmin, deleteAllAdminAttempts)
router.delete('/live-quiz/attempts/:attemptId', requireAdmin, deleteAdminAttempt)

// Leaderboard Students administration
router.get('/students', requireAdmin, getAdminStudents)
router.delete('/students/:studentId', requireAdmin, deleteAdminStudent)

export default router
