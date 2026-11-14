import { Award, BarChart3, CheckCircle2, RefreshCw, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useQuiz } from '../context/QuizContext'
import { submitQuizAttempt } from '../services/studentService'

export default function Result() {
  const navigate = useNavigate()
  const { isAuthenticated, refreshStudent } = useAuth()
  const { scoreSummary, quizMeta, questions, answers, retrySameQuiz, resetQuizSession } = useQuiz()

  const submittedRef = useRef(false)
  const [scoreSaved, setScoreSaved] = useState(false)

  useEffect(() => {
    if (submittedRef.current || questions.length === 0 || !isAuthenticated) return
    submittedRef.current = true

    submitQuizAttempt({
      quizType: quizMeta?.source === 'database' ? 'database' : 'ai',
      subject: quizMeta?.competencyArea || 'Practice Quiz',
      questions: questions.map((q) => ({ id: q.id, correctAnswer: q.correctAnswer })),
      userAnswers: answers || {},
    })
      .then(() => {
        setScoreSaved(true)
        refreshStudent()
      })
      .catch((err) => {
        console.error('Failed to save score:', err)
      })
  }, [questions, answers, quizMeta, isAuthenticated, refreshStudent])

  if (questions.length === 0) {
    return <Navigate to="/quiz/setup" replace />
  }

  const { correct, wrong, unattempted, total, percentage } = scoreSummary

  const handleRetry = () => {
    submittedRef.current = false
    setScoreSaved(false)
    retrySameQuiz()
  }

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

          {scoreSaved && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl border border-green-200 bg-green-50/70 p-3.5 text-xs sm:text-sm text-green-900">
              <span className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                Score added to your global leaderboard profile!
              </span>
              <div className="flex items-center gap-3">
                <Link
                  to="/leaderboard"
                  className="font-bold text-ulm-purple hover:underline flex items-center gap-1"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Leaderboard
                </Link>
                <Link
                  to="/dashboard"
                  className="font-bold text-ulm-purple hover:underline"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center pt-2">
            <Link
              to="/quiz"
              onClick={handleRetry}
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
