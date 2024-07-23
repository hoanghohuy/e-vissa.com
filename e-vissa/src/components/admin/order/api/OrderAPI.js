export async function getAllDataOrder(accessToken, page = '', limit = '') {
    try {
        const resp = await fetch(`/api/admin/orders?page=${page}&limit=${limit}`, {
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

export async function getAllDataTurkyOrder(accessToken, page = '', limit = '') {
    try {
        const resp = await fetch(`/api/admin/turkey/orders?page=${page}&limit=${limit}`, {
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
