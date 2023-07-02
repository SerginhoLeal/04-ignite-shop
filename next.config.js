/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'files.stripe.com'
    ],
  },
}

module.exports = nextConfig
