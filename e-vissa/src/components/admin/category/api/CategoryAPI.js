export async function getAllDataCategory(accessToken) {
    try {
        const resp = await fetch(`/api/admin/categories`, {
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
