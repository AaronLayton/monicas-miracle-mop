import type { Metadata } from "next"
import { Plus, HelpCircle, Mail, ArrowRight } from "lucide-react"
import {
  BUSINESS,
  SERVICE_AREAS,
  getWorkingDays,
  getPrimaryServices,
  formatServicePrice,
} from "@/lib/data/services"
import { Reveal } from "@/components/motion/reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { CtaPanel } from "@/components/marketing/cta-panel"
import { JsonLd } from "@/components/json-ld"
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schema"

const FAQ_DESCRIPTION =
  "Common questions about booking, pricing, and cancellations."

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description: FAQ_DESCRIPTION,
  openGraph: {
    title: `FAQ | ${BUSINESS.name}`,
    description: FAQ_DESCRIPTION,
    url: "/faq",
  },
}

/** ["a", "b", "c"] → "a, b and c" — lists that read as prose. */
function joinProse(items: string[]): string {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
}

function buildFaqs() {
  const priceList = getPrimaryServices()
    .map((s) => `${s.name} ${formatServicePrice(s).replace("From", "from")}`)
    .join(", ")
  const areaList = joinProse(
    SERVICE_AREAS.map((a) => (a.isPrimary ? `${a.name} (our base)` : a.name))
  )
  const hoursList = joinProse(
    getWorkingDays().map((d) => `${d.name} ${d.start}–${d.end}`)
  )

  return [
    {
      q: "What services do you offer?",
      a: `Our core cleans — ${priceList} — plus add-ons from oven cleaning and inside windows to ironing and laundry. Every price is published up front, and you can stack add-ons for a multi-service discount.`,
    },
    {
      q: "Which areas do you cover?",
      a: `We cover ${areaList}. Just outside those? Email us and we'll see what we can do.`,
    },
    {
      q: "When can you clean?",
      a: `Kasey currently works ${hoursList}. Arrival windows that fall outside these hours show as unavailable on the schedule step, and your exact arrival time is confirmed on the consultation call.`,
    },
    {
      q: "Do I need to create an account?",
      a: "No. After you book, you get a private link to manage that booking — change the date, leave a message, or cancel. Keep the link safe like a hotel confirmation.",
    },
    {
      q: "How does pricing work?",
      a: "Prices match our published flyer. Hourly services are estimated from the hours you select; deep cleans and move-outs are confirmed on your consultation once we understand the property.",
    },
    {
      q: "Is a deposit required?",
      a: "No deposit needed. You pay in full on the day by cash or bank transfer, once your clean is done.",
    },
    {
      q: "What is the consultation call?",
      a: `Every job includes a short ~${BUSINESS.consultationMinutes}-minute call covering keys/access, what you need, and our terms — so there are no surprises.`,
    },
    {
      q: "What is the cancellation policy?",
      a: `Please give at least ${BUSINESS.cancellationHours} hours' notice. Under ${BUSINESS.cancellationHours} hours incurs a ${BUSINESS.lateCancelFeePercent}% fee. If we are locked out, the full fee may apply.`,
    },
    {
      q: "Can I change my booking later?",
      a: "Yes — open your private booking page from the confirmation email. You can update the date, arrival window, or leave a message for us.",
    },
  ]
}

export default function FaqPage() {
  const faqs = buildFaqs()

  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(faqs.map((item) => ({ question: item.q, answer: item.a }))),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero px-4 md:px-8 pb-14 pt-28 md:pt-36 md:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[28rem] gradient-orb blur-2xl opacity-80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-10%] size-[22rem] gradient-orb opacity-50"
        />

        <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 ring-1 ring-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              <HelpCircle className="size-3.5" aria-hidden />
              FAQ
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
              Questions, <span className="italic text-primary">answered</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Everything about booking, pricing and how we work. Can&apos;t find
              what you need? Ask us directly — we reply quickly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ACCORDIONS + ASIDE */}
      <section className="px-4 md:px-8 py-14 md:py-20">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_20rem] items-start">
          <div className="flex flex-col gap-4">
            <h2 className="sr-only">All questions</h2>
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.03}>
                <details className="faq-accordion group rounded-3xl bg-card shadow-float shine-border open:shadow-cinematic transition-shadow">
                  <summary className="cursor-pointer list-none px-6 py-5 font-semibold text-foreground flex items-center justify-between gap-4">
                    {item.q}
                    <Plus className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed -mt-1">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={0.1}
            className="lg:sticky lg:top-28"
            role="complementary"
            aria-label="Still have a question?"
          >
            <div className="rounded-3xl bg-card p-7 shadow-float shine-border flex flex-col gap-5">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Mail className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-semibold text-foreground mb-1.5">
                  Still have a question?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Email us, or book and leave a note — every job starts with a
                  consultation call anyway.
                </p>
              </div>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-sm font-medium text-primary hover:underline underline-offset-4 break-all"
              >
                {BUSINESS.email}
              </a>
              <MagneticButton href="/services" className="w-full">
                Book a clean
                <ArrowRight className="size-4" aria-hidden />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CtaPanel
        heading="Ready when you are"
        body="Choose your service, pick a time that works, and confirm in minutes — you'll get a private page to manage everything."
        chips={["Honest GBP pricing", "15-min consultation", "No deposit taken"]}
        primary={{ label: "Start booking", href: "/services" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  )
}
