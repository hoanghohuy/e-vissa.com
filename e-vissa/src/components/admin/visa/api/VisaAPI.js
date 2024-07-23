export async function getAllDataVisa() {
    try {
        const resp = await fetch(`/api/admin/visa_country_detail`, {
            cache: 'no-store',
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function getDataVisaByCountry(code) {
    try {
        const resp = await fetch(`/api/admin/visa_country_detail?country=${code}`, {
            cache: 'no-store',
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function getDataVisaByID(id) {
    try {
        const resp = await fetch(`/api/admin/visa_country_detail/${id}`, {
            cache: 'no-store',
        });
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}
