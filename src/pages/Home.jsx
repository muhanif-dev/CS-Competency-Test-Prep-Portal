import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompetencyCard from '../components/CompetencyCard'
import { competencies } from '../data/competencies'

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ulm-lavender bg-gradient-to-br from-ulm-lavender/70 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ulm-purple shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-ulm-gold" aria-hidden />
              Competency-based practice
            </p>
            <h1 className="text-4xl font-bold leading-tight text-ulm-dark sm:text-5xl">
              Prepare Smarter for Your CS Competency Test
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              Practice competency-based Computer Science questions and generate topic-focused AI
              quizzes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/quiz/setup"
                className="inline-flex items-center gap-2 rounded-lg bg-ulm-purple px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-ulm-purple-dark"
              >
                Start Practice
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/competencies"
                className="inline-flex items-center gap-2 rounded-lg border border-ulm-purple bg-white px-5 py-3 text-sm font-semibold text-ulm-purple hover:bg-ulm-lavender"
              >
                Explore Subjects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ulm-dark">Competency Areas</h2>
            <p className="mt-1 text-gray-600">
              All 10 official areas with syllabus-aligned topics and exam weightage.
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c) => (
            <CompetencyCard key={c.id} competency={c} />
          ))}
        </div>
      </section>
    </>
  )
}
