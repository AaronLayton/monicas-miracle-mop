import type { NextConfig } from "next"

// Atlas parcel (public/.well-known/atlas.json + public/atlas/*.glb) is fetched
// cross-origin by the Atlas runtime, so it must allow any origin.
const atlasCors = [{ key: "Access-Control-Allow-Origin", value: "*" }]

const nextConfig: NextConfig = {
  typedRoutes: true,
  allowedDevOrigins: ["*.ngrok-free.app"],
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [
      { source: "/.well-known/atlas.json", headers: atlasCors },
      { source: "/atlas/:path*", headers: atlasCors },
    ]
  },
}

export default nextConfig
