import {
  Award,
  Briefcase,
  CheckCircle2,
  Code2,
  Compass,
  ExternalLink,
  GraduationCap,
  Mail,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
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
    role: 'Team Member',
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
        title="About TestPrepHub"
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

        {/* Section 2: University of Lakki Marwat — Department of Computer Science & IT */}
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
                    Department of Computer Science & IT
                  </h2>
                </div>
              </div>

              <p className="text-sm font-medium text-gray-500">
                University of Lakki Marwat (ULM)
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                The Department of Computer Science & Information Technology at the University of Lakki Marwat
                is committed to delivering quality computer science education rooted in research, innovation,
                and hands-on practical learning.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                The department’s mission is to produce graduates capable of developing high-quality software
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
                  <span>University of Lakki Marwat — Department of CS & IT</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>

            {/* Department Leadership & Contact Card */}
            <div className="w-full lg:max-w-xs shrink-0 rounded-xl border border-ulm-lavender bg-ulm-lavender/30 p-5 space-y-4">
              <div className="border-b border-ulm-lavender pb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Department Leadership
                </span>
                <h3 className="mt-1 text-base font-bold text-ulm-dark">
                  Dr. Muhammad Bilal Qureshi
                </h3>
                <p className="text-xs font-semibold text-ulm-purple">
                  Director of Computer Science & IT
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  University of Lakki Marwat
                </p>
              </div>

              <div className="space-y-2 text-xs">
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
                  <Briefcase className="h-4 w-4 shrink-0 text-ulm-purple" aria-hidden />
                  <span>Training & Placement Cell</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Compass className="h-4 w-4 shrink-0 text-ulm-purple" aria-hidden />
                  <span>Quality Academic Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Team Section — Blood Bank Project Reference */}
        <section aria-labelledby="team-heading">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ulm-purple">
                <Users className="h-3.5 w-3.5" aria-hidden />
                Project Contributors
              </span>
              <h2
                id="team-heading"
                className="mt-1 text-2xl font-bold tracking-tight text-ulm-dark sm:text-3xl"
              >
                CodeMind Team
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                The contributors and academic leadership behind student platform initiatives.
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
                className={`rounded-xl border p-4 transition-all duration-150 ${
                  member.isLead
                    ? 'border-ulm-purple/30 bg-ulm-lavender/40 shadow-xs'
                    : 'border-gray-200 bg-white shadow-2xs hover:border-ulm-lavender hover:bg-ulm-lavender/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${
                      member.isLead
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
                      className={`text-xs font-semibold ${
                        member.isLead ? 'text-ulm-purple' : 'text-gray-700'
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
