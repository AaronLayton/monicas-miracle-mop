import { NextResponse } from "next/server"
import { z } from "zod"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import {
  getBookingById,
  updateBooking,
  cancelBooking,
  setBookingStatus,
  addMessage,
  attachGoogleEvent,
} from "@/lib/booking/store"
import {
  sendBookingUpdatedEmails,
  sendBookingCancelledEmails,
  sendBusinessMessageEmail,
} from "@/lib/email/send"
import {
  syncBookingToGoogleCalendar,
  removeBookingFromGoogleCalendar,
} from "@/lib/calendar/google"

const actionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("reschedule"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    arrivalWindowId: z.string().min(1),
    notifyCustomer: z.boolean().default(true),
  }),
  z.object({
    action: z.literal("status"),
    status: z.enum(["confirmed", "completed"]),
  }),
  z.object({
    action: z.literal("cancel"),
    reason: z.string().max(500).optional(),
    notifyCustomer: z.boolean().default(true),
  }),
  z.object({
    action: z.literal("reply"),
    body: z.string().min(1).max(2000),
  }),
])

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const { id } = await params
  const existing = await getBookingById(id)
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const parsed = actionSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const input = parsed.data

  try {
    switch (input.action) {
      case "reschedule": {
        const booking = await updateBooking(existing.token, {
          date: input.date,
          arrivalWindowId: input.arrivalWindowId,
        })
        if (!booking) {
          return NextResponse.json({ error: "Not found" }, { status: 404 })
        }
        if (input.notifyCustomer) {
          try {
            await sendBookingUpdatedEmails(booking)
          } catch (e) {
            console.error("[admin] update email failed", e)
          }
        }
        try {
          const eventId = await syncBookingToGoogleCalendar(booking)
          if (eventId && eventId !== booking.googleEventId) {
            await attachGoogleEvent(booking.token, eventId)
          }
        } catch (e) {
          console.error("[admin] gcal sync failed", e)
        }
        return NextResponse.json({ booking })
      }

      case "status": {
        const booking = await setBookingStatus(existing.token, input.status)
        return NextResponse.json({ booking })
      }

      case "cancel": {
        const booking = await cancelBooking(existing.token, input.reason)
        if (!booking) {
          return NextResponse.json({ error: "Not found" }, { status: 404 })
        }
        if (input.notifyCustomer) {
          try {
            await sendBookingCancelledEmails(booking)
          } catch (e) {
            console.error("[admin] cancel email failed", e)
          }
        }
        try {
          await removeBookingFromGoogleCalendar(booking)
        } catch (e) {
          console.error("[admin] gcal delete failed", e)
        }
        return NextResponse.json({ booking })
      }

      case "reply": {
        const booking = await addMessage(
          existing.token,
          "business",
          input.body
        )
        if (!booking) {
          return NextResponse.json({ error: "Not found" }, { status: 404 })
        }
        try {
          await sendBusinessMessageEmail(booking, input.body)
        } catch (e) {
          console.error("[admin] message email failed", e)
        }
        return NextResponse.json({ booking })
      }
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 400 }
    )
  }
}
