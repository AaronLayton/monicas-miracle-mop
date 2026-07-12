import type { Booking } from "@/lib/booking/types"
import {
  ARRIVAL_WINDOWS,
  BUSINESS,
  getServiceById,
} from "@/lib/data/services"
import { getSiteUrl } from "@/lib/site"

/**
 * iCalendar (RFC 5545) builder for Monica's Miracle Mop bookings.
 *
 * Times are written as "floating" local date-times (no Z suffix, no TZID)
 * because this is a UK-only business and every job is scheduled in local
 * wall-clock time. UIDs are stable per booking reference so re-issuing an
 * event (e.g. after a date change) overwrites the existing calendar entry.
 */

const CRLF = "\r\n"

function bookingManageUrl(token: string): string {
  return `${getSiteUrl()}/booking/${token}`
}

/** Escape a value for an iCalendar TEXT property (RFC 5545 §3.3.11). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\n|\r/g, "\\n")
}

/**
 * Fold a content line to a maximum of 75 octets per line (RFC 5545 §3.1).
 * Continuation lines begin with a single space. Folding never splits a
 * multi-byte UTF-8 character across a line boundary.
 */
function foldLine(line: string): string {
  const bytes = Buffer.from(line, "utf8")
  if (bytes.length <= 75) return line

  const out: string[] = []
  let start = 0
  // First line: up to 75 octets. Continuation lines: leading space counts
  // toward the limit, so 74 octets of content each.
  let limit = 75
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length)
    // Back off so we never cut a multi-byte UTF-8 sequence (continuation
    // bytes match 0b10xxxxxx).
    if (end < bytes.length) {
      while (end > start && (bytes[end] & 0xc0) === 0x80) end--
    }
    const chunk = bytes.subarray(start, end).toString("utf8")
    out.push(start === 0 ? chunk : ` ${chunk}`)
    start = end
    limit = 74
  }
  return out.join(CRLF)
}

/** Build a folded "NAME:VALUE" content line from an already-escaped value. */
function line(name: string, value: string): string {
  return foldLine(`${name}:${value}`)
}

/** yyyy-mm-dd + HH:MM -> floating local date-time (e.g. 20260717T120000). */
function toFloatingDateTime(date: string, time: string): string {
  const d = date.replace(/-/g, "")
  const t = time.replace(/:/g, "")
  return `${d}T${t}00`
}

/** ISO timestamp -> UTC iCalendar stamp (e.g. 20260712T093000Z). */
function toUtcStamp(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
}

function serviceName(id: string): string {
  return getServiceById(id)?.name ?? id
}

function locationFor(booking: Booking): string {
  return [
    booking.address.line1,
    booking.address.line2,
    booking.address.town,
    booking.address.postcode,
  ]
    .filter(Boolean)
    .join(", ")
}

/** The VEVENT lines for a single booking (without BEGIN/END wrappers folded). */
function eventLines(booking: Booking): string[] {
  const window = ARRIVAL_WINDOWS.find((w) => w.id === booking.arrivalWindowId)
  const start = window?.start ?? "09:00"
  const end = window?.end ?? "17:00"

  const summary = `${BUSINESS.name} — ${serviceName(booking.primaryServiceId)}`
  const description =
    `Booking reference ${booking.reference}.\n` +
    `Manage your booking: ${bookingManageUrl(booking.token)}`

  return [
    "BEGIN:VEVENT",
    line("UID", `${booking.reference}@monicasmiraclemop`),
    line("DTSTAMP", toUtcStamp(booking.updatedAt ?? booking.createdAt)),
    line("DTSTART", toFloatingDateTime(booking.date, start)),
    line("DTEND", toFloatingDateTime(booking.date, end)),
    line("SUMMARY", escapeText(summary)),
    line("LOCATION", escapeText(locationFor(booking))),
    line("DESCRIPTION", escapeText(description)),
    "END:VEVENT",
  ]
}

/** Return a full VCALENDAR string containing one VEVENT for the booking. */
export function bookingToIcsEvent(booking: Booking): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Monica's Miracle Mop//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...eventLines(booking),
    "END:VCALENDAR",
  ]
  return lines.join(CRLF) + CRLF
}

/** Return one VCALENDAR with a VEVENT per booking (calendar subscription). */
export function bookingsToIcs(bookings: Booking[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Monica's Miracle Mop//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    line("X-WR-CALNAME", `${BUSINESS.name} Bookings`),
    ...bookings.flatMap(eventLines),
    "END:VCALENDAR",
  ]
  return lines.join(CRLF) + CRLF
}
