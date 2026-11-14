import mongoose from 'mongoose'
import Student from '../models/Student.js'
import QuizAttempt from '../models/QuizAttempt.js'
import LiveQuizAttempt from '../models/LiveQuizAttempt.js'

const LEADERBOARD_PAGE_LIMIT = 50

/**
 * Helper: Record a live quiz score for a student once it is announced by admin.
 * Idempotent: checks for existing QuizAttempt with the same studentId and liveAttemptId.
 */
export async function recordLiveQuizScore(liveAttempt) {
  try {
    if (!liveAttempt || !liveAttempt.studentId) return null
    if (!liveAttempt.isAnnounced || liveAttempt.status !== 'completed') return null

    // A student removed by an admin must never be scored back onto the
    // leaderboard, even if one of their earlier live attempts is re-announced.
    const studentExists = await Student.exists({ _id: liveAttempt.studentId })
    if (!studentExists) return null

    // Check for duplicate
    const existing = await QuizAttempt.findOne({
      studentId: liveAttempt.studentId,
      liveAttemptId: liveAttempt._id,
    })
    if (existing) return existing

    const totalQuestions =
      liveAttempt.score?.total || liveAttempt.questionCount || 0
    const correctAnswers = liveAttempt.score?.correct || 0
    const incorrectAnswers = liveAttempt.score?.incorrect || 0
    const accuracy =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0

    const attempt = await QuizAttempt.create({
      studentId: liveAttempt.studentId,
      quizType: 'live',
      subject: liveAttempt.competencyName || 'Live Quiz',
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      accuracy,
      liveAttemptId: liveAttempt._id,
      completedAt: liveAttempt.completedAt || new Date(),
    })

    const updated = await Student.findByIdAndUpdate(
      liveAttempt.studentId,
      {
        $inc: {
          totalCorrect: correctAnswers,
          totalIncorrect: incorrectAnswers,
          totalAttempted: totalQuestions,
          totalQuizzes: 1,
        },
      },
      { new: true },
    )

    if (updated) {
      updated.accuracy =
        updated.totalAttempted > 0
          ? Math.round((updated.totalCorrect / updated.totalAttempted) * 100)
          : 0
      await updated.save()
    }

    return attempt
  } catch (err) {
    console.error('recordLiveQuizScore error:', err)
    return null
  }
}

/**
 * Submit a completed quiz attempt and update student cumulative stats.
 * POST /api/student/quiz-attempt
 *
 * Body for DB/AI quiz:
 *   { quizType: 'database'|'ai', subject, questions: [{id, correctAnswer}], userAnswers: {id: 'A'|'B'|'C'|'D'} }
 *
 * Body for Live quiz:
 *   { quizType: 'live', liveAttemptId }
 */
export async function submitQuizAttempt(req, res) {
  try {
    const studentId = req.studentId
    const { quizType, subject, questions, userAnswers, liveAttemptId } =
      req.body || {}

    // Validate quizType
    if (!['database', 'ai', 'live'].includes(quizType)) {
      return res.status(400).json({ error: 'Invalid quiz type.' })
    }

    // Reject submissions from a session whose student was removed by an admin
    const studentExists = await Student.exists({ _id: studentId })
    if (!studentExists) {
      return res.status(404).json({
        error: 'This student account no longer exists.',
        accountRemoved: true,
      })
    }

    if (quizType === 'live') {
      // ---- LIVE QUIZ ----
      if (!liveAttemptId) {
        return res.status(400).json({ error: 'Valid liveAttemptId is required for live quiz submission.' })
      }

      const liveAttempt = await LiveQuizAttempt.findById(liveAttemptId)
      if (!liveAttempt) {
        return res.status(404).json({ error: 'Live quiz attempt not found.' })
      }

      if (!liveAttempt.isAnnounced) {
        return res.status(400).json({
          error: 'Result has not been announced yet. Scores count only after official announcement.',
          notAnnounced: true,
        })
      }

      // Record using idempotent helper
      const recorded = await recordLiveQuizScore(liveAttempt)
      const student = await Student.findById(studentId)

      return res.json({
        message: 'Live quiz attempt recorded.',
        attempt: recorded,
        studentStats: student,
      })
    }

    // ---- DATABASE / AI QUIZ ----
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Questions array is required.' })
    }

    if (!userAnswers || typeof userAnswers !== 'object') {
      return res.status(400).json({ error: 'User answers object is required.' })
    }

    const totalQuestions = questions.length
    let correctAnswers = 0
    let incorrectAnswers = 0

    // Server-side scoring: iterate over questions and verify correctness
    for (const q of questions) {
      const { id, correctAnswer } = q
      if (!id || !['A', 'B', 'C', 'D'].includes(correctAnswer)) continue

      const studentAnswer = userAnswers[id]
      if (studentAnswer === correctAnswer) {
        correctAnswers += 1
      } else if (['A', 'B', 'C', 'D'].includes(studentAnswer)) {
        incorrectAnswers += 1
      }
    }

    const accuracy =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0

    const resolvedSubject = subject || 'Practice Quiz'

    const attempt = await QuizAttempt.create({
      studentId,
      quizType,
      subject: resolvedSubject,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      accuracy,
      completedAt: new Date(),
    })

    // Atomically update student cumulative stats
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        $inc: {
          totalCorrect: correctAnswers,
          totalIncorrect: incorrectAnswers,
          totalAttempted: totalQuestions,
          totalQuizzes: 1,
        },
      },
      { new: true },
    )

    if (updatedStudent) {
      updatedStudent.accuracy =
        updatedStudent.totalAttempted > 0
          ? Math.round((updatedStudent.totalCorrect / updatedStudent.totalAttempted) * 100)
          : 0
      await updatedStudent.save()
    }

    return res.status(201).json({
      message: 'Quiz attempt recorded successfully.',
      attempt,
      studentStats: updatedStudent,
    })
  } catch (error) {
    console.error('Submit quiz attempt error:', error)
    return res.status(500).json({ error: 'Failed to record quiz attempt.' })
  }
}

