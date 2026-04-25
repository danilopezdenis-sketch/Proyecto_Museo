/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  serverExternalPackages: ['sequelize', 'mysql2', 'mongoose'],
}

export default nextConfig