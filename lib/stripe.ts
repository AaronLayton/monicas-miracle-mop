import Stripe from "stripe"
import type { Booking } from "@/lib/booking/types"
import { BUSINESS, formatPrice } from "@/lib/data/services"

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, {
    // Use account default API version
    typescript: true,
  })
}

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

export async function createDepositCheckoutSession(
  booking: Booking,
  origin: string
): Promise<{ url: string; sessionId: string } | { mock: true; url: string }> {
  const stripe = getStripe()
  const successUrl = `${origin}/booking/${booking.token}?paid=1`
  const cancelUrl = `${origin}/booking/${booking.token}?cancelled_checkout=1`

  if (!stripe || booking.depositPence <= 0) {
    // Dev / unconfigured: skip real payment, mark as manage page
    return {
      mock: true,
      url: `${origin}/booking/${booking.token}?dev_skip_payment=1`,
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: booking.contact.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: booking.depositPence,
          product_data: {
            name: `Booking deposit — ${BUSINESS.name}`,
            description: `Reference ${booking.reference} · ${formatPrice(booking.depositPence)} deposit toward estimated ${formatPrice(booking.estimatedTotalPence)}`,
          },
        },
      },
    ],
    metadata: {
      bookingId: booking.id,
      bookingToken: booking.token,
      reference: booking.reference,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  if (!session.url) throw new Error("Stripe did not return a checkout URL")
  return { url: session.url, sessionId: session.id }
}
