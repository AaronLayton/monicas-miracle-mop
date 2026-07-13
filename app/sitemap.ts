import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"
import { SERVICE_AREAS } from "@/lib/data/services"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  const routes: Array<{
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/areas", changeFrequency: "monthly", priority: 0.7 },
    // Local landing pages — one per town we cover.
    ...SERVICE_AREAS.map((area) => ({
      path: `/cleaning/${area.slug}`,
      changeFrequency: "monthly" as const,
      priority: area.isPrimary ? 0.9 : 0.7,
    })),
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/schedule", changeFrequency: "monthly", priority: 0.6 },
    { path: "/checkout", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
