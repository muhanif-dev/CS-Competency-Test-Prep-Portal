export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full" aria-label={`Question ${current} of ${total}`}>
      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-ulm-dark">
          Question {current} of {total}
        </span>

        <span className="font-medium text-ulm-purple">{pct}%</span>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-ulm-lavender"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Quiz progress: ${pct}%`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-ulm-purple to-ulm-gold transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}