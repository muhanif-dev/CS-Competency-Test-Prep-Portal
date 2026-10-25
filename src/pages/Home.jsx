import { ArrowRight, Award, CheckCircle2, Flame, Layers, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CompetencyCard from '../components/CompetencyCard'
import { competencies } from '../data/competencies'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-ulm-lavender bg-gradient-to-br from-ulm-lavender/70 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ulm-purple shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-ulm-gold" aria-hidden />
              Competency-based practice & Full Mock Exams
            </p>
            <h1 className="text-4xl font-bold leading-tight text-ulm-dark sm:text-5xl">
              Prepare Smarter for Your CS Competency Test
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              Practice questions across all 10 official computer science competency areas, or take a
              comprehensive <strong>Full Mock Test</strong> with randomly mixed questions from all subjects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/practice/setup?competency=all&count=50"
                className="inline-flex items-center gap-2 rounded-lg bg-ulm-purple px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-ulm-purple-dark transition"
              >
                <Award className="h-4 w-4 text-ulm-gold" aria-hidden />
                Take Full Mock Test (All Subjects)
              </Link>
              <Link
                to="/practice/setup"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-ulm-dark hover:border-ulm-purple hover:bg-ulm-lavender/40 transition"
              >
                Practice by Subject
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/competencies"
                className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-4 py-3 text-sm font-semibold text-ulm-purple hover:underline"
              >
                Explore Subjects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: All-Subjects Grand Mock Exam Card */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-ulm-purple/20 bg-gradient-to-r from-ulm-purple via-[#5B2E8E] to-ulm-dark p-6 sm:p-8 text-white shadow-lg">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ulm-gold">
                <Flame className="h-3.5 w-3.5 text-ulm-gold" />
                Featured Exam Mode
              </span>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl text-white">
                All-Subjects Grand Mock Test
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-200 leading-relaxed">
                Experience real exam conditions. Questions are randomly generated and proportionally
                balanced across all 10 computer science subjects — testing your complete syllabus readiness.
              </p>
              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-ulm-gold" />
                  All 10 Subjects Covered
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-ulm-gold" />
                  3,900+ Questions in Pool
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-ulm-gold" />
                  Detailed Explanations
                </span>
              </div>
            </div>

            {/* Quick Action Buttons for All-Subjects */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to="/practice/setup?competency=all&count=20"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-ulm-purple shadow hover:bg-ulm-lavender transition"
              >
                <Layers className="h-4 w-4" />
                Quick Mock (20 Qs)
              </Link>
              <Link
                to="/practice/setup?competency=all&count=50"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ulm-gold px-5 py-3 text-sm font-bold text-ulm-dark shadow hover:bg-yellow-400 transition"
              >
                <Award className="h-4 w-4" />
                Standard Mock (50 Qs)
              </Link>
              <Link
                to="/practice/setup?competency=all&count=100"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Full Exam (100 Qs)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Competency Areas Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ulm-dark">Individual Competency Areas</h2>
            <p className="mt-1 text-gray-600">
              All 10 official syllabus areas. Select any individual subject for targeted practice.
            </p>
          </div>
          <Link
            to="/practice/setup"
            className="text-sm font-semibold text-ulm-purple hover:underline"
          >
            Practice by Subject &rarr;
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
