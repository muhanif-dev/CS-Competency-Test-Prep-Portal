import { AlertCircle, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHero from '../components/PageHero'
import { getTopicByIds } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'
import { generateQuizFromDB } from '../services/dbService'

export default function DBQuiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { settings, startNewQuiz, generationToken } = useQuiz()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const runId = useRef(0)

  const resolved = getTopicByIds(settings.competencyId, settings.topicId)

  const runFetch = useCallback(async () => {
    const id = ++runId.current
    setLoading(true)
    setError('')

    if (!resolved) {
      setError('Please select a valid competency area and topic before starting a quiz.')
      setLoading(false)
      return
    }

    try {
      const result = await generateQuizFromDB({
        competencyId: settings.competencyId,
        topicId: settings.topicId,
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
    resolved,
    settings.competencyId,
    settings.topicId,
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
      <PageHero
        title="Database Quiz"
        subtitle={
          resolved
            ? `${resolved.competency.name} → ${resolved.topic.name}`
            : 'Configure your quiz to continue'
        }
      />

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
                    to="/quiz/setup"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-ulm-dark hover:bg-gray-50"
                  >
                    Back to Setup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {!resolved && !loading && (
          <p className="text-center text-gray-600">
            <Link to="/quiz/setup" className="text-ulm-purple hover:underline">
              Go to Quiz Setup
            </Link>{' '}
            to choose a competency and topic.
          </p>
        )}
      </section>
    </>
  )
}