import { NextResponse } from 'next/server';
import { validateParams } from '@/utils/validation';
import { createPaypalOrder, completePaypalOrder } from '@/libs/paypal';
import { updateOrderPayment } from '@/services/serviceOrder';
const { Order } = require('@/dbx/e-vissa/models');

export const POST = async (request, { params }) => {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    const { create_order, complete_order } = validateParams(request, ['create_order', 'complete_order']);
    const { paypal_id } = await request.json();

    try {
        let status = 'Paying';
        let result;

        if (create_order) {
            const orderData = await Order.findOne({
                where: { id },
                raw: true,
                attributes: ['id', 'total_price', 'currency', 'customer_note'],
            });

            result = await createPaypalOrder(orderData);
        }

        if (complete_order) {
            result = await completePaypalOrder({ paypal_id, intent: 'capture' });
            status = result?.status === 'COMPLETED' ? 'Paid' : 'Paid Failed';
        }
        await updateOrderPayment({ id, status, payment_method: 'Paypal', transaction: paypal_id });
        return NextResponse.json(result);
    } catch (err) {
        return NextResponse.json('Failed to connect to Paypal', { status: 406 });
    }
};
