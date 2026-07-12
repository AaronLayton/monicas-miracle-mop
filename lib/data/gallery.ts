import type { StaticImageData } from "next/image"

// Static imports so Next.js provides intrinsic dimensions + blur placeholders.
import kitchenBefore1 from "@/public/images/gallery/1000012293.jpeg"
import kitchenBefore2 from "@/public/images/gallery/1000012294.jpeg"
import kitchenBefore3 from "@/public/images/gallery/1000012296.jpeg"
import kitchenAfter1 from "@/public/images/gallery/1000012297.jpeg"
import showerBefore from "@/public/images/gallery/1000013374.jpeg"
import showerAfter from "@/public/images/gallery/1000013387.jpeg"
import ovenGlassBefore from "@/public/images/gallery/1000014096.jpeg"
import ovenGlassAfter from "@/public/images/gallery/1000014102.jpeg"
import cookerBefore from "@/public/images/gallery/1000014848.jpeg"
import cookerGlassDetail1 from "@/public/images/gallery/1000014852.jpeg"
import cookerGlassDetail2 from "@/public/images/gallery/1000014860.jpeg"
import cookerAfter from "@/public/images/gallery/1000014864.jpeg"
import socialOvenEdition from "@/public/images/gallery/1000015014.png"
import socialOven from "@/public/images/gallery/1000015018.png"
import voidBefore from "@/public/images/gallery/1000016441.jpeg"
import voidAfter from "@/public/images/gallery/1000016442.jpeg"
import microwaveBeforeWide from "@/public/images/gallery/1000016762.jpeg"
import microwaveBefore from "@/public/images/gallery/1000016763.jpeg"
import microwaveAfter from "@/public/images/gallery/1000016764.jpeg"
import microwaveAfterWide from "@/public/images/gallery/1000016765.jpeg"

export type GalleryPhase = "before" | "after" | "detail"

export interface GalleryImage {
  src: StaticImageData
  alt: string
  phase: GalleryPhase
  /** Landscape images span two columns in the grid */
  wide?: boolean
}

export interface GalleryJob {
  id: string
  title: string
  service: string
  description: string
  images: GalleryImage[]
}

export interface SliderPair {
  id: string
  title: string
  blurb: string
  before: GalleryImage
  after: GalleryImage
}

/**
 * Real jobs, grouped from the same visit. Order = display order on /gallery.
 */
