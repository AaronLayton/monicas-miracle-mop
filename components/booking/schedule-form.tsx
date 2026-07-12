"use client"

import { useMemo, useState } from "react"
import { useTransitionRouter } from "next-view-transitions"
import { BookingHeader } from "@/components/booking/booking-header"
import {
  ARRIVAL_WINDOWS,
  HOME_SIZE_LIMITS,
  formatHours,
  formatPrice,
  isArrivalWindowAvailable,
} from "@/lib/data/services"
import { useBooking } from "@/lib/booking/context"
import { BookingSummaryLive } from "@/components/booking/booking-summary-live"
import { StepIndicator } from "@/components/booking/step-indicator"
import { cn } from "@/lib/utils"
import {
  Bath,
  BedDouble,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Minus,
  Plus,
  type LucideIcon,
} from "lucide-react"

export function ScheduleForm() {
  const router = useTransitionRouter()
  const {
    draft,
    setDraft,
    suggestedHours,
    estimatedTotalPence,
    canProceedToCheckout,
    canProceedToSchedule,
  } = useBooking()

  const { minDate, maxDate } = useMemo(() => getBookableRange(), [])
  const [monthCursor, setMonthCursor] = useState(
    () => new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  )
  const days = useMemo(
    () => buildMonthGrid(monthCursor, minDate, maxDate),
    [monthCursor, minDate, maxDate]
  )
  const canGoPrev =
    monthCursor > new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  const canGoNext =
    monthCursor < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
  const monthLabel = monthCursor.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  })

  if (!canProceedToSchedule) {
    return (
      <div className="page-nav-offset mx-auto max-w-lg px-4 pb-20 text-center">
        <h1 className="text-display text-2xl font-semibold mb-3">
          Pick a service first
        </h1>
        <p className="text-muted-foreground mb-6">
          Choose your clean before scheduling.
        </p>
        <button
          type="button"
          onClick={() => router.push("/services")}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Go to services
        </button>
      </div>
    )
  }

  return (
    <div className="page-nav-offset mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14">
      <StepIndicator current={2} />
      <BookingHeader
        title="When should we arrive?"
        description="Tell us about your home — more rooms means more time and a higher estimate. Final details are confirmed on your consultation call."
      />

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-10 min-w-0">
          {/* Home details */}
          <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border">
            <h2 className="text-display text-xl font-semibold mb-2">
              Home details
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Changing rooms updates your visit length and price estimate
              instantly.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Counter
                label="Bedrooms"
                icon={BedDouble}
                value={draft.bedrooms}
                min={HOME_SIZE_LIMITS.bedrooms.min}
                max={HOME_SIZE_LIMITS.bedrooms.max}
                onChange={(v) => setDraft({ bedrooms: v })}
              />
              <Counter
                label="Bathrooms"
                icon={Bath}
                value={draft.bathrooms}
                min={HOME_SIZE_LIMITS.bathrooms.min}
                max={HOME_SIZE_LIMITS.bathrooms.max}
                onChange={(v) => setDraft({ bathrooms: v })}
              />
              <Counter
                label="Kitchens"
                icon={ChefHat}
                value={draft.kitchens}
                min={HOME_SIZE_LIMITS.kitchens.min}
                max={HOME_SIZE_LIMITS.kitchens.max}
                onChange={(v) => setDraft({ kitchens: v })}
              />
            </div>

            {/* Live impact of home size */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-2xl bg-primary-soft/50 px-4 py-4 ring-1 ring-primary/15">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Clock className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Estimated visit · {formatHours(suggestedHours)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {draft.bedrooms} bed · {draft.bathrooms} bath ·{" "}
                    {draft.kitchens} kitchen
                    {draft.kitchens === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <div className="sm:ml-auto sm:text-right">
                <p className="text-xs text-muted-foreground">Running estimate</p>
                <p className="text-lg font-bold text-primary tabular-nums">
                  {formatPrice(estimatedTotalPence)}
                </p>
              </div>
            </div>

            <label className="mt-6 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Access notes (optional)
              </span>
              <textarea
                value={draft.notes}
                onChange={(e) => setDraft({ notes: e.target.value })}
                rows={3}
                placeholder="Parking, keys, pets, alarm codes…"
                className="rounded-2xl border-0 bg-muted/60 px-4 py-3 text-sm focus-ring resize-none"
              />
            </label>
          </section>

          {/* Calendar */}
          <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border">
            <h2 className="text-display text-xl font-semibold mb-2">
              Select a date
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Available from tomorrow · Sundays closed
            </p>

            {/* Month navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setMonthCursor(
                    new Date(
                      monthCursor.getFullYear(),
                      monthCursor.getMonth() - 1,
                      1
                    )
                  )
                }
                disabled={!canGoPrev}
                aria-label="Previous month"
                className="flex size-9 items-center justify-center rounded-full ring-1 ring-border transition-colors hover:bg-primary-soft disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="size-4" />
              </button>
              <p
                aria-live="polite"
                className="text-sm font-bold text-foreground"
              >
                {monthLabel}
              </p>
              <button
                type="button"
                onClick={() =>
                  setMonthCursor(
                    new Date(
                      monthCursor.getFullYear(),
                      monthCursor.getMonth() + 1,
                      1
                    )
                  )
                }
                disabled={!canGoNext}
                aria-label="Next month"
                className="flex size-9 items-center justify-center rounded-full ring-1 ring-border transition-colors hover:bg-primary-soft disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div
                  key={d}
                  className="text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground py-1"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((day, idx) => {
                if (!day) {
                  return <div key={`pad-${idx}`} />
                }
                const iso = day.iso
                const selected = draft.date === iso
                const disabled = day.disabled
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      setDraft({
                        date: iso,
                        // Drop a window that's booked out on the new day
                        arrivalWindowId:
                          draft.arrivalWindowId &&
                          isArrivalWindowAvailable(iso, draft.arrivalWindowId)
                            ? draft.arrivalWindowId
                            : null,
                      })
                    }
                    className={cn(
                      "aspect-square rounded-xl text-sm font-medium transition-all",
                      disabled &&
                        "text-muted-foreground/40 cursor-not-allowed",
                      !disabled &&
                        !selected &&
                        "hover:bg-primary-soft text-foreground",
                      selected &&
                        "bg-primary text-primary-foreground shadow-cinematic"
                    )}
                  >
                    {day.day}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Arrival */}
          <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border">
            <h2 className="text-display text-xl font-semibold mb-2">
              Arrival window
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {draft.date
                ? "Greyed-out windows are already booked on your chosen day."
                : "Pick a date first to see what's free."}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {ARRIVAL_WINDOWS.map((w) => {
                const selected = draft.arrivalWindowId === w.id
                const bookedOut = draft.date
                  ? !isArrivalWindowAvailable(draft.date, w.id)
                  : false
                return (
                  <button
                    key={w.id}
                    type="button"
                    disabled={bookedOut || !draft.date}
                    onClick={() => setDraft({ arrivalWindowId: w.id })}
                    className={cn(
                      "relative rounded-2xl px-4 py-4 text-left ring-1 transition-all",
                      selected && "ring-primary bg-primary-soft/50",
                      !selected &&
                        !bookedOut &&
                        "ring-border hover:ring-primary/30",
                      bookedOut &&
                        "ring-border/60 bg-muted/40 cursor-not-allowed opacity-70",
                      !draft.date && "cursor-not-allowed opacity-70"
                    )}
                  >
                    <span
                      className={cn(
                        "block font-semibold",
                        bookedOut ? "text-muted-foreground" : "text-foreground"
                      )}
                    >
                      {w.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {w.start} – {w.end}
                    </span>
                    {bookedOut && (
                      <span className="absolute top-3 right-3 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Fully booked
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          <button
            type="button"
            onClick={() => router.push("/services")}
            className="self-start rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground lg:hidden"
          >
            Back
          </button>
        </div>

        <div className="lg:col-span-4 min-w-0 relative">
          <BookingSummaryLive
            actions={
              <>
                <button
                  type="button"
                  disabled={!canProceedToCheckout}
                  onClick={() => router.push("/checkout")}
                  className={cn(
                    "w-full rounded-full px-8 py-3.5 text-sm font-semibold transition-all",
                    canProceedToCheckout
                      ? "bg-primary text-primary-foreground shadow-cinematic hover:bg-primary-container"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  Continue to checkout
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/services")}
                  className="hidden lg:block w-full rounded-full px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Back to services
                </button>
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}

function Counter({
  label,
  icon: Icon,
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  label: string
  icon: LucideIcon
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="rounded-2xl bg-muted/50 p-4 flex flex-col gap-3">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon className="size-3.5" aria-hidden />
        </span>
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border hover:bg-primary-soft transition-colors disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span className="text-xl font-bold tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border hover:bg-primary-soft transition-colors disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}

function toLocalIso(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** Bookable window: from tomorrow up to 60 days ahead. */
function getBookableRange() {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const minDate = new Date(today)
  minDate.setDate(minDate.getDate() + 1) // tomorrow
  const maxDate = new Date(minDate)
  maxDate.setDate(maxDate.getDate() + 60)
  return { minDate, maxDate }
}

/** One calendar month, Monday-aligned; days outside the bookable range are disabled. */
function buildMonthGrid(monthStart: Date, minDate: Date, maxDate: Date) {
  const year = monthStart.getFullYear()
  const month = monthStart.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dow = (new Date(year, month, 1).getDay() + 6) % 7 // 0 = Mon

  const cells: ({ day: number; iso: string; disabled: boolean } | null)[] = []
  for (let i = 0; i < dow; i++) cells.push(null)

  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const d = new Date(year, month, dayNum, 12)
    const isSunday = d.getDay() === 0
    const outOfRange = d < minDate || d > maxDate
    cells.push({
      day: dayNum,
      iso: toLocalIso(d),
      disabled: isSunday || outOfRange,
    })
  }
  return cells
}
