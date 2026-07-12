import type { Metadata } from "next"
import type { Route } from "next"
import { Link } from "next-view-transitions"
import { ArrowRight, CalendarDays, Inbox } from "lucide-react"
import { requireAdmin } from "@/lib/admin/auth"
import { listBookings } from "@/lib/booking/store"
import {
  ARRIVAL_WINDOWS,
  formatPrice,
  getServiceById,
} from "@/lib/data/services"
import type { Booking } from "@/lib/booking/types"
import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
import { StatusChip } from "@/components/admin/status-chip"

export const metadata: Metadata = {
  title: "Admin — Bookings",
  robots: { index: false, follow: false },
}

function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function windowLabel(id: string) {
  const w = ARRIVAL_WINDOWS.find((w) => w.id === id)
  return w ? `${w.label} (${w.start}–${w.end})` : id
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function AdminDashboardPage() {
  await requireAdmin()
  const bookings = await listBookings()
  const today = todayIso()

  const upcoming = bookings
    .filter(
      (b) =>
        b.date >= today && b.status !== "cancelled" && b.status !== "completed"
    )
    .sort((a, b) => a.date.localeCompare(b.date))
  const other = bookings
    .filter((b) => !upcoming.includes(b))
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page-nav-offset mx-auto max-w-7xl px-4 md:px-8 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-2">
            Admin
          </p>
          <h1 className="text-display text-3xl md:text-4xl font-semibold tracking-tight">
            Bookings
          </h1>
        </div>
        <AdminLogoutButton />
      </div>

      <section className="mb-14">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          <CalendarDays className="size-4 text-primary" aria-hidden />
          Upcoming ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState label="No upcoming bookings yet." />
        ) : (
          <BookingList bookings={upcoming} />
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          <Inbox className="size-4 text-primary" aria-hidden />
          Past & cancelled ({other.length})
        </h2>
        {other.length === 0 ? (
          <EmptyState label="Nothing here yet." />
        ) : (
          <BookingList bookings={other} muted />
        )}
      </section>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-3xl bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground">
      {label}
    </div>
  )
}

function BookingList({
  bookings,
  muted = false,
}: {
  bookings: Booking[]
  muted?: boolean
}) {
  return (
    <ul className="flex flex-col gap-3">
      {bookings.map((b) => {
        const service = getServiceById(b.primaryServiceId)?.name ?? "Clean"
        const unread = b.messages.filter((m) => m.from === "customer").length
        return (
          <li key={b.id}>
            <Link
              href={`/admin/bookings/${b.id}` as Route}
              className={`group grid items-center gap-x-6 gap-y-1 rounded-2xl bg-card px-5 py-4 shadow-float shine-border transition-all hover:-translate-y-0.5 hover:shadow-cinematic md:grid-cols-[10rem_1fr_1fr_auto_auto] ${muted ? "opacity-75 hover:opacity-100" : ""}`}
            >
              <div>
                <p className="text-sm font-bold text-foreground">
                  {formatDate(b.date)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {windowLabel(b.arrivalWindowId)}
                </p>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {b.contact.firstName} {b.contact.lastName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {b.address.town} · {b.address.postcode}
                </p>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{service}</p>
                <p className="text-xs text-muted-foreground">
                  {b.reference}
                  {unread > 0 ? ` · ${unread} message${unread === 1 ? "" : "s"}` : ""}
                </p>
              </div>
              <p className="text-sm font-bold text-primary tabular-nums">
                {formatPrice(b.estimatedTotalPence)}
              </p>
              <div className="flex items-center gap-3 justify-self-end">
                <StatusChip status={b.status} />
                <ArrowRight
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
