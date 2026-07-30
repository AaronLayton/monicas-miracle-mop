import { Suspense } from "react"
import type { Metadata } from "next"
import { ServicesSelector } from "@/components/booking/services-selector"
import { BUSINESS } from "@/lib/data/services"
import { JsonLd } from "@/components/json-ld"
import {
  localBusinessSchema,
  serviceListSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

const SERVICES_DESCRIPTION =
  "Choose Standard Clean, Deep Clean, or Move-In/Out — plus add-ons. Honest GBP pricing."

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description: SERVICES_DESCRIPTION,
  openGraph: {
    title: `Services | ${BUSINESS.name}`,
    description: SERVICES_DESCRIPTION,
    url: "/services",
  },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          ...serviceListSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
          ]),
        ]}
      />
      <Suspense
        fallback={
          <div className="page-nav-offset mx-auto max-w-7xl px-4 pb-20 text-muted-foreground">
            Loading services…
          </div>
        }
      >
        <ServicesSelector />
      </Suspense>
    </>
  )
}
