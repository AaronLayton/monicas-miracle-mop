import { Metadata } from "next"
import { User, MapPin, MessageSquare, Phone } from "lucide-react"
import { BookingSummary } from "@/components/booking/booking-summary"

export const metadata: Metadata = {
  title: "Checkout | Monica's Miracle Mop",
  description:
    "Complete your booking with your contact details and service address.",
}

export default function CheckoutPage() {
  return (
    <div className="pt-8 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">
          Checkout
        </h1>
        <p className="text-muted-foreground font-medium">
          Review your details and confirm your magical cleaning experience.
        </p>
      </header>

      {/* Two-column layout: forms + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-10">
          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center">
                <User className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Contact Info</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label
                  htmlFor="first-name"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Monica"
                  autoComplete="given-name"
                  className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="last-name"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Geller"
                  autoComplete="family-name"
                  className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="clean@miraclemop.com"
                  autoComplete="email"
                  className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label
                  htmlFor="phone"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="07700 900000"
                  autoComplete="tel"
                  className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* Service Address (UK format) */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <MapPin className="size-5 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Service Address
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label
                  htmlFor="address-line-1"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                >
                  Address Line 1
                </label>
                <input
                  id="address-line-1"
                  type="text"
                  placeholder="42 Oak Avenue"
                  autoComplete="address-line1"
                  className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="address-line-2"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                >
                  Address Line 2{" "}
                  <span className="normal-case tracking-normal font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="address-line-2"
                  type="text"
                  placeholder="Flat 3"
                  autoComplete="address-line2"
                  className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label
                    htmlFor="town-city"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                  >
                    Town / City
                  </label>
                  <input
                    id="town-city"
                    type="text"
                    placeholder="Manchester"
                    autoComplete="address-level2"
                    className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="county"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                  >
                    County{" "}
                    <span className="normal-case tracking-normal font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="county"
                    type="text"
                    placeholder="Greater Manchester"
                    autoComplete="address-level1"
                    className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>

                <div className="col-span-2 md:col-span-1 space-y-1">
                  <label
                    htmlFor="postcode"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
                  >
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    type="text"
                    placeholder="M1 2AB"
                    autoComplete="postal-code"
                    className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Special Notes — plain section, no Card wrapper */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center">
                <MessageSquare
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Special Notes
              </h2>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="special-notes"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1"
              >
                Additional Instructions{" "}
                <span className="normal-case tracking-normal font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                id="special-notes"
                rows={4}
                placeholder="e.g. Key is under the doormat, please avoid the conservatory"
                className="w-full bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
              />
            </div>
          </section>
        </div>

        {/* Right Column: Booking Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <BookingSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
