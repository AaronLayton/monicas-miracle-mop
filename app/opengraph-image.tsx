import { ImageResponse } from "next/og"
import { BUSINESS } from "@/lib/data/services"

// Image metadata
export const alt = `${BUSINESS.name} — ${BUSINESS.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Brand colours as literal values (Tailwind semantic rule does not apply
// inside ImageResponse inline styles — Satori has no access to CSS variables).
const PURPLE = "#5b3fd6"
const PURPLE_DEEP = "#3b2896"
const TEAL = "#14b8a6"

// Image generation. No custom fonts / remote assets — builds offline.
export default function Image() {
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
        {/* Teal accent pill above the wordmark */}
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
          UK House Cleaning
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "104px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {BUSINESS.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "32px",
            fontSize: "44px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {BUSINESS.tagline}
        </div>
      </div>
    ),
    { ...size }
  )
}
