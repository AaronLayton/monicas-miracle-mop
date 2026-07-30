import type { Metadata } from "next"
import { Link } from "next-view-transitions"
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react"
import { getPrimaryServices, BUSINESS } from "@/lib/data/services"
import { featuredSliderPair } from "@/lib/data/gallery"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { Reveal } from "@/components/motion/reveal"
import { HomeHeroVisual } from "@/components/home/hero-visual"
import { BeforeAfterSlider } from "@/components/gallery/before-after-slider"
import { TrustStrip } from "@/components/marketing/trust-strip"
import { ServiceCardGrid } from "@/components/marketing/service-card-grid"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { CtaPanel } from "@/components/marketing/cta-panel"
import { JsonLd } from "@/components/json-ld"
import {
  localBusinessSchema,
  webSiteSchema,
  personSchema,
} from "@/lib/seo/schema"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${BUSINESS.name} | House Cleaning in ${BUSINESS.primaryLocation}`,
    description: `Trusted domestic house cleaning in ${BUSINESS.primaryLocation} and nearby ${BUSINESS.region}. Book online in minutes.`,
    url: "/",
  },
}

export default function HomePage() {
  const services = getPrimaryServices()

  return (
    <>
      <JsonLd
        data={[localBusinessSchema(), webSiteSchema(), personSchema()]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero px-4 md:px-8 pb-20 pt-28 md:pt-32 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[28rem] gradient-orb blur-2xl opacity-80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-10%] size-[22rem] gradient-orb opacity-50"
        />

        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8 max-w-xl">
            <Reveal>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 ring-1 ring-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <Sparkles className="size-3.5" aria-hidden />
                Domestic cleaning · UK
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
                Creating comfort{" "}
                <span className="italic text-primary">through</span>
                <br />
                cleanliness
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                From regular refreshes to deep resets — {BUSINESS.name} brings
                spotless results, clear pricing, and a calm booking experience
                you can manage in one link.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/services">
                  Book a cleaning
                  <ArrowRight className="size-4" aria-hidden />
                </MagneticButton>
                <MagneticButton href="/about" variant="ghost">
                  Meet the team
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: Leaf, label: "Thoughtful products" },
                  { icon: ShieldCheck, label: "Insured & reliable" },
                  { icon: Clock, label: "Flexible scheduling" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/60 ring-1 ring-border/80 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    <Icon className="size-3.5 text-primary" aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <HomeHeroVisual />
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* SERVICES */}
      <section className="px-4 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
                  Our sparkling touch
                </p>
                <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
                  Services built for real homes
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                View all & book
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <ServiceCardGrid services={services} />
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="px-4 md:px-8 py-20 md:py-28 bg-white/40 border-y border-border/50">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
              Proof in the polish
            </p>
            <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight mb-5">
              See the difference,{" "}
              <span className="italic text-primary">slide by slide</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
              Every photo in our gallery comes from a real booking — no stock
              images, no staging. Drag the handle to watch a{" "}
              {featuredSliderPair.title.toLowerCase()} happen before your eyes.
            </p>
            <MagneticButton href="/gallery">
              Browse the gallery
              <ArrowRight className="size-4" aria-hidden />
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.12}>
            <BeforeAfterSlider
              before={featuredSliderPair.before}
              after={featuredSliderPair.after}
              sizes="(max-width: 1024px) 90vw, 440px"
              className="mx-auto w-full max-w-md"
            />
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* TESTIMONIALS */}
      <TestimonialsSection id="reviews" />

      {/* CTA — full-bleed image panel */}
      <CtaPanel
        heading="Ready for a calmer, cleaner home?"
        body="Book online now. You'll get a private page to tweak details, leave messages, or cancel — no account needed."
        chips={[
          "Honest GBP pricing",
          "15-min consultation",
          "No account required",
        ]}
        primary={{ label: "Start booking", href: "/services" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  )
}
