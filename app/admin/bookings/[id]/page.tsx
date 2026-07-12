import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Link } from "next-view-transitions"
import { ArrowLeft, Home, Mail, MapPin, Phone } from "lucide-react"
import { requireAdmin } from "@/lib/admin/auth"
import { getBookingById } from "@/lib/booking/store"
import {
  ARRIVAL_WINDOWS,
  formatPrice,
  getServiceById,
} from "@/lib/data/services"
import { StatusChip } from "@/components/admin/status-chip"
import { AdminBookingActions } from "@/components/admin/admin-booking-actions"

export const metadata: Metadata = {
  title: "Admin — Booking",
  robots: { index: false, follow: false },
}

function windowLabel(id: string) {
  const w = ARRIVAL_WINDOWS.find((w) => w.id === id)
  return w ? `${w.label} (${w.start}–${w.end})` : id
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function AdminBookingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params
  const booking = await getBookingById(id)
  if (!booking) notFound()

  const service = getServiceById(booking.primaryServiceId)?.name ?? "Clean"

  return (
    <div className="page-nav-offset mx-auto max-w-5xl px-4 md:px-8 pb-20">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All bookings
      </Link>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <h1 className="text-display text-2xl md:text-3xl font-semibold tracking-tight">
          {booking.reference}
        </h1>
        <StatusChip status={booking.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6 min-w-0">
          {/* Visit */}
          <section className="rounded-3xl bg-card p-6 shadow-float shine-border">
            <h2 className="text-display text-lg font-semibold mb-4">Visit</h2>
            <dl className="grid gap-2 text-sm">
              <Row label="Service" value={service} />
              <Row label="Date" value={formatDate(booking.date)} />
              <Row
                label="Arrival"
                value={windowLabel(booking.arrivalWindowId)}
              />
              <Row
                label="Home"
                value={`${booking.home.bedrooms} bed · ${booking.home.bathrooms} bath · ${booking.home.kitchens} kitchen${booking.home.kitchens === 1 ? "" : "s"}`}
              />
              {booking.home.notes ? (
                <Row label="Access notes" value={booking.home.notes} />
              ) : null}
            </dl>
            <div className="mt-4 border-t border-border/60 pt-4">
              {booking.lineItems.map((item) => (
                <p
                  key={`${item.serviceId}-${item.name}`}
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span>
                    {item.name}
                    {item.quantity > 1 ? ` ×${item.quantity}` : ""}
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(item.totalPence)}
                  </span>
                </p>
              ))}
              <p className="mt-2 flex justify-between text-base font-bold text-foreground">
                <span>Estimated total</span>
                <span className="text-primary tabular-nums">
                  {formatPrice(booking.estimatedTotalPence)}
                </span>
              </p>
            </div>
          </section>

          {/* Customer */}
          <section className="rounded-3xl bg-card p-6 shadow-float shine-border">
            <h2 className="text-display text-lg font-semibold mb-4">
              Customer
            </h2>
            <p className="text-base font-semibold text-foreground mb-3">
              {booking.contact.firstName} {booking.contact.lastName}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href={`tel:${booking.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Phone className="size-4 text-primary" aria-hidden />
                {booking.contact.phone}
              </a>
              <a
                href={`mailto:${booking.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Mail className="size-4 text-primary" aria-hidden />
                {booking.contact.email}
              </a>
              <span className="inline-flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
                {[
                  booking.address.line1,
                  booking.address.line2,
                  booking.address.town,
                  booking.address.postcode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Home className="size-4 text-primary" aria-hidden />
                Booked {formatDateTime(booking.createdAt)}
              </span>
            </div>
          </section>

          {/* Messages */}
          <section className="rounded-3xl bg-card p-6 shadow-float shine-border">
            <h2 className="text-display text-lg font-semibold mb-4">
              Messages
            </h2>
            {booking.messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {booking.messages.map((m) => (
                  <li
                    key={m.id}
                    className={
                      m.from === "business"
                        ? "ml-6 rounded-2xl bg-primary-soft/60 p-4"
                        : "mr-6 rounded-2xl bg-muted/60 p-4"
                    }
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      {m.from === "business" ? "You" : "Customer"} ·{" "}
                      {formatDateTime(m.createdAt)}
                    </p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {m.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Actions */}
        <div className="min-w-0">
          <AdminBookingActions booking={booking} />
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  )
}
