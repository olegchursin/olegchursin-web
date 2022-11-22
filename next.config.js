/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ik.imagekit.io',
      'live.staticflickr.com',
      'wedding.olegchursin.com'
    ]
  }
};

module.exports = nextConfig;
