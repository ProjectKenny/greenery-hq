import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  generateBuildId: async () => {
    return 'greenery-hq-build'
  },
};

export default nextConfig;
