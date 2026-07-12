"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarClock,
  CheckCircle2,
  Loader2,
  PhoneCall,
  Send,
  Undo2,
  XCircle,
} from "lucide-react"
import type { Booking } from "@/lib/booking/types"
import {
  ARRIVAL_WINDOWS,
  BUSINESS,
  isArrivalWindowAvailable,
} from "@/lib/data/services"
import { cn } from "@/lib/utils"

type ActionBody =
  | { action: "reschedule"; date: string; arrivalWindowId: string; notifyCustomer: boolean }
  | { action: "status"; status: "confirmed" | "completed" }
  | { action: "cancel"; reason?: string; notifyCustomer: boolean }
  | { action: "reply"; body: string }

export function AdminBookingActions({ booking }: { booking: Booking }) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const [date, setDate] = useState(booking.date)
  const [windowId, setWindowId] = useState(booking.arrivalWindowId)
  const [reply, setReply] = useState("")
  const [cancelReason, setCancelReason] = useState("")

  const cancelled = booking.status === "cancelled"
  const completed = booking.status === "completed"
  const outsideHours = date && !isArrivalWindowAvailable(date, windowId)

  async function run(kind: string, body: ActionBody, successMsg: string) {
    setBusy(kind)
    setError(null)
    setNotice(null)
    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong")
      setNotice(successMsg)
      if (kind === "reply") setReply("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setBusy(null)
    }
  }

  const consultationTemplate = `Hi ${booking.contact.firstName}! Thanks for your booking. When would suit you for the quick ${BUSINESS.consultationMinutes}-minute consultation call? Let me know a good time to ring you on ${booking.contact.phone}. — ${BUSINESS.ownerName}`

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">
      {(error || notice) && (
        <p
          role="status"
          className={cn(
            "rounded-2xl px-4 py-3 text-sm font-medium",
            error
              ? "bg-destructive/10 text-destructive"
              : "bg-accent text-accent-foreground"
          )}
        >
          {error ?? notice}
        </p>
      )}

      {/* Message the customer */}
      <section className="rounded-3xl bg-card p-6 shadow-float shine-border">
        <h2 className="text-display text-lg font-semibold mb-1">
          Message the customer
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Sends an email and appears on their booking page.
        </p>
        <button
          type="button"
          onClick={() => setReply(consultationTemplate)}
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft/70"
        >
          <PhoneCall className="size-3.5" aria-hidden />
          Arrange the consultation call
        </button>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={5}
          placeholder="Type a message…"
          className="w-full rounded-2xl border-0 bg-muted/60 px-4 py-3 text-sm focus-ring resize-none"
        />
        <button
          type="button"
          disabled={busy !== null || !reply.trim()}
          onClick={() =>
            run("reply", { action: "reply", body: reply.trim() }, "Message sent")
          }
          className={cn(
            "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
            busy !== null || !reply.trim()
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground shadow-cinematic hover:bg-primary-container"
          )}
        >
          {busy === "reply" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          Send message
        </button>
      </section>

      {/* Reschedule */}
      {!cancelled && !completed && (
        <section className="rounded-3xl bg-card p-6 shadow-float shine-border">
          <h2 className="text-display text-lg font-semibold mb-4">
            Reschedule
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-2xl border-0 bg-muted/60 px-4 py-2.5 text-sm focus-ring"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Arrival window
              </span>
              <select
                value={windowId}
                onChange={(e) => setWindowId(e.target.value)}
                className="rounded-2xl border-0 bg-muted/60 px-4 py-2.5 text-sm focus-ring"
              >
                {ARRIVAL_WINDOWS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label} ({w.start}–{w.end})
                  </option>
                ))}
              </select>
            </label>
            {outsideHours && (
              <p className="text-xs font-medium text-destructive">
                Outside normal working hours — you can still book it as a
                special arrangement.
              </p>
            )}
            <button
              type="button"
              disabled={
                busy !== null ||
                (date === booking.date && windowId === booking.arrivalWindowId)
              }
              onClick={() =>
                run(
                  "reschedule",
                  {
                    action: "reschedule",
                    date,
                    arrivalWindowId: windowId,
                    notifyCustomer: true,
                  },
                  "Rescheduled — customer emailed"
                )
              }
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                busy !== null ||
                  (date === booking.date &&
                    windowId === booking.arrivalWindowId)
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-secondary text-secondary-foreground shadow-cinematic hover:opacity-90"
              )}
            >
              {busy === "reschedule" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <CalendarClock className="size-4" aria-hidden />
              )}
              Move booking
            </button>
          </div>
        </section>
      )}

      {/* Status + cancel */}
      <section className="rounded-3xl bg-card p-6 shadow-float shine-border">
        <h2 className="text-display text-lg font-semibold mb-4">Status</h2>
        <div className="flex flex-col gap-3">
          {!cancelled && !completed && (
            <button
              type="button"
              disabled={busy !== null}
              onClick={() =>
                run(
                  "status",
                  { action: "status", status: "completed" },
                  "Marked as completed"
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90"
            >
              {busy === "status" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <CheckCircle2 className="size-4" aria-hidden />
              )}
              Mark completed
            </button>
          )}
          {completed && (
            <button
              type="button"
              disabled={busy !== null}
              onClick={() =>
                run(
                  "status",
                  { action: "status", status: "confirmed" },
                  "Reopened as confirmed"
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted/70"
            >
              <Undo2 className="size-4" aria-hidden />
              Reopen booking
            </button>
          )}
          {!cancelled && (
            <>
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Cancellation reason (optional)"
                className="rounded-2xl border-0 bg-muted/60 px-4 py-2.5 text-sm focus-ring"
              />
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => {
                  if (
                    !window.confirm(
                      "Cancel this booking and email the customer?"
                    )
                  )
                    return
                  run(
                    "cancel",
                    {
                      action: "cancel",
                      reason: cancelReason.trim() || undefined,
                      notifyCustomer: true,
                    },
                    "Booking cancelled — customer emailed"
                  )
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-destructive ring-1 ring-destructive/40 transition-colors hover:bg-destructive/10"
              >
                {busy === "cancel" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <XCircle className="size-4" aria-hidden />
                )}
                Cancel booking
              </button>
            </>
          )}
          {cancelled && (
            <p className="text-sm text-muted-foreground">
              This booking is cancelled
              {booking.cancelReason ? ` — “${booking.cancelReason}”` : ""}.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
