import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Local usa HTTP, no HTTPS
        hostname: 'electrolamastore.onrender.com',
        pathname: '/**', // permite cualquier ruta

      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
