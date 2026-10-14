/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
    qualities: [100, 50, 75, 85],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
