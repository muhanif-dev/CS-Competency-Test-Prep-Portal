import { ArrowRight, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompetencyCard from '../components/CompetencyCard'
import PageHero from '../components/PageHero'
import { competencies } from '../data/competencies'

export default function Competencies() {
  return (
    <>
      <PageHero
        title="Competency Areas"
        subtitle="Explore all 10 official areas with complete syllabus topics or test your knowledge across all subjects."
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* All Subjects Grand Test Banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-ulm-purple/30 bg-gradient-to-r from-ulm-lavender/60 via-white to-ulm-lavender/30 p-4 sm:p-5 shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ulm-purple text-white shadow-xs">
              <Award className="h-6 w-6 text-ulm-gold" />
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-ulm-dark flex flex-wrap items-center gap-2">
                <span>All-Subjects Grand Mock Test</span>
                <span className="rounded-full bg-ulm-purple/10 px-2.5 py-0.5 text-xs font-semibold text-ulm-purple">
                  10 Subjects Combined
                </span>
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Ready for full exam preparation? Practice with randomly mixed questions from all competency areas.
              </p>
            </div>
          </div>
          <Link
            to="/practice/setup?competency=all&count=50"
            className="inline-flex w-full md:w-auto shrink-0 items-center justify-center gap-2 rounded-lg bg-ulm-purple px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-ulm-purple-dark transition"
          >
            Start Mock Test
            <ArrowRight className="h-4 w-4" />
          </Link>
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
