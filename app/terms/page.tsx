import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Monica's Miracle Mop",
  description:
    "Terms and conditions, cancellation policy, and payment terms for Monica's Miracle Mop cleaning services.",
}

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 pt-28">
      <article>
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-primary mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: April 2026
          </p>
        </header>

        <div className="space-y-8">

          {/* Section 1: Service Agreement */}
          <section aria-labelledby="service-agreement">
            <h2
              id="service-agreement"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Service Agreement
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                Monica&apos;s Miracle Mop provides professional domestic house cleaning
                services in the UK. By booking a service, you agree to these terms and
                conditions in full.
              </p>
              <p>Our services include:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>
                  <strong>Standard Clean</strong> — Regular maintenance cleans on a weekly
                  or fortnightly basis. From <strong>£20 per hour</strong>.
                </li>
                <li>
                  <strong>Deep Clean</strong> — A thorough, high-intensity clean going
                  beyond the surface to restore every corner of your home. From{" "}
                  <strong>£100 to £200</strong> depending on property size.
                </li>
                <li>
                  <strong>Move-In/Out Clean</strong> — Detailed sanitisation for empty
                  properties ready for new occupants or end-of-tenancy handovers. From{" "}
                  <strong>£150</strong>.
                </li>
              </ul>
              <p>
                Optional add-on services are available and priced separately. A full
                list of add-ons and their prices is available on our Services page.
              </p>
            </div>
          </section>

          {/* Section 2: Pricing & Payment */}
          <section aria-labelledby="pricing-payment">
            <h2
              id="pricing-payment"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Pricing &amp; Payment
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                All prices are quoted in <strong>GBP (£)</strong> and are inclusive of
                all materials and equipment unless otherwise stated.
              </p>
              <p>
                Payment is due on the <strong>day of the clean</strong>. We accept:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Bank transfer</li>
                <li>Cash</li>
              </ul>
              <p>
                <strong>No deposit is required</strong> to secure your booking. Payment
                is collected in full upon completion of the clean.
              </p>
            </div>
          </section>

          {/* Section 3: Cancellation Policy */}
          <section aria-labelledby="cancellation-policy">
            <h2
              id="cancellation-policy"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Cancellation Policy
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                We understand that plans change. However, to be fair to our cleaners and
                to keep our schedule running smoothly, the following cancellation fees
                apply:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>
                  <strong>24 hours or more notice</strong> — No charge. Please give as
                  much notice as possible.
                </li>
                <li>
                  <strong>Less than 24 hours notice</strong> — 50% of the scheduled
                  service fee is payable.
                </li>
                <li>
                  <strong>Locked out / no access</strong> — If your cleaner arrives and
                  cannot gain access to the property, 100% of the scheduled service fee
                  is payable.
                </li>
              </ul>
              <p>
                To cancel or reschedule, please contact us as soon as possible by email
                at{" "}
                <a
                  href="mailto:monicasmiraclemop@gmail.com"
                  className="text-primary underline underline-offset-2 hover:opacity-80"
                >
                  monicasmiraclemop@gmail.com
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 4: Rescheduling */}
          <section aria-labelledby="rescheduling">
            <h2
              id="rescheduling"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Rescheduling
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                We are happy to reschedule appointments where possible, subject to
                availability. Please give a minimum of <strong>24 hours notice</strong>{" "}
                when rescheduling to avoid any cancellation fees.
              </p>
              <p>
                Rescheduling requests made with less than 24 hours notice may be treated
                as a cancellation and the cancellation policy above will apply.
              </p>
            </div>
          </section>

          {/* Section 5: Access & Keys */}
          <section aria-labelledby="access-keys">
            <h2
              id="access-keys"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Access &amp; Keys
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                To allow us to carry out the clean, you must either:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>
                  Provide a <strong>key or access code</strong> to your property before
                  the appointment, or
                </li>
                <li>
                  Ensure someone is <strong>present at the property</strong> to let the
                  cleaner in at the agreed time.
                </li>
              </ul>
              <p>
                If access cannot be arranged, the locked-out cancellation fee of 100%
                will apply. Prior to every clean, Kasey conducts a brief{" "}
                <strong>15-minute phone consultation</strong> to discuss keys, access
                requirements, specific dos and don&apos;ts, and any other considerations.
              </p>
            </div>
          </section>

          {/* Section 6: Liability & Insurance */}
          <section aria-labelledby="liability-insurance">
            <h2
              id="liability-insurance"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Liability &amp; Insurance
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                Monica&apos;s Miracle Mop is <strong>fully insured</strong>. Our public
                liability insurance covers accidental damage caused during the course of
                a clean.
              </p>
              <p>
                To help protect your belongings, please{" "}
                <strong>put away any valuable items</strong> before your cleaner arrives.
                We cannot accept liability for damage to items that were not secured
                prior to the clean.
              </p>
              <p>
                Pets should be <strong>secured in a safe area</strong> or we should be
                informed of any pets in the home so we can accommodate them appropriately
                during the clean.
              </p>
            </div>
          </section>

          {/* Section 7: Contact */}
          <section aria-labelledby="contact">
            <h2
              id="contact"
              className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border"
            >
              Contact
            </h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                If you have any questions or concerns about these terms, or wish to
                discuss any aspect of your booking, please get in touch:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:monicasmiraclemop@gmail.com"
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    monicasmiraclemop@gmail.com
                  </a>
                </li>
              </ul>
              <p>
                We aim to respond to all enquiries within 24 hours on business days.
              </p>
            </div>
          </section>

        </div>
      </article>
    </main>
  )
}
