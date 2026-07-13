import type { Metadata, Route } from "next"
import { Link } from "next-view-transitions"
import { Reveal } from "@/components/motion/reveal"
import { MapPin, ArrowRight } from "lucide-react"
import { BUSINESS, SERVICE_AREAS } from "@/lib/data/services"
import { JsonLd } from "@/components/json-ld"
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: `Service areas — ${BUSINESS.primaryLocation} & ${BUSINESS.region}`,
  description: `The ${BUSINESS.region} towns we cover for domestic house cleaning, including ${BUSINESS.primaryLocation}, Kirkby-in-Ashfield, Mansfield and nearby areas.`,
  alternates: { canonical: "/areas" },
}

export default function AreasPage() {
  return (
    <div className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-14 md:pb-20">
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service areas", url: "/areas" },
          ]),
        ]}
      />
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
          Coverage
        </p>
        <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Where we clean
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Based in {BUSINESS.primaryLocation}, we cover the close surrounding{" "}
          {BUSINESS.region} area. Tap your town for local details, or if
          you&apos;re just outside these areas, email us and we&apos;ll see what
          we can do.
        </p>
      </Reveal>
      <ul className="grid gap-3 sm:grid-cols-2 mb-12">
        {SERVICE_AREAS.map((area) => (
          <Reveal key={area.slug}>
            <li>
              <Link
                href={`/cleaning/${area.slug}` as Route}
                className="group flex items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-float shine-border hover:text-primary transition-colors"
              >
                <MapPin className="size-5 text-primary shrink-0" />
                <span className="font-medium flex-1">
                  {area.name}
                  {area.isPrimary ? (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                      Base
                    </span>
                  ) : null}
                </span>
                <ArrowRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
      <Link
        href="/services"
        className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cinematic"
      >
        Book in our area
      </Link>
    </div>
  )
}
