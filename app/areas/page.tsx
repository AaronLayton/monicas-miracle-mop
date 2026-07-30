import type { Metadata, Route } from "next"
import { Link } from "next-view-transitions"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { MapPin, ArrowRight, Mail } from "lucide-react"
import { BUSINESS, SERVICE_AREAS } from "@/lib/data/services"
import { TrustStrip } from "@/components/marketing/trust-strip"
import { CtaPanel } from "@/components/marketing/cta-panel"
import { JsonLd } from "@/components/json-ld"
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/schema"

const AREAS_DESCRIPTION = `The ${BUSINESS.region} towns we cover for domestic house cleaning, including ${BUSINESS.primaryLocation}, Kirkby-in-Ashfield, Mansfield and nearby areas.`

export const metadata: Metadata = {
  title: `Service areas — ${BUSINESS.primaryLocation} & ${BUSINESS.region}`,
  description: AREAS_DESCRIPTION,
  alternates: { canonical: "/areas" },
  openGraph: {
    title: `Service areas | ${BUSINESS.name}`,
    description: AREAS_DESCRIPTION,
    url: "/areas",
  },
}

export default function AreasPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service areas", url: "/areas" },
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
              <MapPin className="size-3.5" aria-hidden />
              {BUSINESS.primaryLocation} · {BUSINESS.region}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
              Where we <span className="italic text-primary">clean</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Based in {BUSINESS.primaryLocation}, we cover the close
              surrounding {BUSINESS.region} area. Tap your town for local
              details, honest pricing and real before-and-after results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TOWN GRID */}
      <section className="px-4 md:px-8 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {SERVICE_AREAS.map((area) => (
              <StaggerItem key={area.slug} role="listitem">
                <Link
                  href={`/cleaning/${area.slug}` as Route}
                  className="group flex h-full items-center gap-4 rounded-3xl bg-card px-6 py-5 shadow-float shine-border hover:shadow-cinematic hover:-translate-y-0.5 transition-all"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      {area.name}
                      {area.isPrimary && (
                        <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                          Base
                        </span>
                      )}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      House cleaning in {area.name}
                    </span>
                  </span>
                  <ArrowRight className="size-4 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-3xl bg-primary/5 px-6 py-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-float">
                <Mail className="size-5" aria-hidden />
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                Just outside these areas? Email us at{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="font-semibold text-primary hover:underline underline-offset-4"
                >
                  {BUSINESS.email}
                </a>{" "}
                and we&apos;ll see what we can do.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* CTA */}
      <div className="pt-16 md:pt-20">
        <CtaPanel
          heading="Ready to book a clean near you?"
          body="Choose your service, pick a time that works, and confirm in minutes — you'll get a private page to manage everything."
          chips={[
            "Honest GBP pricing",
            "15-min consultation",
            "No deposit taken",
          ]}
          primary={{ label: "Book in our area", href: "/services" }}
          secondary={{ label: "Ask a question", href: "/contact" }}
        />
      </div>
    </>
  )
}
