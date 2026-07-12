import type { Metadata } from "next"
import { BUSINESS } from "@/lib/data/services"

export const metadata: Metadata = {
  title: "Terms & conditions",
}

export default function TermsPage() {
  return (
    <article className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-14 md:pb-20 prose-sm">
        <h1 className="text-display text-4xl font-semibold tracking-tight mb-8">
          Terms & conditions
        </h1>
        <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed text-[15px]">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">
              Bookings
            </h2>
            <p>
              Submitting a booking request does not guarantee the slot until
              confirmed by {BUSINESS.name} (usually via consultation call).
              Estimates shown online are guides; final pricing for deep cleans
              and move-outs depends on property size and condition.
            </p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">
              Payment
            </h2>
            <p>
              Payment is due on completion of the job by cash or bank transfer.
              No deposit is required to book.
            </p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">
              Cancellation
            </h2>
            <p>
              Please provide at least {BUSINESS.cancellationHours} hours&apos;
              notice. Cancellations within {BUSINESS.cancellationHours} hours
              may incur a {BUSINESS.lateCancelFeePercent}% fee. If we are unable
              to access the property at the agreed time, a{" "}
              {BUSINESS.noShowFeePercent}% fee may apply.
            </p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">
              Consultation
            </h2>
            <p>
              Every booking includes a short phone consultation covering access,
              requirements, and these terms.
            </p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">
              Liability
            </h2>
            <p>
              We take reasonable care of your property. Please secure valuables
              and inform us of fragile items or hazards before the visit. These
              terms are governed by the laws of England and Wales.
            </p>
          </section>
          <p className="text-sm pt-4">
            Questions? Email{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-primary font-medium"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
        </div>
      </article>
  )
}
