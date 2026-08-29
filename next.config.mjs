/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
    qualities: [100, 50, 75, 85],
  },
};

export default nextConfig;
