import Image from "next/image"
import type { Route } from "next"
import type { ReactNode } from "react"
import { Link } from "next-view-transitions"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"

interface CtaPanelProps {
  heading: string
  body: string
  chips: string[]
  primary: { label: string; href: Route }
  /** tel:/mailto: hrefs render as <a>; anything else as an internal Link. */
  secondary?: { label: string; href: string; icon?: ReactNode }
}

/** Full-bleed photo CTA panel with brand wash — closes marketing pages. */
export function CtaPanel({
  heading,
  body,
  chips,
  primary,
  secondary,
}: CtaPanelProps) {
  const secondaryClasses =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
  const secondaryExternal =
    secondary &&
    (secondary.href.startsWith("tel:") || secondary.href.startsWith("mailto:"))

  return (
    <section className="px-4 md:px-8 pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] shadow-cinematic min-h-[28rem] md:min-h-[22rem]">
          {/* Background photography */}
          <Image
            src="/images/professional-cleaner.jpg"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-[center_20%] scale-105"
            aria-hidden
          />
          {/* Brand wash over the photo */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/85 to-secondary/75"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,oklch(1_0_0/0.16),transparent_55%)]"
          />

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 items-center px-8 py-14 md:px-14 md:py-16 lg:px-16">
            <div className="max-w-xl">
              <Image
                src="/logo-transparent.png"
                alt=""
                width={320}
                height={140}
                className="mb-6 h-14 w-auto max-w-[14rem] object-contain object-left drop-shadow-md"
              />
              <h2 className="text-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
                {heading}
              </h2>
              <p className="mt-4 text-white/85 max-w-md text-base leading-relaxed">
                {body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {chips.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/20"
                  >
                    <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row md:items-stretch">
              <Link
                href={primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {primary.label}
                <ArrowRight className="size-4" />
              </Link>
              {secondary &&
                (secondaryExternal ? (
                  <a href={secondary.href} className={secondaryClasses}>
                    {secondary.icon}
                    {secondary.label}
                  </a>
                ) : (
                  <Link
                    href={secondary.href as Route}
                    className={secondaryClasses}
                  >
                    {secondary.icon}
                    {secondary.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
