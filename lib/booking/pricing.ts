import {
  estimateServicePence,
  getServiceById,
  calculateDepositPence,
  estimateVisitHours,
  countSelectedItems,
  applyBundleDiscount,
  type Service,
} from "@/lib/data/services"
import type {
  BookingLineItem,
  CreateBookingInput,
  selectedAddonSchema,
} from "@/lib/booking/types"
import type { z } from "zod"

type AddonSelection = z.infer<typeof selectedAddonSchema>

export function buildLineItems(
  primaryServiceId: string,
  addons: AddonSelection[],
  estimatedHours?: number,
  home?: { bedrooms: number; bathrooms: number; kitchens: number }
): {
  lineItems: BookingLineItem[]
  subtotalPence: number
  discountPence: number
  estimatedTotalPence: number
  suggestedHours: number
} {
  const primary = getServiceById(primaryServiceId)
  if (!primary || !primary.isPrimary) {
    throw new Error("Invalid primary service")
  }

  const suggestedHours = estimateVisitHours({
    primaryServiceId,
    addons,
    bedrooms: home?.bedrooms ?? 2,
    bathrooms: home?.bathrooms ?? 1,
    kitchens: home?.kitchens ?? 1,
  })

  const homeSize = {
    bedrooms: home?.bedrooms ?? 2,
    bathrooms: home?.bathrooms ?? 1,
    kitchens: home?.kitchens ?? 1,
  }
  const hours = estimatedHours ?? suggestedHours
  const primaryTotal = estimateServicePence(primary, hours, homeSize)

  const lineItems: BookingLineItem[] = [
    {
      serviceId: primary.id,
      name: primary.name,
      quantity: 1,
      unitPence: primaryTotal,
      totalPence: primaryTotal,
      hours,
    },
  ]

  for (const addon of addons) {
    const service = getServiceById(addon.serviceId)
    if (!service || service.isPrimary) continue
    const qty = Math.max(1, addon.quantity || 1)
    let unit = service.pricePence
    let total = unit * qty
    let addonHours: number | undefined

    if (service.priceType === "hourly") {
      addonHours = addon.hours ?? service.durationHours ?? 1
      unit = service.pricePence
      total = Math.round(unit * addonHours * qty)
    }

    lineItems.push({
      serviceId: service.id,
      name: service.name,
      quantity: qty,
      unitPence: unit,
      totalPence: total,
      hours: addonHours,
    })
  }

  const subtotalPence = lineItems.reduce((s, i) => s + i.totalPence, 0)
  const itemCount = countSelectedItems(primaryServiceId, addons)
  const bundle = applyBundleDiscount(subtotalPence, itemCount)

  if (bundle.discountPence > 0 && bundle.label) {
    lineItems.push({
      serviceId: "bundle-discount",
      name: bundle.label,
      quantity: 1,
      unitPence: -bundle.discountPence,
      totalPence: -bundle.discountPence,
    })
  }

  return {
    lineItems,
    subtotalPence,
    discountPence: bundle.discountPence,
    estimatedTotalPence: bundle.totalPence,
    suggestedHours,
  }
}

export function priceBooking(input: CreateBookingInput) {
  const { lineItems, estimatedTotalPence, suggestedHours } = buildLineItems(
    input.primaryServiceId,
    input.addons,
    input.estimatedHours,
    input.home
  )
  const depositPence = input.payDeposit
    ? calculateDepositPence(estimatedTotalPence)
    : 0
  return {
    lineItems,
    estimatedTotalPence,
    depositPence,
    suggestedHours,
  }
}

export function describeServiceEstimate(service: Service): string {
  if (service.priceType === "hourly") {
    return `Typically ${service.durationHours ?? 2.5} hours for a 2-bed · billed at £${(service.pricePence / 100).toFixed(0)}/hr`
  }
  if (service.priceType === "range") {
    return "Final price confirmed after your free 15-minute consultation"
  }
  if (service.priceType === "from") {
    return "Final price depends on property size"
  }
  return "Fixed add-on price"
}
