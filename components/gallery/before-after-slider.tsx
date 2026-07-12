"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronsLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/lib/data/gallery"

interface BeforeAfterSliderProps {
  before: GalleryImage
  after: GalleryImage
  /** Sizes hint forwarded to next/image */
  sizes?: string
  className?: string
  priority?: boolean
}

/**
 * Interactive before/after comparison. A full-cover transparent range input
 * drives the divider, so pointer drag, touch, and keyboard (arrow keys) all
 * work natively with no custom event handling.
 */
export function BeforeAfterSlider({
  before,
  after,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className,
  priority = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)

  return (
    <div
      data-slot="before-after-slider"
      className={cn(
        "group relative isolate select-none overflow-hidden rounded-3xl shadow-float",
        "aspect-[3/4]",
        className
      )}
    >
      {/* After — base layer */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        draggable={false}
        className="object-cover"
      />

      {/* Before — clipped to the left of the divider */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt=""
          fill
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          draggable={false}
          className="object-cover"
        />
      </div>

      {/* Divider + handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-cinematic",
            "ring-2 ring-white/60 transition-transform duration-300 group-hover:scale-110"
          )}
        >
          <ChevronsLeftRight className="size-5" />
        </span>
      </div>

      {/* Phase chips */}
      <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-foreground/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-primary/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
        After
      </span>

      {/* Invisible range input — the actual control */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Compare before and after: ${before.alt}`}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary"
      />
    </div>
  )
}
