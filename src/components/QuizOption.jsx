export default function QuizOption({
  option,
  selected,
  revealed,
  correctAnswer,
  onSelect,
  disabled,
}) {
  const isCorrect = option.id === correctAnswer
  const isSelected = selected === option.id

  let stateClasses =
    'border-gray-200 bg-white hover:border-ulm-purple/40 hover:bg-ulm-lavender/30'

  if (revealed) {
    if (isCorrect) {
      stateClasses = 'border-green-500 bg-green-50 ring-1 ring-green-200'
    } else if (isSelected && !isCorrect) {
      stateClasses = 'border-red-500 bg-red-50 ring-1 ring-red-200'
    } else {
      stateClasses = 'border-gray-200 bg-gray-50 opacity-80'
    }
  } else if (isSelected) {
    stateClasses = 'border-ulm-purple bg-ulm-lavender/50 ring-1 ring-ulm-purple/30'
  }

  return (
    <button
      type="button"
      disabled={disabled || revealed}
      onClick={() => onSelect(option.id)}
      className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${stateClasses}`}
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ulm-purple/10 text-sm font-bold text-ulm-purple">
        {option.id}
      </span>
      <span className="text-sm text-ulm-dark sm:text-base">{option.text}</span>
    </button>
  )
}
