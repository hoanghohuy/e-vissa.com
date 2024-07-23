export async function getAllTypeVisa(token) {
    try {
        const resp = await fetch(`/api/admin/visas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
