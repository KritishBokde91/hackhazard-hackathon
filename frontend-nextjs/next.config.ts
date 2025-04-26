import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // image site 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
