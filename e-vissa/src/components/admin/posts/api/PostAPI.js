export async function getAllDataPost(token, page = '', limit = '') {
    try {
        const resp = await fetch(`/api/admin/posts?page=${page}&limit=${limit}`, {
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

export async function getAllDataPostPublished(page = '', limit = '') {
    try {
        const resp = await fetch(`/api/admin/posts?page=${page}&limit=${limit}`);
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function getAllDataPostPublishedByCategory(category, page = '', limit = '') {
    try {
        const resp = await fetch(`/api/categories/${category}?page=${page}&limit=${limit}`);
        if (resp.status == 200) {
            const dataJson = await resp.json();
            return dataJson;
        } else {
            return {};
        }
    } catch (error) {
        throw error;
    }
}
