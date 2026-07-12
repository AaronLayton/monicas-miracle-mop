import { calendar, auth, type calendar_v3 } from "@googleapis/calendar"
import type { Booking } from "@/lib/booking/types"
import {
  ARRIVAL_WINDOWS,
  BUSINESS,
  formatPrice,
  getServiceById,
} from "@/lib/data/services"

/**
 * Google Calendar sync — pushes bookings straight into Kasey's calendar via
 * a service account, so new bookings appear instantly (unlike ICS URL
 * subscriptions, which Google refreshes only every several hours).
 *
 * Setup (one-off):
 *  1. Google Cloud project → enable the Google Calendar API
 *  2. Create a service account + JSON key
 *  3. Kasey shares her calendar with the service-account email
 *     ("Make changes to events" permission)
 *  4. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and
 *     GOOGLE_CALENDAR_ID (her calendar's id, usually her gmail address)
 *
 * Until those env vars exist, every function here is a silent no-op — the
 * same graceful-skip pattern as Resend/Stripe.
 */

const TIMEZONE = "Europe/London"

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID
  )
}

function getClient(): calendar_v3.Calendar | null {
  if (!isGoogleCalendarConfigured()) return null
  const jwt = new auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // Env vars store the PEM with literal \n — restore real newlines
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  })
  return calendar({ version: "v3", auth: jwt })
}

function calendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID!
}

function bookingToEvent(booking: Booking): calendar_v3.Schema$Event {
  const window = ARRIVAL_WINDOWS.find((w) => w.id === booking.arrivalWindowId)
  const start = window?.start ?? "09:00"
  const end = window?.end ?? "17:00"
  const service = getServiceById(booking.primaryServiceId)?.name ?? "Clean"
  const customer = `${booking.contact.firstName} ${booking.contact.lastName}`
  const address = [
    booking.address.line1,
    booking.address.line2,
    booking.address.town,
    booking.address.postcode,
  ]
    .filter(Boolean)
    .join(", ")
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  return {
    summary: `${service} — ${customer} (${booking.reference})`,
    location: address,
    description: [
      `Reference: ${booking.reference}`,
      `Customer: ${customer}`,
      `Phone: ${booking.contact.phone}`,
      `Email: ${booking.contact.email}`,
      `Home: ${booking.home.bedrooms} bed · ${booking.home.bathrooms} bath · ${booking.home.kitchens} kitchen(s)`,
      `Estimate: ${formatPrice(booking.estimatedTotalPence)}`,
      booking.message ? `Message: ${booking.message}` : null,
      ``,
      `Manage: ${siteUrl}/booking/${booking.token}`,
    ]
      .filter((l): l is string => l !== null)
      .join("\n"),
    start: { dateTime: `${booking.date}T${start}:00`, timeZone: TIMEZONE },
    end: { dateTime: `${booking.date}T${end}:00`, timeZone: TIMEZONE },
    extendedProperties: {
      private: { bookingReference: booking.reference, app: BUSINESS.name },
    },
  }
}

/**
 * Insert (or update, when the booking already has an event) the calendar
 * event for a booking. Returns the Google event id, or null when the
 * integration isn't configured / the call fails — callers treat this as
 * best-effort and must never block the booking on it.
 */
export async function syncBookingToGoogleCalendar(
  booking: Booking
): Promise<string | null> {
  const client = getClient()
  if (!client) {
    console.info(
      "[gcal:skip] not configured — booking",
      booking.reference,
      "not synced"
    )
    return null
  }
  try {
    if (booking.googleEventId) {
      const res = await client.events.patch({
        calendarId: calendarId(),
        eventId: booking.googleEventId,
        requestBody: bookingToEvent(booking),
      })
      return res.data.id ?? booking.googleEventId
    }
    const res = await client.events.insert({
      calendarId: calendarId(),
      requestBody: bookingToEvent(booking),
    })
    return res.data.id ?? null
  } catch (e) {
    console.error("[gcal] sync failed for", booking.reference, e)
    return null
  }
}

/** Remove the calendar event for a cancelled booking (best-effort). */
export async function removeBookingFromGoogleCalendar(
  booking: Booking
): Promise<void> {
  const client = getClient()
  if (!client || !booking.googleEventId) return
  try {
    await client.events.delete({
      calendarId: calendarId(),
      eventId: booking.googleEventId,
    })
  } catch (e) {
    // Already-deleted events return 404/410 — safe to ignore either way
    console.error("[gcal] delete failed for", booking.reference, e)
  }
}
