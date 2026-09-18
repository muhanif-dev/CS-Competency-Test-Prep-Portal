export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16" role="status">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-ulm-lavender" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-ulm-purple border-r-ulm-gold" />
      </div>
      <p className="text-center text-sm font-medium text-ulm-dark">{label}</p>
    </div>
  )
}
