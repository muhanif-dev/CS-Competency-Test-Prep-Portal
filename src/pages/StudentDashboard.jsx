import {
  AlertCircle,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  RefreshCw,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { fetchStudentDashboard } from '../services/studentService'

const QUIZ_TYPE_LABELS = {
  database: 'Database Quiz',
  ai: 'AI Quiz',
  live: 'Live Quiz',
}

const QUIZ_TYPE_COLORS = {
  database: 'bg-blue-50 text-blue-700 border-blue-200/60',
  ai: 'bg-purple-50 text-purple-700 border-purple-200/60',
  live: 'bg-rose-50 text-rose-700 border-rose-200/60',
}

export default function StudentDashboard() {
  const { student, refreshStudent } = useAuth()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchStudentDashboard()
      setData(res)
      await refreshStudent()
    } catch (err) {
      setError(err.message || 'Failed to load dashboard.')
    } finally {
      setLoading(false)
    }
  }, [refreshStudent])

  useEffect(() => {
    load()
  }, [load])

  const info = data?.student
  const attempts = data?.recentAttempts ?? []

  return (
    <>
      <PageHero
        title={`Welcome, ${student?.fullName?.split(' ')[0] ?? 'Student'}`}
        subtitle="Your personal performance dashboard — track your progress and compete on the global leaderboard."
      />

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Loading */}
        {loading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <LoadingSpinner label="Loading your dashboard..." />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <p className="font-semibold text-red-800">{error}</p>
            <button
              onClick={load}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ulm-purple px-4 py-2 text-sm font-semibold text-white hover:bg-ulm-purple-dark transition"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && info && (
          <>
            {/* Profile + Rank Card */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-ulm-lavender bg-white shadow-xs">
              <div className="bg-gradient-to-r from-ulm-purple to-ulm-purple-dark px-5 py-6 sm:px-8 sm:py-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-xl font-extrabold text-white">
                      {info.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{info.fullName}</h2>
                      <p className="text-sm text-white/80 flex items-center gap-1.5 mt-0.5">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {info.university}
                      </p>
                      <p className="text-xs text-white/60 mt-0.5">{info.email}</p>
                    </div>
                  </div>

                  {/* Global Rank */}
                  <div className="flex items-center gap-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-4">
                    <Trophy className="h-8 w-8 text-ulm-gold shrink-0" />
                    <div>
                      <p className="text-xs text-white/70 font-medium uppercase tracking-wide">Global Rank</p>
                      <p className="text-3xl font-extrabold text-white leading-none">
                        #{info.rank}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 sm:grid-cols-4 sm:divide-y-0">
                <StatCell
                  icon={CheckCircle2}
                  iconColor="text-green-500"
                  label="Correct Answers"
                  value={info.totalCorrect}
                  highlight
                />
                <StatCell
                  icon={XCircle}
                  iconColor="text-red-500"
                  label="Incorrect Answers"
                  value={info.totalIncorrect}
                />
                <StatCell
                  icon={BookOpen}
                  iconColor="text-ulm-purple"
                  label="Total Quizzes"
                  value={info.totalQuizzes}
                />
                <StatCell
                  icon={Target}
                  iconColor="text-amber-500"
                  label="Overall Accuracy"
                  value={`${info.accuracy}%`}
                />
              </div>
            </div>

            {/* Accuracy bar */}
            <div className="mb-6 rounded-2xl border border-ulm-lavender bg-white p-5 sm:p-6 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-ulm-purple" />
                  <span className="text-sm font-semibold text-ulm-dark">Overall Performance</span>
                </div>
                <span className="text-sm font-bold text-ulm-purple">{info.accuracy}% accuracy</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    info.accuracy >= 70
                      ? 'bg-green-500'
                      : info.accuracy >= 50
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${info.accuracy}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{info.totalCorrect} correct out of {info.totalAttempted} attempted</span>
                <Link
                  to="/leaderboard"
                  className="font-semibold text-ulm-purple hover:underline flex items-center gap-1"
                >
                  <Award className="h-3.5 w-3.5" />
                  View Leaderboard
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-ulm-lavender bg-white shadow-xs overflow-hidden">
              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-ulm-purple" />
                  <h3 className="text-sm font-bold text-ulm-dark">Recent Quiz Activity</h3>
                  <span className="ml-auto text-xs text-gray-400">Last 10 quizzes</span>
                </div>
              </div>

              {attempts.length === 0 ? (
                <div className="p-10 text-center">
                  <BookOpen className="mx-auto mb-3 h-10 w-10 text-gray-200" />
                  <p className="text-sm font-semibold text-gray-500">No quizzes yet</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Complete a quiz to see your history here.
                  </p>
                  <Link
                    to="/practice/setup"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ulm-purple px-4 py-2 text-sm font-semibold text-white hover:bg-ulm-purple-dark transition"
                  >
                    Start a Quiz
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/60 text-xs font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Subject</th>
                        <th className="px-4 py-3 text-center">Correct</th>
                        <th className="hidden px-4 py-3 text-center sm:table-cell">Incorrect</th>
                        <th className="px-4 py-3 text-center">Total</th>
                        <th className="hidden px-4 py-3 text-center md:table-cell">Accuracy</th>
                        <th className="hidden px-4 py-3 text-right lg:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {attempts.map((a) => (
                        <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                QUIZ_TYPE_COLORS[a.quizType] ?? 'bg-gray-100 text-gray-700 border-gray-200'
                              }`}
                            >
                              {QUIZ_TYPE_LABELS[a.quizType] ?? a.quizType}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-xs text-gray-700 max-w-[160px]">
                            <p className="truncate">{a.subject}</p>
                          </td>
                          <td className="px-4 py-3.5 text-center font-bold text-green-700">{a.correctAnswers}</td>
                          <td className="hidden px-4 py-3.5 text-center font-medium text-red-600 sm:table-cell">{a.incorrectAnswers}</td>
                          <td className="px-4 py-3.5 text-center text-gray-600">{a.totalQuestions}</td>
                          <td className="hidden px-4 py-3.5 text-center md:table-cell">
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${
                                a.accuracy >= 70
                                  ? 'bg-green-50 text-green-700'
                                  : a.accuracy >= 50
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {a.accuracy}%
                            </span>
                          </td>
                          <td className="hidden px-4 py-3.5 text-right text-xs text-gray-400 lg:table-cell">
                            {new Date(a.completedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  )
}

function StatCell({ icon: Icon, iconColor, label, value, highlight }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 px-4 py-5 text-center ${highlight ? 'bg-green-50/40' : ''}`}>
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <p className={`text-2xl font-extrabold ${highlight ? 'text-green-700' : 'text-ulm-dark'}`}>
        {value}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
