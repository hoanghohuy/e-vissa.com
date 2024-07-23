import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Coupon } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { code } = params;
    const couponData = await request.json();
    couponData.updated_by = headers().get('tokenUserId');

    const logData = { desc: couponData };
    try {
        const [isUpdated] = await Coupon.update(couponData, {
            where: {
                code,
            },
        });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Coupon not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'The coupon has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
