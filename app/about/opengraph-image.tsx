import { BUSINESS } from "@/lib/data/services"
import { brandOgImage, OG_PAIRS, OG_SIZE } from "@/lib/og/brand-og"

export const alt = `About ${BUSINESS.name}`
export const size = OG_SIZE
export const contentType = "image/jpeg"

export default function Image() {
  return brandOgImage({
    eyebrow: "About us",
    title: `Meet ${BUSINESS.ownerName}`,
    subtitle: "One-woman team · fully insured",
    pair: OG_PAIRS.shower,
  })
}
