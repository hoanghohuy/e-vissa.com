import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';

const { SequelizeValidationError } = require('@/dbx/validators');
const { Visa_country_detail } = require('@/dbx/e-vissa/models');

export const POST = async (request) => {
    const deltailData = await request.json();
    deltailData.created_by = headers().get('tokenUserId');

    const logData = { desc: deltailData };
    try {
        const result = await Visa_country_detail.create(deltailData);
        await addLog(logData);
        return NextResponse.json({ success: 'Visa Detail has been added' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
