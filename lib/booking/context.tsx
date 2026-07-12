"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { z } from "zod"
import type { selectedAddonSchema } from "@/lib/booking/types"
import {
  buildLineItems,
  calculateDepositPence,
  estimateVisitHours,
  formatHours,
  type PricedBooking,
} from "@/lib/booking/pricing-client"
import { getServiceById } from "@/lib/data/services"

type Addon = z.infer<typeof selectedAddonSchema>

export type BookingDraft = {
  primaryServiceId: string | null
  addons: Addon[]
  bedrooms: number
  bathrooms: number
  kitchens: number
  notes: string
  date: string | null
  arrivalWindowId: string | null
  /** Visit hours used for billing (auto or manual) */
  estimatedHours: number
  /** When true, changing services won't overwrite hours */
  hoursManualOverride: boolean
  payDeposit: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
  line1: string
  line2: string
  town: string
  postcode: string
  message: string
}

const defaultDraft: BookingDraft = {
  primaryServiceId: null,
  addons: [],
  bedrooms: 2,
  bathrooms: 1,
  kitchens: 1,
  notes: "",
  date: null,
  arrivalWindowId: null,
  estimatedHours: 2.5,
  hoursManualOverride: false,
  payDeposit: true,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  town: "",
  postcode: "",
  message: "",
}

const STORAGE_KEY = "mmm-booking-draft-v2"

type Ctx = {
  draft: BookingDraft
  /** True after sessionStorage draft has been restored (client only) */
  hydrated: boolean
  setDraft: (patch: Partial<BookingDraft>) => void
  reset: () => void
  toggleAddon: (serviceId: string) => void
  setAddonQty: (serviceId: string, quantity: number) => void
  setPrimaryService: (serviceId: string) => void
  setEstimatedHoursManual: (hours: number) => void
  resetHoursToSuggested: () => void
  priced: PricedBooking
  suggestedHours: number
  estimatedTotalPence: number
  depositPence: number
  lineItems: PricedBooking["lineItems"]
  canProceedToSchedule: boolean
  canProceedToCheckout: boolean
  canSubmit: boolean
}

const BookingContext = createContext<Ctx | null>(null)

function suggestedFrom(d: BookingDraft) {
  return estimateVisitHours({
    primaryServiceId: d.primaryServiceId,
    addons: d.addons,
    bedrooms: d.bedrooms,
    bathrooms: d.bathrooms,
    kitchens: d.kitchens,
  })
}

function withAutoHours(
  d: BookingDraft,
  patch: Partial<BookingDraft>
): BookingDraft {
  const next = { ...d, ...patch }
  const homeChanged =
    patch.bedrooms !== undefined ||
    patch.bathrooms !== undefined ||
    patch.kitchens !== undefined

  // Home size always re-drives hours — otherwise step 2 feels broken
  if (homeChanged) {
    next.hoursManualOverride = false
    next.estimatedHours = suggestedFrom(next)
    return next
  }

  if (!next.hoursManualOverride) {
    next.estimatedHours = suggestedFrom(next)
  }
  return next
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<BookingDraft>(defaultDraft)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = { ...defaultDraft, ...JSON.parse(raw) } as BookingDraft
        // Recompute hours if not manually overridden
        setDraftState(
          parsed.hoursManualOverride
            ? parsed
            : withAutoHours(parsed, {})
        )
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      /* ignore */
    }
  }, [draft, hydrated])

  const setDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraftState((d) => withAutoHours(d, patch))
  }, [])

  const reset = useCallback(() => {
    setDraftState(defaultDraft)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const setPrimaryService = useCallback((serviceId: string) => {
    setDraftState((d) =>
      withAutoHours(d, {
        primaryServiceId: serviceId,
        // Fresh primary → re-enable auto hours unless user had locked them
        hoursManualOverride: false,
      })
    )
  }, [])

  const toggleAddon = useCallback((serviceId: string) => {
    setDraftState((d) => {
      const exists = d.addons.some((a) => a.serviceId === serviceId)
      const service = getServiceById(serviceId)
      let addons: Addon[]
      if (exists) {
        addons = d.addons.filter((a) => a.serviceId !== serviceId)
      } else {
        const hours =
          service?.priceType === "hourly"
            ? (service.durationHours ?? 1)
            : undefined
        addons = [
          ...d.addons,
          { serviceId, quantity: 1, ...(hours != null ? { hours } : {}) },
        ]
      }
      return withAutoHours(d, { addons })
    })
  }, [])

  const setAddonQty = useCallback((serviceId: string, quantity: number) => {
    setDraftState((d) => ({
      ...withAutoHours(d, {
        addons: d.addons
          .map((a) =>
            a.serviceId === serviceId
              ? { ...a, quantity: Math.max(1, quantity) }
              : a
          )
          .filter((a) => a.quantity > 0),
      }),
    }))
  }, [])

  const setEstimatedHoursManual = useCallback((hours: number) => {
    const clamped = Math.min(16, Math.max(1, Math.round(hours * 2) / 2))
    setDraftState((d) => ({
      ...d,
      estimatedHours: clamped,
      hoursManualOverride: true,
    }))
  }, [])

  const resetHoursToSuggested = useCallback(() => {
    setDraftState((d) =>
      withAutoHours(
        { ...d, hoursManualOverride: false },
        {}
      )
    )
  }, [])

  const priced = useMemo(() => {
    if (!draft.primaryServiceId) {
      return {
        lineItems: [],
        subtotalPence: 0,
        discountPence: 0,
        discountPercent: 0,
        discountLabel: null,
        estimatedTotalPence: 0,
        suggestedHours: 1,
        itemCount: 0,
      } satisfies PricedBooking
    }
    return buildLineItems(
      draft.primaryServiceId,
      draft.addons,
      draft.estimatedHours,
      {
        bedrooms: draft.bedrooms,
        bathrooms: draft.bathrooms,
        kitchens: draft.kitchens,
      }
    )
  }, [
    draft.primaryServiceId,
    draft.addons,
    draft.estimatedHours,
    draft.bedrooms,
    draft.bathrooms,
    draft.kitchens,
  ])

  const suggestedHours = priced.suggestedHours

  const depositPence = draft.payDeposit
    ? calculateDepositPence(priced.estimatedTotalPence)
    : 0

  const value: Ctx = {
    draft,
    hydrated,
    setDraft,
    reset,
    toggleAddon,
    setAddonQty,
    setPrimaryService,
    setEstimatedHoursManual,
    resetHoursToSuggested,
    priced,
    suggestedHours,
    estimatedTotalPence: priced.estimatedTotalPence,
    depositPence,
    lineItems: priced.lineItems,
    canProceedToSchedule: Boolean(draft.primaryServiceId),
    canProceedToCheckout: Boolean(
      draft.primaryServiceId && draft.date && draft.arrivalWindowId
    ),
    canSubmit: Boolean(
      draft.primaryServiceId &&
        draft.date &&
        draft.arrivalWindowId &&
        draft.firstName &&
        draft.lastName &&
        draft.email &&
        draft.phone &&
        draft.line1 &&
        draft.town &&
        draft.postcode
    ),
  }

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}

export { formatHours }