export const galleryJobs: GalleryJob[] = [
  {
    id: "kitchen-reset",
    title: "Full kitchen reset",
    service: "Deep Clean",
    description:
      "A busy family kitchen taken from cluttered to calm — worktops cleared and sanitised, hob degreased, and every surface polished in a single visit.",
    images: [
      {
        src: kitchenBefore1,
        alt: "Kitchen breakfast bar covered in clutter before cleaning",
        phase: "before",
        wide: true,
      },
      {
        src: kitchenBefore2,
        alt: "Kitchen sink and worktops piled with washing-up before cleaning",
        phase: "before",
        wide: true,
      },
      {
        src: kitchenBefore3,
        alt: "Greasy gas hob before cleaning",
        phase: "before",
        wide: true,
      },
      {
        src: kitchenAfter1,
        alt: "The same kitchen sparkling clean with clear worktops after the deep clean",
        phase: "after",
        wide: true,
      },
    ],
  },
  {
    id: "microwave-rescue",
    title: "Microwave rescue",
    service: "Microwave Clean",
    description:
      "Baked-on splatters inside and out, brought back to spotless — turntable, walls and door seal included.",
    images: [
      {
        src: microwaveBeforeWide,
        alt: "Microwave with food-splattered interior before cleaning",
        phase: "before",
      },
      {
        src: microwaveBefore,
        alt: "Close-up of heavily soiled microwave interior before cleaning",
        phase: "before",
      },
      {
        src: microwaveAfter,
        alt: "Close-up of spotless microwave interior after cleaning",
        phase: "after",
      },
      {
        src: microwaveAfterWide,
        alt: "Microwave gleaming inside with clean turntable after cleaning",
        phase: "after",
      },
    ],
  },
  {
    id: "oven-door-glass",
    title: "Oven door glass",
    service: "Oven Cleaning",
    description:
      "Years of baked-on grease lifted from the inner door glass — from opaque brown back to crystal clear.",
    images: [
      {
        src: ovenGlassBefore,
        alt: "Oven door glass caked in baked-on grease before cleaning",
        phase: "before",
      },
      {
        src: ovenGlassAfter,
        alt: "The same oven door glass completely clear after cleaning",
        phase: "after",
      },
    ],
  },
  {
    id: "cooker-polish",
    title: "Double-cavity cooker",
    service: "Oven Cleaning",
    description:
      "A full strip-down clean of a double-cavity cooker — glass panels removed and degreased, exterior polished to a mirror shine.",
    images: [
      {
        src: cookerBefore,
        alt: "Black double-cavity cooker with greasy control panel before cleaning",
        phase: "before",
      },
      {
        src: cookerGlassDetail1,
        alt: "Removed oven door glass cleaned until transparent",
        phase: "detail",
      },
      {
        src: cookerGlassDetail2,
        alt: "Second oven glass panel washed and streak-free",
        phase: "detail",
      },
      {
        src: cookerAfter,
        alt: "The cooker reassembled and polished to a shine after cleaning",
        phase: "after",
      },
    ],
  },
  {
    id: "behind-the-appliances",
    title: "Behind the appliances",
    service: "Deep Clean",
    description:
      "The bit nobody sees — appliances pulled out, and years of grime scrubbed from the walls, skirting and floor behind them.",
    images: [
      {
        src: voidBefore,
        alt: "Grimy wall and floor behind a washing machine before cleaning",
        phase: "before",
      },
      {
        src: voidAfter,
        alt: "The same space scrubbed clean after the deep clean",
        phase: "after",
      },
    ],
  },
  {
    id: "shower-refresh",
    title: "Shower screen refresh",
    service: "Deep Clean",
    description:
      "Cloudy limescale and soap scum removed from the shower screen and enclosure, finished with a fresh, streak-free shine.",
    images: [
      {
        src: showerBefore,
        alt: "Shower screen clouded with limescale and soap scum before cleaning",
        phase: "before",
      },
      {
        src: showerAfter,
        alt: "Shower enclosure gleaming with clear glass after cleaning",
        phase: "after",
      },
    ],
  },
]

/** Branded before-and-after cards from our socials. */
export const socialCards: GalleryImage[] = [
  {
    src: socialOvenEdition,
    alt: "Monica's Miracle Mop before-and-after social post: oven interior transformation",
    phase: "after",
  },
  {
    src: socialOven,
    alt: "Monica's Miracle Mop before-and-after social post: built-in oven transformation",
    phase: "after",
  },
]

/**
 * Pairs shot from (near) matching angles — the ones that work as
 * interactive comparison sliders.
 */
export const sliderPairs: SliderPair[] = [
  {
    id: "microwave",
    title: "Microwave rescue",
    blurb: "Baked-on splatters to spotless in one visit.",
    before: {
      src: microwaveBefore,
      alt: "Heavily soiled microwave interior before cleaning",
      phase: "before",
    },
    after: {
      src: microwaveAfter,
      alt: "Spotless microwave interior after cleaning",
      phase: "after",
    },
  },
  {
    id: "oven-glass",
    title: "Oven door glass",
    blurb: "Years of grease lifted back to crystal clear.",
    before: {
      src: ovenGlassBefore,
      alt: "Oven door glass caked in grease before cleaning",
      phase: "before",
    },
    after: {
      src: ovenGlassAfter,
      alt: "Oven door glass completely clear after cleaning",
      phase: "after",
    },
  },
  {
    id: "appliance-void",
    title: "Behind the appliances",
    blurb: "The grime nobody sees — gone.",
    before: {
      src: voidBefore,
      alt: "Grimy wall and floor behind a washing machine before cleaning",
      phase: "before",
    },
    after: {
      src: voidAfter,
      alt: "The same space scrubbed clean after the deep clean",
      phase: "after",
    },
  },
]

/** The single pair featured on the homepage. */
export const featuredSliderPair = sliderPairs[0]
