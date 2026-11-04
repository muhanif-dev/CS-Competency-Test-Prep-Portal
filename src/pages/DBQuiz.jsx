import { AlertCircle, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHero from '../components/PageHero'
import { getCompetencyById } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'
import { generateQuizFromDB } from '../services/dbService'

export default function DBQuiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { settings, startNewQuiz, generationToken } = useQuiz()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const runId = useRef(0)

  const isAll = settings.competencyId === 'all'
  const competency = getCompetencyById(settings.competencyId)
  const isValidSelection = isAll || Boolean(competency)

  const subtitle = isAll
    ? 'All 10 Subjects Grand Mock Test'
    : competency
      ? competency.name
      : 'Configure your quiz to continue'

  const runFetch = useCallback(async () => {
    const id = ++runId.current
    setLoading(true)
    setError('')

    if (!isValidSelection) {
      setError('Please select a valid subject before starting a quiz.')
      setLoading(false)
      return
    }

    try {
      const result = await generateQuizFromDB({
        competencyId: settings.competencyId,
        numberOfQuestions: settings.questionCount,
        difficulty: settings.difficulty,
      })

      if (id !== runId.current) return

      startNewQuiz(result)
      navigate('/quiz', { replace: true })
    } catch (err) {
      if (id !== runId.current) return
      const message = err?.message || 'Database questions could not be retrieved. Please try again.'
      setError(message)
      setLoading(false)
    }
  }, [
    isValidSelection,
    settings.competencyId,
    settings.questionCount,
    settings.difficulty,
    startNewQuiz,
    navigate,
  ])

  const freshParam = searchParams.get('fresh')

  useEffect(() => {
    runFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-fetch when settings/token/fresh changes
  }, [runFetch, generationToken, freshParam])

  return (
    <>
      <PageHero title="Database Practice Quiz" subtitle={subtitle} />

      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {loading && !error && <LoadingSpinner label="Fetching questions from database..." />}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-3.5">
              <AlertCircle className="h-6 w-6 shrink-0 text-red-600 mt-0.5" aria-hidden />
              <div className="w-full">
                <h2 className="font-bold text-red-800 text-base sm:text-lg">Could not load quiz</h2>
                <p className="mt-1.5 text-xs sm:text-sm text-red-700 leading-relaxed">{error}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={runFetch}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-ulm-purple px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-ulm-purple-dark transition shadow-xs"
                  >
                    <RefreshCw className="h-4 w-4 shrink-0" aria-hidden />
                    <span>Try Again</span>
                  </button>
                  <Link
                    to="/practice/setup"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-ulm-dark hover:bg-gray-50 transition"
                  >
                    <span>Back to Setup</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isValidSelection && !loading && (
          <p className="text-center text-xs sm:text-sm text-gray-600">
            <Link to="/practice/setup" className="text-ulm-purple font-medium hover:underline">
              Go to Setup
            </Link>{' '}
            to choose a subject or full mock test.
          </p>
        )}
      </section>
    </>
  )
}
