import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Service } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Service);

    try {
        const result = await Service.findAll({
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
    const serviceData = await request.json();
    serviceData.created_by = headers().get('tokenUserId');

    const logData = { desc: serviceData };
    try {
        const newService = await Service.create(serviceData);
        await addLog(logData);
        return NextResponse.json({ success: 'Service has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
