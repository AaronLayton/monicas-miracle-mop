import { BUSINESS } from "@/lib/data/services"
import { brandOgImage, OG_PAIRS, OG_SIZE } from "@/lib/og/brand-og"

export const alt = `Contact ${BUSINESS.name}`
export const size = OG_SIZE
export const contentType = "image/jpeg"

export default function Image() {
  return brandOgImage({
    eyebrow: `House cleaning · ${BUSINESS.region}`,
    title: "Let’s talk",
    subtitle: "Email or book online",
    pair: OG_PAIRS.kitchen,
  })
}
