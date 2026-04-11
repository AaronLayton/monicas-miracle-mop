"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "8:00 AM – 10:00 AM" },
  { id: "midday", label: "Midday", time: "11:00 AM – 1:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "2:00 PM – 4:00 PM" },
] as const

type SlotId = (typeof TIME_SLOTS)[number]["id"]

export function ArrivalSection() {
  const [selectedSlot, setSelectedSlot] = useState<SlotId | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Clock className="size-5 text-secondary" aria-hidden="true" />
          Arrival Window
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot.id
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlot(slot.id)}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl border px-4 py-4 text-center transition-all",
                  isSelected
                    ? "border-primary bg-primary-soft font-semibold text-primary shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted"
                )}
              >
                <span className="text-sm font-semibold">{slot.label}</span>
                <span className="text-xs text-muted-foreground">{slot.time}</span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
