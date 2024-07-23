import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Coupon } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Coupon);
    try {
        const result = await Coupon.findAll({
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
        });
        return NextResponse.json({
            data: result,
            pagination: pagInfo,
        });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

export const POST = async (request) => {
    const couponData = await request.json();
    couponData.created_by = headers().get('tokenUserId');

    const logData = { desc: couponData };
    try {
        const newCoupon = await Coupon.create(couponData);
        await addLog(logData);
        return NextResponse.json({ success: 'Coupon has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
