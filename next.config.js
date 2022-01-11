/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'dowhatman.mypinata.cloud'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  reactStrictMode: true,
  env: {
    CONTRACT: process.env.CONTRACT,
    OWNER: process.env.OWNER,
  },
};
