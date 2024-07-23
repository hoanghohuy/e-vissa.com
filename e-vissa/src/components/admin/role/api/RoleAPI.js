export async function getAllDataRole() {
    try {
        const resp = await fetch(`/api/admin/roles`, {
            cache: 'no-store',
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
