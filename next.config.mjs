/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-321502-6033953.cloudwaysapps.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
