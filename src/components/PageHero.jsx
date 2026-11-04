export default function PageHero({ title, subtitle, children }) {
  return (
    <section className="border-b border-ulm-lavender bg-gradient-to-b from-ulm-lavender/60 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ulm-dark break-words">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2.5 sm:mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}
