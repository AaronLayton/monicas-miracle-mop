import { ImageResponse } from "next/og"
import { BUSINESS, SERVICE_AREAS, getServiceArea } from "@/lib/data/services"

export const alt = `${BUSINESS.name} — local house cleaning`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** One OG image per town, matching the page's static params. */
export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ town: area.slug }))
}

// Brand colours as literal values (Satori has no access to CSS variables).
const PURPLE = "#5b3fd6"
const PURPLE_DEEP = "#3b2896"
const TEAL = "#14b8a6"

export default async function Image({
  params,
}: {
  params: Promise<{ town: string }>
}) {
  const { town } = await params
  const area = getServiceArea(town)
  const place = area?.name ?? BUSINESS.primaryLocation

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          textAlign: "center",
          color: "#ffffff",
          backgroundColor: PURPLE,
          backgroundImage: `linear-gradient(135deg, ${PURPLE_DEEP} 0%, ${PURPLE} 55%, ${TEAL} 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
            padding: "12px 28px",
            borderRadius: "9999px",
            fontSize: "30px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ffffff",
            backgroundColor: "rgba(255,255,255,0.16)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "18px",
              height: "18px",
              borderRadius: "9999px",
              backgroundColor: TEAL,
            }}
          />
          {BUSINESS.region}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "88px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          House Cleaning in {place}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "32px",
            fontSize: "40px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {BUSINESS.name}
        </div>
      </div>
    ),
    { ...size }
  )
}
