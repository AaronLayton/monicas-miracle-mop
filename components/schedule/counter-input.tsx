"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CounterInputProps {
  label: string
  icon: React.ReactNode
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function CounterInput({
  label,
  icon,
  value,
  onChange,
  min = 0,
  max = 10,
  className,
}: CounterInputProps) {
  return (
    <div
      data-slot="counter-input"
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border-0 bg-muted/50 px-4 py-3",
        className
      )}
    >
      {/* Label + icon */}
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-secondary" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <Minus />
        </Button>

        <span className="w-10 text-center text-lg font-semibold tabular-nums text-foreground">
          {value}
        </span>

        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}
