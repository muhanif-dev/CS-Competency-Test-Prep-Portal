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

  const competency = getCompetencyById(settings.competencyId)
  const isValidSelection = Boolean(competency)

  const subtitle = competency ? competency.name : 'Configure your quiz to continue'

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
      const message = err?.message || 'Database se quiz fetch nahi ho saka. Please try again.'
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
      <PageHero title="Database Quiz" subtitle={subtitle} />

      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {loading && !error && <LoadingSpinner label="Fetching questions from database..." />}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 shrink-0 text-red-600" aria-hidden />
              <div>
                <h2 className="font-semibold text-red-800">Could not load quiz</h2>
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={runFetch}
                    className="inline-flex items-center gap-2 rounded-lg bg-ulm-purple px-4 py-2 text-sm font-medium text-white hover:bg-ulm-purple-dark"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden />
                    Try Again
                  </button>
                  <Link
                    to="/quiz/practice"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-ulm-dark hover:bg-gray-50"
                  >
                    Back to Setup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isValidSelection && !loading && (
          <p className="text-center text-gray-600">
            <Link to="/quiz/practice" className="text-ulm-purple hover:underline">
              Go to Setup
            </Link>{' '}
            to choose a subject.
          </p>
        )}
      </section>
    </>
  )
}