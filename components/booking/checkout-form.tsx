"use client"

import { useState } from "react"
import { useTransitionRouter } from "next-view-transitions"
import { BookingHeader } from "@/components/booking/booking-header"
import { useBooking } from "@/lib/booking/context"
import { BookingSummaryLive } from "@/components/booking/booking-summary-live"
import { StepIndicator } from "@/components/booking/step-indicator"
import { cn } from "@/lib/utils"
import { formatPrice, DEPOSITS_ENABLED } from "@/lib/data/services"
import { Loader2 } from "lucide-react"

export function CheckoutForm() {
  const router = useTransitionRouter()
  const { draft, setDraft, canProceedToCheckout, canSubmit, depositPence, reset } =
    useBooking()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!canProceedToCheckout) {
    return (
      <div className="page-nav-offset mx-auto max-w-lg px-4 pb-20 text-center">
        <h1 className="text-display text-2xl font-semibold mb-3">
          Almost there
        </h1>
        <p className="text-muted-foreground mb-6">
          Choose a service and schedule before checkout.
        </p>
        <button
          type="button"
          onClick={() => router.push("/services")}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Start booking
        </button>
      </div>
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || !draft.primaryServiceId || !draft.date || !draft.arrivalWindowId)
      return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryServiceId: draft.primaryServiceId,
          addons: draft.addons,
          home: {
            bedrooms: draft.bedrooms,
            bathrooms: draft.bathrooms,
            kitchens: draft.kitchens,
            notes: draft.notes || undefined,
          },
          date: draft.date,
          arrivalWindowId: draft.arrivalWindowId,
          contact: {
            firstName: draft.firstName,
            lastName: draft.lastName,
            email: draft.email,
            phone: draft.phone,
          },
          address: {
            line1: draft.line1,
            line2: draft.line2 || undefined,
            town: draft.town,
            postcode: draft.postcode,
          },
          message: draft.message || undefined,
          payDeposit: DEPOSITS_ENABLED && draft.payDeposit,
          estimatedHours: draft.estimatedHours,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        const msg =
          data?.issues?.fieldErrors
            ? Object.values(data.issues.fieldErrors).flat().join(" ")
            : data?.error || "Something went wrong"
        throw new Error(msg)
      }
      reset()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
        return
      }
      router.push(data.booking.manageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book")
      setSubmitting(false)
    }
  }

  return (
    <div className="page-nav-offset mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14">
      <StepIndicator current={3} />
      <BookingHeader
        title="Checkout"
        description="Your details stay private. You’ll get a secure link to manage this booking — no account required."
      />

      <form onSubmit={onSubmit}>
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-8 min-w-0">
            <Section title="Contact">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="First name"
                  value={draft.firstName}
                  onChange={(v) => setDraft({ firstName: v })}
                  autoComplete="given-name"
                  required
                />
                <Field
                  label="Last name"
                  value={draft.lastName}
                  onChange={(v) => setDraft({ lastName: v })}
                  autoComplete="family-name"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={draft.email}
                  onChange={(v) => setDraft({ email: v })}
                  autoComplete="email"
                  required
                  className="sm:col-span-2"
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={draft.phone}
                  onChange={(v) => setDraft({ phone: v })}
                  autoComplete="tel"
                  placeholder="07700 900000"
                  required
                  className="sm:col-span-2"
                />
              </div>
            </Section>

            <Section title="Service address">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Address line 1"
                  value={draft.line1}
                  onChange={(v) => setDraft({ line1: v })}
                  autoComplete="address-line1"
                  required
                  className="sm:col-span-2"
                />
                <Field
                  label="Address line 2"
                  value={draft.line2}
                  onChange={(v) => setDraft({ line2: v })}
                  autoComplete="address-line2"
                  className="sm:col-span-2"
                />
                <Field
                  label="Town / city"
                  value={draft.town}
                  onChange={(v) => setDraft({ town: v })}
                  autoComplete="address-level2"
                  required
                />
                <Field
                  label="Postcode"
                  value={draft.postcode}
                  onChange={(v) => setDraft({ postcode: v.toUpperCase() })}
                  autoComplete="postal-code"
                  required
                />
              </div>
            </Section>

            <Section title="Message (optional)">
              <textarea
                value={draft.message}
                onChange={(e) => setDraft({ message: e.target.value })}
                rows={4}
                placeholder="Anything we should know before the consultation?"
                className="w-full rounded-2xl border-0 bg-muted/60 px-4 py-3 text-sm focus-ring resize-none"
              />
            </Section>

            {DEPOSITS_ENABLED && (
              <Section title="Payment">
                <label className="flex items-start gap-3 cursor-pointer rounded-2xl bg-muted/40 p-4 ring-1 ring-border/60 hover:ring-primary/30 transition-all">
                  <input
                    type="checkbox"
                    checked={draft.payDeposit}
                    onChange={(e) => setDraft({ payDeposit: e.target.checked })}
                    className="mt-1 size-4 accent-[oklch(0.42_0.16_305)]"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      Pay a deposit online
                      {depositPence > 0
                        ? ` (${formatPrice(depositPence)})`
                        : ""}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                      Secure the slot with a 20% deposit via Stripe. Balance on
                      the day (cash or bank transfer). Uncheck to pay fully on
                      the day instead.
                    </span>
                  </span>
                </label>
              </Section>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-2xl bg-destructive/10 text-destructive px-4 py-3 text-sm"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={() => router.push("/schedule")}
              className="self-start rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground lg:hidden"
            >
              Back
            </button>
          </div>

          <div className="lg:col-span-4 min-w-0 relative">
            <BookingSummaryLive
              actions={
                <>
                  <button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all",
                      canSubmit && !submitting
                        ? "bg-primary text-primary-foreground shadow-cinematic hover:bg-primary-container"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {submitting && <Loader2 className="size-4 animate-spin" />}
                    {DEPOSITS_ENABLED && draft.payDeposit && depositPence > 0
                      ? "Confirm & pay deposit"
                      : "Confirm booking"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/schedule")}
                    className="hidden lg:block w-full rounded-full px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Back to schedule
                  </button>
                </>
              }
            />
          </div>
        </div>
      </form>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl bg-card p-6 md:p-8 shadow-float shine-border">
      <h2 className="text-display text-xl font-semibold mb-6">{title}</h2>
      {children}
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
  placeholder,
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
  required?: boolean
  placeholder?: string
  className?: string
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border-0 bg-muted/60 px-4 py-3 text-sm focus-ring"
      />
    </label>
  )
}
