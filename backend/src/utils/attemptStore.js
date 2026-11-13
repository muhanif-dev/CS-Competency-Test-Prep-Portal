import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import LiveQuizAttempt from '../models/LiveQuizAttempt.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname, '..', '..', 'data')
const ATTEMPTS_FILE = path.join(DATA_DIR, 'live_quiz_attempts.json')

// In-memory cache for fast access & offline mode
let localAttempts = []

function loadLocalAttempts() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (fs.existsSync(ATTEMPTS_FILE)) {
      const raw = fs.readFileSync(ATTEMPTS_FILE, 'utf8')
      localAttempts = JSON.parse(raw)
    }
  } catch (err) {
    console.warn('Could not read local attempts file:', err.message)
    localAttempts = []
  }
}

function saveLocalAttempts() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify(localAttempts, null, 2), 'utf8')
    return true
  } catch (err) {
    console.warn('Could not persist local attempts file:', err.message)
    return false
  }
}

// Initial load
loadLocalAttempts()

export async function createAttempt(data) {
  if (mongoose.connection.readyState === 1) {
    try {
      const attempt = new LiveQuizAttempt(data)
      await attempt.save()
      return attempt
    } catch (err) {
      console.warn('Mongoose createAttempt failed, saving to local store:', err.message)
    }
  }

  // Fallback: Local store
  const newAttempt = {
    ...data,
    _id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  localAttempts.unshift(newAttempt)
  saveLocalAttempts()
  return newAttempt
}

export async function findAttemptById(id) {
  if (mongoose.connection.readyState === 1) {
    try {
      const attempt = await LiveQuizAttempt.findById(id)
      if (attempt) return attempt
    } catch {
      // Fallback to local
    }
  }

  return localAttempts.find((a) => String(a._id) === String(id)) || null
}

export async function saveAttempt(attempt) {
  if (typeof attempt.save === 'function') {
    return await attempt.save()
  }

  // Local object
  attempt.updatedAt = new Date().toISOString()
  const idx = localAttempts.findIndex((a) => String(a._id) === String(attempt._id))
  if (idx !== -1) {
    localAttempts[idx] = attempt
  } else {
    localAttempts.unshift(attempt)
  }
  saveLocalAttempts()
  return attempt
}

export async function listAllAttempts() {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbAttempts = await LiveQuizAttempt.find({})
        .sort({ createdAt: -1 })
        .select('-sessionToken -questions')
        .lean()
      if (dbAttempts && dbAttempts.length > 0) {
        return dbAttempts
      }
    } catch {
      // Fallback to local
    }
  }

  return localAttempts.map((a) => ({
    _id: a._id,
    studentName: a.studentName,
    semester: a.semester,
    questionCount: a.questionCount,
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
}

export async function deleteAttemptById(id) {
  if (mongoose.connection.readyState === 1) {
    try {
      const res = await LiveQuizAttempt.findByIdAndDelete(id)
      if (res) return res
    } catch {
      // Fallback
    }
  }

  const idx = localAttempts.findIndex((a) => String(a._id) === String(id))
  if (idx !== -1) {
    const deleted = localAttempts.splice(idx, 1)[0]
    saveLocalAttempts()
    return deleted
  }
  return null
}

export async function deleteAllAttempts() {
  let deletedCount = 0

  if (mongoose.connection.readyState === 1) {
    const result = await LiveQuizAttempt.deleteMany({})
    deletedCount = result.deletedCount || 0
  }

  const previousAttempts = localAttempts
  localAttempts = []
  if (!saveLocalAttempts()) {
    localAttempts = previousAttempts
    throw new Error('Could not persist the deletion of local quiz attempts.')
  }

  return deletedCount + previousAttempts.length
}

export async function bulkAnnounceAll(isAnnounced) {
  let count = 0
  if (mongoose.connection.readyState === 1) {
    try {
      const res = await LiveQuizAttempt.updateMany(
        { status: 'completed' },
        {
          $set: {
            isAnnounced,
            announcedAt: isAnnounced ? new Date() : null,
          },
        },
      )
      count = res.modifiedCount
    } catch {
      // Fallback
    }
  }

  // Also update local store
  for (const a of localAttempts) {
    if (a.status === 'completed') {
      a.isAnnounced = isAnnounced
      a.announcedAt = isAnnounced ? new Date().toISOString() : null
      count += 1
    }
  }
  saveLocalAttempts()
  return count
}
