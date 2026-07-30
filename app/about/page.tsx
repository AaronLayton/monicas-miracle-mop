import type { Metadata } from "next"
import Image from "next/image"
import { BUSINESS } from "@/lib/data/services"
import { sliderPairs } from "@/lib/data/gallery"
import { Reveal } from "@/components/motion/reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { BeforeAfterSlider } from "@/components/gallery/before-after-slider"
import { TrustStrip } from "@/components/marketing/trust-strip"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { CtaPanel } from "@/components/marketing/cta-panel"
import { CheckCircle2, Heart, Sparkles, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { organizationSchema, breadcrumbSchema, NODE_ID } from "@/lib/seo/schema"
import { getSiteUrl } from "@/lib/site"

const ABOUT_DESCRIPTION = `Meet the team behind ${BUSINESS.name} — professional domestic cleaning with heart.`

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: ABOUT_DESCRIPTION,
  openGraph: {
    title: `About | ${BUSINESS.name}`,
    description: ABOUT_DESCRIPTION,
    url: "/about",
  },
}

// A different real job from the homepage's featured pair.
const aboutSliderPair = sliderPairs[1]

export default function AboutPage() {
  const siteUrl = getSiteUrl()
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#webpage`,
    url: `${siteUrl}/about`,
    name: "About",
    description: ABOUT_DESCRIPTION,
    inLanguage: BUSINESS.locale,
    isPartOf: { "@id": `${siteUrl}${NODE_ID.website}` },
    about: { "@id": `${siteUrl}${NODE_ID.business}` },
    mainEntity: { "@id": `${siteUrl}${NODE_ID.business}` },
  }

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          aboutPageSchema,
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero px-4 md:px-8 pb-16 pt-28 md:pt-36 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[28rem] gradient-orb blur-2xl opacity-80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-10%] size-[22rem] gradient-orb opacity-50"
        />

        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-7 max-w-xl">
            <Reveal>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 ring-1 ring-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <Heart className="size-3.5" aria-hidden />
                Our story
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
                Cleaning with care,{" "}
                <span className="italic text-primary">not chaos</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-col gap-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {BUSINESS.name} is a domestic house cleaning business run by{" "}
                  {BUSINESS.ownerName} — named with a wink to Monica
                  Geller&apos;s legendary standards (yes, that Friends reference
                  is intentional).
                </p>
                <p>
                  We believe you deserve clear prices, a friendly consultation,
                  and a home that feels genuinely looked after. No hard sell. No
                  surprise fees. Just reliable cleans you can book and manage
                  online.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/services">
                  Book a clean
                  <ArrowRight className="size-4" aria-hidden />
                </MagneticButton>
                <MagneticButton href="/gallery" variant="ghost">
                  See our work
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <ul className="flex flex-col gap-3">
                {[
                  "15-minute consultation before every job",
                  "Honest pricing matching our flyer",
                  "Pay on the day by cash or bank transfer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] max-h-[520px] rounded-[2rem] overflow-hidden shadow-cinematic">
              <Image
                src="/images/professional-cleaner.jpg"
                alt="Professional cleaner at work"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5 ring-1 ring-white/40">
                <div className="flex items-center gap-3">
                  <Heart className="size-5 text-primary" />
                  <p className="text-sm font-medium">
                    Homes cared for like our own
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* WHY "MIRACLE MOP" */}
      <section className="px-4 md:px-8 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="rounded-3xl mesh-soft p-8 md:p-12">
            <div className="flex items-start gap-4 max-w-2xl">
              <Sparkles className="size-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-display text-2xl font-semibold mb-3">
                  Why “Miracle Mop”?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Because a great clean should feel a little bit magic — without
                  the drama. We show up prepared, communicate clearly, and leave
                  your space ready for real life.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEFORE / AFTER PROOF */}
      <section className="px-4 md:px-8 py-14 md:py-20 bg-white/40 border-y border-border/50">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
              The proof
            </p>
            <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight mb-5">
              We&apos;d rather <span className="italic text-primary">show</span>{" "}
              you
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
              Every photo in our gallery comes from a real booking — no stock
              images, no staging. Drag the handle to see the difference for
              yourself.
            </p>
            <MagneticButton href="/gallery">
              Browse the gallery
              <ArrowRight className="size-4" aria-hidden />
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.12}>
            <BeforeAfterSlider
              before={aboutSliderPair.before}
              after={aboutSliderPair.after}
              sizes="(max-width: 1024px) 90vw, 440px"
              className="mx-auto w-full max-w-md"
            />
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection heading="Kind words from real clients" />

      {/* CTA */}
      <CtaPanel
        heading="Let's take cleaning off your plate"
        body="Book online in minutes — you'll get a private page to tweak details, leave messages, or cancel. No account needed."
        chips={["Honest GBP pricing", "15-min consultation", "No deposit taken"]}
        primary={{ label: "Book a clean", href: "/services" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  )
}
