/**
 * Services & pricing — single source of truth for the site.
 *
 * Kasey can edit prices/names/descriptions here without touching UI code.
 * Later: swap this for a CMS (Sanity / Payload / Google Sheet) — keep the same
 * Service & Addon types so the booking flow stays unchanged.
 */

export type PriceType = "hourly" | "fixed" | "from" | "range"

export type ServiceCategory = "core" | "addon" | "busy-parent"

export interface Service {
  id: string
  name: string
  shortName?: string
  description: string
  longDescription?: string
  category: ServiceCategory
  priceType: PriceType
  /** Price in pence (GBP). For range: min. For hourly: per hour. */
  pricePence: number
  /** Range max in pence (only for priceType "range") */
  priceMaxPence?: number
  /** Display unit e.g. "per hour", "per basket" */
  unitLabel?: string
  features: string[]
  badge?: string
  /** Lucide icon name key used in UI maps */
  icon: string
  popular?: boolean
  /**
   * Baseline visit hours for a typical 2-bed / 1-bath home (primaries),
   * or time this add-on adds to the visit (add-ons).
   */
  durationHours: number
  /** @deprecated use durationHours — kept as alias in helpers */
  estimatedHours?: number
  /** Whether this can be selected as the main service (vs add-on only) */
  isPrimary?: boolean
  /**
   * For "from" pricing: fraction of the base price added for the largest
   * homes (complexity factor 1). E.g. 1.2 → a £100 base can grow to £220.
   * Defaults to 0.55 when unset.
   */
  sizeScaling?: number
  active: boolean
  sortOrder: number
}

/**
 * Bundle discount when the customer stacks extras.
 * Count = primary (1 if selected) + number of add-on line items.
 * Highest matching tier wins.
 */
export const BUNDLE_DISCOUNTS: { minItems: number; percent: number; label: string }[] = [
  { minItems: 2, percent: 5, label: "2+ services" },
  { minItems: 3, percent: 8, label: "3+ services" },
  { minItems: 5, percent: 12, label: "5+ services" },
]

/** Extra visit time added per bedroom / bathroom / kitchen above the baseline home */
export const HOME_SIZE_HOUR_WEIGHTS = {
  baselineBedrooms: 2,
  baselineBathrooms: 1,
  baselineKitchens: 1,
  /** Per room above baseline — aggressive enough that the sidebar clearly moves */
  perExtraBedroom: 0.75,
  perExtraBathroom: 0.6,
  perExtraKitchen: 0.5,
} as const

/** Sensible caps for the home-details steppers */
export const HOME_SIZE_LIMITS = {
  bedrooms: { min: 0, max: 10 },
  bathrooms: { min: 0, max: 8 },
  kitchens: { min: 0, max: 3 },
} as const

export const MIN_VISIT_HOURS = 1
export const MAX_VISIT_HOURS = 16

export type HomeSize = {
  bedrooms: number
  bathrooms: number
  kitchens: number
}

export interface ArrivalWindow {
  id: string
  label: string
  start: string
  end: string
}

/**
 * Deposit as fraction of estimated total (0–1). 0 = no deposit.
 * Online deposits disabled for now — set back to 0.2 to re-enable.
 */
export const DEPOSIT_PERCENT = 0

/** Single switch: true when online deposits are taken. Flip DEPOSIT_PERCENT to re-enable. */
export const DEPOSITS_ENABLED = DEPOSIT_PERCENT > 0

/** Minimum deposit in pence when deposit is enabled */
export const DEPOSIT_MIN_PENCE = 2000 // £20

export const BUSINESS = {
  name: "Monica's Miracle Mop",
  ownerName: "Kasey",
  email: "monicasmiraclemop@gmail.com",
  phone: "", // add when ready — flows straight into schema.org + contact page
  tagline: "Sparkling homes, stress-free living",
  locale: "en-GB",
  currency: "GBP",
  /** Base town the business operates from (service-area business, no shopfront). */
  primaryLocation: "Sutton-in-Ashfield",
  region: "Nottinghamshire",
  addressCountry: "GB",
  paymentAccepted: "Cash, Bank transfer",
  consultationMinutes: 15,
  cancellationHours: 24,
  lateCancelFeePercent: 50,
  noShowFeePercent: 100,
} as const

/**
 * Social / external profiles for schema.org `sameAs` (entity disambiguation).
 * Add the real URLs once the profiles exist — Google Business Profile, Facebook,
 * Instagram, etc. Empty entries are ignored, so it's safe to leave blanks.
 */
