import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any domain for company logos/avatars
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
