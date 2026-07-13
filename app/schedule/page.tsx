import type { Metadata } from "next"
import { ScheduleForm } from "@/components/booking/schedule-form"

export const metadata: Metadata = {
  alternates: { canonical: "/schedule" },
  title: "Schedule",
  description: "Pick a date and arrival window for your cleaning.",
}

export default function SchedulePage() {
  return <ScheduleForm />
}
