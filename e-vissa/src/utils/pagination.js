import { addLog } from '@/utils/log';

export async function paginationInfo(request, model, condition = {}, include = []) {
    try {
        const url = new URL(request.url);
        let page = url.searchParams.get('page') || 1;
        let limit = url.searchParams.get('limit') || 999999999; // Get all

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        const totalItems = await model.count({ where: condition, include: include });
        const totalPages = Math.ceil(totalItems / limit);

        const paginationInfo = {
            totalItems,
            totalPages,
            page,
            limit,
            offset,
        };

        return paginationInfo;
    } catch (error) {
        console.error('Create paginationInfo failed: ' + error.message);
        await addLog({ desc: 'Create paginationInfo failed: ' + error.message }, 'error');
        return {};
    }
}
