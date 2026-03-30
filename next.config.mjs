/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This enables static HTML export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // If your repository name isn't the same as your GitHub username (e.g., username.github.io)
  // and you're deploying to a subdirectory, uncomment the line below and replace 'your-repo-name'
  // basePath: '/your-repo-name',
};

export default nextConfig;
