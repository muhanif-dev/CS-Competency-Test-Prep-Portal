import CompetencyCard from '../components/CompetencyCard'
import PageHero from '../components/PageHero'
import { competencies } from '../data/competencies'

export default function Competencies() {
  return (
    <>
      <PageHero
        title="Competency Areas"
        subtitle="Select a competency area to view its topics and start a focused AI-generated quiz."
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c) => (
            <CompetencyCard key={c.id} competency={c} />
          ))}
        </div>
      </section>
    </>
  )
}
