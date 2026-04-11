import { Suspense } from "react"
import type { Metadata } from "next"
import type { Route } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BookingSummary } from "@/components/booking/booking-summary"
import { HomeDetailsSection } from "@/components/schedule/home-details-section"
import { DateSection } from "@/components/schedule/date-section"
import { ArrivalSection } from "@/components/schedule/arrival-section"

export const metadata: Metadata = {
  title: "Schedule | Monica's Miracle Mop",
  description:
    "Choose your home details, preferred date, and arrival window for your cleaning appointment.",
}

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Page heading */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Schedule Your Clean
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tell us about your home, pick a date, and choose an arrival window.
          </p>
        </div>

        {/* Two-column layout: sections left, summary right */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left column: 3 sections */}
          <div className="flex flex-col gap-6">
            {/* Section 1: Home Details */}
            <HomeDetailsSection />

            {/* Section 2: Service Date — wrapped in Suspense because CalendarPicker
                uses new Date() client-side (required by Next.js 16 with cacheComponents) */}
            <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
              <DateSection />
            </Suspense>

            {/* Section 3: Arrival Window */}
            <ArrivalSection />

            {/* Continue CTA */}
            <Link
              href={"/checkout" as Route}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:shadow-[0_10px_20px_rgba(81,25,131,0.2)] active:scale-[0.98]"
            >
              Continue to Checkout
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right column: Booking summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingSummary />
          </div>
        </div>
      </div>
    </main>
  )
}
