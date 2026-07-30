import {
  BUSINESS,
  getServiceById,
  formatPrice,
  formatServicePrice,
} from "@/lib/data/services"
import { brandOgImage, OG_PAIRS, OG_SIZE } from "@/lib/og/brand-og"

export const alt = `${BUSINESS.name} — cleaning services & honest pricing`
export const size = OG_SIZE
export const contentType = "image/jpeg"

export default function Image() {
  const standard = getServiceById("standard-clean")
  const deep = getServiceById("deep-clean")
  const move = getServiceById("move-in-out")

  const others = [
    deep && `Deep ${formatServicePrice(deep).toLowerCase()}`,
    move && `Move-in ${formatServicePrice(move).toLowerCase()}`,
  ]
    .filter(Boolean)
    .join(" · ")

  return brandOgImage({
    eyebrow: "Services & honest pricing",
    title: `Cleans from ${standard ? formatPrice(standard.pricePence) : "£20"}/hr`,
    subtitle: others || "No deposit · pay on the day",
    pair: OG_PAIRS.ovenGlass,
    titleSizeOverride: 62,
  })
}
