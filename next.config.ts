import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
         protocol: 'http', // Local usa HTTP, no HTTPS
        hostname: 'https://electrolamastore.onrender.com',
        port: '3001', // El puerto donde corre tu app local
         pathname: '/img/**',    // Permite todas las imágenes dentro de /img
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
