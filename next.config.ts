import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g5eqynrmtx.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
