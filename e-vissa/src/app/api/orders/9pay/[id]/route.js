import { NextResponse } from 'next/server';
import { get9payLink } from '@/libs/9pay';
const { Order } = require('@/dbx/e-vissa/models');

export const GET = async (request, { params }) => {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    try {
        const orderData = await Order.findOne({
            where: { id },
            raw: true,
            attributes: ['id', 'total_price', 'currency', 'customer_note'],
        });

        const result = await get9payLink(orderData);

        return NextResponse.json(result);
    } catch (err) {
        return NextResponse.json('Failed to connect to 9Pay: ' + err.message, { status: 406 });
    }
};
