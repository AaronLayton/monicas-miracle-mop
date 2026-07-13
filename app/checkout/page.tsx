import type { Metadata } from "next"
import { CheckoutForm } from "@/components/booking/checkout-form"

export const metadata: Metadata = {
  alternates: { canonical: "/checkout" },
  title: "Checkout",
  description: "Confirm your contact details and complete your booking.",
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