export const SOCIAL_LINKS: string[] = [
  // "https://www.facebook.com/...",
  // "https://www.instagram.com/...",
  // "https://g.page/...",            // Google Business Profile short link
].filter(Boolean)

export interface ServiceArea {
  /** Display name, e.g. "Sutton-in-Ashfield". */
  name: string
  /** URL slug for the /cleaning/[town] landing page. */
  slug: string
  /** The home town — ranked first, used as the schema locality. */
  isPrimary?: boolean
}

/**
 * Towns Kasey covers. Sutton-in-Ashfield is the base; the rest are the close
 * surrounding areas. Edit this one list to add/remove a town — it drives the
 * local landing pages (/cleaning/[town]), the /areas page, the sitemap, and the
 * schema.org `areaServed`. Keep slugs lowercase-hyphenated.
 */
export const SERVICE_AREAS: ServiceArea[] = [
  { name: "Sutton-in-Ashfield", slug: "sutton-in-ashfield", isPrimary: true },
  { name: "Kirkby-in-Ashfield", slug: "kirkby-in-ashfield" },
  { name: "Huthwaite", slug: "huthwaite" },
  { name: "Skegby", slug: "skegby" },
  { name: "Stanton Hill", slug: "stanton-hill" },
  { name: "Teversal", slug: "teversal" },
  { name: "Mansfield", slug: "mansfield" },
  { name: "Mansfield Woodhouse", slug: "mansfield-woodhouse" },
]

/** The primary town (falls back to the first entry). */
export function getPrimaryArea(): ServiceArea {
  return SERVICE_AREAS.find((a) => a.isPrimary) ?? SERVICE_AREAS[0]
}

/** Look up a service area by slug (for the /cleaning/[town] route). */
export function getServiceArea(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((a) => a.slug === slug)
}

export const ARRIVAL_WINDOWS: ArrivalWindow[] = [
  { id: "morning", label: "Morning", start: "08:00", end: "12:00" },
  { id: "afternoon", label: "Afternoon", start: "12:00", end: "16:00" },
  { id: "evening", label: "Late afternoon", start: "16:00", end: "18:00" },
]

/**
 * Kasey's real working hours per weekday (0 = Sunday … 6 = Saturday).
 * null = no availability that day. Windows outside these hours are shown
 * as "Fully booked" rather than hidden.
 */
export const WEEKLY_AVAILABILITY: Record<
  number,
  { start: string; end: string } | null
> = {
  0: null, // Sunday
  1: { start: "13:30", end: "17:30" }, // Monday
  2: { start: "13:30", end: "17:30" }, // Tuesday
  3: { start: "10:00", end: "17:00" }, // Wednesday
  4: null, // Thursday
  5: { start: "13:30", end: "17:30" }, // Friday
  6: null, // Saturday
}

function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

/**
 * True when the arrival window overlaps the working hours for the given
 * date (ISO yyyy-mm-dd). Unknown window ids are unavailable.
 */
export function isArrivalWindowAvailable(
  dateIso: string,
  windowId: string
): boolean {
  const window = ARRIVAL_WINDOWS.find((w) => w.id === windowId)
  if (!window) return false
  const day = new Date(`${dateIso}T12:00:00`).getDay()
  const hours = WEEKLY_AVAILABILITY[day]
  if (!hours) return false
  return (
    timeToMinutes(window.start) < timeToMinutes(hours.end) &&
    timeToMinutes(window.end) > timeToMinutes(hours.start)
  )
}

/** True when at least one arrival window is available on the date. */
export function hasAvailabilityOn(dateIso: string): boolean {
  return ARRIVAL_WINDOWS.some((w) => isArrivalWindowAvailable(dateIso, w.id))
}

/**
 * EDIT SERVICES HERE
 *
 * Source of truth:
 * - Printed flyer: Standard, Deep Clean, Busy Parent extras (ironing / bedsheets / toys)
 * - Extra add-ons from business notes (oven, fridge wipe, etc.) — no duplicates
 *
 * Amounts are in pence. One line per real offering.
 */
