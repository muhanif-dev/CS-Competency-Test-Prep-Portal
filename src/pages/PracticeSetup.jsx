import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { competencies, getCompetencyById } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'

const QUESTION_COUNTS = [10, 20]

export default function PracticeSetup() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { settings, setSettings, resetQuizSession } = useQuiz()

  const [error, setError] = useState('')

  const competencyFromUrl = searchParams.get('competency')

  // Preselect subject when Practice is opened from a competency card.
  useEffect(() => {
    if (competencyFromUrl && getCompetencyById(competencyFromUrl)) {
      setSettings({
        competencyId: competencyFromUrl,
      })
    }
  }, [competencyFromUrl, setSettings])

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

    if (!settings.competencyId || !getCompetencyById(settings.competencyId)) {
      setError('Please select a subject to practice.')
      return
    }

    if (!QUESTION_COUNTS.includes(settings.questionCount)) {
      setError('Please select 10 or 20 questions.')
      return
    }

    // Practice always uses MongoDB.
    // No topic and no difficulty filter.
    setSettings({
      topicId: '',
      difficulty: 'Mixed',
      questionCount: settings.questionCount,
      quizMode: 'db',
    })

    // Clear the previous quiz session.
    resetQuizSession()

    // Open database quiz.
    // The backend will randomly select new questions.
    navigate('/quiz/db?fresh=1')
  }

  return (
    <>
      <PageHero
        title="Practice"
        subtitle="Select a subject and question quantity to practice with random questions from the database."
      />

      <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <form
          onSubmit={handleGenerate}
          className="space-y-6 rounded-xl border border-ulm-lavender bg-white p-6 shadow-sm"
        >
          {/* Subject */}
          <div>
            <label
              htmlFor="competency"
              className="mb-1 block text-sm font-medium text-ulm-dark"
            >
              Subject
            </label>

            <select
              id="competency"
              value={settings.competencyId}
              onChange={handleCompetencyChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20"
              required
            >
              <option value="">Select subject</option>

              {competencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.weightage}%)
                </option>
              ))}
            </select>
          </div>

          {/* Question Quantity */}
          <div>
            <label className="mb-3 block text-sm font-medium text-ulm-dark">
              Question Quantity
            </label>

            <div className="grid grid-cols-2 gap-3">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleQuestionCountChange(count)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    settings.questionCount === count
                      ? 'border-ulm-purple bg-ulm-purple text-white'
                      : 'border-gray-300 bg-white text-ulm-dark hover:border-ulm-purple hover:bg-ulm-lavender'
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ulm-purple px-5 py-3 text-sm font-semibold text-white hover:bg-ulm-purple-dark"
          >
            <Play className="h-4 w-4" aria-hidden />
            Generate Quiz
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Want to generate questions with AI?
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