import { BookOpen, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CompetencyCard({ competency }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-ulm-lavender bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ulm-lavender text-ulm-purple">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
        <span className="rounded-full bg-ulm-gold/15 px-2.5 py-0.5 text-xs font-semibold text-ulm-dark">
          {competency.weightage}% weight
        </span>
      </div>
      <h3 className="text-lg font-semibold leading-snug text-ulm-dark">
        {competency.name}
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        {competency.topics.length} topics available for focused practice
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
      <Link
          to={`/quiz/practice?competency=${competency.id}`}
          className="inline-flex items-center gap-1 rounded-lg bg-ulm-purple px-4 py-2 text-sm font-medium text-white hover:bg-ulm-purple-dark"
        >
          Practice
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          to={`/quiz/setup?competency=${competency.id}`}
          className="inline-flex items-center rounded-lg border border-ulm-purple px-4 py-2 text-sm font-medium text-ulm-purple hover:bg-ulm-lavender"
        >
          AI Quiz
        </Link>
      </div>
    </article>
  )
}
