import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
import { checkOrderId } from '@/utils/validation';
import { getOrder } from '@/services/serviceOrder';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Order } = require('@/dbx/e-vissa/models');

export const GET = async (request, { params }) => {
    const { id } = params;

    if (checkOrderId(id === false)) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    try {
        const result = await getOrder({ id });
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
export const PUT = async (request, { params }) => {
    const { id } = params;
    const { status, total_price, admin_note } = await request.json();

    const logData = { desc: { status, admin_note } };
    try {
        const [isUpdated] = await Order.update(
            { status, admin_note, total_price, updated_by: headers().get('tokenUserId') },
            {
                where: {
                    id,
                },
            },
        );

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Order not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'The Order has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
