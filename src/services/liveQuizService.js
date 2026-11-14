import axios from 'axios'
import { getStoredToken } from './studentService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function formatError(error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error
    if (message) return message
    if (error.code === 'ERR_NETWORK') {
      return 'Network error: Unable to reach the quiz server. Please check your connection or backend server status.'
    }
    if (error.response?.status === 404) {
      return 'The requested quiz session was not found.'
    }
    if (error.response?.status === 403) {
      return 'Session authentication failed. Please restart the quiz.'
    }
  }
  return error?.message || 'An unexpected error occurred.'
}

export async function startLiveQuiz({ name, semester, questionCount, competencyId = 'all' }) {
  try {
    const token = getStoredToken()
    const response = await axios.post(
      `${API_BASE_URL}/api/live-quiz/start`,
      {
        name,
        semester,
        questionCount,
        competencyId,
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        timeout: 30000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}
export async function submitLiveAnswer(attemptId, { sessionToken, questionIndex, answer }) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/live-quiz/${attemptId}/answer`,
      {
        sessionToken,
        questionIndex,
        answer,
      },
      {
        headers: {
          'x-session-token': sessionToken,
        },
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}
export async function completeLiveQuiz(attemptId, { sessionToken }) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/live-quiz/${attemptId}/complete`,
      { sessionToken },
      {
        headers: {
          'x-session-token': sessionToken,
        },
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function getLiveQuizStatus(attemptId, sessionToken) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/live-quiz/${attemptId}/status`,
      {
        params: { sessionToken },
        headers: {
          'x-session-token': sessionToken,
        },
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}
