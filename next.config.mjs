/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // GitHub Pagesのベースパス設定（リポジトリ名に合わせる）
    // basePath: '/saison-lab',
    // assetPrefix: '/saison-lab/',
};

export default nextConfig;
