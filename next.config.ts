import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  allowedDevOrigins: ["*.ngrok-free.app"],
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    viewTransition: true,
  },
}

export default nextConfig
