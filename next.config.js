/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",          // Lean Docker build — copies only the runtime + deps Next actually uses
};
module.exports = nextConfig;
