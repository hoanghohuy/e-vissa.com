import { getPost, getAllPostSlugs } from '@/services/servicePost';
import { settingsData, openGraphImage } from '/settings';

export async function getAllPosts() {
    try {
        return getAllPostSlugs();
    } catch (error) {
        return null;
    }
}

export async function getDetailPost(slug, condition) {
    try {
        return getPost(slug, condition);
    } catch (error) {
        return null;
    }
}

export async function getMetadata(params) {
    const postSlug = params.post;
    const categorySlug = params.category;

    const notFoundMetaData = {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
    };

    if (!postSlug) {
        return notFoundMetaData;
    }

    try {
        const post = await getDetailPost(postSlug, {});
        if (post === null) {
            return notFoundMetaData;
        }

        return {
            title: post.title,
            description: post.meta_desc,
            keywords: post.keyword,
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${post.slug}`,
            },
            openGraph: {
                title: post.title,
                url:
                    postSlug.length > 1 && post.slug
                        ? `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${post.slug}`
                        : `/${post.slug}`,
                type: 'website',
                description: post.meta_desc,
                // images: post.image
                //     ? [`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${post.image}`]
                //     : openGraphImage.images,
                images: [
                    {
                        url: post.image
                            ? `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${post.image}`
                            : `${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`,
                        secureUrl: post.image
                            ? `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${post.image}`
                            : `${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`,
                        alt: `Preview image for ${post.title}`,
                    },
                ],
                site: `@${settingsData.siteName}`,
                creator: `@${settingsData.siteName}`,
            },
            twitter: {
                title: post.title,
                description: post.meta_desc,
                card: 'summary',
                url:
                    postSlug.length > 1 && post.slug
                        ? `${process.env.NEXT_PUBLIC_SITE_URL}/${postSlug[postSlug.length - 2]}/${post.slug}`
                        : `${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug}`,
                images: post.image
                    ? [`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${post.image}`]
                    : openGraphImage.images,
                site: `@${settingsData.siteName}`,
                creator: `@${settingsData.siteName}`,
            },
            other: {
                'fb:app_id': '1913797152324509',
            },
        };
    } catch (error) {
        return notFoundMetaData;
    }
}

export function getJsonLd(detail, category) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        datePublished: detail.created_at,
        dateModified: detail.created_at,
        headline: detail.title,
        description: detail.meta_desc,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${category}/${detail.slug}`,
        },
        author: {
            '@type': 'Person',
            name: `${detail.created_by_info?.first_name} ${detail.created_by_info?.last_name}`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        },
        image: {
            '@type': 'imageObject',
            url: `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${detail.image}`,
        },
        publisher: {
            '@type': 'Organization',
            name: 'E-vissa',
            logo: {
                '@type': 'imageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo_thumbnail.png`,
            },
        },
    };
}
