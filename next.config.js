/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const CONTENT_URL = process.env.NEXT_PUBLIC_CONTENT_URL || 'http://localhost:8000';

const CONTENT_DOMAINS = [];

if (CONTENT_URL) {
  CONTENT_DOMAINS.push(new URL(CONTENT_URL).hostname);
}

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: API_URL,
    CONTENT_URL: CONTENT_URL
  },
  images: {
    domains: CONTENT_DOMAINS
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    },
    '@mui/styles': {
      transform: '@mui/styles/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  }
};

module.exports = nextConfig;
