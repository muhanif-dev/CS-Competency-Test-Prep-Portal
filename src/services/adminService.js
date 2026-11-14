import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const ADMIN_TOKEN_KEY = 'cs_prep_admin_token'
const ADMIN_USER_KEY = 'cs_prep_admin_user'

function getAuthHeaders() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function formatError(error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error
    if (message) return message
    if (error.response?.status === 401) {
      return 'Unauthorized. Please login again.'
    }
    if (error.response?.status === 403) {
      return 'Session expired or invalid. Please login again.'
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Unable to reach the server. Please verify the backend is running.'
    }
  }
  return error?.message || 'An unexpected error occurred.'
}

export function getStoredAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function getStoredAdminUsername() {
  return localStorage.getItem(ADMIN_USER_KEY) || 'Admin'
}

export async function adminLogin(username, password) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/login`,
      { username, password },
      { timeout: 15000 },
    )
    const { token, username: user } = response.data
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
    localStorage.setItem(ADMIN_USER_KEY, user || username)
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_USER_KEY)
}

export async function getAdminProfile() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/me`, {
      headers: getAuthHeaders(),
      timeout: 10000,
    })
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function getAdminAttempts() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/admin/live-quiz/attempts`,
      {
        headers: getAuthHeaders(),
        timeout: 20000,
      },
    )
    return response.data.attempts || []
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function getAdminAttemptDetails(attemptId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/admin/live-quiz/attempts/${attemptId}`,
      {
        headers: getAuthHeaders(),
        timeout: 20000,
      },
    )
    return response.data.attempt
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function toggleAnnounceAttempt(attemptId, isAnnounced) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/admin/live-quiz/attempts/${attemptId}/announce`,
      { isAnnounced },
      {
        headers: getAuthHeaders(),
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function bulkToggleAnnounce(isAnnounced) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/live-quiz/announce-all`,
      { isAnnounced },
      {
        headers: getAuthHeaders(),
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function deleteAdminAttempt(attemptId) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/admin/live-quiz/attempts/${attemptId}`,
      {
        headers: getAuthHeaders(),
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function deleteAllAdminAttempts() {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/admin/live-quiz/attempts`,
      {
        headers: getAuthHeaders(),
        timeout: 20000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function getAdminStudents(search = '') {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/students`, {
      params: search ? { search } : {},
      headers: getAuthHeaders(),
      timeout: 20000,
    })
    return response.data.students || []
  } catch (error) {
    throw new Error(formatError(error))
  }
}

export async function deleteAdminStudent(studentId) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/admin/students/${studentId}`,
      {
        headers: getAuthHeaders(),
        timeout: 15000,
      },
    )
    return response.data
  } catch (error) {
    throw new Error(formatError(error))
  }
}
