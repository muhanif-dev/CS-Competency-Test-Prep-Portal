import {
  Award,
  BookOpen,
  ExternalLink,
  Flame,
  HeartHandshake,
  Layers,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const TEAM_MEMBERS = [
  {
    name: 'Dr. Bilal Qureshi',
    role: 'Director',
    qualification: 'Faculty Leadership',
    isLead: true,
  },
  {
    name: 'Mr. Abdullah Khan',
    role: 'Mentor',
    qualification: 'Academic Guidance',
    isLead: true,
  },
  {
    name: 'Muhammad Hanif',
    role: 'Team Lead',
    qualification: 'BSCS, 5th Semester',
    isLead: false,
  },
  {
    name: 'Muhammad Bilal',
    role: 'Team Member',
    qualification: 'BSCS, 5th Semester',
    isLead: false,
  },
  {
    name: 'Muhammad Rehan',
    role: 'Team Member',
    qualification: 'BSCS, 5th Semester',
    isLead: false,
  },
  {
    name: 'Muhammad Fawad',
    role: 'Team Member',
    qualification: 'BSCS, 5th Semester',
    isLead: false,
  },
  {
    name: 'Muhammad Tauheed',
    role: 'Team Member',
    qualification: 'BSCS, 5th Semester',
    isLead: false,
  },
  {
    name: 'Mujtaba',
    role: 'Team Member',
    qualification: 'BSCS, 5th Semester',
    isLead: false,
  },
]

export default function Projects() {
  return (
    <>
      <PageHero
        title="Projects & Initiatives"
        subtitle="Explore community platforms, educational portals, and the CodeMind Team contributors behind these solutions."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-12 sm:space-y-16">
        {/* Featured Projects Section */}
        <section aria-labelledby="featured-projects-heading">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ulm-lavender/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ulm-purple">
              <Layers className="h-3.5 w-3.5 text-ulm-purple" aria-hidden />
              Showcase
            </span>
            <h2
              id="featured-projects-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-ulm-dark sm:text-3xl"
            >
              Featured Platforms
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Impact-driven web applications engineered for campus management, healthcare, and education.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Project 1: University Canteen Marketplace */}
            <article className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-ulm-purple/30 hover:shadow-md">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <UtensilsCrossed className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="rounded-full bg-amber-100/70 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    Live Platform
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-xl font-bold text-ulm-dark group-hover:text-ulm-purple transition-colors">
                    University Canteen Marketplace
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    Campus Food Ordering & Management System
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    A centralized campus marketplace where canteen owners manage products and incoming orders,
                    and students and faculty browse menus, place advance orders, and pick up food with Cash on Pickup.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['Next.js', 'React', 'Tailwind CSS', 'Turbopack', 'Marketplace'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <a
                  href="https://university-canteen-marketplace.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-amber-700 transition"
                >
                  <span>Visit Canteen Marketplace</span>
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </article>

            {/* Project 2: Blood Bank Connect */}
            <article className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-ulm-purple/30 hover:shadow-md">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <HeartHandshake className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="rounded-full bg-red-100/70 px-2.5 py-1 text-xs font-semibold text-red-700">
                    Live Project
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-xl font-bold text-ulm-dark group-hover:text-ulm-purple transition-colors">
                    Blood Bank Connect
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    Community Lifesaver Network & Donor Registry
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    A community-driven voluntary blood donor registry connecting patients and donors
                    in emergency situations by blood group and city. Developed with purpose to streamline
                    life-saving community connections.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['React', 'Vite', 'Tailwind CSS', 'Community Registry'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <a
                  href="https://blood-bank-pi-bay.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-red-700 transition"
                >
                  <span>Visit Blood Bank Connect</span>
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </article>

            {/* Project 3: TestPrepHub */}
            <article className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-ulm-purple/30 hover:shadow-md">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ulm-lavender text-ulm-purple">
                    <BookOpen className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="rounded-full bg-ulm-lavender px-2.5 py-1 text-xs font-semibold text-ulm-purple">
                    Current Portal
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-xl font-bold text-ulm-dark group-hover:text-ulm-purple transition-colors">
                    CS Competency Portal
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    TestPrepHub · Exam Preparation Platform
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    A comprehensive test preparation portal for Computer Science students covering 10 official
                    competency areas, 3,900+ curated database MCQs, balanced mock exams, and AI-powered dynamic
                    practice sessions.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['React 19', 'Tailwind CSS v4', 'Node.js', 'MongoDB', 'Gemini AI'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-ulm-lavender/60 bg-ulm-lavender/30 px-2.5 py-1 text-[11px] font-medium text-ulm-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
                <Link
                  to="/practice/setup?competency=all&count=50"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-ulm-purple px-3 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-ulm-purple-dark transition"
                >
                  <Flame className="h-3.5 w-3.5 text-ulm-gold" />
                  <span>Start Mock Exam</span>
                </Link>
                <Link
                  to="/competencies"
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs font-semibold text-ulm-dark hover:bg-gray-50 transition"
                >
                  <span>Explore Subjects</span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* CodeMind Team Section */}
        <section aria-labelledby="team-heading" className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ulm-purple">
                <Users className="h-3.5 w-3.5" aria-hidden />
                Built With Purpose
              </span>
              <h2
                id="team-heading"
                className="mt-1 text-2xl font-bold tracking-tight text-ulm-dark sm:text-3xl"
              >
                CodeMind Team
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                The contributors, developers, and academic leadership behind student platform and community initiatives.
              </p>
            </div>

            {/* Blood Bank Project Reference External Attribution */}
            <a
              href="https://blood-bank-pi-bay.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ulm-purple hover:underline shrink-0"
            >
              <span>Blood Bank Project Reference</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className={`rounded-xl border p-4 transition-all duration-150 ${member.isLead
                    ? 'border-ulm-purple/30 bg-ulm-lavender/40 shadow-xs'
                    : 'border-gray-200 bg-white shadow-2xs hover:border-ulm-lavender hover:bg-ulm-lavender/10'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${member.isLead
                        ? 'bg-ulm-purple text-white shadow-xs'
                        : 'bg-ulm-lavender text-ulm-purple'
                      }`}
                    aria-hidden
                  >
                    {member.isLead ? (
                      <Award className="h-5 w-5 text-ulm-gold" />
                    ) : (
                      member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-ulm-dark">
                      {member.name}
                    </h3>
                    <p
                      className={`text-xs font-semibold ${member.isLead ? 'text-ulm-purple' : 'text-gray-700'
                        }`}
                    >
                      {member.role}
                    </p>
                    <p className="truncate text-[11px] text-gray-500">
                      {member.qualification}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
