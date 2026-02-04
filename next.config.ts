import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // Optimize for production
  compress: true,
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Output configuration for deployment
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: [],
    unoptimized: true,
  },
};

export default nextConfig;
