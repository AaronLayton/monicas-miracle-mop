import type { Metadata, Route } from "next"
import { notFound } from "next/navigation"
import { Link } from "next-view-transitions"
import {
  ArrowRight,
  Banknote,
  Home,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
} from "lucide-react"
import {
  BUSINESS,
  SERVICE_AREAS,
  getServiceArea,
  getPrimaryServices,
  formatServicePrice,
} from "@/lib/data/services"
import { sliderPairs } from "@/lib/data/gallery"
import { Reveal } from "@/components/motion/reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { BeforeAfterSlider } from "@/components/gallery/before-after-slider"
import { TrustStrip } from "@/components/marketing/trust-strip"
import { ServiceCardGrid } from "@/components/marketing/service-card-grid"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { CtaPanel } from "@/components/marketing/cta-panel"
import { JsonLd } from "@/components/json-ld"
import {
  localBusinessSchema,
  serviceListSchema,
  breadcrumbSchema,
  faqPageSchema,
  type FaqItem,
} from "@/lib/seo/schema"

type Props = { params: Promise<{ town: string }> }

/** Pre-render one static page per service area. */
export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ town: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { town } = await params
  const area = getServiceArea(town)
  if (!area) return {}

  const title = `House Cleaning in ${area.name}`
  const description = `Reliable domestic house cleaning in ${area.name}, ${BUSINESS.region}. Standard cleans, deep cleans and move-in/out cleans with honest GBP pricing from ${BUSINESS.name}. Book online in minutes${BUSINESS.phone ? ` or call ${BUSINESS.phone}` : ""}.`

  return {
    title,
    description,
    alternates: { canonical: `/cleaning/${area.slug}` },
    openGraph: {
      title: `${title} | ${BUSINESS.name}`,
      description,
      url: `/cleaning/${area.slug}`,
    },
  }
}

/** Town-specific FAQs, built from the canonical business data. */
function buildFaqs(areaName: string, isPrimary: boolean): FaqItem[] {
  // The base town is already named in the answer itself — keep it out of the
  // "nearby" list so non-primary pages don't name it twice in one sentence.
  const nearby = SERVICE_AREAS.filter(
    (a) => a.name !== areaName && !a.isPrimary
  )
    .slice(0, 3)
    .map((a) => a.name)
    .join(", ")
  const priceList = getPrimaryServices()
    .map((s) => `${s.name} ${formatServicePrice(s).replace("From", "from")}`)
    .join(", ")

  return [
    {
      question: `Do you cover all of ${areaName}?`,
      answer: isPrimary
        ? `Yes — ${areaName} is our home base, so we cover the whole town along with nearby ${nearby}. If you're just outside the area, get in touch and we'll see what we can do.`
        : `Yes — we're based in ${BUSINESS.primaryLocation}, just up the road, and cover all of ${areaName} along with nearby ${nearby}. If you're just outside the area, get in touch and we'll see what we can do.`,
    },
    {
      question: `How much does house cleaning cost in ${areaName}?`,
      answer: `Prices match our published flyer: ${priceList}. Your exact price is confirmed on a short consultation call before the job — no hidden extras.`,
    },
    {
      question: "Do I need to pay a deposit?",
      answer:
        "No. There's nothing to pay online and no deposit — you pay on the day by bank transfer or cash, once your clean is done.",
    },
    {
      question: `How do I book a clean in ${areaName}?`,
      answer:
        `Book online in a few minutes: choose a service, pick a date and arrival window, and confirm. You'll get a private link to manage the booking, and a short ~${BUSINESS.consultationMinutes}-minute call before the job so we get keys and requirements right.` +
        (BUSINESS.phone ? ` Prefer to talk first? Call ${BUSINESS.phone}.` : ""),
    },
    {
      question: "What if I need to cancel or reschedule?",
      answer: `Please give at least ${BUSINESS.cancellationHours} hours' notice — you can reschedule or cancel free from your private booking page. Under ${BUSINESS.cancellationHours} hours incurs a ${BUSINESS.lateCancelFeePercent}% fee.`,
    },
  ]
}

