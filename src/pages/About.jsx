import {
  Briefcase,
  CheckCircle2,
  Code2,
  Compass,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  Phone,
  Sparkles,
  Target,
  UserCheck,
} from 'lucide-react'
import PageHero from '../components/PageHero'

function LinkedInIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

const DEVELOPERS = [
  {
    name: 'Muhammad Hanif',
    semester: 'BSCS, 5th Semester',
    role: 'Full Stack Developer & Aspiring Android & iOS Developer',
    description:
      'Lead full-stack developer and architect of TestPrepHub. Experienced in scalable web architectures with React, Node.js, and cloud ecosystems, with an aspiring focus on native mobile development for Android & iOS.',
    portfolio: 'https://full-stack-portfolio-mu.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/muhammad-hanif-92a127358',
    avatarText: 'MH',
  },
  {
    name: 'Muhammad Bilal',
    semester: 'BSCS, 5th Semester',
    role: 'Full Stack Developer',
    description:
      'Full-Stack Developer focused on modern web applications, interactive user experiences, backend services, and clean software engineering practices.',
    portfolio: null,
    linkedin: 'https://www.linkedin.com/in/m-biilal',
    avatarText: 'MB',
  },
]

const TECHNOLOGIES = [
  'React 19',
  'Vite',
  'Tailwind CSS v4',
  'React Router v7',
  'Node.js',
  'Express',
  'MongoDB',
  'Mongoose',
  'Google Gemini API',
  'Axios',
]

