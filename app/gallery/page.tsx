import type { Metadata } from "next"
import { Link } from "next-view-transitions"
import { ArrowRight, Sparkles } from "lucide-react"
import { BUSINESS } from "@/lib/data/services"
import { galleryJobs, sliderPairs, socialCards } from "@/lib/data/gallery"
import { BeforeAfterSlider } from "@/components/gallery/before-after-slider"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Gallery",
  description: `Real before-and-after results from ${BUSINESS.name} — kitchens, ovens, bathrooms and more, photographed on the job.`,
}

export default function GalleryPage() {
  return (
    <div className="page-nav-offset pb-14 md:pb-20">
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 ring-1 ring-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-5">
              <Sparkles className="size-3.5" aria-hidden />
              Our work
            </div>
            <h1 className="text-display text-4xl md:text-5xl font-semibold tracking-tight mb-5">
              Real homes,{" "}
              <span className="italic text-primary">real results</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Every photo below was taken on a genuine booking — no stock
              images, no staging. Drag the sliders to see exactly what a visit
              from {BUSINESS.name} looks like.
            </p>
          </div>
        </Reveal>
      </section>

      {/* COMPARISON SLIDERS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-14 md:mt-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            Slide to compare
          </p>
          <h2 className="text-display text-3xl md:text-4xl font-semibold tracking-tight mb-10">
            See the difference for yourself
          </h2>
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {sliderPairs.map((pair, i) => (
            <StaggerItem key={pair.id}>
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                priority={i === 0}
              />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {pair.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{pair.blurb}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* JOB GROUPS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-20 md:mt-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-3">
            Recent transformations
          </p>
          <h2 className="text-display text-3xl md:text-4xl font-semibold tracking-tight mb-12">
            Straight from the job
          </h2>
        </Reveal>
        <GalleryGrid jobs={galleryJobs} socialCards={socialCards} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-20 md:mt-28">
        <Reveal>
          <div className="rounded-[2rem] mesh-soft p-10 md:p-14 text-center shadow-float">
            <h2 className="text-display text-3xl md:text-4xl font-semibold tracking-tight">
              Want results like these?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
              Honest GBP pricing, a friendly consultation before every job, and
              photos you&apos;ll want to show off.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cinematic transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Book your clean
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
