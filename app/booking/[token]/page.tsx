import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBookingByToken, markDepositPaid } from "@/lib/booking/store"
import { ManageBooking } from "@/components/booking/manage-booking"

export const metadata: Metadata = {
  title: "Manage booking",
  robots: { index: false, follow: false },
}

type Props = {
  params: Promise<{ token: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function BookingManagePage({
  params,
  searchParams,
}: Props) {
  const { token } = await params
  const sp = await searchParams
  let booking = await getBookingByToken(token)
  if (!booking) notFound()

  let flash: string | null = null
  if (sp.paid === "1") {
    flash = "Thank you — your deposit payment was received."
  }
  if (sp.dev_skip_payment === "1" && process.env.NODE_ENV !== "production") {
    if (booking.depositPaidPence === 0 && booking.depositPence > 0) {
      booking =
        (await markDepositPaid(token, {
          amountPence: booking.depositPence,
        })) ?? booking
    }
    flash = "Dev mode: deposit marked as paid (Stripe not configured)."
  }
  if (sp.cancelled_checkout === "1") {
    flash =
      "Checkout cancelled — you can pay the deposit any time from this page."
  }

  return <ManageBooking initial={booking} flash={flash} />
}
