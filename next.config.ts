import type { NextConfig } from "next";

const isDevMode: boolean = process.env.NODE_ENV == "production";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
};

if (isDevMode) {
  nextConfig.devIndicators = false;
}

export default nextConfig;