export const SERVICES: Service[] = [
  // ── Core packages ──────────────────────────────────────────
  {
    id: "standard-clean",
    name: "Standard Clean",
    description:
      "Perfect for maintaining a tidy, fresh home on a weekly or fortnightly basis.",
    longDescription:
      "Dusting, vacuuming, mopping, bathroom surfaces and kitchen counters. Ideal for regular upkeep so your home always feels ready for guests.",
    category: "core",
    priceType: "hourly",
    pricePence: 2000, // £20/hr — flyer
    unitLabel: "per hour",
    features: [
      "Dusting & surfaces",
      "Vacuuming & mopping",
      "Bathroom surfaces",
      "Kitchen counters",
      "Weekly or fortnightly",
    ],
    badge: "Most popular",
    icon: "Sparkles",
    popular: true,
    isPrimary: true,
    durationHours: 2.5,
    estimatedHours: 2.5,
    active: true,
    sortOrder: 1,
  },
  {
    id: "deep-clean",
    name: "Deep Clean",
    description:
      "A high-intensity refresh for homes that need extra attention.",
    longDescription:
      "Perfect for new clients or one-off cleans. Includes skirting boards, inside windows, behind furniture, and a full home deep clean.",
    category: "core",
    priceType: "from",
    pricePence: 10000, // From £100 — representative of a 2-bed home
    unitLabel: "from",
    // Deep cleans scale with home size faster than the hourly Standard
    // Clean — a 3-bed adds ~£22 vs ~£15, a 6-bed can reach £200+.
    sizeScaling: 1.2,
    features: [
      "Full home deep clean",
      "Skirting boards",
      "Inside windows",
      "Behind furniture",
      "Ideal for new clients",
    ],
    badge: "Best for a reset",
    icon: "Droplets",
    popular: false,
    isPrimary: true,
    durationHours: 4.5,
    estimatedHours: 4.5,
    active: true,
    sortOrder: 2,
  },
  {
    id: "move-in-out",
    name: "Move-In / Move-Out Clean",
    description:
      "Detailed sanitisation for empty homes ready for new beginnings.",
    longDescription:
      "End-of-tenancy standard cleaning so you can hand keys back with confidence — or walk into a spotless new home.",
    category: "core",
    priceType: "from",
    pricePence: 15000, // from £150
    unitLabel: "from",
    features: [
      "Empty property deep clean",
      "Kitchen & bathrooms focus",
      "Cupboards & appliances",
      "Landlord / agent ready",
    ],
    icon: "Truck",
    isPrimary: true,
    durationHours: 5.5,
    estimatedHours: 5.5,
    active: true,
    sortOrder: 3,
  },

  // ── Add-ons (each offering appears once) ───────────────────
  {
    id: "oven",
    name: "Oven Cleaning",
    description:
      "Interior oven deep clean, racks and trays. Minimum one hour.",
    category: "addon",
    priceType: "fixed",
    pricePence: 4000, // £40 (minimum 1 hour)
    features: [],
    icon: "UtensilsCrossed",
    durationHours: 1,
    active: true,
    sortOrder: 10,
  },
  {
    id: "fridge",
    name: "Fridge Cleaning",
    description:
      "Wipe-down of shelves, drawers and door seals. Minimum 30 minutes.",
    category: "addon",
    priceType: "fixed",
    pricePence: 1500, // £15 (minimum 30 minutes)
    features: [],
    icon: "Refrigerator",
    durationHours: 0.5,
    active: true,
    sortOrder: 11,
  },
  {
    id: "microwave",
    name: "Microwave Clean",
    description: "Interior and exterior microwave clean.",
    category: "addon",
    priceType: "fixed",
    pricePence: 1000, // £10
    features: [],
    icon: "Microwave",
    durationHours: 0.25,
    active: true,
    sortOrder: 12,
  },
  {
    id: "ironing",
    name: "Ironing",
    description: "Freshly pressed laundry — priced per basket (flyer rate).",
    category: "addon",
    priceType: "fixed",
    pricePence: 1500, // £15 per basket — flyer (single ironing product)
    unitLabel: "per basket",
    features: [],
    icon: "Shirt",
    durationHours: 1,
    active: true,
    sortOrder: 13,
  },
  {
    id: "windows",
    name: "Inside Windows",
    description: "Interior window glass and sills.",
    category: "addon",
    priceType: "fixed",
    pricePence: 2500, // £25
    features: [],
    icon: "AppWindow",
    durationHours: 0.75,
    active: true,
    sortOrder: 14,
  },
  {
    id: "laundry",
    name: "Laundry Service",
    description: "Wash, dry and fold during your visit — priced per load.",
    category: "addon",
    priceType: "fixed",
    pricePence: 1500, // £15 per load
    unitLabel: "per load",
    features: [],
    icon: "WashingMachine",
    durationHours: 0.75,
    active: true,
    sortOrder: 15,
  },
  {
    id: "carpet",
    name: "Carpet Cleaning",
    description: "Professional carpet clean for selected rooms.",
    category: "addon",
    priceType: "from",
    pricePence: 4000, // from £40
    unitLabel: "from",
    features: [],
    icon: "Layers",
    durationHours: 1,
    // Discontinued — kept inactive so historic bookings still resolve
    active: false,
    sortOrder: 16,
  },
  {
    id: "bathroom-cabinet",
    name: "Bathroom Cabinet Clean",
    description: "Inside bathroom cabinets and shelves.",
    category: "addon",
    priceType: "fixed",
    pricePence: 1000, // £10
    unitLabel: "per cabinet",
    features: [],
    icon: "Bath",
    durationHours: 0.35,
    active: true,
    sortOrder: 17,
  },

  // ── Family helpers (flyer “Busy Parent” extras — unique only) ─
  {
    id: "bedsheets",
    name: "Bedsheet Change",
    description: "Fresh sheets fitted; old ones set aside for laundry.",
    category: "busy-parent",
    priceType: "fixed",
    pricePence: 500, // £5 per bed — flyer
    unitLabel: "per bed",
    features: [],
    icon: "BedDouble",
    durationHours: 0.25,
    active: true,
    sortOrder: 20,
  },
  {
    id: "toys",
    name: "Toy Organisation",
    description: "Tidy and organise toys in a room.",
    category: "busy-parent",
    priceType: "fixed",
    pricePence: 1000, // £10 per room — flyer
    unitLabel: "per room",
    features: [],
    icon: "ToyBrick",
    durationHours: 0.5,
    active: true,
    sortOrder: 21,
  },
  {
    id: "bathroom-overhaul",
    name: "Bathroom Overhaul",
    description: "Deep bathroom refresh beyond a standard clean.",
    category: "busy-parent",
    priceType: "fixed",
    pricePence: 5000, // £50
    features: [],
    icon: "Bath",
    durationHours: 1,
    // Discontinued — kept inactive so historic bookings still resolve
    active: false,
    sortOrder: 22,
  },
]

