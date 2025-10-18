import type { NextConfig } from 'next';

import { publicEnv } from './lib/config';
import { parseDomainFromUrl } from './lib/utils';

const isDevMode: boolean = process.env.NODE_ENV == 'production';

const MEDIA_DOMAIN = parseDomainFromUrl(publicEnv.MEDIA_URL as string) || '';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: MEDIA_DOMAIN,
        port: '8000',
        pathname: '/media/**',
        search: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 64, 256, 512, 1280],
  },
  experimental: {
    turbo: {
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
  },
};

if (isDevMode) {
  nextConfig.devIndicators = false;
}

export default nextConfig;
