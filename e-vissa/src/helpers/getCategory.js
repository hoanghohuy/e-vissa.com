import { getAllCategorySlugs, getCategory, getPostsByCategory, getSchema } from '@/services/serviceCategory';
import { isDevelopmentEnv } from '@/utils/validation';

export async function getAllCategories(condition = {}) {
    try {
        return await getAllCategorySlugs(condition);
    } catch (error) {
        return null;
    }
}

export async function getCategoryBySlug(slug) {
    try {
        return await getCategory(slug);
    } catch (error) {
        return null;
    }
}

export async function getPostsByCategorySlug(catSlug) {
    try {
        const request = { url: `${process.env.NEXT_PUBLIC_SITE_URL}?page=1&limit=10` };
        return await getPostsByCategory(catSlug, request);
    } catch (error) {
        return null;
    }
}

export async function getSchemaJsonLd(catSlug) {
    let result = { schema: '' };
    try {
        if (catSlug) {
            const schema = await getSchema(catSlug);

            if (schema === null) {
                return result;
            }
            return schema;
        }
        return result;
    } catch (error) {
        return result;
    }
}

export async function getMetadata(category) {
    const notFoundMetaData = {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
    };
    if (!category) {
        return notFoundMetaData;
    }
    const categoryData = await getCategoryBySlug(category);
    try {
        return {
            title: categoryData.meta_title,
            description: categoryData.meta_desc,
            keywords: categoryData.keyword,
            alternates: {
                canonical:
                    category !== '/'
                        ? `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`
                        : `${process.env.NEXT_PUBLIC_SITE_URL}`,
            },
            robots: isDevelopmentEnv ? 'noindex' : 'index',
            googlebot: isDevelopmentEnv ? 'noindex' : 'index',
            openGraph: {
                title: categoryData.meta_title,
                url:
                    category !== '/'
                        ? `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`
                        : `${process.env.NEXT_PUBLIC_SITE_URL}`,
                type: 'website',
                description: categoryData.meta_desc,
                // images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
                images: [
                    {
                        url: `${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`,
                        secureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`,
                        width: 1200,
                        height: 630,
                        alt: 'Preview image for e-vissa',
                    },
                ],
                site: '@evissa',
                creator: '@evissa',
            },
            twitter: {
                title: categoryData.meta_title,
                description: categoryData.meta_desc,
                card: 'summary',
                url:
                    category !== '/'
                        ? `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`
                        : `${process.env.NEXT_PUBLIC_SITE_URL}`,
                images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
                site: '@evissa',
                creator: '@evissa',
            },
            other: {
                'fb:app_id': '1913797152324509',
            },
        };
    } catch (error) {
        return notFoundMetaData;
    }
}
