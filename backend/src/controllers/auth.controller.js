import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15d'

function signStudentToken(studentId) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not configured.')
  return jwt.sign({ sub: studentId, role: 'student' }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

/**
 * Student Registration
 * POST /api/auth/register
 */
export async function register(req, res) {
  try {
    const { fullName, email, university, password } = req.body || {}

    // Validate required fields
    if (!fullName || !email || !university || !password) {
      return res.status(400).json({
        error: 'All fields are required: Full Name, Email, University, Password.',
      })
    }

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long.',
      })
    }

    if (password.length > 72) {
      return res.status(400).json({
        error: 'Password must not exceed 72 characters.',
      })
    }

    // Check for duplicate email
    const existing = await Student.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return res.status(409).json({
        error: 'An account with this email address already exists. Please log in.',
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create student
    const student = await Student.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      university: university.trim(),
      passwordHash,
    })

    const token = signStudentToken(student._id)

    return res.status(201).json({
      token,
      student: {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        university: student.university,
        role: student.role,
        totalCorrect: student.totalCorrect,
        totalIncorrect: student.totalIncorrect,
        totalAttempted: student.totalAttempted,
        totalQuizzes: student.totalQuizzes,
        accuracy: student.accuracy,
        createdAt: student.createdAt,
      },
      message: 'Account created successfully.',
    })
  } catch (error) {
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ error: messages.join(' ') })
    }
    // Duplicate key (race condition)
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'An account with this email address already exists. Please log in.',
      })
    }
    console.error('Registration error:', error)
    return res.status(500).json({ error: 'Failed to create account. Please try again.' })
  }
}

/**
 * Student Login
 * POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required.',
      })
    }

    const student = await Student.findOne({ email: email.toLowerCase().trim() })
    if (!student) {
      return res.status(401).json({
        error: 'Invalid email or password.',
      })
    }

    const isMatch = await bcrypt.compare(password, student.passwordHash)
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid email or password.',
      })
    }

    const token = signStudentToken(student._id)

    return res.json({
      token,
      student: {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        university: student.university,
        role: student.role,
        totalCorrect: student.totalCorrect,
        totalIncorrect: student.totalIncorrect,
        totalAttempted: student.totalAttempted,
        totalQuizzes: student.totalQuizzes,
        accuracy: student.accuracy,
        createdAt: student.createdAt,
      },
      message: 'Logged in successfully.',
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Failed to log in. Please try again.' })
  }
}

/**
 * Get Current Student Profile
 * GET /api/auth/me
 */
export async function getMe(req, res) {
  try {
    const student = await Student.findById(req.studentId).select('-passwordHash')
    if (!student) {
      return res.status(404).json({ error: 'Student account not found.' })
    }

    return res.json({
      student: {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        university: student.university,
        role: student.role,
        totalCorrect: student.totalCorrect,
        totalIncorrect: student.totalIncorrect,
        totalAttempted: student.totalAttempted,
        totalQuizzes: student.totalQuizzes,
        accuracy: student.accuracy,
        createdAt: student.createdAt,
      },
    })
  } catch (error) {
    console.error('Get profile error:', error)
    return res.status(500).json({ error: 'Failed to retrieve profile.' })
  }
}
