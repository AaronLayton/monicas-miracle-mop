import { BUSINESS } from "@/lib/data/services"
import { brandOgImage, OG_PAIRS, OG_SIZE } from "@/lib/og/brand-og"

export const alt = `${BUSINESS.name} — questions, answered`
export const size = OG_SIZE
export const contentType = "image/jpeg"

export default function Image() {
  return brandOgImage({
    eyebrow: "Good to know",
    title: "Questions, answered",
    subtitle: "Pricing, booking, cancellations",
    pair: OG_PAIRS.shower,
  })
}
