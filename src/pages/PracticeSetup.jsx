import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { competencies, getCompetencyById } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'

// Practice flow ke fixed defaults — user ko yeh select karne ki zaroorat
// nahi. Difficulty "Mixed" rakhi hai taake poori subject ke saved MCQs
// (kisi bhi difficulty ke) is quiz mein shamil ho sakein.
const PRACTICE_QUESTION_COUNT = 10
const PRACTICE_DIFFICULTY = 'Mixed'

export default function PracticeSetup() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { settings, setSettings, resetQuizSession } = useQuiz()
  const [error, setError] = useState('')

  const competencyFromUrl = searchParams.get('competency')

  useEffect(() => {
    if (competencyFromUrl && getCompetencyById(competencyFromUrl)) {
      setSettings({ competencyId: competencyFromUrl })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run when URL param changes
  }, [competencyFromUrl])

  const handleCompetencyChange = (e) => {
    setSettings({ competencyId: e.target.value })
    setError('')
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    setError('')

    if (!settings.competencyId || !getCompetencyById(settings.competencyId)) {
      setError('Please select a subject to practice.')
      return
    }

    // Practice hamesha database se, poori subject (sab topics mila kar),
    // fixed difficulty/count ke sath — koi topic ya difficulty select nahi.
    setSettings({
      topicId: '',
      quizMode: 'db',
      difficulty: PRACTICE_DIFFICULTY,
      questionCount: PRACTICE_QUESTION_COUNT,
    })

    resetQuizSession()
    navigate('/quiz/db?fresh=1')
  }

  return (
    <>
      <PageHero
        title="Practice"
        subtitle="Select a subject and start practicing with saved MCQs from our question bank."
      />

      <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <form
          onSubmit={handleGenerate}
          className="space-y-6 rounded-xl border border-ulm-lavender bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="competency" className="mb-1 block text-sm font-medium text-ulm-dark">
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
            Start Practice
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Want more control over topic and difficulty?{' '}
          <Link to="/quiz/setup" className="font-medium text-ulm-purple hover:underline">
            Try AI Quiz instead
          </Link>
        </p>
      </section>
    </>
  )
}