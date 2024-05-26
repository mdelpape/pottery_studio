/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const path = require('path');

const nextConfig = {
  ...withPWA({
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
  }),
  webpack: (config, { isServer }) => {
    // Add a rule for .glsl files
    config.module.rules.push({
      test: /\.glsl$/,
      use: 'raw-loader'
    });

    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  }
}

module.exports = nextConfig