import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

const steps = [
  {
    n: "01",
    title: "Choose your clean",
    body: "Pick a service, add extras if you need them, and see transparent GBP pricing as you go.",
  },
  {
    n: "02",
    title: "Pick a time that works",
    body: "Choose a date and arrival window. Tell us about your home in a few taps — no long forms.",
  },
  {
    n: "03",
    title: "Confirm & relax",
    body: "Confirmation by email and a short call so we get keys and details right. Pay on the day by bank transfer or cash.",
  },
]

/** Three-step booking explainer over the soft mesh background. */
export function HowItWorks({
  heading = "Book in minutes. Manage anytime.",
}: {
  heading?: string
}) {
  return (
    <section className="relative px-4 md:px-8 py-20 md:py-28">
      {/* Mesh fades out at top/bottom so it doesn’t end in a hard band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mesh-soft"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 78%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            Simple process
          </p>
          <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight mb-14 max-w-lg">
            {heading}
          </h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StaggerItem key={step.n}>
              <div className="relative rounded-3xl bg-white/85 p-8 shine-border shadow-float h-full">
                <span className="text-display text-5xl font-semibold text-primary/30">
                  {step.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
