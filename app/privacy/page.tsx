import type { Metadata } from "next"
import { BUSINESS } from "@/lib/data/services"

export const metadata: Metadata = {
  title: "Privacy policy",
}

export default function PrivacyPage() {
  return (
    <article className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-14 md:pb-20">
        <h1 className="text-display text-4xl font-semibold tracking-tight mb-8">
          Privacy policy
        </h1>
        <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed text-[15px]">
          <p>
            {BUSINESS.name} collects the personal information you provide when
            booking (name, email, phone, address, and any notes) solely to
            deliver and manage cleaning services.
          </p>
          <p>
            Booking data is stored securely and is not sold to third parties.
            We do not take payment online — you pay on the day — so no card
            details are collected or stored.
          </p>
          <p>
            Confirmation emails are sent via our email provider. You can request
            deletion of your booking data by emailing {BUSINESS.email}, subject
            to our legitimate need to retain records for accounting or legal
            reasons.
          </p>
          <p>
            Your private booking link uses a long random code instead of a
            login. Anyone with the link can view or change that booking — please
            treat it as confidential.
          </p>
          <p className="text-sm pt-2">
            Contact:{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-primary font-medium"
            >
              {BUSINESS.email}
            </a>
          </p>
        </div>
      </article>
  )
}
