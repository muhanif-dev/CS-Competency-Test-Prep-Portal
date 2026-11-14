import { AlertTriangle, RefreshCw, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'

/**
 * Confirmation dialog for permanently removing a leaderboard student.
 */
export default function DeleteStudentModal({ student, isDeleting, onClose, onConfirm }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && !isDeleting) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDeleting, onClose])

  if (!student) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-student-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <h3 id="delete-student-title" className="text-base font-bold text-ulm-dark">
                Remove student?
              </h3>
              <p className="text-xs text-gray-500">This action cannot be undone.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          <div className="rounded-xl border border-ulm-lavender bg-ulm-lavender/25 p-3.5">
            <p className="text-sm font-bold text-ulm-dark">{student.fullName}</p>
            <p className="mt-0.5 break-all text-xs text-gray-600">{student.email}</p>
            <p className="mt-1 text-xs text-gray-500">
              {student.university} · Rank {student.rank} · {student.totalQuizzes} quiz
              {student.totalQuizzes === 1 ? '' : 'zes'}
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-gray-600">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
              <span>Their account, email and password are deleted — they cannot log in again.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
              <span>
                Every quiz score record is deleted, so they disappear from the public
                leaderboard immediately.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
              <span>All other students move up one rank automatically.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-xs transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span>{isDeleting ? 'Removing...' : 'Remove permanently'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
