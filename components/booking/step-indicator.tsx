"use client"

import { cn } from "@/lib/utils"
import { useTransitionRouter } from "next-view-transitions"
import type { Route } from "next"

const steps: { id: 1 | 2 | 3; label: string; href: Route }[] = [
  { id: 1, label: "Services", href: "/services" },
  { id: 2, label: "Schedule", href: "/schedule" },
  { id: 3, label: "Checkout", href: "/checkout" },
]

export function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const router = useTransitionRouter()

  return (
    <nav
      aria-label="Booking progress"
      className="vt-booking-steps mb-10"
      style={{ viewTransitionName: "booking-steps" }}
    >
      <ol className="flex items-center gap-2 sm:gap-4">
        {steps.map((step, i) => {
          const done = step.id < current
          const active = step.id === current
          const reachable = step.id <= current
          return (
            <li
              key={step.id}
              className="flex items-center gap-2 sm:gap-4 flex-1"
            >
              <button
                type="button"
                disabled={!reachable || active}
                onClick={() => {
                  if (reachable && !active) router.push(step.href)
                }}
                className={cn(
                  "flex items-center gap-2.5 min-w-0 rounded-full text-left",
                  reachable && !active && "hover:opacity-80 cursor-pointer",
                  active && "cursor-default",
                  !reachable && "cursor-not-allowed opacity-60"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    active &&
                      "bg-primary text-primary-foreground shadow-cinematic",
                    done && "bg-primary-soft text-primary",
                    !active && !done && "bg-muted text-muted-foreground"
                  )}
                >
                  {done ? "✓" : step.id}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium truncate",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 min-w-4",
                    done ? "bg-primary/40" : "bg-border"
                  )}
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
