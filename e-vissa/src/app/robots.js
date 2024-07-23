import { isDevelopmentEnv } from '@/utils/validation';

export default function robots() {
    if (isDevelopmentEnv) {
        return {
            rules: {
                disallow: ['/'],
            },
        };
    }
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/_next/*', '/admin/*', '/posts/*'],
        },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    };
}
