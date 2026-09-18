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
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 rounded-lg bg-ulm-lavender/40 px-4 py-2 text-sm text-ulm-dark">
        <span className="font-medium">{quizMeta?.competencyArea}</span>
        <span className="text-gray-500"> · </span>
        <span>{quizMeta?.topic}</span>
      </div>

      <ProgressBar current={currentIndex + 1} total={total} />

      <div className="mt-8 rounded-xl border border-ulm-lavender bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-ulm-purple">
          Question {currentIndex + 1} of {total}
        </p>
        <h2 className="mt-3 text-lg font-semibold leading-relaxed text-ulm-dark sm:text-xl">
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
            className={`mt-6 rounded-lg border px-4 py-4 ${
              isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden />
                  <span className="text-green-800">Correct Answer</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" aria-hidden />
                  <span className="text-red-800">
                    Incorrect — correct answer is {question.correctAnswer}
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-medium">Explanation: </span>
              {question.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {selected !== undefined && (
            <p className="text-sm text-gray-600">
              Your answer: <span className="font-semibold text-ulm-dark">{selected}</span>
            </p>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isRevealed}
            className="ml-auto rounded-lg bg-ulm-purple px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-ulm-purple-dark"
          >
            {isLast ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link to="/quiz/setup" className="text-ulm-purple hover:underline">
          Exit to setup
        </Link>
      </p>
    </section>
  )
}
