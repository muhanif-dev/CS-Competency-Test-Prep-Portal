function getPercentage(attempt) {
  if (Number.isFinite(attempt.percentage)) {
    return Math.min(100, Math.max(0, attempt.percentage))
  }
  if (attempt.score?.total > 0) {
    return Math.round((attempt.score.correct / attempt.score.total) * 100)
  }
  return 0
}

function getCompletionTime(attempt) {
  const timestamp = Date.parse(attempt.completedAt || attempt.createdAt || '')
  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp
}

export function getTopCompletedAttempts(attempts, limit = 3) {
  return attempts
    .filter((attempt) => attempt.status === 'completed')
    .map((attempt) => ({ ...attempt, rankingPercentage: getPercentage(attempt) }))
    .sort(
      (left, right) =>
        right.rankingPercentage - left.rankingPercentage ||
        (right.score?.correct || 0) - (left.score?.correct || 0) ||
        getCompletionTime(left) - getCompletionTime(right) ||
        String(left.studentName).localeCompare(String(right.studentName)),
    )
    .slice(0, limit)
}
