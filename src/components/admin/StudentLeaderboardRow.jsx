import { Trash2 } from 'lucide-react'
import {
  accuracyToneClass,
  formatRank,
  formatShortDate,
  rankBadgeClass,
} from '../../utils/adminFormatters'

/**
 * One leaderboard student row in the admin student table.
 */
export default function StudentLeaderboardRow({ student, onRequestDelete }) {
  const initial = (student.fullName || '?').charAt(0).toUpperCase()

  return (
    <tr className="transition-colors hover:bg-ulm-lavender/10">
      <td className="whitespace-nowrap px-4 py-3.5 text-center">
        <span
          className={`inline-flex min-w-[44px] items-center justify-center rounded-lg px-2 py-1 text-xs font-bold ${rankBadgeClass(student.rank)}`}
        >
          {formatRank(student.rank)}
        </span>
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ulm-lavender text-xs font-bold text-ulm-purple">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-ulm-dark">
              {student.fullName}
            </p>
            <p className="truncate text-xs text-gray-500">{student.email}</p>
          </div>
        </div>
      </td>

      <td className="hidden max-w-[200px] px-3 py-3.5 sm:table-cell">
        <p className="truncate text-xs text-gray-600">{student.university}</p>
      </td>

      <td className="hidden px-3 py-3.5 text-center text-sm font-bold text-ulm-dark md:table-cell">
        {student.totalQuizzes}
      </td>

      <td className="px-3 py-3.5 text-center">
        <span
          className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-bold ${accuracyToneClass(student.accuracy)}`}
        >
          {student.accuracy}%
        </span>
      </td>

      <td className="hidden whitespace-nowrap px-3 py-3.5 text-xs lg:table-cell">
        <span className="font-semibold text-green-700">{student.totalCorrect}</span>
        <span className="text-gray-400"> / </span>
        <span className="font-semibold text-red-600">{student.totalIncorrect}</span>
      </td>

      <td className="hidden whitespace-nowrap px-3 py-3.5 text-xs text-gray-500 xl:table-cell">
        {formatShortDate(student.createdAt)}
      </td>

      <td className="px-4 py-3.5 text-right">
        <button
          type="button"
          onClick={() => onRequestDelete(student)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
          title={`Remove ${student.fullName} from the leaderboard`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </td>
    </tr>
  )
}
