/** @type {import('next').NextConfig} */
const nextConfig = {
  // A `next build` here would overwrite the running dev server's .next and break it.
  // Set NEXT_DIST_DIR (e.g. .next-prod) to build/serve without touching it.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;