import Image from "next/image"
import Link from "next/link"
import {
  Sparkles,
  Home,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Award,
  Star,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------

function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 flex items-center overflow-hidden px-6 md:px-8">
      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="z-10 space-y-8 max-w-2xl">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium uppercase tracking-[0.05em] text-accent-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            The Pristine Prism Standard
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] text-primary leading-[1.1]">
            Sparkling Homes, <br />
            <span className="italic text-secondary">Stress-Free</span> Living
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Experience the ethereal clarity of a professionally curated home.
            Our signature &ldquo;Miracle Clean&rdquo; uses light-touch precision
            and eco-friendly magic to transform your sanctuary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "rounded-full bg-primary px-8 py-4",
                "text-lg font-bold text-white",
                "hover:shadow-xl hover:shadow-primary/25",
                "transition-all duration-300 active:scale-95"
              )}
            >
              Book Your Miracle Clean
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center justify-center",
                "rounded-full border-2 border-secondary text-secondary px-8 py-4",
                "text-lg font-bold",
                "transition-all duration-300 hover:opacity-90 active:scale-95"
              )}
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* Right: hero image with trust bubble */}
        <div className="relative">
          {/* Background glow blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[--primary-soft] blur-3xl opacity-50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-accent blur-3xl opacity-40"
          />

          <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-muted">
            <Image
              src="/images/hero-clean-home.jpg"
              alt="Pristine living room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Trust bubble */}
            <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3" aria-hidden="true">
                  <div className="size-10 rounded-full bg-slate-200 border-2 border-white" />
                  <div className="size-10 rounded-full bg-slate-300 border-2 border-white" />
                  <div className="size-10 rounded-full bg-slate-400 border-2 border-white" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Trusted by{" "}
                  <span className="font-bold text-primary">2,500+</span> local
                  families
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Pricing Cards Section
// ---------------------------------------------------------------------------

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  price: string
  priceUnit: string
  features: string[]
  featured?: boolean
  badge?: string
}

function ServiceCard({
  icon,
  title,
  description,
  price,
  priceUnit,
  features,
  featured = false,
  badge,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[2rem] p-10 transition-all duration-500",
        featured
          ? "bg-primary text-white scale-105 shadow-2xl shadow-primary/20 z-10"
          : "bg-card group hover:-translate-y-2"
      )}
    >
      {badge && (
        <div className="absolute -top-4 right-8 z-10">
          <Badge
            className={cn(
              "rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest shadow-lg",
              "bg-accent text-accent-foreground"
            )}
          >
            {badge}
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          "mb-8 flex size-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
          featured ? "bg-white/10 backdrop-blur" : "bg-accent"
        )}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p
        className={cn(
          "text-sm mb-6",
          featured ? "text-white/70" : "text-muted-foreground"
        )}
      >
        {description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-8">
        <span
          className={cn(
            "text-4xl font-extrabold",
            featured ? "text-white" : "text-primary"
          )}
        >
          {price}
        </span>
        <span
          className={cn(
            "font-medium",
            featured ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {priceUnit}
        </span>
      </div>

      <ul className="space-y-4 mb-10">
        {features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex items-center gap-3",
              featured ? "text-white" : "text-muted-foreground"
            )}
          >
            <CheckCircle2
              className={cn(
                "size-[18px] shrink-0",
                featured ? "text-accent" : "text-secondary"
              )}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link
          href="/services"
          className={cn(
            "block w-full py-4 rounded-full text-center font-bold transition-all",
            featured
              ? "bg-white text-primary hover:shadow-lg"
              : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
          )}
        >
          Select Plan
        </Link>
      </div>
    </div>
  )
}

