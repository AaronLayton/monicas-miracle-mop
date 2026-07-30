import { BUSINESS, SERVICE_AREAS } from "@/lib/data/services"
import { brandOgImage, OG_PAIRS, OG_SIZE } from "@/lib/og/brand-og"

export const alt = `${BUSINESS.name} — areas we cover in ${BUSINESS.region}`
export const size = OG_SIZE
export const contentType = "image/jpeg"

export default function Image() {
  return brandOgImage({
    eyebrow: "Areas we cover",
    title: `${SERVICE_AREAS.length} ${BUSINESS.region} towns`,
    subtitle: "Sutton-in-Ashfield, Mansfield & more",
    pair: OG_PAIRS.kitchen,
    titleSizeOverride: 56,
  })
}
