/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const dotenv = require('dotenv').config({ path: '.env' });

// module.exports = nextConfig;
module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  nextConfig,
  dotenv,
  extends: [
    'plugin:@next/next/recommended',
  ],
};