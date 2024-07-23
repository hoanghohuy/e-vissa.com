export async function getAllDataCurrency() {
    try {
        const resp = await fetch(`/api/currencies`);
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
