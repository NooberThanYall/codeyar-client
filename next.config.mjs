/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  experimental: {
    allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  },
}

export default nextConfig
