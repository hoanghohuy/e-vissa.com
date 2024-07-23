export async function getAllDataUser(accessToken, page, limit) {
    try {
        const resp = await fetch(`/api/admin/users?internal=1&page=${page}&limit=${limit}`, {
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

export async function getAllDataWebsite(accessToken) {
    try {
        const resp = await fetch(`/api/admin/visa_websites`, {
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
