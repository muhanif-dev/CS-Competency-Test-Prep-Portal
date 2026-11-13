import {
  verifyAdminCredentials,
  signAdminToken,
} from '../utils/adminAuth.js'
import {
  listAllAttempts,
  findAttemptById,
  saveAttempt,
  deleteAttemptById,
  deleteAllAttempts,
  bulkAnnounceAll,
} from '../utils/attemptStore.js'

/**
 * Admin Login
 * POST /api/admin/login
 */
export async function adminLogin(req, res) {
  try {
    const { username, password } = req.body || {}

    if (!verifyAdminCredentials(username, password)) {
      return res.status(401).json({
        error: 'Invalid admin username or password.',
      })
    }

    const token = signAdminToken({ username })
    return res.json({
      token,
      username,
      message: 'Admin authenticated successfully.',
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return res.status(500).json({ error: 'Failed to authenticate admin.' })
  }
}

/**
 * Verify current admin token / session
 * GET /api/admin/me
 */
export async function getAdminProfile(req, res) {
  return res.json({
    admin: {
      username: req.admin?.sub || '@dmin',
      role: 'admin',
    },
  })
}

/**
 * List all live quiz attempts for admin review
 * GET /api/admin/live-quiz/attempts
 */
export async function getAdminAttempts(req, res) {
  try {
    const attempts = await listAllAttempts()

    const formatted = attempts.map((a) => ({
      _id: a._id,
      studentName: a.studentName,
      semester: a.semester,
      questionCount: a.questionCount,
      competencyName: a.competencyName,
      status: a.status,
      score: a.score || {
        total: a.questionCount,
        attempted: 0,
        unanswered: a.questionCount,
        correct: 0,
        incorrect: 0,
      },
      percentage:
        a.score?.total > 0
          ? Math.round((a.score.correct / a.score.total) * 100)
          : 0,
      isAnnounced: Boolean(a.isAnnounced),
      announcedAt: a.announcedAt,
      startedAt: a.startedAt,
      completedAt: a.completedAt,
      createdAt: a.createdAt,
    }))

    return res.json({ attempts: formatted })
  } catch (error) {
    console.error('Error fetching admin attempts:', error)
    return res.status(500).json({ error: 'Failed to retrieve quiz attempts.' })
  }
}

/**
 * Get detailed attempt breakdown for administration
 * GET /api/admin/live-quiz/attempts/:attemptId
 */
export async function getAdminAttemptDetails(req, res) {
  try {
    const { attemptId } = req.params
    const attempt = await findAttemptById(attemptId)

    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found.' })
    }

    // Clone to remove sessionToken before responding
    const sanitized =
      typeof attempt.toObject === 'function' ? attempt.toObject() : { ...attempt }
    delete sanitized.sessionToken

    return res.json({ attempt: sanitized })
  } catch (error) {
    console.error('Error fetching attempt details:', error)
    return res.status(500).json({ error: 'Failed to retrieve attempt details.' })
  }
}

/**
 * Announce or unannounce a specific attempt result
 * PATCH /api/admin/live-quiz/attempts/:attemptId/announce
 */
export async function toggleAnnounceAttempt(req, res) {
  try {
    const { attemptId } = req.params
    const isAnnounced = Boolean(req.body?.isAnnounced)

    const attempt = await findAttemptById(attemptId)
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found.' })
    }

    attempt.isAnnounced = isAnnounced
    attempt.announcedAt = isAnnounced ? new Date() : null

    await saveAttempt(attempt)

    return res.json({
      attemptId: attempt._id,
      isAnnounced: attempt.isAnnounced,
      announcedAt: attempt.announcedAt,
      message: isAnnounced
        ? 'Result announced successfully.'
        : 'Result announcement reverted.',
    })
  } catch (error) {
    console.error('Error toggling announcement:', error)
    return res.status(500).json({ error: 'Failed to update announcement state.' })
  }
}

/**
 * Announce or unannounce all completed attempts in bulk
 * POST /api/admin/live-quiz/announce-all
 */
export async function bulkToggleAnnounce(req, res) {
  try {
    const isAnnounced = Boolean(req.body?.isAnnounced)
    const modifiedCount = await bulkAnnounceAll(isAnnounced)

    return res.json({
      modifiedCount,
      isAnnounced,
      message: isAnnounced
        ? `Announced results for ${modifiedCount} attempt(s).`
        : `Reverted announcement for ${modifiedCount} attempt(s).`,
    })
  } catch (error) {
    console.error('Error bulk updating announcement:', error)
    return res.status(500).json({ error: 'Failed to update announcements.' })
  }
}

/**
 * Delete an attempt (for administrative clean up)
 * DELETE /api/admin/live-quiz/attempts/:attemptId
 */
export async function deleteAdminAttempt(req, res) {
  try {
    const { attemptId } = req.params
    const deleted = await deleteAttemptById(attemptId)

    if (!deleted) {
      return res.status(404).json({ error: 'Attempt not found.' })
    }

    return res.json({
      message: 'Attempt removed successfully.',
      attemptId,
    })
  } catch (error) {
    console.error('Error deleting attempt:', error)
    return res.status(500).json({ error: 'Failed to delete attempt.' })
  }
}

/**
 * Delete all live quiz attempt records
 * DELETE /api/admin/live-quiz/attempts
 */
export async function deleteAllAdminAttempts(req, res) {
  try {
    const deletedCount = await deleteAllAttempts()
    return res.json({
      deletedCount,
      message: `Deleted ${deletedCount} quiz attempt(s).`,
    })
  } catch (error) {
    console.error('Error deleting all attempts:', error)
    return res.status(500).json({ error: 'Failed to delete all quiz attempts.' })
  }
}
