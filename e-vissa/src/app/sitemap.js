export default async function sitemap() {
    try {
        const sitemap = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sitemap`, {
            headers: {
                'Sec-Fetch-Site': 'same-origin',
            },
        });
        return await sitemap.json();
    } catch (error) {
        return [];
    }
}
