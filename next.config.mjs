/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "atlas.batstate-u.edu.ph",
        port: "3070",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
