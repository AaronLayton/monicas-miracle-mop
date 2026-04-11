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
  CheckCircle2,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react"
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
      "Perfect for maintaining a tidy, fresh home on a regular basis.",
    price: "From \u00a320/hr",
    badge: "Popular",
    badgeStyle: "bg-accent text-accent-foreground",
    selected: false,
    iconColour: "text-secondary",
  },
  {
    icon: Droplets,
    name: "Deep Clean",
    description:
      "A high-intensity refresh for homes that need extra attention.",
    price: "From \u00a3100",
    badge: "Best Value",
    badgeStyle: "bg-primary text-white",
    selected: true,
    iconColour: "text-primary",
  },
  {
    icon: Truck,
    name: "Move-In/Out Clean",
    description:
      "Detailed sanitisation for empty homes ready for new beginnings.",
    price: "From \u00a3150",
    badge: null,
    badgeStyle: "",
    selected: false,
    iconColour: "text-secondary",
  },
] as const

const addOns = [
  { icon: UtensilsCrossed, name: "Oven Cleaning", price: "\u00a325" },
  { icon: Refrigerator, name: "Fridge Cleaning", price: "\u00a310" },
  { icon: Shirt, name: "Ironing", price: "\u00a35/hr" },
  { icon: AppWindow, name: "Inside Windows", price: "\u00a325" },
  { icon: WashingMachine, name: "Laundry Service", price: "\u00a325" },
  { icon: Layers, name: "Carpet Cleaning", price: "From \u00a340" },
] as const

export default function ServicesPage() {
  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Service Cards + Add-ons */}
        <div className="lg:col-span-8 space-y-12">
          {/* Service Selection Cards */}
          <section>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.name}
                    className={cn(
                      "group relative bg-card p-8 rounded-xl transition-all duration-300 cursor-pointer",
                      "shadow-[0_20px_50px_rgba(0,0,0,0.04)]",
                      service.selected
                        ? "border-2 border-primary shadow-[0_20px_50px_rgba(81,25,131,0.08)]"
                        : "border border-transparent hover:border-secondary"
                    )}
                  >
                    {/* SELECTED floating label */}
                    {service.selected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full tracking-widest whitespace-nowrap">
                        SELECTED
                      </div>
                    )}

                    {/* Icon + Badge row */}
                    <div className="mb-6 flex justify-between items-start">
                      <Icon
                        className={cn("size-10", service.iconColour)}
                        aria-hidden="true"
                      />
                      {service.badge && (
                        <div
                          className={cn(
                            "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider",
                            service.badgeStyle
                          )}
                        >
                          {service.badge}
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="text-primary font-extrabold text-2xl">
                      {service.price}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Add-Ons Grid */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                Enhance Your Experience
              </h2>
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {addOns.map((addon) => {
                const Icon = addon.icon
                return (
                  <div
                    key={addon.name}
                    className={cn(
                      "group flex flex-col items-center justify-center p-6",
                      "bg-card rounded-xl",
                      "border border-transparent hover:border-secondary hover:shadow-xl",
                      "transition-all duration-200 cursor-pointer text-center"
                    )}
                  >
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
        <aside className="lg:col-span-4 sticky top-28">
          <BookingSummary showTrustBadgesOutside hideBlobs />
        </aside>
      </div>
    </div>
  )
}
