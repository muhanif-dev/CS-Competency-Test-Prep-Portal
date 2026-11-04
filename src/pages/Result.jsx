import { Award, RefreshCw, RotateCcw } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function Result() {
  const navigate = useNavigate()
  const { scoreSummary, quizMeta, questions, retrySameQuiz, resetQuizSession } = useQuiz()

  if (questions.length === 0) {
    return <Navigate to="/quiz/setup" replace />
  }

  const { correct, wrong, unattempted, total, percentage } = scoreSummary

  const handleGenerateNewQuiz = () => {
    const destination = quizMeta?.source === 'database' ? '/quiz/db?fresh=1' : '/quiz/ai?fresh=1'
    resetQuizSession()
    navigate(destination)
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-14">
      <div className="overflow-hidden rounded-2xl border border-ulm-lavender bg-white shadow-md">
        <div className="bg-gradient-to-r from-ulm-purple to-ulm-purple-dark px-4 py-6 sm:px-6 sm:py-8 text-center text-white">
          <Award className="mx-auto h-10 w-10 text-ulm-gold" aria-hidden />
          <h1 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight">Quiz Completed</h1>
          {quizMeta && (
            <p className="mt-1.5 text-xs sm:text-sm text-white/90">
              {quizMeta.competencyArea}
              {quizMeta.topic ? ` · ${quizMeta.topic}` : ''}
            </p>
          )}
        </div>

        <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Overall Score</p>
            <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-ulm-dark">
              {correct} <span className="text-xl sm:text-2xl font-semibold text-gray-400">/ {total}</span>
            </p>
            <p className="mt-1 text-base sm:text-lg font-bold text-ulm-purple">{percentage}% Score</p>
          </div>

          <dl className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="rounded-xl bg-green-50 p-2.5 sm:py-3.5 border border-green-200/60">
              <dt className="text-[11px] sm:text-xs font-semibold text-green-800 uppercase tracking-wide truncate">Correct</dt>
              <dd className="mt-1 text-lg sm:text-2xl font-extrabold text-green-700">{correct}</dd>
            </div>
            <div className="rounded-xl bg-red-50 p-2.5 sm:py-3.5 border border-red-200/60">
              <dt className="text-[11px] sm:text-xs font-semibold text-red-800 uppercase tracking-wide truncate">Wrong</dt>
              <dd className="mt-1 text-lg sm:text-2xl font-extrabold text-red-700">{wrong}</dd>
            </div>
            <div className="rounded-xl bg-gray-50 p-2.5 sm:py-3.5 border border-gray-200/60">
              <dt className="text-[11px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide truncate">Unattempted</dt>
              <dd className="mt-1 text-lg sm:text-2xl font-extrabold text-gray-700">{unattempted}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center pt-2">
            <Link
              to="/quiz"
              onClick={() => retrySameQuiz()}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-ulm-purple px-4 py-2.5 text-xs sm:text-sm font-semibold text-ulm-purple hover:bg-ulm-lavender/50 transition"
            >
              <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
              <span>Try Again</span>
            </Link>
            <button
              type="button"
              onClick={handleGenerateNewQuiz}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-ulm-purple px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-ulm-purple-dark transition shadow-xs"
            >
              <RefreshCw className="h-4 w-4 shrink-0" aria-hidden />
              <span>Generate New Quiz</span>
            </button>
            <Link
              to="/competencies"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-ulm-dark hover:bg-gray-50 transition"
            >
              <span>Back to Subjects</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
