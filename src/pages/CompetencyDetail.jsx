import { ChevronRight, Sparkles } from 'lucide-react'
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
        subtitle={`${competency.weightage}% exam weightage · ${competency.topics.length} syllabus topics available for focused study.`}
      >
        <Link
          to={`/quiz/setup?competency=${competency.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-ulm-purple px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-ulm-purple-dark transition"
        >
          <Sparkles className="h-4 w-4 text-ulm-gold" />
          <span>Configure AI Quiz</span>
        </Link>
        <Link
          to={`/practice/setup?competency=${competency.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-ulm-dark hover:bg-ulm-lavender/40 transition"
        >
          <span>Practice from Database</span>
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-ulm-dark">Topics in this Subject</h2>
          <span className="text-xs text-gray-500">
            Click any topic to start configuring a custom AI practice quiz
          </span>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {competency.topics.map((topic) => (
            <li key={topic.id}>
              <Link
                to="/quiz/setup"
                onClick={() => selectTopic(topic.id)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-ulm-lavender bg-white p-3.5 sm:px-4 sm:py-3.5 hover:border-ulm-purple/40 hover:bg-ulm-lavender/25 transition shadow-2xs"
              >
                <span className="text-xs sm:text-sm font-medium text-ulm-dark group-hover:text-ulm-purple break-words">
                  {topic.name}
                </span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-ulm-purple"
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
