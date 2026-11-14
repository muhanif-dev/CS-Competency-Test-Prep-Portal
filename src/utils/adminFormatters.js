/**
 * Shared formatting helpers for the admin panel.
 * Kept free of React so they stay trivially testable.
 */

const RANK_SUFFIXES = {
  1: 'st',
  2: 'nd',
  3: 'rd',
}

export function formatRank(rank) {
  const value = Number(rank)
  if (!Number.isFinite(value) || value <= 0) return '—'

  const lastTwo = value % 100
  if (lastTwo >= 11 && lastTwo <= 13) return `${value}th`

  const lastDigit = value % 10
  return `${value}${RANK_SUFFIXES[lastDigit] || 'th'}`
}

export function formatShortDate(dateValue) {
  if (!dateValue) return '—'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateTime(dateValue) {
  if (!dateValue) return 'In Progress'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'In Progress'
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function accuracyToneClass(accuracy) {
  const value = Number(accuracy) || 0
  if (value >= 70) return 'bg-emerald-50 text-emerald-800 border-emerald-300'
  if (value >= 50) return 'bg-ulm-lavender/70 text-ulm-purple border-ulm-purple/20'
  return 'bg-rose-50 text-rose-800 border-rose-300'
}

export function scoreToneClass(percentage) {
  const value = Number(percentage) || 0
  return value >= 50
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800'
}

export function rankBadgeClass(rank) {
  if (rank === 1) return 'bg-ulm-gold text-white shadow-xs'
  if (rank === 2) return 'bg-ulm-purple/80 text-white shadow-xs'
  if (rank === 3) return 'bg-white text-ulm-purple border border-ulm-purple/40 shadow-xs'
  return 'bg-ulm-lavender/40 text-ulm-dark border border-ulm-lavender'
}
