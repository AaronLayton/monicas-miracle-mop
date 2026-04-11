// Phase 1: Static placeholder data. Phase 2 will connect to BookingContext.

import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Route } from "next"
import { ShoppingBasket, ArrowRight, ShieldCheck, ThumbsUp, Clock } from "lucide-react"

interface BookingSummaryProps {
  className?: string
  /** When true, trust badges render outside the glass-card (services page layout) */
  showTrustBadgesOutside?: boolean
  /** When true, decorative blobs are hidden (services page has no blobs) */
  hideBlobs?: boolean
}

export function BookingSummary({ className, showTrustBadgesOutside = false, hideBlobs = false }: BookingSummaryProps) {
  return (
    <aside
      data-slot="booking-summary"
      className={cn(showTrustBadgesOutside ? "" : "space-y-6", className)}
    >
    <div
      className={cn(
        "relative overflow-hidden glass-card-sidebar p-8 border border-white/40",
        "shadow-[0_40px_80px_-20px_rgba(81,25,131,0.1)]",
        showTrustBadgesOutside ? "rounded-2xl" : "rounded-3xl"
      )}
    >
      {/* Decorative background blobs (hidden on services page) */}
      {!hideBlobs && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-primary-container/10 blur-3xl"
          />
        </>
      )}

      <div className="relative z-10">
        {/* Heading */}
        <h2 className="text-xl font-extrabold text-primary mb-6 flex items-center gap-2">
          <ShoppingBasket className="size-5" aria-hidden="true" />
          Booking Summary
        </h2>

        {/* Line items */}
        <div className="space-y-4 pb-6 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-foreground">Deep Clean</p>
              <p className="text-xs text-muted-foreground">3 Bedrooms, 2 Bathrooms</p>
            </div>
            <span className="font-bold text-foreground">£150.00</span>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-foreground">Oven Cleaning</p>
              <p className="text-xs text-muted-foreground">Add-on Service</p>
            </div>
            <span className="font-bold text-foreground">£45.00</span>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-foreground">Ironing Service</p>
              <p className="text-xs text-muted-foreground">Add-on Service</p>
            </div>
            <span className="font-bold text-foreground">£30.00</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 py-4 border-b border-border">
          <div className="w-12 h-14 rounded-xl bg-accent flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold uppercase text-secondary">Jan</span>
            <span className="text-lg font-black text-secondary leading-none">15</span>
          </div>
          <div>
            <p className="font-bold text-foreground">Wednesday, 09:00 AM</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" aria-hidden="true" />
              Est. 3–4 hours
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="py-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frequency</span>
            <span className="text-foreground font-medium">One-time</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">£225.00</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-extrabold text-primary">Total</span>
            <span className="text-2xl font-black text-primary">£225.00</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={"/schedule" as Route}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-4 px-6",
            "bg-primary text-primary-foreground font-bold text-base",
            "hover:shadow-[0_10px_20px_rgba(81,25,131,0.2)] transition-all duration-200",
            "active:scale-[0.98]"
          )}
        >
          Continue to Schedule
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

        <p className="text-[10px] text-center text-muted-foreground mt-6 uppercase tracking-widest font-bold">
          Secure 256-bit Encrypted Checkout
        </p>

        {/* Trust badges (inside card when not showing outside) */}
        {!showTrustBadgesOutside && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <ShieldCheck className="size-4 text-secondary shrink-0" aria-hidden="true" />
              Fully Insured
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <ThumbsUp className="size-4 text-secondary shrink-0" aria-hidden="true" />
              Miracle Guarantee
            </div>
          </div>
        )}
      </div>
    </div>

      {/* Trust badges (outside card on services page) */}
      {showTrustBadgesOutside && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <ShieldCheck className="size-4 text-secondary shrink-0" aria-hidden="true" />
            Fully Insured
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <ThumbsUp className="size-4 text-secondary shrink-0" aria-hidden="true" />
            Miracle Guarantee
          </div>
        </div>
      )}
    </aside>
  )
}
