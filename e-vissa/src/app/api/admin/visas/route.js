import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Visa } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Visa);
    try {
        const result = await Visa.findAll({
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
    const visaData = await request.json();
    visaData.created_by = headers().get('tokenUserId');

    const logData = { desc: visaData };
    try {
        const newVisa = await Visa.create(visaData);
        await addLog(logData);
        return NextResponse.json({ success: 'Visa has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
