import { AlertCircle, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHero from '../components/PageHero'
import { getTopicByIds } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'
import { generateQuiz, isAiConfigured } from '../services/aiService'

export default function AIQuiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { settings, startNewQuiz, generationToken, getQuestionHistory, recordQuestionHistory } = useQuiz()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const runId = useRef(0)
  const lastAutoRunKey = useRef(null)

  const resolved = getTopicByIds(settings.competencyId, settings.topicId)

  const runGeneration = useCallback(async () => {
    const id = ++runId.current
    setLoading(true)
    setError('')

    if (!resolved) {
      setError('Please select a valid competency area and topic before generating a quiz.')
      setLoading(false)
      return
    }

    if (!isAiConfigured()) {
      setError(
        'AI is not configured. Add VITE_GEMINI_API_KEY to your .env file.',
      )
      setLoading(false)
      return
    }

    try {
      const result = await generateQuiz({
        competencyId: settings.competencyId,
        topicId: settings.topicId,
        numberOfQuestions: settings.questionCount,
        difficulty: settings.difficulty,
        excludeQuestions: getQuestionHistory(settings.topicId),
      })

      if (id !== runId.current) return

      recordQuestionHistory(
        settings.topicId,
        result.questions.map((q) => q.question),
      )

      startNewQuiz(result)
      navigate('/quiz', { replace: true })
    } catch (err) {
      if (id !== runId.current) return
      const message = err?.message || 'Unable to generate a valid quiz. Please try again.'
      setError(message)
      setLoading(false)
    }
  }, [
    resolved,
    settings.competencyId,
    settings.topicId,
    settings.questionCount,
    settings.difficulty,
    getQuestionHistory,
    recordQuestionHistory,
    startNewQuiz,
    navigate,
  ])

  const freshParam = searchParams.get('fresh')

  useEffect(() => {
    const runKey = JSON.stringify({
      competencyId: settings.competencyId,
      topicId: settings.topicId,
      questionCount: settings.questionCount,
      difficulty: settings.difficulty,
      generationToken,
      freshParam,
    })
    if (lastAutoRunKey.current === runKey) return
    lastAutoRunKey.current = runKey
    runGeneration()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- regenerate when settings/token/fresh changes
  }, [runGeneration, generationToken, freshParam])

  return (
    <>
      <PageHero
        title="AI Quiz Generation"
        subtitle={
          resolved
            ? `${resolved.competency.name} → ${resolved.topic.name}`
            : 'Configure your quiz to continue'
        }
      />

      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {loading && !error && (
          <LoadingSpinner label="Generating your quiz with AI..." />
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-3.5">
              <AlertCircle className="h-6 w-6 shrink-0 text-red-600 mt-0.5" aria-hidden />
              <div className="w-full">
                <h2 className="font-bold text-red-800 text-base sm:text-lg">Generation failed</h2>
                <p className="mt-1.5 text-xs sm:text-sm text-red-700 leading-relaxed">{error}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={runGeneration}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-ulm-purple px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-ulm-purple-dark transition shadow-xs"
                  >
                    <RefreshCw className="h-4 w-4 shrink-0" aria-hidden />
                    <span>Try Again</span>
                  </button>
                  <Link
                    to="/quiz/setup"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-ulm-dark hover:bg-gray-50 transition"
                  >
                    <span>Back to Setup</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {!resolved && !loading && (
          <p className="text-center text-xs sm:text-sm text-gray-600">
            <Link to="/quiz/setup" className="text-ulm-purple font-medium hover:underline">
              Go to Quiz Setup
            </Link>{' '}
            to choose a competency and topic.
          </p>
        )}
      </section>
    </>
  )
}
