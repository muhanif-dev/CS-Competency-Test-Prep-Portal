import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  fetchCurrentStudent,
  getStoredToken,
  loginStudent,
  registerStudent,
  removeStoredToken,
  setStoredToken,
} from '../services/studentService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true) // true while verifying stored token

  // On mount: validate any existing stored token
  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      setLoading(false)
      return
    }
    fetchCurrentStudent()
      .then((s) => setStudent(s))
      .catch(() => {
        removeStoredToken()
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await loginStudent(credentials)
    setStudent(data.student)
    return data
  }, [])

  const register = useCallback(async (details) => {
    const data = await registerStudent(details)
    setStudent(data.student)
    return data
  }, [])

  const logout = useCallback(() => {
    removeStoredToken()
    setStudent(null)
  }, [])

  // Call this after a quiz attempt is submitted to refresh cumulative stats
  const refreshStudent = useCallback(async () => {
    try {
      const s = await fetchCurrentStudent()
      setStudent(s)
    } catch {
      // silent — not critical
    }
  }, [])

  const isAuthenticated = Boolean(student)

  const value = useMemo(
    () => ({
      student,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      refreshStudent,
    }),
    [student, isAuthenticated, loading, login, register, logout, refreshStudent],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
