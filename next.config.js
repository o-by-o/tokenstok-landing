/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",          // Lean Docker build — copies only the runtime + deps Next actually uses
  async rewrites() {
    return [
      // /investors → /investors.html (interactive calculator under Basic Auth)
      { source: "/investors", destination: "/investors.html" },
    ];
  },
};
module.exports = nextConfig;
