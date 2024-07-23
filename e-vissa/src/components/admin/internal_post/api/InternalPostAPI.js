export async function getAllDataPosts(accessToken) {
    try {
        const resp = await fetch(`/api/admin/internal_posts`, {
            cache: 'no-store',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
