/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  serverExternalPackages: ['sequelize', 'mysql2', 'mongoose', 'mysql2/promise'],
}

export default nextConfig