"use client"

import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPicker } from "@/components/schedule/calendar-picker"

export function DateSection() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <CalendarDays className="size-5 text-secondary" aria-hidden="true" />
          Choose Your Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarPicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </CardContent>
    </Card>
  )
}