export default async function TownCleaningPage({ params }: Props) {
  const { town } = await params
  const area = getServiceArea(town)
  if (!area) notFound()

  const services = getPrimaryServices()
  const nearby = SERVICE_AREAS.filter((a) => a.slug !== area.slug)
  const faqs = buildFaqs(area.name, area.isPrimary ?? false)

  // Rotate the featured before/after pair so each town page shows a
  // different real job.
  const areaIndex = SERVICE_AREAS.findIndex((a) => a.slug === area.slug)
  const pair = sliderPairs[Math.max(areaIndex, 0) % sliderPairs.length]

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({ areaServed: area.name }),
          // Only the three services actually shown on this page.
          ...serviceListSchema(services, { areaServed: area.name }),
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service areas", url: "/areas" },
            { name: area.name, url: `/cleaning/${area.slug}` },
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
                <MapPin className="size-3.5" aria-hidden />
                {area.name} · {BUSINESS.region}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
                House cleaning in{" "}
                <span className="italic text-primary">{area.name}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                {area.intro} We bring friendly, reliable domestic cleaning —
                regular standard cleans, one-off deep cleans and move-in /
                move-out cleans, all with honest GBP pricing and a booking you
                can manage from one private link.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/services">
                  Book a clean
                  <ArrowRight className="size-4" aria-hidden />
                </MagneticButton>
                {BUSINESS.phone ? (
                  <a
                    href={`tel:${BUSINESS.phoneIntl}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/60 px-7 py-3.5 text-sm font-semibold text-foreground ring-1 ring-border transition-all duration-300 hover:bg-white active:scale-[0.98] focus-ring"
                  >
                    <Phone className="size-4 text-primary" aria-hidden />
                    Call {BUSINESS.phone}
                  </a>
                ) : (
                  <MagneticButton href="/gallery" variant="ghost">
                    See real results
                  </MagneticButton>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: ShieldCheck, label: "Insured & reliable" },
                  { icon: Banknote, label: "Pay on the day — no deposit" },
                  {
                    icon: Home,
                    label: area.isPrimary
                      ? "Our home base"
                      : `Based in ${BUSINESS.primaryLocation}`,
                  },
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

          <Reveal delay={0.12}>
            <BeforeAfterSlider
              before={pair.before}
              after={pair.after}
              sizes="(max-width: 1024px) 90vw, 440px"
              className="mx-auto w-full max-w-md"
              priority
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {pair.title} from a real booking — drag the handle to compare.
            </p>
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
                  Local services
                </p>
                <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
                  Cleaning services in {area.name}
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

      {/* HOW IT WORKS */}
      <HowItWorks heading={`Booking in ${area.name} takes minutes.`} />

      {/* TESTIMONIALS */}
      <TestimonialsSection heading="Trusted by local homeowners" />

      {/* LOCAL FAQ */}
      <section className="px-4 md:px-8 py-20 md:py-28 bg-white/40 border-y border-border/50">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
              Local answers
            </p>
            <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight mb-12">
              Cleaning in {area.name}, answered
            </h2>
          </Reveal>
          <div className="flex flex-col gap-4">
            {faqs.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.04}>
                <details className="faq-accordion group rounded-3xl bg-card shadow-float shine-border open:shadow-cinematic transition-shadow">
                  <summary className="cursor-pointer list-none px-6 py-5 font-semibold text-foreground flex items-center justify-between gap-4">
                    {item.question}
                    <Plus className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed -mt-1">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY AREAS */}
      <section className="px-4 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
              Nearby areas we also cover
            </h2>
          </Reveal>
          <ul className="flex flex-wrap gap-2.5">
            {nearby.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/cleaning/${a.slug}` as Route}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="size-3.5 text-primary" /> {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <CtaPanel
        heading={`Ready for a sparkling home in ${area.name}?`}
        body={
          BUSINESS.phone
            ? "Book online in minutes — you'll get a private page to tweak details, leave messages, or cancel. Prefer a chat first? Give Kasey a ring."
            : "Book online in minutes — you'll get a private page to tweak details, leave messages, or cancel. No account needed."
        }
        chips={["Honest GBP pricing", "15-min consultation", "No deposit taken"]}
        primary={{ label: "Book your clean", href: "/services" }}
        secondary={
          BUSINESS.phone
            ? {
                label: `Call ${BUSINESS.phone}`,
                href: `tel:${BUSINESS.phoneIntl}`,
                icon: <Phone className="size-4" aria-hidden />,
              }
            : { label: "Ask a question", href: "/contact" }
        }
      />
    </>
  )
}
