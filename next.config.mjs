/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // basePath and assetPrefix removed for custom domain
};

export default nextConfig;
