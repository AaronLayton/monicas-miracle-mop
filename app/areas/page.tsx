import type { Metadata } from "next"
import { Link } from "next-view-transitions"
import { Reveal } from "@/components/motion/reveal"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Service areas",
  description: "Areas we currently serve for domestic house cleaning.",
}

/** Kasey can expand this list anytime */
const areas = [
  "Local area — primary coverage",
  "Surrounding towns by arrangement",
]

export default function AreasPage() {
  return (
    <div className="page-nav-offset mx-auto max-w-3xl px-4 md:px-8 pb-14 md:pb-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            Coverage
          </p>
          <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Where we clean
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            We focus on quality over sprawling distance. If you&apos;re nearby,
            book online — if you&apos;re further out, email us and we&apos;ll
            see what we can do.
          </p>
        </Reveal>
        <ul className="flex flex-col gap-3 mb-12">
          {areas.map((area) => (
            <Reveal key={area}>
              <li className="flex items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-float shine-border">
                <MapPin className="size-5 text-primary shrink-0" />
                <span className="font-medium">{area}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Link
          href="/services"
          className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cinematic"
        >
          Book in our area
        </Link>
      </div>
  )
}
