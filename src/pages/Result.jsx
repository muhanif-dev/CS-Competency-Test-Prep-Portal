import { Award, RefreshCw, RotateCcw } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function Result() {
  const { scoreSummary, quizMeta, questions, retrySameQuiz, resetQuizSession } = useQuiz()

  if (questions.length === 0) {
    return <Navigate to="/quiz/setup" replace />
  }

  const { correct, wrong, unattempted, total, percentage } = scoreSummary

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="overflow-hidden rounded-2xl border border-ulm-lavender bg-white shadow-md">
        <div className="bg-gradient-to-r from-ulm-purple to-ulm-purple-dark px-6 py-8 text-center text-white">
          <Award className="mx-auto h-10 w-10 text-ulm-gold" aria-hidden />
          <h1 className="mt-3 text-2xl font-bold">Quiz Completed</h1>
          {quizMeta && (
            <p className="mt-2 text-sm text-white/90">
              {quizMeta.competencyArea} · {quizMeta.topic}
            </p>
          )}
        </div>

        <div className="space-y-6 px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-4xl font-bold text-ulm-dark">
              {correct} / {total}
            </p>
            <p className="mt-2 text-lg font-semibold text-ulm-purple">{percentage}%</p>
          </div>

          <dl className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-green-50 py-3">
              <dt className="text-xs text-gray-600">Correct</dt>
              <dd className="text-xl font-bold text-green-700">{correct}</dd>
            </div>
            <div className="rounded-lg bg-red-50 py-3">
              <dt className="text-xs text-gray-600">Wrong</dt>
              <dd className="text-xl font-bold text-red-700">{wrong}</dd>
            </div>
            <div className="rounded-lg bg-gray-50 py-3">
              <dt className="text-xs text-gray-600">Unattempted</dt>
              <dd className="text-xl font-bold text-gray-700">{unattempted}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              to="/quiz"
              onClick={() => retrySameQuiz()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ulm-purple px-4 py-2.5 text-sm font-semibold text-ulm-purple hover:bg-ulm-lavender"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Try Again
            </Link>
            <Link
              to={quizMeta?.source === 'database' ? '/quiz/db?fresh=1' : '/quiz/ai?fresh=1'}
              onClick={() => resetQuizSession()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ulm-purple px-4 py-2.5 text-sm font-semibold text-white hover:bg-ulm-purple-dark"
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Generate New Quiz
            </Link>
            <Link
              to="/competencies"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-ulm-dark hover:bg-gray-50"
            >
              Back to Subjects
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
