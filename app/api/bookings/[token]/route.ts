import { NextResponse } from "next/server"
import {
  getBookingByToken,
  updateBooking,
  cancelBooking,
  addMessage,
  markDepositPaid,
  attachStripeSession,
  attachGoogleEvent,
} from "@/lib/booking/store"
import {
  syncBookingToGoogleCalendar,
  removeBookingFromGoogleCalendar,
} from "@/lib/calendar/google"
import { updateBookingSchema } from "@/lib/booking/types"
import {
  sendBookingUpdatedEmails,
  sendBookingCancelledEmails,
} from "@/lib/email/send"
import { createDepositCheckoutSession } from "@/lib/stripe"

type Params = { params: Promise<{ token: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { token } = await params
  const booking = await getBookingByToken(token)
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ booking })
}

export async function PATCH(req: Request, { params }: Params) {
  const { token } = await params
  try {
    const body = await req.json()
    const action = body?.action as string | undefined

    if (action === "cancel") {
      const booking = await cancelBooking(token, body?.reason)
      if (!booking) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      try {
        await sendBookingCancelledEmails(booking)
      } catch (e) {
        console.error(e)
      }
      try {
        await removeBookingFromGoogleCalendar(booking)
      } catch (e) {
        console.error("Google Calendar delete error", e)
      }
      return NextResponse.json({ booking })
    }

    if (action === "message") {
      const text = String(body?.body ?? "").trim()
      if (!text) {
        return NextResponse.json({ error: "Message required" }, { status: 400 })
      }
      const booking = await addMessage(token, "customer", text)
      if (!booking) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      return NextResponse.json({ booking })
    }

    if (action === "pay_deposit") {
      const booking = await getBookingByToken(token)
      if (!booking) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      if (booking.depositPaidPence > 0) {
        return NextResponse.json(
          { error: "Deposit already paid" },
          { status: 400 }
        )
      }
      const origin = new URL(req.url).origin
      const session = await createDepositCheckoutSession(booking, origin)
      if ("sessionId" in session) {
        await attachStripeSession(token, session.sessionId)
      }
      if ("mock" in session && process.env.NODE_ENV !== "production") {
        await markDepositPaid(token, {
          amountPence: booking.depositPence,
        })
      }
      return NextResponse.json({ checkoutUrl: session.url })
    }

    if (action === "dev_mark_paid") {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
      const booking = await getBookingByToken(token)
      if (!booking) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
      const updated = await markDepositPaid(token, {
        amountPence: booking.depositPence,
      })
      return NextResponse.json({ booking: updated })
    }

    const parsed = updateBookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const booking = await updateBooking(token, parsed.data)
    if (!booking) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    try {
      await sendBookingUpdatedEmails(booking)
    } catch (e) {
      console.error(e)
    }
    try {
      const eventId = await syncBookingToGoogleCalendar(booking)
      if (eventId && eventId !== booking.googleEventId) {
        await attachGoogleEvent(token, eventId)
      }
    } catch (e) {
      console.error("Google Calendar sync error", e)
    }
    return NextResponse.json({ booking })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    )
  }
}
