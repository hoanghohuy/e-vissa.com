import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Service } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { id } = params;
    const serviceData = await request.json();
    serviceData.updated_by = headers().get('tokenUserId');

    const logData = { desc: serviceData };
    try {
        const [isUpdated] = await Service.update(serviceData, {
            where: {
                id,
            },
        });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Order not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'The Service has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
