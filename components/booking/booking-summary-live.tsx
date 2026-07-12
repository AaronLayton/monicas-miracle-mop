"use client"

import type { ReactNode } from "react"
import {
  formatPrice,
  formatHours,
  BUNDLE_DISCOUNTS,
  DEPOSITS_ENABLED,
} from "@/lib/data/services"
import { useBooking } from "@/lib/booking/context"
import { ARRIVAL_WINDOWS } from "@/lib/data/services"
import { cn } from "@/lib/utils"
import { Clock, Tag } from "lucide-react"

export function BookingSummaryLive({
  className,
  actions,
}: {
  className?: string
  /** Primary CTA (and optional back) — pinned under the overview */
  actions?: ReactNode
}) {
  const {
    draft,
    lineItems,
    estimatedTotalPence,
    depositPence,
    priced,
    suggestedHours,
  } = useBooking()

  const window = ARRIVAL_WINDOWS.find((w) => w.id === draft.arrivalWindowId)
  const nextTier = BUNDLE_DISCOUNTS.find((t) => t.minItems > priced.itemCount)

  return (
    /*
     * Sticky shell is OUTSIDE the named transition target.
     * Putting view-transition-name on position:sticky elements breaks
     * shared-element morphing in Chromium (capture geometry goes wrong).
     */
    <div className={cn("w-full lg:sticky lg:top-24 lg:self-start", className)}>
      <aside
        data-slot="booking-summary"
        className="vt-booking-sidebar w-full glass-card-sidebar rounded-3xl p-6 md:p-7 shadow-float shine-border"
        style={{ viewTransitionName: "booking-sidebar" }}
      >
        <h2 className="text-display text-xl font-semibold text-foreground mb-1">
          Your booking
        </h2>
        <p className="text-xs text-muted-foreground mb-6">
          Estimates only — confirmed on your consultation call
        </p>

        {lineItems.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Select a service to see your summary
          </p>
        ) : (
          <ul className="flex flex-col gap-3 mb-6">
            {lineItems.map((item) => {
              const isDiscount = item.totalPence < 0
              return (
                <li
                  key={`${item.serviceId}-${item.quantity}-${item.name}`}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span
                    className={cn(
                      isDiscount
                        ? "text-secondary font-medium"
                        : "text-foreground"
                    )}
                  >
                    {isDiscount && (
                      <Tag
                        className="inline size-3.5 mr-1 -mt-0.5"
                        aria-hidden
                      />
                    )}
                    {item.name}
                    {item.hours ? (
                      <span className="block text-xs text-muted-foreground">
                        ~{formatHours(item.hours)}
                      </span>
                    ) : null}
                    {item.quantity > 1 ? (
                      <span className="block text-xs text-muted-foreground">
                        ×{item.quantity}
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "font-medium tabular-nums shrink-0",
                      isDiscount ? "text-secondary" : "text-foreground"
                    )}
                  >
                    {isDiscount
                      ? `−${formatPrice(Math.abs(item.totalPence))}`
                      : formatPrice(item.totalPence)}
                  </span>
                </li>
              )
            })}
          </ul>
        )}

        {draft.primaryServiceId && (
          <div className="mb-5 rounded-2xl bg-primary-soft/40 px-3.5 py-3 ring-1 ring-primary/10">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Clock className="size-4 shrink-0" aria-hidden />
              Suggested visit · {formatHours(draft.estimatedHours)}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Built from your clean, home size
              {draft.addons.length
                ? ` and ${draft.addons.length} add-on${draft.addons.length === 1 ? "" : "s"}`
                : ""}
              {draft.hoursManualOverride
                ? " · you’ve overridden this"
                : ` · auto ${formatHours(suggestedHours)}`}
            </p>
          </div>
        )}

        {nextTier && draft.primaryServiceId && (
          <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground rounded-xl bg-muted/60 px-3 py-2">
            Add {nextTier.minItems - priced.itemCount} more service
            {nextTier.minItems - priced.itemCount === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-secondary">
              {nextTier.percent}% off
            </span>
          </p>
        )}

        <div className="flex flex-col gap-2 border-t border-border/70 pt-4 text-sm">
          {draft.date && (
            <Row label="Date" value={formatDisplayDate(draft.date)} />
          )}
          {window && <Row label="Arrival" value={window.label} />}
          <Row
            label="Home"
            value={`${draft.bedrooms} bed · ${draft.bathrooms} bath · ${draft.kitchens} kit`}
          />
          <Row label="Visit" value={formatHours(draft.estimatedHours)} />
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-4">
          {priced.discountPence > 0 && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums">
                  {formatPrice(priced.subtotalPence)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-secondary">
                <span>Bundle saving</span>
                <span className="font-semibold tabular-nums">
                  −{formatPrice(priced.discountPence)}
                </span>
              </div>
            </>
          )}
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-muted-foreground">
              Estimated total
            </span>
            <span
              key={estimatedTotalPence}
              className="text-2xl font-bold text-primary tabular-nums transition-all"
            >
              {formatPrice(estimatedTotalPence)}
            </span>
          </div>
          {DEPOSITS_ENABLED && depositPence > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deposit due today</span>
              <span className="font-semibold tabular-nums">
                {formatPrice(depositPence)}
              </span>
            </div>
          )}
        </div>

        {actions ? (
          <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-5">
            {actions}
          </div>
        ) : null}
      </aside>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  )
}

function formatDisplayDate(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch {
    return iso
  }
}
