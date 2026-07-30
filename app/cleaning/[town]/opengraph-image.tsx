import { BUSINESS, SERVICE_AREAS, getServiceArea } from "@/lib/data/services"
import {
  brandOgImage,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OG_TOWN_PAIRS,
} from "@/lib/og/brand-og"

/** One OG image per town, matching the page's static params. */
export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ town: area.slug }))
}

/** Town-specific alt text (a static `alt` export would be one-size-fits-all). */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ town: string }>
}) {
  const { town } = await params
  const place = getServiceArea(town)?.name ?? BUSINESS.primaryLocation
  return [
    {
      id: "og",
      alt: `${BUSINESS.name} — house cleaning in ${place}`,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ town: string }>
}) {
  const { town } = await params
  const place = getServiceArea(town)?.name ?? BUSINESS.primaryLocation

  const areaIndex = SERVICE_AREAS.findIndex((a) => a.slug === town)
  const pair = OG_TOWN_PAIRS[Math.max(areaIndex, 0) % OG_TOWN_PAIRS.length]

  return brandOgImage({
    eyebrow: "House cleaning in",
    title: place,
    subtitle: "Honest prices · no deposit",
    pair,
  })
}
