import { customAlphabet } from "nanoid"
import type {
  Booking,
  BookingMessage,
  BookingStatus,
  CreateBookingInput,
  UpdateBookingInput,
} from "@/lib/booking/types"
import { priceBooking } from "@/lib/booking/pricing"
import {
  ARRIVAL_WINDOWS,
  isArrivalWindowAvailable,
} from "@/lib/data/services"
import { getSql } from "@/lib/db/client"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12)
const tokenId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  32
)
const messageId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

// --- Persistence (Neon Postgres) --------------------------------------------

let schemaReady: Promise<void> | null = null

/**
 * Create the `bookings` table and its indexes on first use. The full Booking
 * object lives in the `data` JSONB column; the top-level columns mirror the
 * fields we query or constrain on and are kept in sync on every write.
 */
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = getSql()
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id text PRIMARY KEY,
          token text UNIQUE NOT NULL,
          reference text UNIQUE NOT NULL,
          stripe_session_id text,
          date date NOT NULL,
          status text NOT NULL,
          data jsonb NOT NULL,
          created_at timestamptz NOT NULL,
          updated_at timestamptz NOT NULL
        )
      `
      await sql`
        CREATE INDEX IF NOT EXISTS bookings_stripe_session_id_idx
          ON bookings (stripe_session_id)
      `
    })().catch((err) => {
      // Reset so a later call can retry after a transient failure.
      schemaReady = null
      throw err
    })
  }
  return schemaReady
}

/** Upsert a full Booking, keeping the indexed columns in sync with the JSONB. */
async function saveBooking(booking: Booking): Promise<Booking> {
  await ensureSchema()
  const sql = getSql()
  await sql.query(
    `INSERT INTO bookings
       (id, token, reference, stripe_session_id, date, status, data, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9)
     ON CONFLICT (id) DO UPDATE SET
       token = EXCLUDED.token,
       reference = EXCLUDED.reference,
       stripe_session_id = EXCLUDED.stripe_session_id,
       date = EXCLUDED.date,
       status = EXCLUDED.status,
       data = EXCLUDED.data,
       updated_at = EXCLUDED.updated_at`,
    [
      booking.id,
      booking.token,
      booking.reference,
      booking.stripeSessionId ?? null,
      booking.date,
      booking.status,
      JSON.stringify(booking),
      booking.createdAt,
      booking.updatedAt,
    ]
  )
  return booking
}

async function findOne(
  column: "id" | "token" | "stripe_session_id",
  value: string
): Promise<Booking | null> {
  await ensureSchema()
  const sql = getSql()
  const rows = (await sql.query(
    `SELECT data FROM bookings WHERE ${column} = $1 LIMIT 1`,
    [value]
  )) as { data: Booking }[]
  return rows[0]?.data ?? null
}

function makeReference(): string {
  const d = new Date()
  const y = d.getFullYear().toString().slice(-2)
  const m = String(d.getMonth() + 1).padStart(2, "0")
  return `MMM-${y}${m}-${nanoid(6).toUpperCase()}`
}

export async function createBooking(
  input: CreateBookingInput
): Promise<Booking> {
  const window = ARRIVAL_WINDOWS.find((w) => w.id === input.arrivalWindowId)
  if (!window) throw new Error("Invalid arrival window")
  if (!isArrivalWindowAvailable(input.date, input.arrivalWindowId)) {
    throw new Error("That arrival window is fully booked on the chosen day")
  }

  const { lineItems, estimatedTotalPence, depositPence } = priceBooking(input)
  const now = new Date().toISOString()

  const booking: Booking = {
    id: nanoid(),
    token: tokenId(),
    reference: makeReference(),
    status: depositPence > 0 ? "pending_payment" : "confirmed",
    primaryServiceId: input.primaryServiceId,
    addons: input.addons,
    home: input.home,
    date: input.date,
    arrivalWindowId: input.arrivalWindowId,
    contact: input.contact,
    address: {
      ...input.address,
      postcode: input.address.postcode.toUpperCase().replace(/\s+/g, " ").trim(),
    },
    message: input.message,
    lineItems,
    estimatedTotalPence,
    depositPence,
    depositPaidPence: 0,
    messages: input.message
      ? [
          {
            id: messageId(),
            from: "customer",
            body: input.message,
            createdAt: now,
          },
        ]
      : [],
    createdAt: now,
    updatedAt: now,
  }

  await saveBooking(booking)
  return booking
}

export async function getBookingByToken(
  token: string
): Promise<Booking | null> {
  if (!token || token.length < 16) return null
  return findOne("token", token)
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return findOne("id", id)
}

export async function getBookingByStripeSession(
  sessionId: string
): Promise<Booking | null> {
  return findOne("stripe_session_id", sessionId)
}

export async function updateBooking(
  token: string,
  patch: UpdateBookingInput
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null

  if (current.status === "cancelled" || current.status === "completed") {
    throw new Error("This booking can no longer be changed")
  }

  const next: Booking = {
    ...current,
    primaryServiceId: patch.primaryServiceId ?? current.primaryServiceId,
    addons: patch.addons ?? current.addons,
    home: patch.home ? { ...current.home, ...patch.home } : current.home,
    date: patch.date ?? current.date,
    arrivalWindowId: patch.arrivalWindowId ?? current.arrivalWindowId,
    message:
      patch.message !== undefined ? patch.message : current.message,
    updatedAt: new Date().toISOString(),
  }

  if (patch.customerNote?.trim()) {
    const note: BookingMessage = {
      id: messageId(),
      from: "customer",
      body: patch.customerNote.trim(),
      createdAt: new Date().toISOString(),
    }
    next.messages = [...current.messages, note]
  }

  // Re-price if services/addons/home changed
  if (patch.primaryServiceId || patch.addons || patch.home) {
    const priced = priceBooking({
      primaryServiceId: next.primaryServiceId,
      addons: next.addons,
      home: next.home,
      date: next.date,
      arrivalWindowId: next.arrivalWindowId,
      contact: next.contact,
      address: next.address,
      payDeposit: next.depositPence > 0,
      // Let pricing recompute suggested hours from home + services
      estimatedHours: undefined,
    })
    next.lineItems = priced.lineItems
    next.estimatedTotalPence = priced.estimatedTotalPence
    // Keep original deposit requirement if already paid
    if (next.depositPaidPence === 0) {
      next.depositPence = priced.depositPence
    }
  }

  await saveBooking(next)
  return next
}

export async function cancelBooking(
  token: string,
  reason?: string
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null

  if (current.status === "cancelled") return current
  if (current.status === "completed") {
    throw new Error("Completed bookings cannot be cancelled")
  }

  const next: Booking = {
    ...current,
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
    cancelReason: reason,
    updatedAt: new Date().toISOString(),
  }
  await saveBooking(next)
  return next
}

export async function markDepositPaid(
  token: string,
  opts: { sessionId?: string; paymentIntentId?: string; amountPence: number }
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null

  const next: Booking = {
    ...current,
    status: "deposit_paid",
    depositPaidPence: opts.amountPence,
    stripeSessionId: opts.sessionId ?? current.stripeSessionId,
    stripePaymentIntentId:
      opts.paymentIntentId ?? current.stripePaymentIntentId,
    updatedAt: new Date().toISOString(),
  }
  await saveBooking(next)
  return next
}

export async function attachStripeSession(
  token: string,
  sessionId: string
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null

  const next: Booking = {
    ...current,
    stripeSessionId: sessionId,
    updatedAt: new Date().toISOString(),
  }
  await saveBooking(next)
  return next
}

export async function attachGoogleEvent(
  token: string,
  eventId: string
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null

  const next: Booking = {
    ...current,
    googleEventId: eventId,
    updatedAt: new Date().toISOString(),
  }
  await saveBooking(next)
  return next
}

/**
 * Admin-only status change (e.g. mark completed, reopen to confirmed).
 * Cancellation must go through cancelBooking so reason/emails are handled.
 */
export async function setBookingStatus(
  token: string,
  status: Exclude<BookingStatus, "cancelled">
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null
  if (current.status === "cancelled") {
    throw new Error("Cancelled bookings cannot change status")
  }

  const next: Booking = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  }
  await saveBooking(next)
  return next
}

export async function addMessage(
  token: string,
  from: "customer" | "business",
  body: string
): Promise<Booking | null> {
  const current = await findOne("token", token)
  if (!current) return null

  const msg: BookingMessage = {
    id: messageId(),
    from,
    body: body.trim(),
    createdAt: new Date().toISOString(),
  }
  const next: Booking = {
    ...current,
    messages: [...current.messages, msg],
    updatedAt: new Date().toISOString(),
  }
  await saveBooking(next)
  return next
}

export async function listBookings(): Promise<Booking[]> {
  await ensureSchema()
  const sql = getSql()
  const rows = (await sql`
    SELECT data FROM bookings ORDER BY created_at ASC
  `) as { data: Booking }[]
  return rows.map((r) => r.data)
}
