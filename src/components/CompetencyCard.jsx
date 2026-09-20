import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CompetencyCard({ competency }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ulm-purple/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ulm-lavender text-ulm-purple">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>

        <span className="rounded-full bg-ulm-gold/15 px-2.5 py-1 text-xs font-semibold text-ulm-dark">
          {competency.weightage}% weight
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold leading-snug text-ulm-dark">
          {competency.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {competency.topics.length} topics available for focused practice.
        </p>
      </div>

      <div className="mt-auto pt-6">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/practice/setup?competency=${competency.id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-ulm-purple px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ulm-purple-dark focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 focus:ring-offset-2"
          >
            Practice
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          <Link
            to={`/quiz/setup?competency=${competency.id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-ulm-purple px-3 py-2.5 text-sm font-semibold text-ulm-purple transition-colors hover:bg-ulm-lavender focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 focus:ring-offset-2"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            AI Quiz
          </Link>
        </div>
      </div>
    </article>
  )
}