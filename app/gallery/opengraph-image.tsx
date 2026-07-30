import { BUSINESS } from "@/lib/data/services"
import { brandOgImage, OG_PAIRS, OG_SIZE } from "@/lib/og/brand-og"

export const alt = `${BUSINESS.name} — photos from real bookings`
export const size = OG_SIZE
export const contentType = "image/jpeg"

export default function Image() {
  return brandOgImage({
    eyebrow: "Real results",
    title: "Photos from real bookings",
    subtitle: "Real homes, real jobs",
    pair: OG_PAIRS.void,
  })
}
