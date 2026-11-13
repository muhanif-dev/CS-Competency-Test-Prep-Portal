import crypto from 'crypto'
import { getQuestionBatch } from '../utils/questionPool.js'
import {
  createAttempt,
  findAttemptById,
  saveAttempt,
} from '../utils/attemptStore.js'

const ALLOWED_QUESTION_COUNTS = [20, 50, 100]

function recalculateAttemptScore(attempt) {
  let attempted = 0
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  for (const q of attempt.questions) {
    if (q.isAnswered && q.studentAnswer) {
      attempted += 1
      if (q.studentAnswer === q.correctAnswer) {
        q.isCorrect = true
        correct += 1
      } else {
        q.isCorrect = false
        incorrect += 1
      }
    } else {
      q.isCorrect = false
      unanswered += 1
    }
  }

  attempt.score = {
    total: attempt.questionCount,
    attempted,
    unanswered,
    correct,
    incorrect,
  }
}

/**
 * Starts a new Live Quiz session.
 * POST /api/live-quiz/start
 */
export async function startLiveQuiz(req, res) {
  try {
    const { name, semester, competencyId = 'all' } = req.body || {}
    const questionCount = parseInt(req.body?.questionCount, 10)

    // Validate student name
    const trimmedName = typeof name === 'string' ? name.trim() : ''
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        error: 'Please enter a valid student name (between 2 and 100 characters).',
      })
    }

    // Validate semester
    const trimmedSemester =
      typeof semester === 'string'
        ? semester.trim()
        : String(semester || '').trim()
    const validSemesters = [
      'Semester 1',
      'Semester 2',
      'Semester 3',
      'Semester 4',
      'Semester 5',
      'Semester 6',
      'Semester 7',
      'Semester 8',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
    ]
    if (!trimmedSemester || !validSemesters.includes(trimmedSemester)) {
      return res.status(400).json({
        error: 'Please select a valid semester (Semester 1 through Semester 8).',
      })
    }

    const formattedSemester = trimmedSemester.startsWith('Semester')
      ? trimmedSemester
      : `Semester ${trimmedSemester}`

    // Validate question count
    if (!ALLOWED_QUESTION_COUNTS.includes(questionCount)) {
      return res.status(400).json({
        error: 'Question count must be 20, 50, or 100 questions.',
      })
    }

    // Fetch batch for specific subject or all subjects
    const batch = await getQuestionBatch({
      competencyId,
      count: questionCount,
    })

    // Build questions for server record (includes server-only correctAnswer and explanation)
    const sessionQuestions = batch.questions.map((q, index) => ({
      questionId: q._id ? String(q._id) : `q_${index + 1}`,
      competencyId: q.competencyId || batch.competencyId,
      competencyName: q.competencyName || batch.competencyName,
      question: q.question,
      options: q.options.map((opt) => ({ id: opt.id, text: opt.text })),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
      studentAnswer: null,
      isAnswered: false,
      isCorrect: false,
      answeredAt: null,
    }))

    const sessionToken = crypto.randomBytes(32).toString('hex')

    const attemptData = {
      studentName: trimmedName,
      semester: formattedSemester,
      questionCount,
      competencyId: batch.competencyId,
      competencyName: batch.competencyName,
      sessionToken,
      status: 'in-progress',
      currentQuestionIndex: 0,
      questions: sessionQuestions,
      score: {
        total: questionCount,
        attempted: 0,
        unanswered: questionCount,
        correct: 0,
        incorrect: 0,
      },
      isAnnounced: false,
      startedAt: new Date(),
    }

    const attempt = await createAttempt(attemptData)

    // Sanitize questions for student: NEVER return correctAnswer or explanation!
    const sanitizedQuestions = sessionQuestions.map((q, index) => ({
      index,
      questionId: `q${index + 1}`,
      competencyName: q.competencyName,
      question: q.question,
      options: q.options,
    }))

    return res.status(201).json({
      attemptId: attempt._id,
      sessionToken,
      studentName: attempt.studentName,
      semester: attempt.semester,
      competencyId: batch.competencyId,
      competencyName: batch.competencyName,
      questionCount: attempt.questionCount,
      questions: sanitizedQuestions,
    })
  } catch (error) {
    console.error('Error starting live quiz:', error)
    return res.status(400).json({
      error: error.message || 'Failed to start live quiz session.',
    })
  }
}

/**
 * Submits an answer (or timeout) for a specific question.
 * POST /api/live-quiz/:attemptId/answer
 */
