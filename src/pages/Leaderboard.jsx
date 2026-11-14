import {
  AlertCircle,
  Award,
  BarChart3,
  RefreshCw,
  Users,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { fetchLeaderboard } from '../services/studentService'

function formatRank(rank) {
  if (rank === 1) return '1st'
  if (rank === 2) return '2nd'
  if (rank === 3) return '3rd'
  const j = rank % 10
  const k = rank % 100
  if (j === 1 && k !== 11) return `${rank}st`
  if (j === 2 && k !== 12) return `${rank}nd`
  if (j === 3 && k !== 13) return `${rank}rd`
  return `${rank}th`
}

export default function Leaderboard() {
  const { student } = useAuth()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async (p = 1) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchLeaderboard(p, 50)
      setData(res)
      setPage(p)
    } catch (err) {
      setError(err.message || 'Failed to load leaderboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(1)
  }, [load])

  const leaderboard = data?.leaderboard ?? []
  const pagination = data?.pagination

  // Find current student's position in the loaded page
  const myEntry = student
    ? leaderboard.find((e) => String(e._id) === String(student._id))
    : null

  return (
    <>
      <PageHero
        title="Global Leaderboard"
        subtitle="Global student performance rankings across Database, AI-Generated, and Live Quizzes."
      />

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Top 3 Podium */}
        {!loading && !error && leaderboard.length >= 3 && page === 1 && (
          <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-5">
            {/* 2nd Place */}
            <PodiumCard entry={leaderboard[1]} place={2} isMe={myEntry?.rank === 2} />
            {/* 1st Place */}
            <PodiumCard entry={leaderboard[0]} place={1} isMe={myEntry?.rank === 1} />
            {/* 3rd Place */}
            <PodiumCard entry={leaderboard[2]} place={3} isMe={myEntry?.rank === 3} />
          </div>
        )}

        {/* My rank banner (when logged in and not in top 3) */}
        {student && myEntry && myEntry.rank > 3 && (
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-ulm-purple/30 bg-ulm-lavender/60 px-5 py-4 shadow-xs">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ulm-purple text-white font-extrabold text-sm shadow-xs">
              {formatRank(myEntry.rank)}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-ulm-dark text-sm sm:text-base truncate">
                Your Position: {formatRank(myEntry.rank)}
              </p>
              <p className="text-xs text-ulm-purple-dark truncate">
                {myEntry.totalQuizzes} quizzes completed · {myEntry.accuracy}% accuracy
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <LoadingSpinner label="Loading leaderboard..." />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <p className="font-semibold text-red-800">{error}</p>
            <button
              onClick={() => load(page)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ulm-purple px-4 py-2 text-sm font-semibold text-white hover:bg-ulm-purple-dark transition"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && leaderboard.length === 0 && (
          <div className="rounded-2xl border border-ulm-lavender bg-white p-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h2 className="text-lg font-bold text-ulm-dark">No Rankings Yet</h2>
            <p className="mt-2 text-sm text-gray-500">
              Be the first to complete a quiz and claim the top spot!
            </p>
          </div>
        )}

        {/* Leaderboard Table */}
        {!loading && !error && leaderboard.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-ulm-lavender bg-white shadow-xs">
            {/* Table Header */}
            <div className="border-b border-ulm-lavender bg-ulm-lavender/40 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-ulm-purple" />
                <span className="text-xs font-bold uppercase tracking-wider text-ulm-dark">
                  Rankings — Page {page} of {pagination?.totalPages ?? 1}
                </span>
                <span className="ml-auto text-xs font-medium text-gray-500">
                  {pagination?.total ?? 0} students
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ulm-lavender/60 bg-ulm-lavender/20 text-xs font-bold uppercase tracking-wide text-ulm-dark">
                    <th className="px-4 py-3.5 text-center w-20">Rank</th>
                    <th className="px-4 py-3.5 text-left">Student</th>
                    <th className="hidden px-4 py-3.5 text-left sm:table-cell">University</th>
                    <th className="px-4 py-3.5 text-center">Quizzes</th>
                    <th className="px-4 py-3.5 text-center">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ulm-lavender/40">
                  {leaderboard.map((entry) => {
                    const isMe = student && String(entry._id) === String(student._id)
                    const rankStr = formatRank(entry.rank)

                    // Color of record strictly aligned with website theme:
                    // 1st: Prestigious Gold (ulm-gold / #c9a227)
                    // 2nd: Lavender-Purple Accent (ulm-lavender / ulm-purple)
                    // 3rd: Soft Lavender Tint (ulm-lavender/25)
                    // Currently logged-in: Brand Highlight (ulm-lavender/80 + ulm-purple border)
                    // Other: Crisp White
                    let rowBgClass = 'bg-white hover:bg-ulm-lavender/10 text-ulm-dark'
                    let badgeClass = 'bg-ulm-lavender/40 text-ulm-dark font-semibold border border-ulm-lavender'
                    let avatarBg = 'bg-ulm-lavender text-ulm-purple'

                    if (entry.rank === 1) {
                      rowBgClass = isMe
                        ? 'bg-ulm-gold/15 border-l-4 border-l-ulm-purple ring-2 ring-inset ring-ulm-purple/40 text-ulm-dark font-semibold'
                        : 'bg-ulm-gold/10 hover:bg-ulm-gold/15 border-l-4 border-l-ulm-gold text-ulm-dark font-medium'
                      badgeClass = 'bg-ulm-gold text-white font-black shadow-xs'
                      avatarBg = 'bg-ulm-gold text-white shadow-xs'
                    } else if (entry.rank === 2) {
                      rowBgClass = isMe
                        ? 'bg-ulm-lavender/50 border-l-4 border-l-ulm-purple ring-2 ring-inset ring-ulm-purple/40 text-ulm-dark font-semibold'
                        : 'bg-ulm-lavender/40 hover:bg-ulm-lavender/60 border-l-4 border-l-ulm-purple/50 text-ulm-dark font-medium'
                      badgeClass = 'bg-ulm-purple/80 text-white font-extrabold shadow-xs'
                      avatarBg = 'bg-ulm-purple/80 text-white shadow-xs'
                    } else if (entry.rank === 3) {
                      rowBgClass = isMe
                        ? 'bg-ulm-lavender/35 border-l-4 border-l-ulm-purple ring-2 ring-inset ring-ulm-purple/40 text-ulm-dark font-semibold'
                        : 'bg-ulm-lavender/20 hover:bg-ulm-lavender/35 border-l-4 border-l-ulm-purple/30 text-ulm-dark font-medium'
                      badgeClass = 'bg-white text-ulm-purple font-bold border border-ulm-purple/40 shadow-xs'
                      avatarBg = 'bg-ulm-purple/20 text-ulm-purple'
                    } else if (isMe) {
                      rowBgClass = 'bg-ulm-lavender/80 hover:bg-ulm-lavender border-l-4 border-l-ulm-purple ring-2 ring-inset ring-ulm-purple/30 text-ulm-dark font-bold'
                      badgeClass = 'bg-ulm-purple text-white font-extrabold shadow-xs'
                      avatarBg = 'bg-ulm-purple text-white shadow-xs'
                    }

                    return (
                      <tr key={entry._id} className={`transition-colors ${rowBgClass}`}>
                        {/* Rank (1st, 2nd, 3rd text, no icon) */}
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex min-w-[44px] px-2.5 py-1 items-center justify-center rounded-lg text-xs tracking-tight ${badgeClass}`}
                          >
                            {rankStr}
                          </span>
                        </td>

                        {/* Student Name */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarBg}`}
                            >
                              {entry.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold leading-tight text-ulm-dark">
                                {entry.fullName}
                                {isMe && (
                                  <span className="ml-1.5 inline-flex items-center rounded-full bg-ulm-purple px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                                    You
                                  </span>
                                )}
                              </p>
                              <p className="sm:hidden text-xs text-gray-500 truncate max-w-[130px] mt-0.5">
                                {entry.university}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* University */}
                        <td className="hidden px-4 py-4 text-sm text-gray-600 sm:table-cell max-w-[220px]">
                          <p className="truncate">{entry.university}</p>
                        </td>

                        {/* Quizzes Completed */}
                        <td className="px-4 py-4 text-center text-sm font-bold text-ulm-dark">
                          {entry.totalQuizzes}
                        </td>

                        {/* Accuracy */}
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                              entry.accuracy >= 70
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : entry.accuracy >= 50
                                ? 'bg-ulm-lavender/70 text-ulm-purple border-ulm-purple/20'
                                : 'bg-rose-50 text-rose-800 border-rose-300'
                            }`}
                          >
                            {entry.accuracy}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-ulm-lavender px-5 py-4">
                <button
                  onClick={() => load(page - 1)}
                  disabled={page <= 1 || loading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-ulm-dark hover:bg-ulm-lavender/50 disabled:opacity-40 transition"
                >
                  Previous
                </button>
                <span className="text-xs text-gray-500">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => load(page + 1)}
                  disabled={page >= pagination.totalPages || loading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-ulm-dark hover:bg-ulm-lavender/50 disabled:opacity-40 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Not-logged-in CTA */}
        {!student && (
          <div className="mt-8 rounded-2xl border border-ulm-lavender bg-ulm-lavender/30 p-6 text-center">
            <Award className="mx-auto mb-3 h-8 w-8 text-ulm-purple" />
            <h3 className="font-bold text-ulm-dark">Want to appear on the leaderboard?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Create a free account and start competing today.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-ulm-purple px-5 py-2.5 text-sm font-semibold text-white hover:bg-ulm-purple-dark transition"
              >
                Create Account
              </a>
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-ulm-purple/40 px-5 py-2.5 text-sm font-semibold text-ulm-purple hover:bg-ulm-lavender transition"
              >
                Log In
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

function PodiumCard({ entry, place, isMe }) {
  if (!entry) return null
  const heights = { 1: 'pt-0', 2: 'pt-6', 3: 'pt-10' }
  const podiumStyles = {
    1: {
      cardBg: 'bg-ulm-gold/10 border-2 border-ulm-gold/40 shadow-xs',
      badgeBg: 'bg-ulm-gold text-white',
      accentColor: 'text-ulm-gold',
    },
    2: {
      cardBg: 'bg-ulm-lavender/50 border-2 border-ulm-purple/30 shadow-xs',
      badgeBg: 'bg-ulm-purple text-white',
      accentColor: 'text-ulm-purple',
    },
    3: {
      cardBg: 'bg-ulm-lavender/25 border-2 border-ulm-purple/20 shadow-xs',
      badgeBg: 'bg-ulm-purple/70 text-white',
      accentColor: 'text-ulm-purple-dark',
    },
  }

  const style = podiumStyles[place]
  const rankStr = formatRank(place)

  return (
    <div className={`flex flex-col items-center ${heights[place]}`}>
      <div
        className={`w-full rounded-2xl border p-3 sm:p-5 text-center transition-all ${
          isMe ? 'ring-2 ring-ulm-purple' : ''
        } ${style.cardBg}`}
      >
        <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-ulm-lavender">
          <span className={`text-base sm:text-xl font-black ${style.accentColor}`}>{rankStr}</span>
        </div>
        <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-wide">Position {place}</p>
        <p className="mt-1 text-sm sm:text-base font-bold text-ulm-dark leading-tight break-words">
          {entry.fullName}
          {isMe && (
            <span className="ml-1 inline-flex items-center rounded-full bg-ulm-purple px-1.5 py-0.5 text-[9px] font-bold text-white">
              You
            </span>
          )}
        </p>
        <p className="hidden sm:block mt-0.5 text-xs text-gray-500 truncate">{entry.university}</p>
        <p className={`mt-2.5 text-lg sm:text-2xl font-black ${style.accentColor}`}>{entry.totalQuizzes}</p>
        <p className="text-xs text-gray-600 font-medium">quizzes completed</p>
        <div className="mt-1.5">
          <span className="inline-flex rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold text-ulm-dark border border-ulm-lavender">
            {entry.accuracy}% accuracy
          </span>
        </div>
      </div>
    </div>
  )
}
