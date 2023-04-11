/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  async redirects() {
    return [{ source: '/', destination: '/signin', permanent: true }];
  },
};

module.exports = nextConfig;
