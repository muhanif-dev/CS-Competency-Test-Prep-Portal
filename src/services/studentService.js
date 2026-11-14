import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const STUDENT_TOKEN_KEY = 'cs_prep_student_token'

export function getStoredToken() {
  return localStorage.getItem(STUDENT_TOKEN_KEY)
}

export function setStoredToken(token) {
  localStorage.setItem(STUDENT_TOKEN_KEY, token)
}

export function removeStoredToken() {
  localStorage.removeItem(STUDENT_TOKEN_KEY)
}

function authHeaders() {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function formatError(error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error
    if (message) return message
    if (error.response?.status === 401) return 'Your session has expired. Please log in again.'
    if (error.code === 'ERR_NETWORK') return 'Unable to reach the server. Please check your connection.'
  }
  return error?.message || 'An unexpected error occurred.'
}

export async function registerStudent({ fullName, email, university, password }) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      { fullName, email, university, password },
      { timeout: 15000 },
    )
    setStoredToken(res.data.token)
    return res.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function loginStudent({ email, password }) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      { email, password },
      { timeout: 15000 },
    )
    setStoredToken(res.data.token)
    return res.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function fetchCurrentStudent() {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
      headers: authHeaders(),
      timeout: 10000,
    })
    return res.data.student
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function submitQuizAttempt(payload) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/student/quiz-attempt`,
      payload,
      {
        headers: authHeaders(),
        timeout: 15000,
      },
    )
    return res.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function fetchStudentDashboard() {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/student/dashboard`, {
      headers: authHeaders(),
      timeout: 15000,
    })
    return res.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function fetchLeaderboard(page = 1, limit = 50) {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/student/leaderboard`, {
      params: { page, limit },
      timeout: 15000,
    })
    return res.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}
