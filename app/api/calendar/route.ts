import { listBookings } from "@/lib/booking/store"
import { bookingsToIcs } from "@/lib/calendar/ics"

// Bookings live in a file-backed store, so this must run on the Node runtime
// and never be statically cached.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Private calendar subscription feed for the business owner.
 *
 * Subscribe in Google/Apple Calendar with the "from URL" option using:
 *   {SITE_URL}/api/calendar?key={CALENDAR_FEED_TOKEN}
 *
 * The token is a shared secret; without a matching `key` the feed returns 401.
 */
export async function GET(req: Request) {
  const token = process.env.CALENDAR_FEED_TOKEN
  const key = new URL(req.url).searchParams.get("key")

  if (!token || key !== token) {
    return new Response("Unauthorised", { status: 401 })
  }

  const bookings = await listBookings()
  const active = bookings.filter((b) => b.status !== "cancelled")
  const ics = bookingsToIcs(active)

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="monicas-miracle-mop.ics"',
      "Cache-Control": "no-store",
    },
  })
}
