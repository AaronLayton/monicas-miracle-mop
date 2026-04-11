import { Metadata } from "next"
import {
  Sparkles,
  Droplets,
  Truck,
  UtensilsCrossed,
  Refrigerator,
  Shirt,
  AppWindow,
  WashingMachine,
  Layers,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingSummary } from "@/components/booking/booking-summary"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Services | Monica's Miracle Mop",
  description:
    "Choose from our professional cleaning services: Standard Clean, Deep Clean, and Move-In/Out Clean. Serving the local area with guaranteed results.",
}

const services = [
  {
    icon: Sparkles,
    name: "Standard Clean",
    description:
      "Perfect for maintaining a tidy, fresh home on a regular basis. Ideal for weekly or fortnightly visits to keep things sparkling.",
    price: "From £20/hr",
    badge: null,
    highlight: false,
  },
  {
    icon: Droplets,
    name: "Deep Clean",
    description:
      "A high-intensity refresh for homes that need extra attention. We go beyond the surface to restore every corner.",
    price: "From £100",
    badge: "Most Popular",
    highlight: true,
  },
  {
    icon: Truck,
    name: "Move-In/Out Clean",
    description:
      "Detailed sanitisation for empty homes ready for new beginnings. Perfect for end-of-tenancy or moving into your new place.",
    price: "From £150",
    badge: null,
    highlight: false,
  },
] as const

const addOns = [
  {
    icon: UtensilsCrossed,
    name: "Oven Cleaning",
    price: "£45",
  },
  {
    icon: Refrigerator,
    name: "Fridge Cleaning",
    price: "£30",
  },
  {
    icon: Shirt,
    name: "Ironing Service",
    price: "£30",
  },
  {
    icon: AppWindow,
    name: "Inside Windows",
    price: "£25",
  },
  {
    icon: WashingMachine,
    name: "Laundry Service",
    price: "£25",
  },
  {
    icon: Layers,
    name: "Carpet Cleaning",
    price: "From £40",
  },
] as const

export default function ServicesPage() {
  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
          Choose Your Magic
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Select the level of sparkle your home deserves today. Every service is
          backed by our Miracle Guarantee.
        </p>
      </header>

      {/* Two-column layout: content + sidebar */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

        {/* Left: Service Cards + Add-ons */}
        <div className="space-y-12">

          {/* Service Selection Cards */}
          <section aria-labelledby="services-heading">
            <h2
              id="services-heading"
              className="text-2xl font-bold text-foreground mb-6"
            >
              Choose Your Service
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.name}
                    className={cn(
                      "relative transition-all duration-300 cursor-pointer hover:shadow-lg",
                      service.highlight
                        ? "border-2 border-primary shadow-[0_20px_50px_rgba(81,25,131,0.08)]"
                        : "hover:border-secondary"
                    )}
                  >
                    {service.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black px-4 py-1 rounded-full tracking-widest whitespace-nowrap uppercase">
                        {service.badge}
                      </span>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center",
                            service.highlight ? "bg-primary/10" : "bg-muted"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-6",
                              service.highlight
                                ? "text-primary"
                                : "text-secondary"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-1">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-primary font-extrabold text-2xl">
                        {service.price}
                      </p>
                    </CardContent>
                    <CardFooter className="bg-transparent border-t-0">
                      {/* Phase 1: non-functional — booking state in Phase 2 */}
                      <Button
                        variant={service.highlight ? "default" : "outline"}
                        className="w-full rounded-full"
                        aria-label={`Select ${service.name}`}
                      >
                        Select
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Add-Ons Grid */}
          <section aria-labelledby="addons-heading">
            <div className="flex items-center gap-4 mb-8">
              <h2
                id="addons-heading"
                className="text-2xl font-bold text-foreground whitespace-nowrap"
              >
                Add-On Services
              </h2>
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {addOns.map((addon) => {
                const Icon = addon.icon
                return (
                  <div
                    key={addon.name}
                    className={cn(
                      "group flex flex-col items-center justify-center p-6",
                      "bg-card rounded-xl border border-border",
                      "hover:border-secondary hover:shadow-lg transition-all duration-200",
                      "cursor-pointer text-center"
                    )}
                  >
                    <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon
                        className="size-6 text-accent-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground mb-1">
                      {addon.name}
                    </span>
                    <span className="text-xs text-secondary font-bold">
                      +{addon.price}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right: Booking Summary Sidebar */}
        <div className="lg:sticky lg:top-28">
          <BookingSummary />
        </div>
      </div>
    </main>
  )
}
