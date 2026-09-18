import { AlertCircle, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHero from '../components/PageHero'
import { getCompetencyById, getTopicByIds } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'
import { generateQuizFromDB } from '../services/dbService'

export default function DBQuiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { settings, startNewQuiz, generationToken } = useQuiz()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const runId = useRef(0)

  const topicResolved = settings.topicId
    ? getTopicByIds(settings.competencyId, settings.topicId)
    : null

  const competency = getCompetencyById(settings.competencyId)

  const isPracticeQuiz = !settings.topicId

  const isValidSelection = settings.topicId
    ? Boolean(topicResolved)
    : Boolean(competency)

  const subtitle = topicResolved
    ? `${topicResolved.competency.name} → ${topicResolved.topic.name}`
    : competency
      ? `${competency.name} → All Topics (Random Practice)`
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
        topicId: settings.topicId || undefined,
        numberOfQuestions: settings.questionCount,

        // Practice uses Mixed so all difficulties can be selected.
        // AI/database topic-based flow can still use its selected difficulty.
        difficulty: isPracticeQuiz ? 'Mixed' : settings.difficulty,
      })

      if (id !== runId.current) return

      startNewQuiz(result)

      navigate('/quiz', { replace: true })
    } catch (err) {
      if (id !== runId.current) return

      const message =
        err?.message ||
        'Database se quiz fetch nahi ho saka. Please try again.'

      setError(message)
      setLoading(false)
    }
  }, [
    isValidSelection,
    isPracticeQuiz,
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

    // Re-fetch when settings, generation token or fresh parameter changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runFetch, generationToken, freshParam])

  const backTo = settings.topicId
    ? '/quiz/setup'
    : '/practice/setup'

  return (
    <>
      <PageHero
        title="Database Quiz"
        subtitle={subtitle}
      />

      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {loading && !error && (
          <LoadingSpinner label="Fetching random questions from database..." />
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex gap-3">
              <AlertCircle
                className="h-6 w-6 shrink-0 text-red-600"
                aria-hidden
              />

              <div>
                <h2 className="font-semibold text-red-800">
                  Could not load quiz
                </h2>

                <p className="mt-2 text-sm text-red-700">
                  {error}
                </p>

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
                    to={backTo}
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
            <Link
              to={backTo}
              className="text-ulm-purple hover:underline"
            >
              Go to Setup
            </Link>{' '}
            to choose a subject.
          </p>
        )}
      </section>
    </>
  )
}