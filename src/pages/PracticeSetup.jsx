import { Award, Play, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { competencies, getCompetencyById } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'

const QUESTION_COUNTS = [10, 20, 50, 100]

export default function PracticeSetup() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { settings, setSettings, resetQuizSession } = useQuiz()

  const [error, setError] = useState('')

  const competencyFromUrl = searchParams.get('competency')
  const countFromUrl = parseInt(searchParams.get('count'), 10)

  useEffect(() => {
    const updates = {}
    if (competencyFromUrl && (competencyFromUrl === 'all' || getCompetencyById(competencyFromUrl))) {
      updates.competencyId = competencyFromUrl
    }
    if (countFromUrl && QUESTION_COUNTS.includes(countFromUrl)) {
      updates.questionCount = countFromUrl
    }
    if (Object.keys(updates).length > 0) {
      setSettings(updates)
    }
  }, [competencyFromUrl, countFromUrl, setSettings])

  const handleCompetencyChange = (e) => {
    setSettings({
      competencyId: e.target.value,
    })
    setError('')
  }

  const handleQuestionCountChange = (count) => {
    setSettings({
      questionCount: count,
    })
    setError('')
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    setError('')

    const isAll = settings.competencyId === 'all'
    if (!settings.competencyId || (!isAll && !getCompetencyById(settings.competencyId))) {
      setError('Please select a subject or choose All Subjects.')
      return
    }

    if (!QUESTION_COUNTS.includes(settings.questionCount)) {
      setError('Please select 10, 20, 50, or 100 questions.')
      return
    }

    setSettings({
      topicId: '',
      difficulty: 'Mixed',
      questionCount: settings.questionCount,
      quizMode: 'db',
    })

    resetQuizSession()

    navigate('/quiz/db?fresh=1')
  }

  const isAllSubjects = settings.competencyId === 'all'

  return (
    <>
      <PageHero
        title={isAllSubjects ? "All-Subjects Full Mock Test" : "Practice by Subject"}
        subtitle={
          isAllSubjects
            ? "Test your knowledge across all 10 subjects simultaneously with balanced random questions."
            : "Choose a competency area or choose All Subjects for a comprehensive exam simulation."
        }
      />

      <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        {/* Quick Mode Toggle Banner */}
        <div className="mb-6 flex overflow-hidden rounded-xl border border-ulm-lavender bg-white p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setSettings({ competencyId: 'all', questionCount: settings.questionCount < 20 ? 20 : settings.questionCount })
              setError('')
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition ${
              isAllSubjects
                ? 'bg-ulm-purple text-white shadow-sm'
                : 'text-gray-600 hover:text-ulm-purple hover:bg-ulm-lavender/50'
            }`}
          >
            <Award className="h-4 w-4" />
            All-Subjects Mock Test
          </button>
          <button
            type="button"
            onClick={() => {
              if (isAllSubjects) setSettings({ competencyId: 'databases' })
              setError('')
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition ${
              !isAllSubjects
                ? 'bg-ulm-purple text-white shadow-sm'
                : 'text-gray-600 hover:text-ulm-purple hover:bg-ulm-lavender/50'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Specific Subject
          </button>
        </div>

        <form
          onSubmit={handleGenerate}
          className="space-y-6 rounded-xl border border-ulm-lavender bg-white p-6 shadow-sm"
        >
          {/* Subject Dropdown */}
          <div>
            <label
              htmlFor="competency"
              className="mb-1 block text-sm font-medium text-ulm-dark"
            >
              Subject / Test Mode
            </label>

            <select
              id="competency"
              value={settings.competencyId}
              onChange={handleCompetencyChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20"
              required
            >
              <option value="">Select subject or mode</option>

              <optgroup label="🌟 Grand Mock Exam">
                <option value="all">
                  🔥 All 10 Subjects Combined (Full Mock Test)
                </option>
              </optgroup>

              <optgroup label="📚 Individual Subjects">
                {competencies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.weightage}%)
                  </option>
                ))}
              </optgroup>
            </select>

            {isAllSubjects && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ulm-purple">
                <Award className="h-3.5 w-3.5 shrink-0" />
                Randomly samples balanced questions from all 10 computer science subjects.
              </p>
            )}
          </div>

          {/* Question Quantity */}
          <div>
            <label className="mb-3 block text-sm font-medium text-ulm-dark">
              Question Quantity
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleQuestionCountChange(count)}
                  className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                    settings.questionCount === count
                      ? 'border-ulm-purple bg-ulm-purple text-white shadow-sm'
                      : 'border-gray-300 bg-white text-ulm-dark hover:border-ulm-purple hover:bg-ulm-lavender'
                  }`}
                >
                  {count} Qs
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {isAllSubjects
                ? 'Recommended: 50 or 100 questions for full exam coverage.'
                : 'Recommended: 10 or 20 questions for targeted subject review.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <p
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Generate Quiz */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ulm-purple px-5 py-3 text-sm font-semibold text-white shadow hover:bg-ulm-purple-dark transition"
          >
            <Play className="h-4 w-4" aria-hidden />
            {isAllSubjects ? 'Start All-Subjects Mock Test' : 'Generate Subject Quiz'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Want topic-specific AI generated questions?
          {' '}
          <Link
            to="/quiz/setup"
            className="font-medium text-ulm-purple hover:underline"
          >
            Try AI Quiz
          </Link>
        </p>
      </section>
    </>
  )
}