import assert from 'node:assert/strict'
import test from 'node:test'
import { getTopCompletedAttempts } from './adminLeaderboard.js'

function makeAttempt(studentName, correct, total = 20, status = 'completed') {
  return {
    _id: studentName,
    studentName,
    status,
    score: { correct, total },
  }
}

test('ranks completed attempts by score and excludes in-progress attempts', () => {
  const attempts = [
    makeAttempt('Hanif', 18),
    makeAttempt('Ali', 20),
    makeAttempt('Aslam', 19),
    makeAttempt('Adnan', 18),
    makeAttempt('In Progress', 20, 20, 'in-progress'),
  ]

  assert.deepEqual(
    getTopCompletedAttempts(attempts).map((attempt) => attempt.studentName),
    ['Ali', 'Aslam', 'Adnan'],
  )
})

test('promotes the next student immediately when a top attempt is removed', () => {
  const attempts = [
    makeAttempt('Ali', 20),
    makeAttempt('Aslam', 19),
    makeAttempt('Adnan', 18),
    makeAttempt('Hanif', 17),
  ]
  const remainingAttempts = attempts.filter((attempt) => attempt.studentName !== 'Ali')

  assert.deepEqual(
    getTopCompletedAttempts(remainingAttempts).map((attempt) => attempt.studentName),
    ['Aslam', 'Adnan', 'Hanif'],
  )
})
