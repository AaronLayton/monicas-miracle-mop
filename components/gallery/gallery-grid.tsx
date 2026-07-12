"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import type { GalleryImage, GalleryJob } from "@/lib/data/gallery"

interface GalleryGridProps {
  jobs: GalleryJob[]
  socialCards: GalleryImage[]
}

const phaseChip: Record<GalleryImage["phase"], string | null> = {
  before: "Before",
  after: "After",
  detail: null,
}

export function GalleryGrid({ jobs, socialCards }: GalleryGridProps) {
  // Flat list so the lightbox can step through every image on the page.
  const allImages: GalleryImage[] = [
    ...jobs.flatMap((job) => job.images),
    ...socialCards,
  ]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((i) =>
        i === null ? i : (i + dir + allImages.length) % allImages.length
      ),
    [allImages.length]
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, close, step])

  return (
    <>
      <div className="flex flex-col gap-16 md:gap-20">
        {jobs.map((job, jobIdx) => {
          // Global index offset for this job's tiles within allImages
          const jobOffset = jobs
            .slice(0, jobIdx)
            .reduce((sum, j) => sum + j.images.length, 0)
          return (
            <Reveal key={job.id}>
              <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    {job.service}
                  </span>
                  <h3 className="text-display mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                    {job.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-md">
                    {job.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {job.images.map((image, i) => (
                    <GalleryTile
                      key={image.src.src}
                      image={image}
                      onOpen={() => setLightboxIndex(jobOffset + i)}
                    />
                  ))}
                </div>
              </article>
            </Reveal>
          )
        })}

        {socialCards.length > 0 && (
          <Reveal>
            <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                  From our socials
                </span>
                <h3 className="text-display mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  Oven transformations
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-md">
                  Side-by-side results we&apos;ve shared with our followers —
                  real ovens from real bookings.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {socialCards.map((image, i) => (
                  <GalleryTile
                    key={image.src.src}
                    image={image}
                    square
                    onOpen={() =>
                      setLightboxIndex(
                        allImages.length - socialCards.length + i
                      )
                    }
                  />
                ))}
              </div>
            </article>
          </Reveal>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={allImages[lightboxIndex].alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/85 backdrop-blur-md p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
          >
            <ChevronRight className="size-5" />
          </button>

          <figure
            className="flex max-h-full max-w-5xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={allImages[lightboxIndex].src}
                alt={allImages[lightboxIndex].alt}
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>
            <figcaption className="text-center text-sm text-white/85">
              {allImages[lightboxIndex].alt}
              <span className="ml-2 text-white/50">
                {lightboxIndex + 1} / {allImages.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

function GalleryTile({
  image,
  square = false,
  onOpen,
}: {
  image: GalleryImage
  square?: boolean
  onOpen: () => void
}) {
  const chip = phaseChip[image.phase]
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-float",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        square ? "aspect-square" : image.wide ? "aspect-[4/3]" : "aspect-[3/4]"
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        placeholder="blur"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {chip && (
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
            image.phase === "before"
              ? "bg-foreground/70 text-white"
              : "bg-primary/85 text-primary-foreground"
          )}
        >
          {chip}
        </span>
      )}
      <span className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
    </button>
  )
}
