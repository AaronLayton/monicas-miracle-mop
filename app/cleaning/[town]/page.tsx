import type { Metadata, Route } from "next"
import { notFound } from "next/navigation"
import { Link } from "next-view-transitions"
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react"
import {
  BUSINESS,
  SERVICE_AREAS,
  getServiceArea,
  getPrimaryServices,
  formatServicePrice,
} from "@/lib/data/services"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { JsonLd } from "@/components/json-ld"
import {
  localBusinessSchema,
  serviceListSchema,
  breadcrumbSchema,
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
  const description = `Reliable domestic house cleaning in ${area.name}, ${BUSINESS.region}. Standard cleans, deep cleans and move-in/out cleans with honest GBP pricing from ${BUSINESS.name}. Book online in minutes.`

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

export default async function TownCleaningPage({ params }: Props) {
  const { town } = await params
  const area = getServiceArea(town)
  if (!area) notFound()

  const services = getPrimaryServices()
  const nearby = SERVICE_AREAS.filter((a) => a.slug !== area.slug)

  return (
    <div className="page-nav-offset mx-auto max-w-4xl px-4 md:px-8 pb-14 md:pb-20">
      <JsonLd
        data={[
          localBusinessSchema({ areaServed: area.name }),
          ...serviceListSchema(undefined, { areaServed: area.name }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service areas", url: "/areas" },
            { name: area.name, url: `/cleaning/${area.slug}` },
          ]),
        ]}
      />

      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3 flex items-center gap-2">
          <MapPin className="size-4" /> {area.name}, {BUSINESS.region}
        </p>
        <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          House cleaning in {area.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {BUSINESS.name} provides friendly, reliable domestic cleaning across{" "}
          {area.name} and the surrounding {BUSINESS.region} area. Whether you
          need a regular standard clean, a one-off deep clean, or a move-in /
          move-out clean, you&apos;ll get honest GBP pricing and a home that
          feels genuinely cared for — no surprises.
        </p>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Every job starts with a short consultation call so we get your keys,
          requirements and access right. You pay on the day by bank transfer or
          cash — never any deposit taken online.
        </p>
      </Reveal>

      <Reveal>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cinematic"
        >
          Get a price in {area.name} <ArrowRight className="size-4" />
        </Link>
      </Reveal>

      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-16 mb-6">
        Cleaning services we offer in {area.name}
      </h2>
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <div className="h-full rounded-2xl bg-card p-6 shadow-float shine-border flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-secondary shrink-0" />
                <h3 className="font-semibold">{service.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {service.description}
              </p>
              <p className="text-sm font-semibold text-primary">
                {formatServicePrice(service)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-16 mb-4">
        Nearby areas we also cover
      </h2>
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

      <div className="mt-16 rounded-3xl bg-primary/5 p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">
          Ready to book a clean in {area.name}?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Choose your service, pick a time that works, and confirm in minutes.
        </p>
        <Link
          href="/schedule"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cinematic"
        >
          Book your clean <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
