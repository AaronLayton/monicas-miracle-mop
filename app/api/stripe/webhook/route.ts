import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import {
  getBookingByToken,
  markDepositPaid,
} from "@/lib/booking/store"
import { sendBookingConfirmationEmails } from "@/lib/email/send"

export async function POST(req: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripe || !secret) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 503 }
    )
  }

  const body = await req.text()
  const sig = req.headers.get("stripe-signature")
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    console.error("Webhook signature failed", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const token = session.metadata?.bookingToken
    if (token) {
      const booking = await getBookingByToken(token)
      if (booking && booking.depositPaidPence === 0) {
        const amount =
          typeof session.amount_total === "number"
            ? session.amount_total
            : booking.depositPence
        const updated = await markDepositPaid(token, {
          sessionId: session.id,
          paymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : undefined,
          amountPence: amount,
        })
        if (updated) {
          try {
            await sendBookingConfirmationEmails(updated)
          } catch (e) {
            console.error(e)
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
