import { ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { getCompetencyById } from '../data/competencies'
import { useQuiz } from '../context/QuizContext'

export default function CompetencyDetail() {
  const { competencyId } = useParams()
  const competency = getCompetencyById(competencyId)
  const { setSettings } = useQuiz()

  if (!competency) {
    return <Navigate to="/competencies" replace />
  }

  const selectTopic = (topicId) => {
    setSettings({ competencyId: competency.id, topicId })
  }

  return (
    <>
      <PageHero
        title={competency.name}
        subtitle={`${competency.weightage}% exam weightage · ${competency.topics.length} topics`}
      >
        <Link
          to={`/quiz/setup?competency=${competency.id}`}
          className="inline-flex items-center rounded-lg bg-ulm-purple px-4 py-2 text-sm font-medium text-white hover:bg-ulm-purple-dark"
        >
          Configure AI Quiz
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="mb-4 text-xl font-semibold text-ulm-dark">Topics</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {competency.topics.map((topic) => (
            <li key={topic.id}>
              <Link
                to="/quiz/setup"
                onClick={() => selectTopic(topic.id)}
                className="group flex items-center justify-between rounded-lg border border-ulm-lavender bg-white px-4 py-3 hover:border-ulm-purple/40 hover:bg-ulm-lavender/30"
              >
                <span className="text-sm font-medium text-ulm-dark sm:text-base">
                  {topic.name}
                </span>
                <ChevronRight
                  className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-ulm-purple"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
