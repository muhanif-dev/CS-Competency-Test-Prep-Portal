import { Check, X } from 'lucide-react'

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
    'border-gray-200 bg-white hover:border-ulm-purple/40 hover:bg-ulm-lavender/20'

  if (revealed) {
    if (isCorrect) {
      stateClasses = 'border-green-400 bg-green-50 ring-1 ring-green-200'
    } else if (isSelected && !isCorrect) {
      stateClasses = 'border-red-400 bg-red-50 ring-1 ring-red-200'
    } else {
      stateClasses = 'border-gray-200 bg-gray-50 opacity-75'
    }
  } else if (isSelected) {
    stateClasses =
      'border-ulm-purple bg-ulm-lavender/50 ring-2 ring-ulm-purple/20'
  }

  return (
    <button
      type="button"
      disabled={disabled || revealed}
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
      className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 focus:ring-offset-1 disabled:cursor-default ${stateClasses}`}
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
          revealed && isCorrect
            ? 'bg-green-600 text-white'
            : revealed && isSelected && !isCorrect
              ? 'bg-red-600 text-white'
              : isSelected
                ? 'bg-ulm-purple text-white'
                : 'bg-ulm-purple/10 text-ulm-purple'
        }`}
      >
        {revealed && isCorrect ? (
          <Check className="h-4 w-4" aria-hidden />
        ) : revealed && isSelected && !isCorrect ? (
          <X className="h-4 w-4" aria-hidden />
        ) : (
          option.id
        )}
      </span>

      <span className="flex-1 pt-1 text-sm leading-6 text-ulm-dark sm:text-base">
        {option.text}
      </span>
    </button>
  )
}