/**
 * schema.org JSON-LD builders — pure functions, no React.
 *
 * Every node uses "@context": "https://schema.org" and a stable "@id" anchored
 * to the canonical site origin (getSiteUrl()), so nodes can cross-reference each
 * other (e.g. a Service's provider points at the "#business" node). Emit the
 * output through the <JsonLd> component.
 *
 * All URLs are absolute. Prices come straight from the pence values in
 * lib/data/services.ts. UK English throughout.
 */

import { getSiteUrl } from "@/lib/site"
import {
  BUSINESS,
  SOCIAL_LINKS,
  SERVICE_AREAS,
  WEEKLY_AVAILABILITY,
  getActiveServices,
  getPrimaryArea,
  type Service,
} from "@/lib/data/services"

const SCHEMA_CONTEXT = "https://schema.org"

/** Stable @id anchors (absolute, hash-suffixed against the canonical origin). */
export const NODE_ID = {
  business: "#business",
  website: "#website",
  founder: "#founder",
} as const

/** areaServed as schema.org City nodes, from the SERVICE_AREAS list. */
function areaServedCities() {
  return SERVICE_AREAS.map((area) => ({
    "@type": "City",
    name: area.name,
  }))
}

/** PostalAddress — locality + region only (service-area business, no street). */
function postalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.primaryLocation,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.addressCountry,
  }
}

/** Map WEEKLY_AVAILABILITY numeric weekday (0=Sun) to a schema.org day name. */
const DAY_OF_WEEK: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}

/** Absolute URL for a site-relative path. */
function abs(path = ""): string {
  const base = getSiteUrl()
  if (!path) return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

/** Absolute @id from a hash anchor, e.g. "#business" → "https://site#business". */
function nodeId(anchor: string): string {
  return `${getSiteUrl()}${anchor}`
}

/** Pence → a fixed-2dp price string, e.g. 2000 → "20.00". */
function priceString(pence: number): string {
  return (pence / 100).toFixed(2)
}

/** OpeningHoursSpecification[] derived from Kasey's real weekly availability. */
function openingHoursSpecification() {
  return Object.entries(WEEKLY_AVAILABILITY)
    .filter(
      (entry): entry is [string, { start: string; end: string }] =>
        entry[1] !== null
    )
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_OF_WEEK[Number(day)],
      opens: hours.start,
      closes: hours.end,
    }))
}

export interface BusinessSchemaOptions {
  /**
   * Restrict areaServed to a single town (used by the /cleaning/[town] pages).
   * Defaults to every town in SERVICE_AREAS.
   */
  areaServed?: string
}

/**
 * Kasey, the founder — a Person node (@id "#founder"). An E-E-A-T signal: it
 * tells search engines a real, named person stands behind the service.
 */
export function personSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Person",
    "@id": nodeId(NODE_ID.founder),
    name: BUSINESS.ownerName,
    jobTitle: "Owner & Cleaner",
    worksFor: { "@id": nodeId(NODE_ID.business) },
  }
}

/**
 * The core business node: a HouseCleaning business (a subtype of
 * ProfessionalService / LocalBusiness). @id "#business" — referenced by the
 * WebSite, Service, Person, and Breadcrumb nodes.
 *
 * Service-area business: emits areaServed (the towns) and a locality-level
 * PostalAddress (no street). Omits telephone/sameAs when the data is empty.
 */
export function localBusinessSchema(options: BusinessSchemaOptions = {}) {
  const url = getSiteUrl()
  const logo = abs("/apple-icon.png")

  const areaServed = options.areaServed
    ? [{ "@type": "City", name: options.areaServed }]
    : areaServedCities()

  const node: Record<string, unknown> = {
    "@context": SCHEMA_CONTEXT,
    "@type": "HouseCleaning",
    "@id": nodeId(NODE_ID.business),
    name: BUSINESS.name,
    url,
    email: BUSINESS.email,
    logo,
    image: logo,
    description: BUSINESS.tagline,
    slogan: BUSINESS.tagline,
    priceRange: "££",
    currenciesAccepted: BUSINESS.currency,
    paymentAccepted: BUSINESS.paymentAccepted,
    address: postalAddress(),
    areaServed,
    founder: { "@id": nodeId(NODE_ID.founder) },
    openingHoursSpecification: openingHoursSpecification(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${BUSINESS.name} services`,
      itemListElement: getActiveServices().map((service) => ({
        "@type": "Offer",
        priceCurrency: BUSINESS.currency,
        price: priceString(service.pricePence),
        itemOffered: {
          "@type": "Service",
          name: service.name,
        },
      })),
    },
  }

  if (BUSINESS.phone) {
    node.telephone = BUSINESS.phone
  }
  if (SOCIAL_LINKS.length > 0) {
    node.sameAs = SOCIAL_LINKS
  }

  return node
}

/** Alias — same node under the more generic "organization" name. */
export const organizationSchema = localBusinessSchema

/**
 * WebSite node (@id "#website"). Publisher references the "#business" node.
 * No SearchAction (the site has no search).
 */
export function webSiteSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    "@id": nodeId(NODE_ID.website),
    name: BUSINESS.name,
    url: getSiteUrl(),
    inLanguage: BUSINESS.locale,
    publisher: { "@id": nodeId(NODE_ID.business) },
  }
}

/** A single Service node with an Offer, providing back to "#business". */
export function serviceSchema(
  service: Service,
  options: BusinessSchemaOptions = {}
) {
  const areaServed = options.areaServed
    ? [{ "@type": "City", name: options.areaServed }]
    : areaServedCities()

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    "@id": `${getSiteUrl()}#service-${service.id}`,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": nodeId(NODE_ID.business) },
    areaServed,
    offers: {
      "@type": "Offer",
      priceCurrency: BUSINESS.currency,
      price: priceString(service.pricePence),
      availability: "https://schema.org/InStock",
    },
  }
}

/**
 * Service nodes for every active offering. Pass a subset to override; defaults
 * to getActiveServices().
 */
export function serviceListSchema(
  services: Service[] = getActiveServices(),
  options: BusinessSchemaOptions = {}
) {
  return services.map((service) => serviceSchema(service, options))
}

/**
 * NOTE — Review / AggregateRating markup is intentionally NOT emitted.
 *
 * The homepage testimonials are genuine text quotes, but the customers never
 * gave a numeric star rating, so asserting a "5.0" ratingValue in structured
 * data would be a self-serving rating that isn't visible on the page — against
 * Google's review-snippet guidelines and a manual-action risk.
 *
 * The correct, durable source of star ratings is the Google Business Profile:
 * those reviews power the ⭐ ratings shown in Maps and the local pack
 * automatically, with no site-side markup required. Revisit only if real,
 * on-page customer ratings are collected (e.g. a first-party review widget).
 */

export interface FaqItem {
  question: string
  answer: string
}

/** FAQPage node with Question / acceptedAnswer main entities. */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export interface BreadcrumbItem {
  name: string
  /** Site-relative path (e.g. "/services") or an absolute URL. */
  url: string
}

/** BreadcrumbList with positioned ItemListElements (absolute item URLs). */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : abs(item.url),
    })),
  }
}
