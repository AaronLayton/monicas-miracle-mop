"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarPickerProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  className?: string
}

const DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildCalendarGrid(year: number, month: number): (Date | null)[] {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1)
  // UK week starts Monday: Mon=0 ... Sun=6
  // JS getDay(): Sun=0, Mon=1, ... Sat=6
  const jsDay = firstDay.getDay() // 0=Sun
  const mondayOffset = (jsDay + 6) % 7 // 0=Mon, 6=Sun

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []

  // Padding for days from previous month
  for (let i = 0; i < mondayOffset; i++) {
    const d = new Date(year, month, 1 - (mondayOffset - i))
    cells.push(d)
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }

  // Padding for days from next month to fill 6 rows (42 cells)
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) {
    cells.push(new Date(year, month + 1, i))
  }

  return cells
}

export function CalendarPicker({
  selectedDate,
  onDateSelect,
  className,
}: CalendarPickerProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const cells = buildCalendarGrid(year, month)

  function prevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  return (
    <div
      data-slot="calendar-picker"
      className={cn("w-full select-none", className)}
    >
      {/* Month navigation header */}
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft />
        </Button>

        <span className="text-sm font-semibold text-foreground">
          {MONTH_NAMES[month]} {year}
        </span>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={nextMonth}
          aria-label="Next month"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Day-of-week header — UK: Mon first */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} />

          const isCurrentMonth = date.getMonth() === month
          const isToday = isSameDay(date, today)
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onDateSelect(date)}
              aria-label={date.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              aria-pressed={isSelected}
              className={cn(
                "mx-auto flex size-8 items-center justify-center rounded-full text-sm transition-colors",
                // Other-month days
                !isCurrentMonth && "text-muted-foreground/50",
                // Current month days
                isCurrentMonth && !isSelected && "hover:bg-muted",
                // Today ring
                isToday && !isSelected && "border border-primary",
                // Selected state
                isSelected && "bg-primary text-primary-foreground font-semibold",
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
