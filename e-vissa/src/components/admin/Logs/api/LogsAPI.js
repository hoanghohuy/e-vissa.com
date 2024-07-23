export async function getAllDataLogs(token, page, limit) {
    try {
        const resp = await fetch(`/api/admin/logs?page=${page}&limit=${limit}`, {
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
