"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Booking } from "@/lib/booking/types"
import {
  ARRIVAL_WINDOWS,
  formatPrice,
  getServiceById,
  BUSINESS,
  DEPOSITS_ENABLED,
} from "@/lib/data/services"
import { cn } from "@/lib/utils"
import {
  Calendar,
  MapPin,
  MessageSquare,
  Loader2,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react"

export function ManageBooking({
  initial,
  flash,
}: {
  initial: Booking
  flash?: string | null
}) {
  const router = useRouter()
  const [booking, setBooking] = useState(initial)
  const [date, setDate] = useState(initial.date)
  const [windowId, setWindowId] = useState(initial.arrivalWindowId)
  const [note, setNote] = useState("")
  const [cancelReason, setCancelReason] = useState("")
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showCancel, setShowCancel] = useState(false)

  const service = getServiceById(booking.primaryServiceId)
  const window = ARRIVAL_WINDOWS.find((w) => w.id === booking.arrivalWindowId)
  const cancelled = booking.status === "cancelled"
  const completed = booking.status === "completed"

  async function patch(body: Record<string, unknown>) {
    setBusy(String(body.action ?? "save"))
    setError(null)
    try {
      const res = await fetch(`/api/bookings/${booking.token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Request failed")
      if (data.checkoutUrl) {
        globalThis.location.href = data.checkoutUrl
        return
      }
      if (data.booking) {
        setBooking(data.booking)
        setDate(data.booking.date)
        setWindowId(data.booking.arrivalWindowId)
        setNote("")
        setCancelReason("")
        setShowCancel(false)
      }
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-12 md:pb-16">
      {flash && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-primary-soft px-4 py-3 text-sm text-primary">
          <CheckCircle2 className="size-4 shrink-0" />
          {flash}
        </div>
      )}

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary mb-2">
          Booking {booking.reference}
        </p>
        <h1 className="text-display text-3xl md:text-4xl font-semibold tracking-tight mb-2">
          Hi {booking.contact.firstName}
        </h1>
        <p className="text-muted-foreground">
          Manage your clean below. Keep this page bookmarked — it&apos;s your
          private link (no login needed).
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <StatusPill status={booking.status} />
        {booking.depositPaidPence > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 text-secondary px-3 py-1 text-xs font-semibold">
            <CreditCard className="size-3" />
            Deposit paid {formatPrice(booking.depositPaidPence)}
          </span>
        )}
      </div>

      {/* Summary card */}
      <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border mb-6">
        <h2 className="text-display text-xl font-semibold mb-5">Summary</h2>
        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <Item
            icon={CheckCircle2}
            label="Service"
            value={service?.name ?? booking.primaryServiceId}
          />
          <Item
            icon={Calendar}
            label="When"
            value={`${formatDate(booking.date)} · ${window?.label ?? ""}`}
          />
          <Item
            icon={MapPin}
            label="Where"
            value={[
              booking.address.line1,
              booking.address.town,
              booking.address.postcode,
            ].join(", ")}
          />
          <Item
            icon={CreditCard}
            label="Estimate"
            value={formatPrice(booking.estimatedTotalPence)}
          />
        </dl>
        <ul className="mt-6 border-t border-border/60 pt-4 flex flex-col gap-2">
          {booking.lineItems.map((li) => (
            <li
              key={li.serviceId + li.name}
              className="flex justify-between text-sm"
            >
              <span>{li.name}</span>
              <span className="font-medium tabular-nums">
                {formatPrice(li.totalPence)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {!cancelled && !completed && (
        <>
          {/* Reschedule */}
          <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border mb-6">
            <h2 className="text-display text-xl font-semibold mb-5">
              Change date or window
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Date
                </span>
                <input
                  type="date"
                  value={date}
                  min={tomorrowIso()}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl bg-muted/60 border-0 px-4 py-3 text-sm focus-ring"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Arrival
                </span>
                <select
                  value={windowId}
                  onChange={(e) => setWindowId(e.target.value)}
                  className="rounded-xl bg-muted/60 border-0 px-4 py-3 text-sm focus-ring"
                >
                  {ARRIVAL_WINDOWS.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.label} ({w.start}–{w.end})
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              disabled={busy !== null}
              onClick={() =>
                patch({ date, arrivalWindowId: windowId })
              }
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {busy === "save" ? (
                <Loader2 className="size-4 animate-spin inline" />
              ) : (
                "Save changes"
              )}
            </button>
          </section>

          {/* Message */}
          <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border mb-6">
            <h2 className="text-display text-xl font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="size-5 text-primary" />
              Leave a message
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              We&apos;ll see this before your visit. For urgent changes, email{" "}
              {BUSINESS.email}.
            </p>
            {booking.messages.length > 0 && (
              <ul className="mb-4 flex flex-col gap-3 max-h-48 overflow-y-auto">
                {booking.messages.map((m) => (
                  <li
                    key={m.id}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm",
                      m.from === "customer"
                        ? "bg-primary-soft/50 ml-4"
                        : "bg-muted mr-4"
                    )}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      {m.from === "customer" ? "You" : BUSINESS.ownerName} ·{" "}
                      {new Date(m.createdAt).toLocaleString("en-GB")}
                    </p>
                    {m.body}
                  </li>
                ))}
              </ul>
            )}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. Gate code is 1234, dog will be in the garden…"
              className="w-full rounded-2xl bg-muted/60 border-0 px-4 py-3 text-sm focus-ring resize-none mb-3"
            />
            <button
              type="button"
              disabled={!note.trim() || busy !== null}
              onClick={() => patch({ action: "message", body: note })}
              className="rounded-full bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              Send message
            </button>
          </section>

          {/* Deposit */}
          {DEPOSITS_ENABLED &&
            booking.depositPence > 0 &&
            booking.depositPaidPence === 0 && (
            <section className="rounded-3xl bg-primary text-primary-foreground p-6 md:p-8 shadow-cinematic mb-6">
              <h2 className="text-display text-xl font-semibold mb-2">
                Secure with a deposit
              </h2>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Pay {formatPrice(booking.depositPence)} online to lock in your
                slot. Balance due on the day.
              </p>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => patch({ action: "pay_deposit" })}
                className="rounded-full bg-white text-primary px-6 py-2.5 text-sm font-semibold"
              >
                Pay deposit
              </button>
            </section>
          )}

          {/* Cancel */}
          <section className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 md:p-8 mb-6">
            <h2 className="text-display text-xl font-semibold text-destructive mb-2">
              Cancel booking
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please give at least {BUSINESS.cancellationHours} hours&apos;
              notice. Late cancellations may incur a{" "}
              {BUSINESS.lateCancelFeePercent}% fee.
            </p>
            {!showCancel ? (
              <button
                type="button"
                onClick={() => setShowCancel(true)}
                className="rounded-full border border-destructive/40 text-destructive px-5 py-2 text-sm font-semibold hover:bg-destructive/10"
              >
                I need to cancel
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={2}
                  placeholder="Reason (optional)"
                  className="rounded-2xl bg-white border-0 px-4 py-3 text-sm focus-ring resize-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() =>
                      patch({ action: "cancel", reason: cancelReason })
                    }
                    className="rounded-full bg-destructive text-white px-5 py-2 text-sm font-semibold"
                  >
                    Confirm cancellation
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCancel(false)}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground"
                  >
                    Keep booking
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {cancelled && (
        <div className="rounded-3xl bg-muted p-8 text-center">
          <XCircle className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold">This booking was cancelled</p>
          {booking.cancelReason && (
            <p className="text-sm text-muted-foreground mt-2">
              {booking.cancelReason}
            </p>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function StatusPill({ status }: { status: Booking["status"] }) {
  const map: Record<Booking["status"], string> = {
    pending_payment: "Awaiting deposit",
    confirmed: "Confirmed",
    deposit_paid: "Deposit paid",
    completed: "Completed",
    cancelled: "Cancelled",
    pending_review: "Under review",
  }
  return (
    <span className="inline-flex rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
      {map[status]}
    </span>
  )
}

function Item({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <Icon className="size-4 text-primary mt-0.5 shrink-0" />
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function tomorrowIso() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}
