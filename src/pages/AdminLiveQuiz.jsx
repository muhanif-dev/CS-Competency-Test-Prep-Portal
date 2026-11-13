import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Lock,
  LogOut,
  Megaphone,
  MegaphoneOff,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import { getTopCompletedAttempts } from '../utils/adminLeaderboard'
import {
  adminLogin,
  adminLogout,
  bulkToggleAnnounce,
  deleteAllAdminAttempts,
  deleteAdminAttempt,
  getAdminAttemptDetails,
  getAdminAttempts,
  getAdminProfile,
  getStoredAdminToken,
  getStoredAdminUsername,
  toggleAnnounceAttempt,
} from '../services/adminService'

const SCORE_RANGES = [
  { label: '0–30%', min: 0, max: 30, color: '#ef4444' },
  { label: '31–50%', min: 31, max: 50, color: '#f97316' },
  { label: '51–70%', min: 51, max: 70, color: '#eab308' },
  { label: '71–90%', min: 71, max: 90, color: '#22c55e' },
  { label: '91–100%', min: 91, max: 100, color: '#3b82f6' },
]

export default function AdminLiveQuiz() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Login form state
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Attempts dashboard state
  const [attempts, setAttempts] = useState([])
  const [loadingAttempts, setLoadingAttempts] = useState(false)
  const [deletingAllAttempts, setDeletingAllAttempts] = useState(false)
  const [dashboardError, setDashboardError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'completed' | 'in-progress' | 'announced' | 'unannounced'
  const [semesterFilter, setSemesterFilter] = useState('all')

  // Selected attempt detail modal
  const [selectedAttempt, setSelectedAttempt] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // Check stored auth on mount
  useEffect(() => {
    async function checkExistingAuth() {
      const token = getStoredAdminToken()
      if (!token) {
        setIsAuthenticated(false)
        setCheckingAuth(false)
        return
      }

      try {
        const res = await getAdminProfile()
        setIsAuthenticated(true)
        setAdminUser(res.admin?.username || getStoredAdminUsername())
      } catch {
        adminLogout()
        setIsAuthenticated(false)
      } finally {
        setCheckingAuth(false)
      }
    }

    checkExistingAuth()
  }, [])

  // Fetch attempts when authenticated
  const fetchAttempts = async () => {
    setLoadingAttempts(true)
    setDashboardError('')
    try {
      const data = await getAdminAttempts()
      setAttempts(data)
    } catch (err) {
      setDashboardError(err.message || 'Failed to fetch live quiz attempts.')
    } finally {
      setLoadingAttempts(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchAttempts()
    }
  }, [isAuthenticated])

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    try {
      const data = await adminLogin(usernameInput.trim(), passwordInput)
      setIsAuthenticated(true)
      setAdminUser(data.username || usernameInput.trim())
      setUsernameInput('')
      setPasswordInput('')
    } catch (err) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    adminLogout()
    setIsAuthenticated(false)
    setAttempts([])
    setSelectedAttempt(null)
  }

  // Toggle Single Attempt Announcement
  const handleToggleAnnounce = async (attemptId, currentAnnounced) => {
    setActionSuccess('')
    try {
      const targetState = !currentAnnounced
      await toggleAnnounceAttempt(attemptId, targetState)
      setAttempts((prev) =>
        prev.map((a) =>
          a._id === attemptId
            ? { ...a, isAnnounced: targetState, announcedAt: targetState ? new Date() : null }
            : a,
        ),
      )
      setActionSuccess(
        targetState
          ? 'Attempt result announced successfully. Student can now view score.'
          : 'Attempt result announcement reverted.',
      )
      setTimeout(() => setActionSuccess(''), 4000)
    } catch (err) {
      alert(`Error toggling announcement: ${err.message}`)
    }
  }

  // Bulk Toggle Announcement
  const handleBulkAnnounce = async (targetState) => {
    if (
      !window.confirm(
        targetState
          ? 'Are you sure you want to announce results for ALL completed attempts?'
          : 'Are you sure you want to unannounce results for ALL completed attempts?',
      )
    ) {
      return
    }

    setActionSuccess('')
    try {
      const res = await bulkToggleAnnounce(targetState)
      setActionSuccess(res.message)
      setTimeout(() => setActionSuccess(''), 4000)
      fetchAttempts()
    } catch (err) {
      alert(`Bulk action error: ${err.message}`)
    }
  }

  // View Details Modal
  const handleViewDetails = async (attemptId) => {
    setDetailLoading(true)
    setDetailModalOpen(true)
    try {
      const detail = await getAdminAttemptDetails(attemptId)
      setSelectedAttempt(detail)
    } catch (err) {
      alert(`Failed to load attempt details: ${err.message}`)
      setDetailModalOpen(false)
    } finally {
      setDetailLoading(false)
    }
  }

  // Delete Attempt
  const handleDeleteAttempt = async (attemptId, studentName) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete the attempt for "${studentName}"?`,
      )
    ) {
      return
    }

    try {
      await deleteAdminAttempt(attemptId)
      setAttempts((prev) => prev.filter((a) => a._id !== attemptId))
      setActionSuccess(`Attempt for ${studentName} deleted.`)
      setTimeout(() => setActionSuccess(''), 3000)
    } catch (err) {
      alert(`Failed to delete attempt: ${err.message}`)
    }
  }

  const handleDeleteAllAttempts = async () => {
    if (
      !window.confirm(
        `Permanently delete all ${attempts.length} quiz attempt record(s), including in-progress attempts? This cannot be undone.`,
      )
    ) {
      return
    }

    setDeletingAllAttempts(true)
    setDashboardError('')
    setActionSuccess('')
    try {
      const result = await deleteAllAdminAttempts()
      setAttempts([])
      setSelectedAttempt(null)
      setDetailModalOpen(false)
      setActionSuccess(result.message || `Deleted ${result.deletedCount} quiz attempt(s).`)
    } catch (err) {
      setDashboardError(err.message || 'Failed to delete all quiz attempts.')
    } finally {
      setDeletingAllAttempts(false)
    }
  }

  // Filtered & Searched Attempts
  const filteredAttempts = useMemo(() => {
    return attempts.filter((item) => {
      // Search
      const searchLower = searchTerm.toLowerCase().trim()
      const matchesSearch =
        !searchLower ||
        item.studentName?.toLowerCase().includes(searchLower) ||
        item.semester?.toLowerCase().includes(searchLower) ||
        item._id?.toLowerCase().includes(searchLower)

      // Status
      let matchesStatus = true
      if (statusFilter === 'completed') matchesStatus = item.status === 'completed'
      if (statusFilter === 'in-progress') matchesStatus = item.status === 'in-progress'
      if (statusFilter === 'announced') matchesStatus = Boolean(item.isAnnounced)
      if (statusFilter === 'unannounced') matchesStatus = !item.isAnnounced && item.status === 'completed'

      // Semester
      let matchesSemester = true
      if (semesterFilter !== 'all') matchesSemester = item.semester === semesterFilter

      return matchesSearch && matchesStatus && matchesSemester
    })
  }, [attempts, searchTerm, statusFilter, semesterFilter])

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = attempts.length
    const completed = attempts.filter((a) => a.status === 'completed').length
    const announced = attempts.filter((a) => a.isAnnounced).length
    const pending = completed - announced
    return { total, completed, announced, pending }
  }, [attempts])

  const topStudents = useMemo(() => getTopCompletedAttempts(attempts), [attempts])

  const scoreDistribution = useMemo(() => {
    const ranges = SCORE_RANGES.map((range) => ({ ...range, count: 0 }))
    const completedAttempts = filteredAttempts.filter(
      (attempt) => attempt.status === 'completed',
    )

    for (const attempt of completedAttempts) {
      const rawPercentage = Number.isFinite(attempt.percentage)
        ? attempt.percentage
        : attempt.score?.total > 0
          ? Math.round((attempt.score.correct / attempt.score.total) * 100)
          : 0
      const percentage = Math.min(100, Math.max(0, rawPercentage))
      const range = ranges.find(
        (item) => percentage >= item.min && percentage <= item.max,
      )
      if (range) range.count += 1
    }

    let offset = 0
    const gradient = ranges
      .map((range) => {
        const start = offset
        offset += completedAttempts.length
          ? (range.count / completedAttempts.length) * 100
          : 0
        return `${range.color} ${start}% ${offset}%`
      })
      .join(', ')

    return {
      ranges,
      total: completedAttempts.length,
      background: completedAttempts.length
        ? `conic-gradient(${gradient})`
        : 'conic-gradient(#e5e7eb 0% 100%)',
    }
  }, [filteredAttempts])

  if (checkingAuth) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-ulm-purple" />
      </div>
    )
  }

  return (
    <>
      <PageHero
        title="Live Quiz Administration & Result Portal"
        subtitle="Secure authorized administration panel for reviewing student live test attempts and publishing exam results."
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* =========================================================================
            VIEW 1: ADMIN LOGIN SCREEN (Unauthenticated)
           ========================================================================= */}
        {!isAuthenticated ? (
          <div className="mx-auto max-w-md rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-9 shadow-md">
            <div className="text-center mb-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ulm-lavender text-ulm-purple mb-3">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-ulm-dark">Admin Authentication</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Authorized faculty & examination committee access only.
              </p>
            </div>

            {loginError && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs sm:text-sm text-red-800"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                <p>{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="adminUsername"
                  className="block text-xs sm:text-sm font-semibold text-ulm-dark mb-1.5"
                >
                  Admin Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="adminUsername"
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="e.g. admin"
                    className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-3 text-sm text-ulm-dark focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="adminPassword"
                  className="block text-xs sm:text-sm font-semibold text-ulm-dark mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="adminPassword"
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-3 text-sm text-ulm-dark focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ulm-purple py-3 px-4 text-sm font-bold text-white shadow-xs hover:bg-ulm-purple-dark focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 transition disabled:opacity-60 cursor-pointer mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Sign In to Admin Panel</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-gray-400">
              Backend endpoint secured with HMAC token verification.
            </p>
          </div>
        ) : (
          /* =========================================================================
             VIEW 2: ADMIN DASHBOARD (Authenticated)
             ========================================================================= */
          <div className="space-y-6">
            {/* Admin Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-ulm-lavender bg-white p-4 sm:px-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ulm-purple text-white shadow-xs">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-ulm-dark">
                    Live Quiz Administration
                  </h2>
                  <p className="text-xs text-gray-500">
                    Logged in as <span className="font-semibold text-ulm-purple">{adminUser}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={fetchAttempts}
                  disabled={loadingAttempts}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-ulm-dark hover:bg-gray-50 transition cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loadingAttempts ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-semibold text-gray-500">Total Attempts</p>
                <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-ulm-dark">
                  {metrics.total}
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-semibold text-blue-700">Completed</p>
                <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-blue-900">
                  {metrics.completed}
                </p>
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50/50 p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-semibold text-green-700">Results Announced</p>
                <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-green-900">
                  {metrics.announced}
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-semibold text-amber-700">Pending Announcement</p>
                <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-amber-900">
                  {metrics.pending}
                </p>
              </div>
            </div>

            {/* Success / Error Alerts */}
            {actionSuccess && (
              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-xs sm:text-sm font-semibold text-green-800">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                <span>{actionSuccess}</span>
              </div>
            )}
            {dashboardError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-800">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <span>{dashboardError}</span>
              </div>
            )}

            {/* Filter and Bulk Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl border border-ulm-lavender bg-white p-4 shadow-xs">
              <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidate name or semester..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 py-2 pl-9 pr-3 text-xs sm:text-sm text-ulm-dark focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-300 py-2 px-3 text-xs sm:text-sm text-ulm-dark bg-white focus:border-ulm-purple focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed Only</option>
                  <option value="in-progress">In-Progress Only</option>
                  <option value="announced">Result Announced</option>
                  <option value="unannounced">Pending Announcement</option>
                </select>

                {/* Semester Filter */}
                <select
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className="rounded-xl border border-gray-300 py-2 px-3 text-xs sm:text-sm text-ulm-dark bg-white focus:border-ulm-purple focus:outline-none"
                >
                  <option value="all">All Semesters</option>
                  {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Bulk Actions */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => handleBulkAnnounce(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-green-700 transition cursor-pointer"
                >
                  <Megaphone className="h-3.5 w-3.5" />
                  <span>Announce All</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBulkAnnounce(false)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  <MegaphoneOff className="h-3.5 w-3.5" />
                  <span>Unannounce All</span>
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAllAttempts}
                  disabled={attempts.length === 0 || deletingAllAttempts}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingAllAttempts ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  <span>Delete All</span>
                </button>
              </div>
            </div>

            {/* Top three completed attempts */}
            <section
              aria-labelledby="top-students-title"
              className="rounded-2xl border border-ulm-lavender bg-white p-5 shadow-xs sm:p-6"
            >
              <div className="mb-4">
                <h3
                  id="top-students-title"
                  className="text-base font-bold text-ulm-dark sm:text-lg"
                >
                  Top Three Students
                </h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Highest-scoring completed attempts. Rankings update as attempts are removed.
                </p>
              </div>
              {topStudents.length > 0 ? (
                <ol className="grid gap-3 sm:grid-cols-3">
                  {topStudents.map((attempt, index) => (
                    <li
                      key={attempt._id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ulm-lavender text-sm font-bold text-ulm-purple">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-ulm-dark">
                            {attempt.studentName}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {attempt.semester || 'Semester not set'}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-base font-extrabold text-ulm-purple">
                          {attempt.rankingPercentage}%
                        </p>
                        <p className="text-xs text-gray-500">
                          {attempt.score?.correct || 0}/{attempt.score?.total || attempt.questionCount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-gray-500">No completed attempts to rank yet.</p>
              )}
            </section>

            {/* Completed score distribution */}
            <section
              aria-labelledby="score-distribution-title"
              className="rounded-2xl border border-ulm-lavender bg-white p-5 shadow-xs sm:p-6"
            >
              <div className="mb-5">
                <h3
                  id="score-distribution-title"
                  className="text-base font-bold text-ulm-dark sm:text-lg"
                >
                  Student Score Distribution
                </h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Completed attempts matching the current search and filters.
                </p>
              </div>
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                <div
                  role="img"
                  aria-label={`Score ranges across ${scoreDistribution.total} completed attempts`}
                  className="relative h-44 w-44 shrink-0 rounded-full"
                  style={{ background: scoreDistribution.background }}
                >
                  <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white text-center">
                    <span className="text-2xl font-extrabold text-ulm-dark">
                      {scoreDistribution.total}
                    </span>
                    <span className="text-xs text-gray-500">students</span>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                  {scoreDistribution.ranges.map((range) => {
                    const share = scoreDistribution.total
                      ? Math.round((range.count / scoreDistribution.total) * 100)
                      : 0
                    return (
                      <div
                        key={range.label}
                        className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2"
                      >
                        <span className="flex items-center gap-2 text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="h-3 w-3 rounded-sm"
                            style={{ backgroundColor: range.color }}
                          />
                          {range.label}
                        </span>
                        <span className="text-sm font-semibold text-ulm-dark">
                          {range.count}
                          <span className="ml-1 text-xs font-normal text-gray-500">
                            ({share}%)
                          </span>
                        </span>
                      </div>
                    )
                  })}
                  {scoreDistribution.total === 0 && (
                    <p className="text-sm text-gray-500 sm:col-span-2">
                      No completed attempts match the current filters.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Attempts Table */}
            <div className="overflow-hidden rounded-2xl border border-ulm-lavender bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80 text-gray-600 font-semibold">
                      <th className="py-3 px-4">Candidate & Semester</th>
                      <th className="py-3 px-3">Questions</th>
                      <th className="py-3 px-3">Attempted / Unanswered</th>
                      <th className="py-3 px-3">Correct / Incorrect</th>
                      <th className="py-3 px-3">Score %</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Completion Time</th>
                      <th className="py-3 px-4 text-right">Announcement Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loadingAttempts ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-gray-500">
                          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-ulm-purple mb-2" />
                          <span>Loading candidate attempts...</span>
                        </td>
                      </tr>
                    ) : filteredAttempts.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-gray-500">
                          <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="font-semibold text-ulm-dark">No attempts found</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {searchTerm || statusFilter !== 'all'
                              ? 'Try adjusting your search query or filter options.'
                              : 'Student submissions will appear here once live exams are completed.'}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredAttempts.map((attempt) => {
                        const isDone = attempt.status === 'completed'
                        const pct = attempt.percentage || 0
                        return (
                          <tr
                            key={attempt._id}
                            className="hover:bg-ulm-lavender/10 transition-colors"
                          >
                            {/* Candidate & Semester */}
                            <td className="py-3.5 px-4">
                              <p className="font-bold text-ulm-dark">{attempt.studentName}</p>
                              <p className="text-xs text-gray-500">{attempt.semester}</p>
                            </td>

                            {/* Question Count */}
                            <td className="py-3.5 px-3 font-semibold text-gray-700">
                              {attempt.questionCount} Qs
                            </td>

                            {/* Attempted vs Unanswered */}
                            <td className="py-3.5 px-3">
                              <span className="font-semibold text-gray-800">
                                {attempt.score?.attempted ?? 0}
                              </span>
                              <span className="text-gray-400"> / </span>
                              <span className="text-amber-700">
                                {attempt.score?.unanswered ?? 0}
                              </span>
                            </td>

                            {/* Correct vs Incorrect */}
                            <td className="py-3.5 px-3">
                              <span className="font-semibold text-green-700">
                                {attempt.score?.correct ?? 0}
                              </span>
                              <span className="text-gray-400"> / </span>
                              <span className="text-red-600">
                                {attempt.score?.incorrect ?? 0}
                              </span>
                            </td>

                            {/* Score Percentage */}
                            <td className="py-3.5 px-3">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                                  pct >= 50
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {pct}%
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-3">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  isDone
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800 animate-pulse'
                                }`}
                              >
                                {attempt.status}
                              </span>
                            </td>

                            {/* Completion Time */}
                            <td className="py-3.5 px-3 text-xs text-gray-500 whitespace-nowrap">
                              {attempt.completedAt
                                ? new Date(attempt.completedAt).toLocaleString([], {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : 'In Progress'}
                            </td>

                            {/* Announcement Action Buttons */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Toggle Announce */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleAnnounce(attempt._id, attempt.isAnnounced)
                                  }
                                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                                    attempt.isAnnounced
                                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-2xs'
                                      : 'border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                                  }`}
                                  title={
                                    attempt.isAnnounced
                                      ? 'Click to Unannounce Result'
                                      : 'Click to Announce Result to Student'
                                  }
                                >
                                  {attempt.isAnnounced ? (
                                    <>
                                      <CheckCircle2 className="h-3 w-3" />
                                      <span>Announced</span>
                                    </>
                                  ) : (
                                    <>
                                      <Megaphone className="h-3 w-3" />
                                      <span>Announce</span>
                                    </>
                                  )}
                                </button>

                                {/* View Audit Details */}
                                <button
                                  type="button"
                                  onClick={() => handleViewDetails(attempt._id)}
                                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-ulm-purple transition cursor-pointer"
                                  title="View Detailed Question Audit"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteAttempt(attempt._id, attempt.studentName)
                                  }
                                  className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                                  title="Delete Attempt Record"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            AUDIT DETAIL MODAL (Admin-only question & answer review)
           ========================================================================= */}
        {detailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-ulm-dark">
                    Attempt Audit: {selectedAttempt?.studentName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedAttempt?.semester} · {selectedAttempt?.questionCount} Questions ·{' '}
                    Score: {selectedAttempt?.score?.correct}/{selectedAttempt?.questionCount} (
                    {selectedAttempt?.score?.total > 0
                      ? Math.round(
                          (selectedAttempt.score.correct / selectedAttempt.score.total) * 100,
                        )
                      : 0}
                    %)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailModalOpen(false)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {detailLoading ? (
                  <div className="py-12 text-center text-gray-500">
                    <RefreshCw className="mx-auto h-6 w-6 animate-spin text-ulm-purple mb-2" />
                    <span>Loading attempt audit details...</span>
                  </div>
                ) : selectedAttempt?.questions?.length > 0 ? (
                  selectedAttempt.questions.map((q, idx) => {
                    const isAnswered = q.isAnswered
                    const isCorrect = q.isCorrect
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border p-4 text-xs sm:text-sm ${
                          !isAnswered || !q.studentAnswer
                            ? 'border-amber-200 bg-amber-50/50'
                            : isCorrect
                              ? 'border-green-200 bg-green-50/40'
                              : 'border-red-200 bg-red-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-bold text-ulm-purple">
                            Question {idx + 1}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                              !isAnswered || !q.studentAnswer
                                ? 'bg-amber-100 text-amber-800'
                                : isCorrect
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {!isAnswered || !q.studentAnswer
                              ? 'Unanswered / Timeout'
                              : isCorrect
                                ? 'Correct'
                                : 'Incorrect'}
                          </span>
                        </div>

                        <p className="font-medium text-ulm-dark mb-3">{q.question}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                          {q.options?.map((opt) => {
                            const isChosen = q.studentAnswer === opt.id
                            const isAnswerKey = q.correctAnswer === opt.id
                            return (
                              <div
                                key={opt.id}
                                className={`rounded-lg border p-2 text-xs flex items-start gap-2 ${
                                  isAnswerKey
                                    ? 'border-green-400 bg-green-100/70 font-semibold text-green-900'
                                    : isChosen
                                      ? 'border-red-400 bg-red-100/70 text-red-900'
                                      : 'border-gray-200 bg-white text-gray-600'
                                }`}
                              >
                                <span className="font-bold">{opt.id}.</span>
                                <span className="flex-1">{opt.text}</span>
                                {isAnswerKey && (
                                  <span className="text-green-700 font-bold">✓ Key</span>
                                )}
                                {isChosen && !isAnswerKey && (
                                  <span className="text-red-700 font-bold">✗ Student</span>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {q.explanation && (
                          <p className="text-xs text-gray-500 italic">
                            Explanation: {q.explanation}
                          </p>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <p className="text-center text-gray-500">No question details available.</p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 px-6 py-3 text-right">
                <button
                  type="button"
                  onClick={() => setDetailModalOpen(false)}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
