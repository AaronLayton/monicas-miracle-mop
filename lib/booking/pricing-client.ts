/**
 * Client-safe pricing (no fs / server imports).
 * Mirrors server pricing using the same services data module.
 */
import {
  estimateServicePence,
  getServiceById,
  calculateDepositPence,
  estimateVisitHours,
  countSelectedItems,
  applyBundleDiscount,
  formatHours,
} from "@/lib/data/services"
import type { BookingLineItem } from "@/lib/booking/types"

export {
  calculateDepositPence,
  estimateVisitHours,
  countSelectedItems,
  applyBundleDiscount,
  formatHours,
}

export type PricedBooking = {
  lineItems: BookingLineItem[]
  subtotalPence: number
  discountPence: number
  discountPercent: number
  discountLabel: string | null
  estimatedTotalPence: number
  suggestedHours: number
  itemCount: number
}

export function buildLineItems(
  primaryServiceId: string,
  addons: { serviceId: string; quantity: number; hours?: number }[],
  estimatedHours?: number,
  home?: { bedrooms: number; bathrooms: number; kitchens: number }
): PricedBooking {
  const primary = getServiceById(primaryServiceId)
  if (!primary) {
    return {
      lineItems: [],
      subtotalPence: 0,
      discountPence: 0,
      discountPercent: 0,
      discountLabel: null,
      estimatedTotalPence: 0,
      suggestedHours: 1,
      itemCount: 0,
    }
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
      // Always show visit length so home-size changes are visible
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
      // Default hourly add-on time tracks its durationHours (not stuck at 1)
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
    discountPercent: bundle.percent,
    discountLabel: bundle.label,
    estimatedTotalPence: bundle.totalPence,
    suggestedHours,
    itemCount,
  }
}
