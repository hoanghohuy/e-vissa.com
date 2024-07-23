/** @type {import('next').NextConfig} */

const { Category } = require('./src/dbx/e-vissa/models');
async function categorySlugs() {
    return await Category.findAll({
        raw: true,
        where: { published: 1 },
        attributes: ['slug'],
    });
}

const nextConfig = {
    async rewrites() {
        let pages = ['passport', 'visa-guide', 'embassy', 'travel-documents', 'visa-fees', 'news'];

        try {
            const listCategorySlugs = await categorySlugs();
            if (listCategorySlugs.length > 0) {
                pages = listCategorySlugs.map((item) => item.slug);
            }
        } catch (error) {
            console.log('Get category slug failed: ' + error.message);
        }

        const cateRules = pages.map((cateSlug) => ({
            source: `/${cateSlug}`,
            destination: `/posts/${cateSlug}`,
        }));

        const postRules = pages.map((cateSlug) => ({
            source: `/${cateSlug}/:post`,
            destination: `/posts/${cateSlug}/:post`,
        }));

        return [...cateRules, ...postRules];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.e-vissa.com',
                pathname: '**',
            },
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_SITE_URL },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
    reactStrictMode: true,
    experimental: {
        typedRoutes: true,
        serverComponentsExternalPackages: ['mariadb'],
    },
};

module.exports = nextConfig;
