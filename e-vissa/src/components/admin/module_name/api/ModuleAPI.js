export async function getAllDataModule() {
    try {
        const resp = await fetch(`/api/module`, {
            cache: 'no-store',
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