// ── Helpers ──────────────────────────────────────────────────

export function getActiveServices() {
  return SERVICES.filter((s) => s.active).sort(
    (a, b) => a.sortOrder - b.sortOrder
  )
}

export function getPrimaryServices() {
  return getActiveServices().filter((s) => s.isPrimary)
}

export function getAddons() {
  return getActiveServices().filter(
    (s) => s.category === "addon" || s.category === "busy-parent"
  )
}

export function getServiceById(id: string) {
  return SERVICES.find((s) => s.id === id)
}

/** Format pence → £X or £X.XX */
export function formatPrice(pence: number): string {
  const pounds = pence / 100
  if (Number.isInteger(pounds)) return `£${pounds}`
  return `£${pounds.toFixed(2)}`
}

/** Human-readable price for a service card */
export function formatServicePrice(service: Service): string {
  const base = formatPrice(service.pricePence)
  switch (service.priceType) {
    case "hourly":
      return `${base}/hr`
    case "from":
      return `From ${base}`
    case "range":
      return `${base}–${formatPrice(service.priceMaxPence ?? service.pricePence)}`
    default:
      return base
  }
}

/**
 * 0 = typical 2-bed / 1-bath home, 1 = large home (scales range / “from” prices).
 */
export function homeComplexityFactor(home?: HomeSize): number {
  if (!home) return 0.35 // mid-ish default when unknown
  const w = HOME_SIZE_HOUR_WEIGHTS
  const score =
    Math.max(0, home.bedrooms - w.baselineBedrooms) * 1 +
    Math.max(0, home.bathrooms - w.baselineBathrooms) * 1.25 +
    Math.max(0, home.kitchens - w.baselineKitchens) * 0.75
  // ~5–6 “points” of extra rooms ≈ full range top
  return Math.min(1, Math.max(0, score / 5.5))
}

/**
 * Price estimate for a service.
 * - hourly → hours × rate (hours already include home size)
 * - range → interpolates min→max from home size
 * - from → base “from” price + uplift for larger homes
 * - fixed → unit price
 */
