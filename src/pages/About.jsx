import PageHero from '../components/PageHero'

export default function About() {
  return (
    <>
      <PageHero
        title="About This Portal"
        subtitle="A frontend practice platform aligned with official CS competency examination areas."
      />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-gray-700 sm:px-6">
        <p>
          The CS Competency Test Preparation Portal helps students practice multiple-choice
          questions organized by the ten official competency areas and their syllabus topics. Each
          AI-generated quiz is scoped strictly to the competency area and topic you select.
        </p>
        <h2 className="text-xl font-semibold text-ulm-dark">How it works</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Choose a competency area and topic from the official dataset.</li>
          <li>Select 10 or 20 questions and a difficulty level.</li>
          <li>Generate a fresh AI quiz validated before display.</li>
          <li>Answer each question, review explanations, and view your final score.</li>
        </ol>
        <h2 className="text-xl font-semibold text-ulm-dark">AI & privacy</h2>
        <p>
          Quiz content is generated through the Google Gemini API from your browser. Configure your
          API key in a local <code className="rounded bg-gray-100 px-1">.env</code> file (never
          commit it). Restrict your key in Google Cloud Console for production use. This application
          does not include a backend database; preferences and recent results may be stored locally
          in your browser only.
        </p>
        <h2 className="text-xl font-semibold text-ulm-dark">Design</h2>
        <p>
          The interface uses an academic visual style inspired by institutional education portals —
          purple and gold accents, clean typography, and responsive layouts for desktop, tablet, and
          mobile study sessions.
        </p>
      </section>
    </>
  )
}
