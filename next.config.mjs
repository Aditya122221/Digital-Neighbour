/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/seo/:location",
        destination: "/seo/search-engine-optimisation/:location",
      },
    ];
  },
};

export default nextConfig;
