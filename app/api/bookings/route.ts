import { NextResponse } from "next/server"
import { createBookingSchema } from "@/lib/booking/types"
import {
  createBooking,
  attachStripeSession,
  attachGoogleEvent,
} from "@/lib/booking/store"
import { createDepositCheckoutSession } from "@/lib/stripe"
import { sendBookingConfirmationEmails } from "@/lib/email/send"
import { syncBookingToGoogleCalendar } from "@/lib/calendar/google"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = createBookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    const booking = await createBooking(parsed.data)

    // Fire-and-forget emails (don't block response on email failure in dev)
    try {
      await sendBookingConfirmationEmails(booking)
    } catch (e) {
      console.error("Email send error", e)
    }

    // Best-effort Google Calendar sync (no-op until configured)
    try {
      const eventId = await syncBookingToGoogleCalendar(booking)
      if (eventId) await attachGoogleEvent(booking.token, eventId)
    } catch (e) {
      console.error("Google Calendar sync error", e)
    }

    const origin = new URL(req.url).origin
    let checkoutUrl: string | null = null

    if (booking.depositPence > 0 && parsed.data.payDeposit) {
      const session = await createDepositCheckoutSession(booking, origin)
      if ("sessionId" in session) {
        await attachStripeSession(booking.token, session.sessionId)
        checkoutUrl = session.url
      } else {
        checkoutUrl = session.url
      }
    }

    return NextResponse.json({
      ok: true,
      booking: {
        id: booking.id,
        token: booking.token,
        reference: booking.reference,
        status: booking.status,
        manageUrl: `/booking/${booking.token}`,
      },
      checkoutUrl,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    )
  }
}