/**
 * Get student's personal dashboard data.
 * GET /api/student/dashboard
 */
export async function getStudentDashboard(req, res) {
  try {
    const studentId = req.studentId

    const student = await Student.findById(studentId).select('-passwordHash')
    if (!student) {
      return res.status(404).json({ error: 'Student account not found.' })
    }

    // Recent quiz attempts (last 10)
    const recentAttempts = await QuizAttempt.find({ studentId })
      .sort({ completedAt: -1 })
      .limit(10)
      .lean()

    // Compute global rank according to sorting rules:
    // 1. More cumulative correct answers higher
    // 2. Higher accuracy tie-breaker
    // 3. Earlier achievement tie-breaker (updatedAt / createdAt)
    const rank = await Student.countDocuments({
      $or: [
        { totalCorrect: { $gt: student.totalCorrect } },
        {
          totalCorrect: student.totalCorrect,
          accuracy: { $gt: student.accuracy },
        },
        {
          totalCorrect: student.totalCorrect,
          accuracy: student.accuracy,
          updatedAt: { $lt: student.updatedAt },
        },
      ],
    })

    return res.json({
      student: {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        university: student.university,
        totalCorrect: student.totalCorrect,
        totalIncorrect: student.totalIncorrect,
        totalAttempted: student.totalAttempted,
        totalQuizzes: student.totalQuizzes,
        accuracy: student.accuracy,
        createdAt: student.createdAt,
        rank: rank + 1,
      },
      recentAttempts: recentAttempts.map((a) => ({
        _id: a._id,
        quizType: a.quizType,
        subject: a.subject,
        totalQuestions: a.totalQuestions,
        correctAnswers: a.correctAnswers,
        incorrectAnswers: a.incorrectAnswers,
        accuracy: a.accuracy,
        completedAt: a.completedAt,
      })),
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return res.status(500).json({ error: 'Failed to retrieve dashboard data.' })
  }
}

/**
 * Public leaderboard.
 * GET /api/leaderboard?page=1&limit=50
 */
export async function getLeaderboard(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || LEADERBOARD_PAGE_LIMIT))
    const skip = (page - 1) * limit

    // Sorted by:
    // 1. totalCorrect (desc)
    // 2. accuracy (desc)
    // 3. updatedAt (asc - earlier achievement)
    const [students, total] = await Promise.all([
      Student.find({})
        .sort({ totalCorrect: -1, accuracy: -1, updatedAt: 1 })
        .skip(skip)
        .limit(limit)
        .select('fullName university totalCorrect totalIncorrect totalAttempted totalQuizzes accuracy createdAt')
        .lean(),
      Student.countDocuments({}),
    ])

    const leaderboard = students.map((s, index) => ({
      rank: skip + index + 1,
      _id: s._id,
      fullName: s.fullName,
      university: s.university,
      totalCorrect: s.totalCorrect,
      totalQuizzes: s.totalQuizzes,
      totalAttempted: s.totalAttempted,
      accuracy: s.accuracy ?? 0,
    }))

    return res.json({
      leaderboard,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return res.status(500).json({ error: 'Failed to retrieve leaderboard.' })
  }
}
