import type { MetadataRoute } from "next"
import { BUSINESS } from "@/lib/data/services"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name} — House Cleaning in ${BUSINESS.primaryLocation}`,
    short_name: BUSINESS.name,
    description: `Professional domestic house cleaning in ${BUSINESS.primaryLocation} and surrounding ${BUSINESS.region}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6d28d9",
    lang: BUSINESS.locale,
    categories: ["business", "lifestyle"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
