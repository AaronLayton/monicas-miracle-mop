import { Star } from "lucide-react"
import { testimonials } from "@/lib/data/testimonials"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

/** Customer quote cards — heading is overridable per page. */
export function TestimonialsSection({
  id,
  heading = "From our happy customers",
}: {
  id?: string
  heading?: string
}) {
  return (
    <section id={id} className="px-4 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            Kind words
          </p>
          <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight mb-12">
            {heading}
          </h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <blockquote className="h-full rounded-3xl bg-card p-7 shadow-float shine-border flex flex-col gap-6">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-foreground flex-1">
                  “{t.quote}”
                </p>
                <footer>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.area}
                  </p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