export function estimateServicePence(
  service: Service,
  hours = service.durationHours ?? service.estimatedHours ?? 3,
  home?: HomeSize
): number {
  switch (service.priceType) {
    case "hourly":
      return Math.round(service.pricePence * hours)
    case "range": {
      const min = service.pricePence
      const max = service.priceMaxPence ?? service.pricePence
      const t = homeComplexityFactor(home)
      return Math.round(min + (max - min) * t)
    }
    case "from": {
      // Grow the “from” estimate with home size (still an estimate).
      // sizeScaling controls how steeply — deep cleans grow faster.
      const rate = service.sizeScaling ?? 0.55
      const uplift = Math.round(
        homeComplexityFactor(home) * service.pricePence * rate
      )
      return service.pricePence + uplift
    }
    case "fixed":
    default:
      return service.pricePence
  }
}

export function calculateDepositPence(estimatedTotalPence: number): number {
  if (DEPOSIT_PERCENT <= 0 || estimatedTotalPence <= 0) return 0
  const raw = Math.round(estimatedTotalPence * DEPOSIT_PERCENT)
  return Math.max(raw, DEPOSIT_MIN_PENCE)
}

/** Round to nearest 0.5 hour, clamped */
export function roundVisitHours(hours: number): number {
  const stepped = Math.round(hours * 2) / 2
  return Math.min(MAX_VISIT_HOURS, Math.max(MIN_VISIT_HOURS, stepped))
}

export function formatHours(hours: number): string {
  if (Number.isInteger(hours)) return `${hours}h`
  return `${hours.toFixed(1).replace(/\.0$/, "")}h`
}

export type HourEstimateInput = {
  primaryServiceId: string | null
  addons: { serviceId: string; quantity: number; hours?: number }[]
  bedrooms: number
  bathrooms: number
  kitchens: number
}

/**
 * Suggested visit length from main service + home size + every selected extra.
 */
export function estimateVisitHours(input: HourEstimateInput): number {
  if (!input.primaryServiceId) return MIN_VISIT_HOURS
  const primary = getServiceById(input.primaryServiceId)
  if (!primary) return MIN_VISIT_HOURS

  const w = HOME_SIZE_HOUR_WEIGHTS
  let hours = primary.durationHours ?? primary.estimatedHours ?? 2.5

  hours +=
    Math.max(0, input.bedrooms - w.baselineBedrooms) * w.perExtraBedroom
  hours +=
    Math.max(0, input.bathrooms - w.baselineBathrooms) * w.perExtraBathroom
  hours +=
    Math.max(0, input.kitchens - w.baselineKitchens) * w.perExtraKitchen

  for (const addon of input.addons) {
    const service = getServiceById(addon.serviceId)
    if (!service || service.isPrimary) continue
    const qty = Math.max(1, addon.quantity || 1)
    // Hourly add-ons: use their selected hours, else durationHours
    if (service.priceType === "hourly") {
      const addonHrs = addon.hours ?? service.durationHours ?? 1
      hours += addonHrs * qty
    } else {
      hours += (service.durationHours ?? 0.5) * qty
    }
  }

  return roundVisitHours(hours)
}

/** How many billable “stack” items for bundle discount (primary + each addon qty) */
export function countSelectedItems(
  primaryServiceId: string | null,
  addons: { serviceId: string; quantity: number }[]
): number {
  if (!primaryServiceId) return 0
  const addonCount = addons.reduce(
    (sum, a) => sum + Math.max(1, a.quantity || 1),
    0
  )
  return 1 + addonCount
}

export function getBundleDiscount(itemCount: number): {
  percent: number
  label: string
} | null {
  let best: { percent: number; label: string } | null = null
  for (const tier of BUNDLE_DISCOUNTS) {
    if (itemCount >= tier.minItems) {
      best = { percent: tier.percent, label: tier.label }
    }
  }
  return best
}

export function applyBundleDiscount(
  subtotalPence: number,
  itemCount: number
): {
  discountPence: number
  percent: number
  label: string | null
  totalPence: number
} {
  const tier = getBundleDiscount(itemCount)
  if (!tier || subtotalPence <= 0) {
    return {
      discountPence: 0,
      percent: 0,
      label: null,
      totalPence: subtotalPence,
    }
  }
  const discountPence = Math.round(subtotalPence * (tier.percent / 100))
  return {
    discountPence,
    percent: tier.percent,
    label: `${tier.percent}% off · ${tier.label}`,
    totalPence: Math.max(0, subtotalPence - discountPence),
  }
}
