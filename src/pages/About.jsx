import { BookOpen, BrainCircuit, CheckCircle2, Target } from 'lucide-react'

import PageHero from '../components/PageHero'

export default function About() {
  return (
    <>
      <PageHero
        title="About the Portal"
        subtitle="A focused learning platform for practicing Computer Science competency-based questions."
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-ulm-purple">
                About the Platform
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ulm-dark sm:text-3xl">
                Practice with purpose
              </h2>
            </div>

            <div className="space-y-4 text-base leading-7 text-gray-600">
              <p>
                The CS Competency Test Preparation Portal is an interactive learning
                platform designed to help Computer Science students practice
                competency-based multiple-choice questions.
              </p>

              <p>
                Students can explore competency areas, select specific topics, configure
                a quiz, and practice through either database-based questions or
                AI-generated quizzes.
              </p>

              <p>
                The goal is simple: make focused practice easier, more interactive, and
                more useful for students preparing for Computer Science competency
                assessments.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-ulm-lavender bg-ulm-lavender/30 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ulm-purple text-white">
              <Target className="h-6 w-6" aria-hidden />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-ulm-dark">
              Built for focused practice
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Select a subject and topic, generate a quiz, receive instant feedback,
              and review your performance after completing the quiz.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-ulm-purple">
              How It Works
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ulm-dark">
              From topic selection to results
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <StepCard
              icon={BookOpen}
              number="01"
              title="Choose a Subject"
              description="Select the Computer Science competency area you want to practice."
            />

            <StepCard
              icon={Target}
              number="02"
              title="Select a Topic"
              description="For AI quizzes, choose a specific topic and configure your preferences."
            />

            <StepCard
              icon={BrainCircuit}
              number="03"
              title="Generate & Practice"
              description="Start a database practice quiz or generate fresh questions with AI."
            />

            <StepCard
              icon={CheckCircle2}
              number="04"
              title="Review Your Result"
              description="Answer the questions, review explanations, and check your final score."
            />
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-ulm-purple">
              Key Features
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ulm-dark">
              Designed for practical learning
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              title="Competency-Based Practice"
              description="Practice questions organized around Computer Science competency areas and their topics."
            />

            <FeatureCard
              title="AI-Powered Quizzes"
              description="Generate fresh practice questions for a selected competency area and topic."
            />

            <FeatureCard
              title="Instant Feedback"
              description="See whether your selected answer is correct and review the provided explanation."
            />

            <FeatureCard
              title="Flexible Practice"
              description="Choose the number of questions and difficulty level when creating an AI quiz."
            />
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-ulm-lavender bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-ulm-purple">
            Technology
          </p>

          <h2 className="mt-2 text-2xl font-bold text-ulm-dark">
            Built with modern web technologies
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            The platform combines a React-based frontend with a Node.js and Express
            backend for database-powered practice. AI quiz generation uses the Google
            Gemini API.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              'React',
              'Vite',
              'Tailwind CSS',
              'React Router',
              'Node.js',
              'Express',
              'MongoDB',
              'Mongoose',
              'Google Gemini API',
              'Axios',
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-ulm-lavender bg-ulm-lavender/30 px-3 py-1.5 text-sm font-medium text-ulm-dark"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-2xl font-bold text-ulm-dark">
            Keep practicing. Keep improving.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Use focused practice sessions to strengthen your understanding of core
            Computer Science concepts and prepare with confidence.
          </p>
        </div>
      </section>
    </>
  )
}

function StepCard({ icon: Icon, number, title, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ulm-lavender text-ulm-purple">
          <Icon className="h-5 w-5" aria-hidden />
        </div>

        <span className="text-xs font-bold tracking-wide text-gray-400">
          {number}
        </span>
      </div>

      <h3 className="mt-5 font-semibold text-ulm-dark">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
    </div>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ulm-purple" aria-hidden />

        <div>
          <h3 className="font-semibold text-ulm-dark">{title}</h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}