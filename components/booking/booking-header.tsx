/** Shared title block for booking steps — participates in view transitions */
export function BookingHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <h1
        className="vt-booking-title text-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-3"
        style={{ viewTransitionName: "booking-title" }}
      >
        {title}
      </h1>
      <p
        className="vt-booking-subtitle text-muted-foreground text-lg leading-relaxed"
        style={{ viewTransitionName: "booking-subtitle" }}
      >
        {description}
      </p>
    </header>
  )
}
