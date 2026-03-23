import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  devIndicators: {
    position: "bottom-right",
  },
  cacheComponents: true,
};

export default nextConfig;
