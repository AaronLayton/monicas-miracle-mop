import { cn } from "@/lib/utils"
import type { BookingStatus } from "@/lib/booking/types"

const styles: Record<BookingStatus, string> = {
  confirmed: "bg-primary-soft text-primary",
  completed: "bg-accent text-accent-foreground",
  cancelled: "bg-muted text-muted-foreground line-through",
  pending_payment: "bg-destructive/10 text-destructive",
  deposit_paid: "bg-secondary/15 text-secondary-foreground",
  pending_review: "bg-muted text-muted-foreground",
}

const labels: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  pending_payment: "Awaiting deposit",
  deposit_paid: "Deposit paid",
  pending_review: "Pending review",
}

export function StatusChip({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  )
}
