import { CheckCircle2, XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import QuizOption from '../components/QuizOption'
import { useQuiz } from '../context/QuizContext'

export default function QuizPage() {
  const navigate = useNavigate()
  const {
    questions,
    quizMeta,
    currentIndex,
    answers,
    revealed,
    completed,
    selectAnswer,
    goToNext,
    persistResult,
  } = useQuiz()

  useEffect(() => {
    if (completed && questions.length > 0) {
      persistResult()
      navigate('/result', { replace: true })
    }
  }, [completed, questions.length, persistResult, navigate])

  if (questions.length === 0) {
    return <Navigate to="/quiz/setup" replace />
  }

  const question = questions[currentIndex]
  const total = questions.length
  const selected = answers[question.id]
  const isRevealed = Boolean(revealed[question.id])
  const isLast = currentIndex === total - 1
  const isCorrect = selected === question.correctAnswer

  const handleNext = () => {
    if (!isRevealed) return
    goToNext()
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Quiz Metadata Bar */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl bg-ulm-lavender/40 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm text-ulm-dark">
        <div className="min-w-0">
          <span className="font-bold text-ulm-purple">{quizMeta?.competencyArea}</span>
          {quizMeta?.topic && (
            <>
              <span className="text-gray-400"> · </span>
              <span className="text-gray-600 truncate">{quizMeta.topic}</span>
            </>
          )}
        </div>
        {question?.competencyName && (
          <span className="inline-flex self-start sm:self-auto items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-ulm-purple border border-ulm-purple/20 shadow-2xs">
            {question.competencyName}
          </span>
        )}
      </div>

      <ProgressBar current={currentIndex + 1} total={total} />

      <div className="mt-6 sm:mt-8 rounded-2xl border border-ulm-lavender bg-white p-4 sm:p-7 shadow-xs">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-ulm-purple">
          Question {currentIndex + 1} of {total}
        </p>
        <h2 className="mt-3 text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-ulm-dark break-words">
          {question.question}
        </h2>

        <div className="mt-6 space-y-3">
          {question.options.map((opt) => (
            <QuizOption
              key={opt.id}
              option={opt}
              selected={selected}
              revealed={isRevealed}
              correctAnswer={question.correctAnswer}
              onSelect={(id) => selectAnswer(question.id, id)}
              disabled={isRevealed}
            />
          ))}
        </div>

        {isRevealed && (
          <div
            className={`mt-6 rounded-xl border p-4 sm:p-5 ${
              isCorrect ? 'border-green-300 bg-green-50/90' : 'border-red-300 bg-red-50/90'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" aria-hidden />
                  <span className="text-green-800">Correct Answer</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
                  <span className="text-red-800">
                    Incorrect — correct answer is {question.correctAnswer}
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Explanation: </span>
              {question.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          {selected !== undefined && (
            <p className="text-xs sm:text-sm text-gray-600">
              Selected answer: <span className="font-bold text-ulm-dark">{selected}</span>
            </p>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isRevealed}
            className="w-full sm:w-auto sm:ml-auto rounded-lg bg-ulm-purple px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-ulm-purple-dark transition active:scale-[0.99]"
          >
            {isLast ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>

      <p className="mt-5 text-center text-xs sm:text-sm">
        <Link to="/quiz/setup" className="text-ulm-purple hover:underline">
          Exit to setup
        </Link>
      </p>
    </section>
  )
}
