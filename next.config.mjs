/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/phoenix', // Replace 'phoenix' with your actual repository name
  assetPrefix: '/phoenix', // This helps with CSS and asset paths
};

export default nextConfig;
