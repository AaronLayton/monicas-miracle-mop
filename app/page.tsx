import type { Metadata } from "next"
import Image from "next/image"
import { Link } from "next-view-transitions"
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Clock,
} from "lucide-react"
import {
  getPrimaryServices,
  formatServicePrice,
  BUSINESS,
} from "@/lib/data/services"
import { featuredSliderPair } from "@/lib/data/gallery"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { HomeHeroVisual } from "@/components/home/hero-visual"
import { BeforeAfterSlider } from "@/components/gallery/before-after-slider"
import { cn } from "@/lib/utils"
import { JsonLd } from "@/components/json-ld"
import {
  localBusinessSchema,
  webSiteSchema,
  personSchema,
} from "@/lib/seo/schema"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

const testimonials = [
  {
    quote:
      "Kasey left our house gleaming. Honest about pricing, gentle with the kids' rooms, and always on time.",
    name: "Sarah M.",
    area: "Local client",
  },
  {
    quote:
      "The deep clean before we moved in was spotless. Managing the booking online was brilliantly simple.",
    name: "James & Priya",
    area: "Move-in clean",
  },
  {
    quote:
      "Finally a cleaner who communicates. The consultation call made everything clear — no surprises.",
    name: "Helen T.",
    area: "Fortnightly standard",
  },
]

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
      <section className="border-y border-border/50 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Star className="size-4 fill-primary text-primary" aria-hidden />
            Honest, flyer-matched pricing
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="size-4 text-primary" aria-hidden />
            {BUSINESS.consultationMinutes}-min consultation every job
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" aria-hidden />
            Manage or cancel via your private booking link
          </span>
        </div>
      </section>

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

          <Stagger className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services?service=${service.id}`}
                  className={cn(
                    "group relative flex h-full flex-col rounded-3xl p-7 md:p-8",
                    "bg-card shine-border shadow-float",
                    "transition-all duration-500 hover:-translate-y-1 hover:shadow-cinematic",
                    service.popular && "ring-2 ring-primary/30"
                  )}
                >
                  {service.badge && (
                    <span className="absolute top-5 right-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      {service.badge}
                    </span>
                  )}
                  <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <span className="text-display text-lg font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-display text-2xl font-semibold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-end justify-between gap-3 pt-4 border-t border-border/60">
                    <p className="text-xl font-bold text-primary">
                      {formatServicePrice(service)}
                    </p>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                      Select
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
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
              Book in minutes. Manage anytime.
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

      {/* TESTIMONIALS */}
      <section id="reviews" className="px-4 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
              Kind words
            </p>
            <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight mb-12">
              From our happy customers
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

      {/* CTA — full-bleed image panel */}
      <section className="px-4 md:px-8 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] shadow-cinematic min-h-[28rem] md:min-h-[22rem]">
            {/* Background photography */}
            <Image
              src="/images/professional-cleaner.jpg"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-[center_20%] scale-105"
              aria-hidden
            />
            {/* Brand wash over the photo */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/85 to-secondary/75"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,oklch(1_0_0/0.16),transparent_55%)]"
            />

            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 items-center px-8 py-14 md:px-14 md:py-16 lg:px-16">
              <div className="max-w-xl">
                <Image
                  src="/logo-transparent.png"
                  alt=""
                  width={320}
                  height={140}
                  className="mb-6 h-14 w-auto max-w-[14rem] object-contain object-left drop-shadow-md"
                />
                <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
                  Ready for a calmer, cleaner home?
                </h2>
                <p className="mt-4 text-white/85 max-w-md text-base leading-relaxed">
                  Book online now. You&apos;ll get a private page to tweak
                  details, leave messages, or cancel — no account needed.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Honest GBP pricing",
                    "15-min consultation",
                    "No account required",
                  ].map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/20"
                    >
                      <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row md:items-stretch">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Start booking
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
