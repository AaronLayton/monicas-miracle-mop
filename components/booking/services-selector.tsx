"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useTransitionRouter } from "next-view-transitions"
import { BookingHeader } from "@/components/booking/booking-header"
import {
  Sparkles,
  Droplets,
  Truck,
  UtensilsCrossed,
  Refrigerator,
  Microwave,
  Shirt,
  AppWindow,
  WashingMachine,
  Layers,
  Bath,
  BedDouble,
  ToyBrick,
  Check,
  Clock,
  type LucideIcon,
} from "lucide-react"
import {
  getPrimaryServices,
  getAddons,
  formatServicePrice,
  formatHours,
  type Service,
} from "@/lib/data/services"
import { useBooking } from "@/lib/booking/context"
import { cn } from "@/lib/utils"
import { BookingSummaryLive } from "@/components/booking/booking-summary-live"
import { StepIndicator } from "@/components/booking/step-indicator"
import { AnimatePresence, motion } from "motion/react"

function formatHoursLabel(h: number) {
  return formatHours(h)
}

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Droplets,
  Truck,
  UtensilsCrossed,
  Refrigerator,
  Microwave,
  Shirt,
  AppWindow,
  WashingMachine,
  Layers,
  Bath,
  BedDouble,
  ToyBrick,
}

export function ServicesSelector() {
  const searchParams = useSearchParams()
  const router = useTransitionRouter()
  const {
    draft,
    hydrated,
    toggleAddon,
    setPrimaryService,
    suggestedHours,
    priced,
    canProceedToSchedule,
  } = useBooking()
  const primary = getPrimaryServices()
  const addons = getAddons()

  // Homepage (and other) deep-links: /services?service=standard-clean
  // Apply after sessionStorage hydrate so a stale draft doesn't win.
  useEffect(() => {
    if (!hydrated) return
    const pre = searchParams.get("service")
    if (!pre) return
    if (!primary.some((s) => s.id === pre)) return
    if (draft.primaryServiceId === pre) return
    setPrimaryService(pre)
  }, [
    hydrated,
    searchParams,
    primary,
    draft.primaryServiceId,
    setPrimaryService,
  ])

  const regularAddons = addons.filter((a) => a.category === "addon")
  const busyParent = addons.filter((a) => a.category === "busy-parent")

  return (
    <div className="page-nav-offset mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14">
      <StepIndicator current={1} />
      <BookingHeader
        title="Choose your clean"
        description="Transparent prices from Kasey’s flyer. Hours rise as you add extras — and stacking services unlocks a multi-service discount."
      />

      {/* Label sits above the 2-col grid so sidebar tops align with service cards */}
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-5">
        Main service
      </h2>

      {/*
        Do NOT use items-start on this grid — it shrink-wraps the sidebar column
        to the card height, so position:sticky has zero room to travel.
        Default stretch keeps the right column as tall as the left content.
      */}
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-12 min-w-0">
          <section>
            <div className="grid sm:grid-cols-3 gap-4">
              {primary.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={draft.primaryServiceId === service.id}
                  onSelect={() => setPrimaryService(service.id)}
                />
              ))}
            </div>

            {/* Fade only — no height/overflow so shadows aren’t clipped */}
            <AnimatePresence initial={false}>
              {draft.primaryServiceId && (
                <motion.div
                  key="visit-length"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5"
                >
                  <div className="rounded-2xl bg-primary-soft/60 p-5 ring-1 ring-primary/15 flex flex-col gap-4 shadow-float">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          <Clock className="size-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Estimated visit length
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            Worked out from this package
                            {draft.addons.length > 0 ? ", your add-ons" : ""}{" "}
                            and your home size
                            {priced.itemCount > 1
                              ? ` · ${priced.itemCount} services selected`
                              : ""}
                            . Final length agreed on your consultation call.
                          </p>
                        </div>
                      </div>
                      <p className="sm:shrink-0 rounded-xl bg-white px-4 py-2 text-lg font-bold tabular-nums text-primary shadow-sm">
                        {formatHoursLabel(suggestedHours)}
                      </p>
                    </div>
                    {priced.discountPercent > 0 && (
                      <p className="text-xs font-medium text-secondary">
                        Bundle discount active: {priced.discountPercent}% off
                        your estimate
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <AddonGrid
            title="Add-ons"
            subtitle="Each add-on adds visit time automatically"
            items={regularAddons}
            selectedIds={draft.addons.map((a) => a.serviceId)}
            onToggle={toggleAddon}
          />

          <AddonGrid
            title="Family helpers"
            subtitle="Bedsheets, toys and deeper bathroom help"
            items={busyParent}
            selectedIds={draft.addons.map((a) => a.serviceId)}
            onToggle={toggleAddon}
          />
        </div>

        <div className="lg:col-span-4 min-w-0 relative">
          <BookingSummaryLive
            actions={
              <button
                type="button"
                disabled={!canProceedToSchedule}
                onClick={() => router.push("/schedule")}
                className={cn(
                  "w-full rounded-full px-8 py-3.5 text-sm font-semibold transition-all",
                  canProceedToSchedule
                    ? "bg-primary text-primary-foreground shadow-cinematic hover:bg-primary-container"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue to schedule
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}

function ServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: Service
  selected: boolean
  onSelect: () => void
}) {
  const Icon = ICONS[service.icon] ?? Sparkles
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex flex-col text-left rounded-3xl p-6 transition-all duration-300",
        "bg-card shine-border shadow-float",
        selected
          ? "ring-2 ring-primary shadow-cinematic"
          : "hover:-translate-y-0.5 hover:shadow-cinematic"
      )}
    >
      {selected && (
        <span className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      )}
      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="size-5" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
        {service.description}
      </p>
      <p className="text-lg font-bold text-primary">
        {formatServicePrice(service)}
      </p>
    </motion.button>
  )
}

function AddonGrid({
  title,
  subtitle,
  items,
  selectedIds,
  onToggle,
}: {
  title: string
  subtitle?: string
  items: Service[]
  selectedIds: string[]
  onToggle: (id: string) => void
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        ) : null}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = ICONS[item.icon] ?? Sparkles
          const selected = selectedIds.includes(item.id)
          const duration = item.durationHours ?? 0.5
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all",
                "bg-card ring-1",
                selected
                  ? "ring-primary bg-primary-soft/40"
                  : "ring-border/80 hover:ring-primary/30"
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-primary"
                )}
              >
                <Icon className="size-4.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {formatServicePrice(item)}
                  {item.unitLabel &&
                  item.priceType !== "hourly" &&
                  item.priceType !== "from"
                    ? ` · ${item.unitLabel}`
                    : ""}
                  {" · "}+{formatHours(duration)} visit
                </span>
              </span>
              <span
                className={cn(
                  "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  selected
                    ? "border-primary bg-primary"
                    : "border-border"
                )}
              >
                {selected && (
                  <Check className="size-3 text-white" strokeWidth={3} />
                )}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
