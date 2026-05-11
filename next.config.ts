import type { NextConfig } from "next";

const BACKEND_URL =
  process.env.API_URL ?? "https://kisco-backend-api.fly.dev";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