export async function submitLiveAnswer(req, res) {
  try {
    const { attemptId } = req.params
    const sessionToken =
      req.headers['x-session-token'] || req.body?.sessionToken
    const questionIndex = parseInt(req.body?.questionIndex, 10)
    const answer = req.body?.answer // 'A', 'B', 'C', 'D' or null/empty

    if (!sessionToken) {
      return res.status(401).json({
        error: 'Missing session authentication token.',
      })
    }

    const attempt = await findAttemptById(attemptId)
    if (!attempt) {
      return res.status(404).json({ error: 'Quiz session not found.' })
    }

    if (attempt.sessionToken !== sessionToken) {
      return res.status(403).json({
        error: 'Forbidden. Invalid session token for this attempt.',
      })
    }

    if (attempt.status === 'completed') {
      return res.json({
        nextIndex: attempt.questions.length,
        completed: true,
        isAnnounced: Boolean(attempt.isAnnounced),
      })
    }

    if (
      isNaN(questionIndex) ||
      questionIndex < 0 ||
      questionIndex >= attempt.questions.length
    ) {
      return res.status(400).json({ error: 'Invalid question index.' })
    }

    const question = attempt.questions[questionIndex]

    // Idempotent: if already recorded, don't overwrite or double-count
    if (!question.isAnswered) {
      question.isAnswered = true
      question.studentAnswer = ['A', 'B', 'C', 'D'].includes(answer)
        ? answer
        : null
      question.isCorrect =
        Boolean(question.studentAnswer) &&
        question.studentAnswer === question.correctAnswer
      question.answeredAt = new Date()

      // Recalculate trusted server-side score
      recalculateAttemptScore(attempt)

      // If last question, mark completed
      if (questionIndex >= attempt.questions.length - 1) {
        attempt.status = 'completed'
        attempt.completedAt = new Date()
      } else {
        attempt.currentQuestionIndex = Math.max(
          attempt.currentQuestionIndex || 0,
          questionIndex + 1,
        )
      }

      await saveAttempt(attempt)
    }

    const isFinished =
      attempt.status === 'completed' ||
      questionIndex >= attempt.questions.length - 1

    return res.json({
      nextIndex: questionIndex + 1,
      completed: isFinished,
      isAnnounced: Boolean(attempt.isAnnounced),
    })
  } catch (error) {
    console.error('Error submitting live answer:', error)
    return res.status(500).json({
      error: error.message || 'Failed to record answer.',
    })
  }
}

/**
 * Explicitly completes / finalizes a live quiz attempt.
 * POST /api/live-quiz/:attemptId/complete
 */
export async function completeLiveQuiz(req, res) {
  try {
    const { attemptId } = req.params
    const sessionToken =
      req.headers['x-session-token'] || req.body?.sessionToken

    if (!sessionToken) {
      return res.status(401).json({
        error: 'Missing session authentication token.',
      })
    }

    const attempt = await findAttemptById(attemptId)
    if (!attempt) {
      return res.status(404).json({ error: 'Quiz session not found.' })
    }

    if (attempt.sessionToken !== sessionToken) {
      return res.status(403).json({
        error: 'Forbidden. Invalid session token for this attempt.',
      })
    }

    if (attempt.status !== 'completed') {
      attempt.status = 'completed'
      attempt.completedAt = new Date()

      // Ensure any remaining questions are marked answered as unanswered
      for (const q of attempt.questions) {
        if (!q.isAnswered) {
          q.isAnswered = true
          q.studentAnswer = null
          q.isCorrect = false
        }
      }

      recalculateAttemptScore(attempt)
      await saveAttempt(attempt)
    }

    return res.json({
      completed: true,
      isAnnounced: Boolean(attempt.isAnnounced),
      message: attempt.isAnnounced
        ? 'Result announced'
        : 'Result will be announced.',
    })
  } catch (error) {
    console.error('Error completing live quiz:', error)
    return res.status(500).json({
      error: error.message || 'Failed to complete quiz session.',
    })
  }
}

/**
 * Checks student-facing announcement status.
 * GET /api/live-quiz/:attemptId/status
 */
export async function getLiveQuizStatus(req, res) {
  try {
    const { attemptId } = req.params
    const sessionToken =
      req.headers['x-session-token'] ||
      req.query?.sessionToken ||
      req.query?.token

    if (!sessionToken) {
      return res.status(401).json({
        error: 'Missing session authentication token.',
      })
    }

    const attempt = await findAttemptById(attemptId)
    if (!attempt) {
      return res.status(404).json({ error: 'Quiz attempt not found.' })
    }

    // Verify student ownership so students cannot query other students' results
    if (attempt.sessionToken !== sessionToken) {
      return res.status(403).json({
        error: 'Forbidden. You do not have permission to view this attempt.',
      })
    }

    const baseData = {
      attemptId: attempt._id,
      studentName: attempt.studentName,
      semester: attempt.semester,
      questionCount: attempt.questionCount,
      competencyName: attempt.competencyName,
      status: attempt.status,
      completedAt: attempt.completedAt,
      isAnnounced: Boolean(attempt.isAnnounced),
    }

    if (!attempt.isAnnounced) {
      return res.json({
        ...baseData,
        message: 'Result will be announced.',
      })
    }

    // Once announced by Admin, securely return score aggregate counts
    return res.json({
      ...baseData,
      message: 'Result announced',
      score: {
        total: attempt.score.total,
        attempted: attempt.score.attempted,
        unanswered: attempt.score.unanswered,
        correct: attempt.score.correct,
        incorrect: attempt.score.incorrect,
        percentage:
          attempt.score.total > 0
            ? Math.round((attempt.score.correct / attempt.score.total) * 100)
            : 0,
      },
    })
  } catch (error) {
    console.error('Error fetching live quiz status:', error)
    return res.status(500).json({
      error: error.message || 'Failed to fetch status.',
    })
  }
}
