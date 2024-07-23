export async function getAllDataCountry() {
    try {
        const resp = await fetch(`/api/countries`);
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
