/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure all environment variables used with NEXT_PUBLIC prefix are properly forwarded
  env: {
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID || process.env.PRIVY_APP_ID,
    NEXT_PUBLIC_BICONOMY_API_KEY: process.env.NEXT_PUBLIC_BICONOMY_API_KEY || process.env.BICONOMY_API_KEY,
    NEXT_PUBLIC_BICONOMY_PAYMASTER_URL: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL || process.env.BICONOMY_PAYMASTER_URL,
    NEXT_PUBLIC_BICONOMY_PAYMASTER_ID: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_ID || process.env.BICONOMY_PAYMASTER_ID,
    NEXT_PUBLIC_BICONOMY_BUNDLER_URL: process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_URL || process.env.BICONOMY_BUNDLER_URL,
    PRIVY_APP_SECRET: process.env.PRIVY_APP_SECRET,
  },
  // Increase serverless function timeout for API routes
  serverRuntimeConfig: {
    // Will only be available on the server side
    timeoutSeconds: 30,
  },
  // Configure headers for security
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Configure webpack to handle BigInt literals
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  // Configure transpiler options for ES2020
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig; 