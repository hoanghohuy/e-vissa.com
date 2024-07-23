export async function getAllDataPostPublished(page = '', limit = '') {
    try {
        const resp = await fetch(`/api/posts?page=${page}&limit=${limit}`);
        const dataJson = await resp.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function getAllDataCommentByPostID(id) {
    try {
        const resp = await fetch(`/api/comments/${id}`);
        if (resp.status === 200) {
            const dataJson = await resp.json();
            return dataJson;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}
