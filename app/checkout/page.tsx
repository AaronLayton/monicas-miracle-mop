import { Metadata } from "next"
import { User, Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BookingSummary } from "@/components/booking/booking-summary"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Checkout | Monica's Miracle Mop",
  description:
    "Complete your booking with your contact details and service address.",
}

export default function CheckoutPage() {
  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
          Checkout
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Review your details and confirm your magical cleaning experience.
        </p>
      </header>

      {/* Two-column layout: forms + sidebar */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

        {/* Left column: Contact + Address + Notes + Confirm */}
        <div className="space-y-8">

          {/* Section 1: Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
                <span className="w-10 h-10 rounded-full bg-[--primary-soft] flex items-center justify-center shrink-0">
                  <User className="size-5 text-primary" aria-hidden="true" />
                </span>
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name — spans full width */}
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="full-name" className="flex items-center gap-2">
                    <User className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    Full Name
                  </Label>
                  <Input
                    id="full-name"
                    type="text"
                    placeholder="e.g. Jane Smith"
                    className="h-11 rounded-xl px-4"
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. jane@example.co.uk"
                    className="h-11 rounded-xl px-4"
                    autoComplete="email"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 07700 900000"
                    className="h-11 rounded-xl px-4"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Service Address (UK format per D-12) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
                <span className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                  <MapPin className="size-5 text-secondary" aria-hidden="true" />
                </span>
                Service Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Address Line 1 — full width */}
                <div className="space-y-2">
                  <Label htmlFor="address-line-1">
                    Address Line 1{" "}
                    <span className="text-muted-foreground font-normal">(required)</span>
                  </Label>
                  <Input
                    id="address-line-1"
                    type="text"
                    placeholder="e.g. 42 Oak Avenue"
                    className="h-11 rounded-xl px-4"
                    autoComplete="address-line1"
                  />
                </div>

                {/* Address Line 2 — full width */}
                <div className="space-y-2">
                  <Label htmlFor="address-line-2">
                    Address Line 2{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="address-line-2"
                    type="text"
                    placeholder="e.g. Flat 3"
                    className="h-11 rounded-xl px-4"
                    autoComplete="address-line2"
                  />
                </div>

                {/* Town/City + County side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="town-city">
                      Town/City{" "}
                      <span className="text-muted-foreground font-normal">(required)</span>
                    </Label>
                    <Input
                      id="town-city"
                      type="text"
                      placeholder="e.g. Manchester"
                      className="h-11 rounded-xl px-4"
                      autoComplete="address-level2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="county">
                      County{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="county"
                      type="text"
                      placeholder="e.g. Greater Manchester"
                      className="h-11 rounded-xl px-4"
                      autoComplete="address-level1"
                    />
                  </div>
                </div>

                {/* Postcode — half width */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postcode">
                      Postcode{" "}
                      <span className="text-muted-foreground font-normal">(required)</span>
                    </Label>
                    <Input
                      id="postcode"
                      type="text"
                      placeholder="e.g. M1 2AB"
                      className="h-11 rounded-xl px-4 uppercase"
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Special Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
                <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <MessageSquare className="size-5 text-muted-foreground" aria-hidden="true" />
                </span>
                Special Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="special-notes">
                  Additional instructions{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <textarea
                  id="special-notes"
                  rows={4}
                  placeholder="e.g. Key is under the doormat, please avoid the conservatory"
                  className={cn(
                    "w-full rounded-xl border border-input bg-transparent px-4 py-3 text-base",
                    "placeholder:text-muted-foreground resize-none",
                    "transition-colors outline-none",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "md:text-sm"
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Confirm Booking Button */}
          {/* Phase 2: Connect to booking submission Server Action */}
          <Button
            className={cn(
              "w-full bg-[--primary-container] text-white rounded-full py-3 text-lg font-semibold",
              "hover:opacity-90 hover:shadow-[0_10px_20px_rgba(81,25,131,0.2)]",
              "active:scale-[0.98] transition-all duration-200"
            )}
            size="lg"
          >
            Confirm Booking
          </Button>
        </div>

        {/* Right column: Booking Summary sidebar */}
        <div className="sticky top-24">
          <BookingSummary />
        </div>
      </div>
    </main>
  )
}
