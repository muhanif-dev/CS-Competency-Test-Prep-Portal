import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CompetencyCard({ competency }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4.5 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-ulm-purple/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-ulm-lavender text-ulm-purple">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>

        <span className="shrink-0 rounded-full bg-ulm-gold/15 px-2.5 py-1 text-xs font-semibold text-ulm-dark">
          {competency.weightage}% weight
        </span>
      </div>

      <div className="mt-4 sm:mt-5">
        <h3 className="text-base sm:text-lg font-semibold leading-snug text-ulm-dark break-words">
          {competency.name}
        </h3>

        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
          {competency.topics.length} topics available for focused practice.
        </p>
      </div>

      <div className="mt-auto pt-5 sm:pt-6">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/practice/setup?competency=${competency.id}`}
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg bg-ulm-purple px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-ulm-purple-dark focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 focus:ring-offset-2"
          >
            <span>Practice</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
          </Link>

          <Link
            to={`/quiz/setup?competency=${competency.id}`}
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg border border-ulm-purple px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-ulm-purple transition-colors hover:bg-ulm-lavender focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 focus:ring-offset-2"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
            <span>AI Quiz</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
