import mongoose from 'mongoose'
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
import { recordLiveQuizScore } from './student.controller.js'
import Student from '../models/Student.js'
import QuizAttempt from '../models/QuizAttempt.js'
import LiveQuizAttempt from '../models/LiveQuizAttempt.js'

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

    if (isAnnounced && attempt.studentId) {
      await recordLiveQuizScore(attempt)
    }

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

    if (isAnnounced) {
      const attempts = await listAllAttempts()
      for (const att of attempts) {
        if (att.studentId && att.status === 'completed') {
          await recordLiveQuizScore(att)
        }
      }
    }

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

/**
 * List all students for admin with leaderboard stats & details
 * GET /api/admin/students?search=<name|email|university>
 *
 * Ranks are computed from the FULL leaderboard ordering before the search
 * filter is applied, so a filtered list never renumbers the ranks.
 */
export async function getAdminStudents(req, res) {
  try {
    const { search } = req.query

    // Sort by the same leaderboard rules: totalCorrect DESC, accuracy DESC, updatedAt ASC
    const students = await Student.find({})
      .sort({ totalCorrect: -1, accuracy: -1, updatedAt: 1 })
      .select('-passwordHash')
      .lean()

    const ranked = students.map((s, index) => ({ ...s, rank: index + 1 }))

    const term = typeof search === 'string' ? search.trim().toLowerCase() : ''
    const matched = term
      ? ranked.filter((s) =>
          [s.fullName, s.email, s.university].some((field) =>
            String(field ?? '').toLowerCase().includes(term),
          ),
        )
      : ranked

    const formatted = matched.map((s) => ({
      _id: s._id,
      rank: s.rank,
      fullName: s.fullName,
      email: s.email,
      university: s.university,
      totalCorrect: s.totalCorrect ?? 0,
      totalIncorrect: s.totalIncorrect ?? 0,
      totalAttempted: s.totalAttempted ?? 0,
      totalQuizzes: s.totalQuizzes ?? 0,
      accuracy: s.accuracy ?? 0,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }))

    return res.json({
      students: formatted,
      totalStudents: ranked.length,
      matchedStudents: formatted.length,
    })
  } catch (error) {
    console.error('Error fetching admin students:', error)
    return res.status(500).json({ error: 'Failed to retrieve students list.' })
  }
}

/**
 * Delete a student and their quiz records from the leaderboard
 * DELETE /api/admin/students/:studentId
 *
 * The public leaderboard is built directly from the Student collection, so
 * removing the document removes the student from every leaderboard surface.
 * Their score attempts are deleted too, and any live-quiz attempt is detached
 * (studentId -> null) so a later result announcement cannot recreate them.
 */
export async function deleteAdminStudent(req, res) {
  try {
    const { studentId } = req.params

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({ error: 'Invalid student id.' })
    }

    const student = await Student.findByIdAndDelete(studentId)
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' })
    }

    // Delete associated quiz attempts so no orphaned score records remain
    const deletedAttempts = await QuizAttempt.deleteMany({ studentId })

    // Preserve the live exam record for audit, but unlink it from the
    // now-deleted student so it can never be scored into the leaderboard again.
    await LiveQuizAttempt.updateMany({ studentId }, { $set: { studentId: null } })

    return res.json({
      message: `Student "${student.fullName}" has been permanently removed from the leaderboard and system.`,
      studentId,
      deletedAttempts: deletedAttempts.deletedCount || 0,
    })
  } catch (error) {
    console.error('Error deleting student:', error)
    return res.status(500).json({ error: 'Failed to delete student.' })
  }
}