export default function About() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="A dedicated Computer Science competency test preparation platform empowering students through structured subject practice and full-scale mock examinations."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-12 sm:space-y-16">
        {/* Section 1: About TestPrepHub */}
        <section aria-labelledby="platform-heading">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="space-y-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ulm-lavender/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ulm-purple">
                  <Target className="h-3.5 w-3.5 text-ulm-purple" aria-hidden />
                  Platform Overview
                </span>
                <h2
                  id="platform-heading"
                  className="mt-2 text-2xl font-bold tracking-tight text-ulm-dark sm:text-3xl"
                >
                  Purpose-Built for CS Competency Exam Success
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-600">
                <p>
                  <strong>TestPrepHub</strong> is a focused Computer Science competency test preparation
                  platform. It helps students master core concepts and prepare for academic evaluations
                  through systematically structured multiple-choice questions, detailed explanations, and
                  timed mock examinations.
                </p>
                <p>
                  The platform covers all 10 official syllabus competency areas — including Algorithms, Data
                  Structures, Databases, Operating Systems, Software Engineering, Networks, and Artificial
                  Intelligence — bridging the gap between classroom theory and standardized testing.
                </p>
                <p>
                  Students can engage in targeted subject practice with over 3,900 questions from the local database
                  or generate dynamic, AI-powered questions using Google Gemini API to test their technical knowledge
                  and analytical thinking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-ulm-lavender bg-white p-4 shadow-2xs">
                  <p className="text-xl sm:text-2xl font-bold text-ulm-purple">10</p>
                  <p className="mt-1 text-xs font-medium text-gray-600">Official CS Competencies</p>
                </div>
                <div className="rounded-xl border border-ulm-lavender bg-white p-4 shadow-2xs">
                  <p className="text-xl sm:text-2xl font-bold text-ulm-purple">3,900+</p>
                  <p className="mt-1 text-xs font-medium text-gray-600">Curated Question Pool</p>
                </div>
                <div className="rounded-xl border border-ulm-lavender bg-white p-4 shadow-2xs">
                  <p className="text-xl sm:text-2xl font-bold text-ulm-purple">2 Modes</p>
                  <p className="mt-1 text-xs font-medium text-gray-600">Database & AI Quizzes</p>
                </div>
              </div>
            </div>

            {/* Quick Feature Highlights Card */}
            <div className="rounded-2xl border border-ulm-lavender bg-gradient-to-br from-ulm-lavender/30 via-white to-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ulm-purple text-white shadow-xs">
                <Sparkles className="h-6 w-6 text-ulm-gold" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ulm-dark">Key Capabilities</h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ulm-purple mt-0.5" aria-hidden />
                  <span>
                    <strong>Topic-Focused Practice:</strong> Practice individual subjects by selecting specific syllabus competencies.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ulm-purple mt-0.5" aria-hidden />
                  <span>
                    <strong>All-Subjects Grand Mock:</strong> Randomized, proportional questions drawn across all 10 areas simultaneously.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ulm-purple mt-0.5" aria-hidden />
                  <span>
                    <strong>Instant Clarification:</strong> Immediate feedback with thorough conceptual explanations for each answer.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ulm-purple mt-0.5" aria-hidden />
                  <span>
                    <strong>AI Quiz Generator:</strong> Fresh, customized practice question sets on demand powered by Google Gemini.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: University of Lakki Marwat — Institute of Computing & Information Technology */}
        <section
          aria-labelledby="department-heading"
          className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ulm-purple text-white shadow-xs">
                  <GraduationCap className="h-5 w-5 text-ulm-gold" aria-hidden />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ulm-purple">
                    Academic Affiliation & Context
                  </span>
                  <h2
                    id="department-heading"
                    className="text-xl font-bold tracking-tight text-ulm-dark sm:text-2xl"
                  >
                    Institute of Computing & Information Technology
                  </h2>
                </div>
              </div>

              <p className="text-sm font-medium text-gray-500">
                University of Lakki Marwat (ULM)
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                The Institute of Computing & Information Technology at the University of Lakki Marwat
                is committed to delivering quality computer science education rooted in research, innovation,
                and hands-on practical learning.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                The institute’s mission is to produce graduates capable of developing high-quality software
                solutions, working effectively within demanding professional environments, and providing
                technical expertise to industry and the community at large. Through interactive academic
                engagement and an active Training and Placement Cell, students are supported in developing
                strong technical fundamentals and career readiness.
              </p>

              {/* Department External Source Attribution */}
              <div className="pt-2">
                <a
                  href="https://www.ulm.edu.pk/departments/index.php?id=5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ulm-purple hover:underline"
                >
                  <span>University of Lakki Marwat — Institute of Computing & Information Technology</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>

            {/* Department Leadership & Contact Card */}
            <div className="w-full lg:max-w-xs shrink-0 rounded-xl border border-ulm-lavender bg-ulm-lavender/30 p-5 space-y-4">
              <div className="border-b border-ulm-lavender pb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Institute Leadership
                </span>
                <h3 className="mt-1 text-base font-bold text-ulm-dark">
                  Dr. Muhammad Bilal Qureshi
                </h3>
                <p className="text-xs font-semibold text-ulm-purple">
                  Director, Institute of Computing & Information Technology
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  University of Lakki Marwat
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 shrink-0 text-ulm-purple" aria-hidden />
                  <a
                    href="mailto:cs@ulm.edu.pk"
                    className="font-medium text-ulm-purple hover:underline truncate"
                  >
                    cs@ulm.edu.pk
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 shrink-0 text-ulm-purple" aria-hidden />
                  <a
                    href="tel:03018753789"
                    className="font-medium text-ulm-purple hover:underline"
                  >
                    0301-8753789
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4 shrink-0 text-ulm-purple" aria-hidden />
                  <span>Training & Placement Cell</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Compass className="h-4 w-4 shrink-0 text-ulm-purple" aria-hidden />
                  <span>Academic Excellence & Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Developers Section */}
        <section aria-labelledby="developers-heading">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ulm-purple">
              <UserCheck className="h-3.5 w-3.5" aria-hidden />
              Development Team
            </span>
            <h2
              id="developers-heading"
              className="mt-1 text-2xl font-bold tracking-tight text-ulm-dark sm:text-3xl"
            >
              Platform Developers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              The student engineers and developers behind the architecture, implementation, and maintenance of TestPrepHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DEVELOPERS.map((dev) => (
              <div
                key={dev.name}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-ulm-purple/40 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ulm-lavender text-ulm-purple font-bold text-base shadow-xs">
                        {dev.avatarText}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ulm-dark">{dev.name}</h3>
                        <span className="inline-block rounded-full bg-ulm-purple/10 px-2.5 py-0.5 text-xs font-semibold text-ulm-purple">
                          {dev.semester}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-semibold text-gray-700">
                    {dev.role}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {dev.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-2.5">
                  {dev.portfolio && (
                    <a
                      href={dev.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-ulm-purple px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-ulm-purple-dark transition"
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden />
                      <span>Portfolio</span>
                      <ExternalLink className="h-3 w-3 opacity-80" />
                    </a>
                  )}

                  {dev.linkedin && (
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600/30 bg-blue-50/70 px-3.5 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-600 hover:text-white transition"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="h-3 w-3 opacity-80" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Technology Stack */}
        <section
          aria-labelledby="tech-heading"
          className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-ulm-purple" aria-hidden />
            <h2 id="tech-heading" className="text-lg sm:text-xl font-bold text-ulm-dark">
              Technology Architecture
            </h2>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
            TestPrepHub is architected with modern web technologies, combining a responsive React 19 single-page
            application, Tailwind CSS design system, and Node.js/Express with MongoDB for high-performance question delivery.
            AI-driven dynamic quiz generation integrates directly with the Google Gemini API.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-ulm-lavender bg-ulm-lavender/30 px-3 py-1 text-xs font-medium text-ulm-dark"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Section 5: Academic Encouragement */}
        <div className="text-center pt-2 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-ulm-dark">
            Keep Practicing. Keep Improving.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-gray-600 leading-relaxed">
            Targeted daily practice strengthens fundamental understanding, improves accuracy under pressure,
            and builds confidence for your Computer Science competency assessment.
          </p>
        </div>
      </div>
    </>
  )
}
