import { AlertCircle, RefreshCw, Search, Trophy, Users, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { deleteAdminStudent, getAdminStudents } from '../../services/adminService'
import DeleteStudentModal from './DeleteStudentModal'
import StudentLeaderboardRow from './StudentLeaderboardRow'

function matchesSearch(student, term) {
  if (!term) return true
  return [student.fullName, student.email, student.university].some((field) =>
    String(field ?? '').toLowerCase().includes(term),
  )
}

/**
 * Admin view of the leaderboard student database: every student with their
 * details, instant search by name/email/university, and permanent removal.
 */
export default function AdminStudentsPanel({
  refreshKey = 0,
  onNotify,
  onError,
  onCountChange,
}) {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [studentToDelete, setStudentToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadStudents = useCallback(async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const data = await getAdminStudents()
      setStudents(data)
    } catch (err) {
      setLoadError(err.message || 'Failed to load students.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStudents()
  }, [loadStudents, refreshKey])

  useEffect(() => {
    if (onCountChange) onCountChange(students.length)
  }, [students.length, onCountChange])

  const normalizedTerm = searchTerm.trim().toLowerCase()

  const visibleStudents = useMemo(
    () => students.filter((student) => matchesSearch(student, normalizedTerm)),
    [students, normalizedTerm],
  )

  const summary = useMemo(() => {
    const total = students.length
    const averageAccuracy = total
      ? Math.round(
          students.reduce((sum, student) => sum + (student.accuracy || 0), 0) / total,
        )
      : 0
    const activeStudents = students.filter(
      (student) => (student.totalQuizzes || 0) > 0,
    ).length
    return { total, averageAccuracy, activeStudents, topScorer: students[0] || null }
  }, [students])

  async function handleConfirmDelete() {
    if (!studentToDelete) return
    setIsDeleting(true)
    try {
      const result = await deleteAdminStudent(studentToDelete._id)
      const removedName = studentToDelete.fullName
      setStudentToDelete(null)
      if (onNotify) {
        onNotify(
          result.message ||
            `"${removedName}" has been removed from the leaderboard.`,
        )
      }
      await loadStudents()
    } catch (err) {
      setStudentToDelete(null)
      if (onError) onError(err.message || 'Failed to remove student.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-gray-500">Leaderboard Students</p>
          <p className="mt-1 text-2xl font-extrabold text-ulm-dark sm:text-3xl">
            {summary.total}
          </p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-blue-700">With Quiz Scores</p>
          <p className="mt-1 text-2xl font-extrabold text-blue-900 sm:text-3xl">
            {summary.activeStudents}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-emerald-700">Average Accuracy</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-900 sm:text-3xl">
            {summary.averageAccuracy}%
          </p>
        </div>
        <div className="rounded-2xl border border-ulm-lavender bg-ulm-lavender/30 p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-ulm-purple">Top Ranked</p>
          <p className="mt-1 truncate text-sm font-extrabold text-ulm-dark sm:text-base">
            {summary.topScorer ? summary.topScorer.fullName : 'No students yet'}
          </p>
          {summary.topScorer && (
            <p className="mt-0.5 text-xs text-gray-500">
              {summary.topScorer.totalCorrect} correct · {summary.topScorer.accuracy}%
            </p>
          )}
        </div>
      </div>

      {/* Search toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-ulm-lavender bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search student by name, email or university..."
            aria-label="Search leaderboard students"
            className="w-full rounded-xl border border-gray-300 py-2 pl-9 pr-9 text-xs text-ulm-dark transition focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 sm:text-sm"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
              className="absolute right-2 top-2 cursor-pointer rounded-md p-0.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <span className="whitespace-nowrap text-xs font-medium text-gray-500">
            {normalizedTerm
              ? `${visibleStudents.length} of ${students.length} matched`
              : `${students.length} total`}
          </span>
          <button
            type="button"
            onClick={loadStudents}
            disabled={isLoading}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-ulm-dark transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Load error */}
      {loadError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 sm:text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <span>{loadError}</span>
        </div>
      )}

      {/* Students table */}
      <div className="overflow-hidden rounded-2xl border border-ulm-lavender bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80 font-semibold text-gray-600">
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3">Student</th>
                <th className="hidden px-3 py-3 sm:table-cell">University</th>
                <th className="hidden px-3 py-3 text-center md:table-cell">Quizzes</th>
                <th className="px-3 py-3 text-center">Accuracy</th>
                <th className="hidden px-3 py-3 lg:table-cell">Correct / Wrong</th>
                <th className="hidden px-3 py-3 xl:table-cell">Joined</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    <RefreshCw className="mx-auto mb-2 h-6 w-6 animate-spin text-ulm-purple" />
                    <span>Loading leaderboard students...</span>
                  </td>
                </tr>
              ) : visibleStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-gray-500">
                    {students.length === 0 ? (
                      <>
                        <Users className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="font-semibold text-ulm-dark">No students registered yet</p>
                        <p className="mt-1 text-xs text-gray-400">
                          Students appear here as soon as they create an account.
                        </p>
                      </>
                    ) : (
                      <>
                        <Search className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="font-semibold text-ulm-dark">No student matched</p>
                        <p className="mt-1 text-xs text-gray-400">
                          No name, email or university matches “{searchTerm.trim()}”.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSearchTerm('')}
                          className="mt-3 cursor-pointer rounded-lg border border-ulm-purple/30 bg-ulm-lavender/40 px-3 py-1.5 text-xs font-semibold text-ulm-purple transition hover:bg-ulm-lavender"
                        >
                          Clear search
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ) : (
                visibleStudents.map((student) => (
                  <StudentLeaderboardRow
                    key={student._id}
                    student={student}
                    onRequestDelete={setStudentToDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && visibleStudents.length > 0 && (
          <div className="flex items-center gap-2 border-t border-ulm-lavender bg-ulm-lavender/20 px-4 py-3 text-xs text-gray-600">
            <Trophy className="h-3.5 w-3.5 shrink-0 text-ulm-gold" />
            <span>
              Ranked by total correct answers, then accuracy, then earliest achievement —
              the same order as the public leaderboard.
            </span>
          </div>
        )}
      </div>

      <DeleteStudentModal
        student={studentToDelete}
        isDeleting={isDeleting}
        onClose={() => {
          if (!isDeleting) setStudentToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
