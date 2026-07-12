import { Suspense } from "react"
import type { Metadata } from "next"
import { ServicesSelector } from "@/components/booking/services-selector"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Choose Standard Clean, Deep Clean, or Move-In/Out — plus add-ons. Honest GBP pricing.",
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="page-nav-offset mx-auto max-w-7xl px-4 pb-20 text-muted-foreground">
          Loading services…
        </div>
      }
    >
      <ServicesSelector />
    </Suspense>
  )
}