function PricingSection() {
  const services: ServiceCardProps[] = [
    {
      icon: <Home className="size-8 text-secondary" aria-hidden="true" />,
      title: "Standard Cleaning",
      description:
        "Perfect for maintaining a weekly sparkle and airy atmosphere.",
      price: "\u00a320",
      priceUnit: "/hour",
      features: [
        "Kitchen & Bath Detail",
        "Dusting & Vacuuming",
        "Rubbish Removal",
      ],
    },
    {
      icon: <Sparkles className="size-8 text-accent" aria-hidden="true" />,
      title: "Deep Cleaning",
      description:
        "A foundational scrub to restore your home's original magic.",
      price: "From \u00a3100",
      priceUnit: "",
      features: [
        "Baseboards & Trim",
        "Inside Appliance Detail",
        "Deep Tile Scrubbing",
      ],
      featured: true,
      badge: "Most Requested",
    },
    {
      icon: <Truck className="size-8 text-secondary" aria-hidden="true" />,
      title: "Move-In/Out",
      description: "Comprehensive turnover cleaning for new beginnings.",
      price: "From \u00a3150",
      priceUnit: "",
      features: [
        "Inside Every Cabinet",
        "Closet & Garage Detail",
        "Window Tracks & Blinds",
      ],
    },
  ]

  return (
    <section className="py-24 px-6 md:px-8 bg-muted">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
            Our Curated Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Transparent pricing for every stage of your home&apos;s journey. No
            hidden fees, just pure clarity.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Monica Difference Section
// ---------------------------------------------------------------------------

function MonicaDifferenceSection() {
  const differencePoints = [
    {
      icon: <ShieldCheck className="size-6" aria-hidden="true" />,
      iconBg: "bg-[--primary-soft]",
      iconColour: "text-primary",
      title: "Vetted Professionals",
      body: "Every Miracle Mop technician undergoes a 5-step background check and intensive \"Prism Training\".",
    },
    {
      icon: <Leaf className="size-6" aria-hidden="true" />,
      iconBg: "bg-accent",
      iconColour: "text-secondary",
      title: "Eco-Friendly Magic",
      body: "We use non-toxic, pet-safe botanical cleaners that leave your home smelling like a fresh garden, not chemicals.",
    },
    {
      icon: <Award className="size-6" aria-hidden="true" />,
      iconBg: "bg-[--primary-soft]",
      iconColour: "text-primary",
      title: "Satisfaction Guaranteed",
      body: "Not sparkling enough? We'll return within 24 hours to make it right. No questions asked.",
    },
  ]

  return (
    <section className="py-24 px-6 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: circular image with floating stat */}
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden bg-muted">
              <Image
                src="/images/professional-cleaner.jpg"
                alt="Professional cleaner in a bright white kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-90 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Floating stat bubble */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 glass-card rounded-3xl p-8 shadow-xl flex flex-col justify-center">
              <div className="text-4xl font-black italic text-primary mb-2">
                100%
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Satisfaction Guarantee
              </div>
            </div>
          </div>

          {/* Right: copy + feature list */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                The Monica Difference
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We don&apos;t just clean; we restore order and harmony. Our team
                follows a proprietary 40-point checklist designed to catch the
                details others miss.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-10">
              {differencePoints.map((point) => (
                <div key={point.title} className="flex gap-6 group">
                  <div
                    className={cn(
                      "shrink-0 size-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12",
                      point.iconBg,
                      point.iconColour
                    )}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                    <p className="text-muted-foreground">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Testimonials Section
// ---------------------------------------------------------------------------

interface TestimonialProps {
  quote: string
  name: string
  role: string
}

function TestimonialCard({ quote, name, role }: TestimonialProps) {
  return (
    <div className="bg-card p-8 rounded-3xl shadow-sm border border-white">
      {/* Stars */}
      <div
        className="flex gap-1 text-secondary mb-4"
        aria-label="5 out of 5 stars"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-5 fill-secondary text-secondary"
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8 italic">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-primary font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-primary">{name}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {role}
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const testimonials: TestimonialProps[] = [
    {
      quote:
        "Walking into my home after Monica's team has been there feels like taking a deep breath of fresh air. It's truly a miracle.",
      name: "Sarah Jenkins",
      role: "Homeowner",
    },
    {
      quote:
        "As a busy professional, I don't have time to deep clean. Their team is efficient, trustworthy, and the results are consistently perfect.",
      name: "David Lawson",
      role: "Architect",
    },
    {
      quote:
        "Their move-out clean helped us get our full deposit back. They got into corners I didn't even know existed!",
      name: "Maria Garcia",
      role: "Letting Agent",
    },
  ]

  return (
    <section className="py-24 px-6 md:px-8 bg-[--primary-soft]/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-3xl md:text-5xl font-bold tracking-tight text-primary">
          Voices of Clarity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Bottom CTA Section
// ---------------------------------------------------------------------------

function CtaSection() {
  return (
    <section className="py-24 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gradient-to-br from-[--primary-container] to-primary p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10 bg-muted"
          />

          <div className="relative z-10 mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Ready for your home&apos;s miracle?
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Join thousands of happy homeowners who have reclaimed their time
              and peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <Link
                href="/services"
                className={cn(
                  "inline-flex items-center justify-center",
                  "rounded-full bg-accent text-accent-foreground px-12 py-5",
                  "text-xl font-bold",
                  "shadow-xl shadow-black/20",
                  "transition-all hover:scale-105 active:scale-95"
                )}
              >
                Book Your Clean Now
              </Link>
              <Link
                href="/services"
                className={cn(
                  "inline-flex items-center justify-center",
                  "rounded-full border border-white/30 bg-white/10 backdrop-blur-md",
                  "px-12 py-5 text-xl font-bold text-white",
                  "transition-all hover:bg-white/20 active:scale-95"
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <main className="pt-20">
      <HeroSection />
      <PricingSection />
      <MonicaDifferenceSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}
