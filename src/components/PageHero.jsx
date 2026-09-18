export default function PageHero({ title, subtitle, children }) {
  return (
    <section className="border-b border-ulm-lavender bg-gradient-to-b from-ulm-lavender/60 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-ulm-dark sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">{subtitle}</p>
        )}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}
