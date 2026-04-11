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
    <section className="relative min-h-[640px] flex items-center overflow-hidden px-6 md:px-8 pt-24 pb-16">
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[--primary-soft] blur-3xl opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent blur-3xl opacity-40"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="space-y-8 max-w-2xl">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[--accent-foreground]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            The Monica Miracle Standard
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
            Sparkling Homes,{" "}
            <span className="italic text-secondary">Stress-Free</span> Living
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Professional domestic cleaning delivered with care, precision, and
            eco-friendly products. We transform your home into the sanctuary it
            deserves to be.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "rounded-full bg-[--primary-container] px-8 py-4",
                "text-lg font-bold text-white",
                "shadow-xl shadow-primary/25",
                "transition-all duration-300 hover:opacity-90 active:scale-95"
              )}
            >
              Book Your Clean
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center justify-center",
                "rounded-full border-2 border-primary px-8 py-4",
                "text-lg font-bold text-primary",
                "transition-all duration-300 hover:bg-[--primary-soft] active:scale-95"
              )}
            >
              View Services
            </Link>
          </div>
        </div>

        {/* Right: hero image with trust bubble */}
        <div className="relative lg:h-[560px]">
          <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 bg-muted min-h-[380px]">
            <Image
              src="/images/hero-clean-home.jpg"
              alt="A beautifully cleaned, bright living room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Trust bubble */}
            <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl border border-white/20 p-5">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3" aria-hidden="true">
                  {[200, 300, 400].map((shade) => (
                    <div
                      key={shade}
                      className={cn(
                        "size-10 rounded-full border-2 border-white",
                        shade === 200 && "bg-slate-200",
                        shade === 300 && "bg-slate-300",
                        shade === 400 && "bg-slate-400"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground">
                  Trusted by{" "}
                  <span className="font-bold text-primary">500+</span> local
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
    <Card
      className={cn(
        "relative flex flex-col rounded-[2rem] border-0 shadow-sm transition-all duration-500",
        featured
          ? "scale-105 bg-[--primary-container] text-white shadow-2xl shadow-primary/20 ring-0"
          : "bg-card hover:-translate-y-2"
      )}
    >
      {badge && (
        <div className="absolute -top-4 right-8 z-10">
          <Badge
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg",
              featured
                ? "bg-accent text-[--accent-foreground]"
                : "bg-primary text-primary-foreground"
            )}
          >
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pt-10 px-10 border-0">
        {/* Icon */}
        <div
          data-icon="card-icon"
          className={cn(
            "mb-6 flex size-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
            featured ? "bg-white/10 backdrop-blur" : "bg-accent/40"
          )}
        >
          {icon}
        </div>

        <CardTitle
          className={cn(
            "text-2xl font-bold",
            featured ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={cn(
            "text-sm mt-1",
            featured ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </CardDescription>

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-1">
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
      </CardHeader>

      <CardContent className="flex-1 px-10">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-center gap-3 text-sm",
                featured ? "text-white" : "text-muted-foreground"
              )}
            >
              <CheckCircle2
                className={cn(
                  "size-5 shrink-0",
                  featured ? "text-accent" : "text-secondary"
                )}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="px-10 pb-10 border-0 bg-transparent">
        <Link href="/services" className="w-full">
          <Button
            className={cn(
              "w-full rounded-full py-6 text-base font-bold",
              featured
                ? "bg-white text-[--primary-container] hover:bg-white/90"
                : "border-2 border-[--primary-container] bg-transparent text-[--primary-container] hover:bg-[--primary-container] hover:text-white"
            )}
          >
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function PricingSection() {
  const services: ServiceCardProps[] = [
    {
      icon: (
        <Home
          className="size-8 text-secondary"
          aria-hidden="true"
        />
      ),
      title: "Standard Clean",
      description:
        "Perfect for maintaining a weekly or fortnightly sparkle. Includes all the essentials to keep your home fresh and organised.",
      price: "£20",
      priceUnit: "/hour",
      features: [
        "Kitchen & bathroom detail",
        "Dusting & vacuuming",
        "Mopping hard floors",
        "Surface wipe-down",
        "Rubbish removal",
      ],
    },
    {
      icon: (
        <Sparkles
          className="size-8 text-accent"
          aria-hidden="true"
        />
      ),
      title: "Deep Clean",
      description:
        "A thorough, top-to-bottom clean to restore your home's original sparkle. Ideal for first cleans or seasonal refreshes.",
      price: "£100",
      priceUnit: "–£200",
      features: [
        "Everything in Standard Clean",
        "Inside oven & appliances",
        "Skirting boards & trim",
        "Inside fridge & microwave",
        "Deep tile & grout scrub",
      ],
      featured: true,
      badge: "Most Popular",
    },
    {
      icon: (
        <Truck
          className="size-8 text-secondary"
          aria-hidden="true"
        />
      ),
      title: "Move-In/Out Clean",
      description:
        "Comprehensive end-of-tenancy or new-home clean. Gives you the best chance of getting your full deposit back.",
      price: "£150",
      priceUnit: "+",
      features: [
        "Full deep clean throughout",
        "Inside every cabinet & drawer",
        "Window tracks & blinds",
        "Garage & utility areas",
        "Completion certificate",
      ],
    },
  ]

  return (
    <section className="py-24 px-6 md:px-8 bg-muted/60">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
            Our Curated Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Transparent pricing for every stage of your home&apos;s journey. No
            hidden fees — just pure clarity.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
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
  const stats = [
    {
      icon: <ShieldCheck className="size-7 text-primary" aria-hidden="true" />,
      stat: "100%",
      label: "Satisfaction Guarantee",
    },
    {
      icon: <Award className="size-7 text-secondary" aria-hidden="true" />,
      stat: "DBS",
      label: "Checked & Verified",
    },
    {
      icon: <Leaf className="size-7 text-primary" aria-hidden="true" />,
      stat: "Eco",
      label: "Friendly Products",
    },
    {
      icon: <CheckCircle2 className="size-7 text-secondary" aria-hidden="true" />,
      stat: "No",
      label: "Deposit Required",
    },
  ]

  const differencePoints = [
    {
      icon: <ShieldCheck className="size-6" aria-hidden="true" />,
      iconBg: "bg-[--primary-soft]",
      iconColour: "text-primary",
      title: "Vetted Professional",
      body: "Monica is DBS checked, fully insured, and follows a rigorous 40-point cleaning checklist to ensure nothing is missed.",
    },
    {
      icon: <Leaf className="size-6" aria-hidden="true" />,
      iconBg: "bg-accent/40",
      iconColour: "text-secondary",
      title: "Eco-Friendly Products",
      body: "We use non-toxic, pet-safe botanical cleaners that leave your home smelling fresh — never harsh or chemical.",
    },
    {
      icon: <Award className="size-6" aria-hidden="true" />,
      iconBg: "bg-[--primary-soft]",
      iconColour: "text-primary",
      title: "Satisfaction Guaranteed",
      body: "Not sparkling enough? Monica will return within 24 hours to make it right. No questions asked.",
    },
  ]

  return (
    <section className="py-24 px-6 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: image with floating stat */}
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden bg-muted">
              <Image
                src="/images/professional-cleaner.jpg"
                alt="Monica professionally cleaning a bright kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-90 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Floating stat bubble */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 w-56 glass-card rounded-3xl p-7 shadow-xl flex flex-col justify-center border border-white/20">
              <div className="text-4xl font-black italic text-primary mb-1">
                100%
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Satisfaction Guarantee
              </div>
            </div>
          </div>

          {/* Right: copy + feature list */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4">
                The Monica Difference
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We don&apos;t just clean — we restore order and harmony. Monica
                follows a proprietary checklist designed to catch the details
                others miss, every single visit.
              </p>
            </div>

            {/* Stat bubbles row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center border border-white/30 shadow-sm"
                >
                  {s.icon}
                  <span className="text-xl font-black text-primary">
                    {s.stat}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="space-y-8">
              {differencePoints.map((point) => (
                <div key={point.title} className="flex gap-5 group">
                  <div
                    className={cn(
                      "shrink-0 size-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6",
                      point.iconBg,
                      point.iconColour
                    )}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">
                      {point.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.body}
                    </p>
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
    <Card className="rounded-3xl border border-white/60 bg-card shadow-sm flex flex-col">
      {/* Stars */}
      <CardHeader className="pb-0 border-0">
        <div className="flex gap-1 text-secondary" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-4 fill-secondary text-secondary"
              aria-hidden="true"
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-4">
        <p className="text-muted-foreground leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
      </CardContent>

      <CardFooter className="border-0 bg-transparent pt-0 pb-8 px-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center text-primary font-bold text-sm">
            {name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-primary text-sm">{name}</div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {role}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function TestimonialsSection() {
  const testimonials: TestimonialProps[] = [
    {
      quote:
        "Walking into my home after Monica has been there feels like taking a deep breath of fresh air. Everything is spotless — it truly is a miracle!",
      name: "Sarah Jenkins",
      role: "Homeowner",
    },
    {
      quote:
        "As a busy parent I don't have time to deep clean. Monica is efficient, trustworthy, and the results are consistently brilliant. Highly recommend.",
      name: "David Lawson",
      role: "Architect",
    },
    {
      quote:
        "Her move-out clean helped us get our full deposit back. She got into corners I didn't even know existed — absolutely outstanding service.",
      name: "Maria Garcia",
      role: "Letting Agent",
    },
  ]

  return (
    <section className="py-24 px-6 md:px-8 bg-[--primary-soft]/40">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-3xl md:text-5xl font-bold tracking-tight text-primary">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <div className="rounded-[3rem] bg-primary px-12 py-20 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
          {/* Decorative blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[--primary-container] opacity-60 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-secondary opacity-40 blur-2xl"
          />

          <div className="relative z-10 mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Ready for your home&apos;s miracle?
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/80">
              Join hundreds of happy homeowners who have reclaimed their time and
              peace of mind. No deposit, no fuss — just a sparkling clean home.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Link
                href="/services"
                className={cn(
                  "inline-flex items-center justify-center",
                  "rounded-full bg-accent text-[--accent-foreground] px-12 py-5",
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
                View Services
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
    <main>
      <HeroSection />
      <PricingSection />
      <MonicaDifferenceSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}
