import { Brain, Play } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { competencies, getCompetencyById, getTopicByIds } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'
import { isAiConfigured } from '../services/aiService'
import { Brain, Database, Play } from 'lucide-react'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Mixed']
const COUNTS = [10, 20]

export default function QuizSetup() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { settings, setSettings, resetQuizSession } = useQuiz()
  const [error, setError] = useState('')

  const competencyFromUrl = searchParams.get('competency')

  useEffect(() => {
    if (competencyFromUrl && getCompetencyById(competencyFromUrl)) {
      setSettings({ competencyId: competencyFromUrl })
    }
  }, [competencyFromUrl, setSettings])

  const selectedCompetency = useMemo(
    () => getCompetencyById(settings.competencyId),
    [settings.competencyId],
  )

  const topics = selectedCompetency?.topics ?? []

  const handleCompetencyChange = (e) => {
    setSettings({ competencyId: e.target.value, topicId: '' })
    setError('')
  }

  const handleTopicChange = (e) => {
    setSettings({ topicId: e.target.value })
    setError('')
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    setError('')

    if (!settings.competencyId || !settings.topicId) {
      setError('Please select both a competency area and a topic from the official syllabus.')
      return
    }

    if (!getTopicByIds(settings.competencyId, settings.topicId)) {
      setError('Invalid topic selected. Choose a topic from the list.')
      return
    }

    if (!isAiConfigured()) {
      setError(
        'AI is not configured. Add VITE_GEMINI_API_KEY to your .env file (see .env.example).',
      )
      return
    }

    if (settings.quizMode === 'ai' && !isAiConfigured()) {
      setError(
        'AI is not configured. Add VITE_GEMINI_API_KEY to your .env file (see .env.example).',
      )
      return
    }
    
    resetQuizSession()
    navigate(settings.quizMode === 'db' ? '/quiz/db?fresh=1' : '/quiz/ai?fresh=1')
  }

  return (
    <>
      <PageHero
        title="Quiz Setup"
        subtitle="Choose your competency area, topic, and preferences. Questions are generated only for your selected topic."
      />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <form
          onSubmit={handleGenerate}
          className="space-y-6 rounded-xl border border-ulm-lavender bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="competency" className="mb-1 block text-sm font-medium text-ulm-dark">
              Competency Area
            </label>
            <select
              id="competency"
              value={settings.competencyId}
              onChange={handleCompetencyChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20"
              required
            >
              <option value="">Select competency area</option>
              {competencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.weightage}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="topic" className="mb-1 block text-sm font-medium text-ulm-dark">
              Topic
            </label>
            <select
              id="topic"
              value={settings.topicId}
              onChange={handleTopicChange}
              disabled={!settings.competencyId}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm disabled:bg-gray-100 focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20"
              required
            >
              <option value="">
                {settings.competencyId ? 'Select topic' : 'Select a competency area first'}
              </option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
  <span className="mb-2 block text-sm font-medium text-ulm-dark">Quiz Mode</span>
  <div className="grid gap-3 sm:grid-cols-2">
    <button
      type="button"
      onClick={() => setSettings({ quizMode: 'ai' })}
      className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm ${
        settings.quizMode === 'ai'
          ? 'border-ulm-purple bg-ulm-lavender/40'
          : 'border-gray-300 bg-white hover:bg-gray-50'
      }`}
    >
      <Brain className="h-5 w-5 shrink-0 text-ulm-purple" aria-hidden />
      <span>
        <span className="block font-medium text-ulm-dark">Quiz with AI</span>
        <span className="block text-xs text-gray-500">Fresh questions generated live</span>
      </span>
    </button>

    <button
      type="button"
      onClick={() => setSettings({ quizMode: 'db' })}
      className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm ${
        settings.quizMode === 'db'
          ? 'border-ulm-purple bg-ulm-lavender/40'
          : 'border-gray-300 bg-white hover:bg-gray-50'
      }`}
    >
      <Database className="h-5 w-5 shrink-0 text-ulm-purple" aria-hidden />
      <span>
        <span className="block font-medium text-ulm-dark">Quiz from Database</span>
        <span className="block text-xs text-gray-500">Random questions from saved MCQs</span>
      </span>
    </button>
  </div>
</div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-2 block text-sm font-medium text-ulm-dark">
                Number of Questions
              </span>
              <div className="flex gap-2">
                {COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSettings({ questionCount: n })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      settings.questionCount === n
                        ? 'border-ulm-purple bg-ulm-purple text-white'
                        : 'border-gray-300 bg-white text-ulm-dark hover:bg-ulm-lavender'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="difficulty" className="mb-1 block text-sm font-medium text-ulm-dark">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={settings.difficulty}
                onChange={(e) => setSettings({ difficulty: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ulm-purple px-5 py-3 text-sm font-semibold text-white hover:bg-ulm-purple-dark sm:w-auto"
          >
            <Play className="h-4 w-4" aria-hidden />
            Generate Quiz
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Need to browse topics first?{' '}
          <Link to="/competencies" className="font-medium text-ulm-purple hover:underline">
            View competency areas
          </Link>
        </p>
      </section>
    </>
  )
}
