import { NextResponse } from 'next/server';
import { isAllowed } from '@/middlewares/authorization';
import { checkOrderId } from '@/utils/validation';
import { getOrder } from '@/services/serviceOrder';
const { SequelizeValidationError } = require('@/dbx/validators');

export const GET = async (request, { params }) => {
    const { id } = params;
    const condition = {};

    if (id === 'latest') {
        const user = await isAllowed([]);
        if (!user) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }
        condition.created_by = user.id;
        condition.status = 'Pending';
    } else {
        // order_id: 1 | #E_VISSA_1
        if (checkOrderId(id === false)) {
            return NextResponse.json({ error: 'Bad request' }, { status: 400 });
        }
        condition.id = id;
    }

    try {
        const result = await getOrder(condition);
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
