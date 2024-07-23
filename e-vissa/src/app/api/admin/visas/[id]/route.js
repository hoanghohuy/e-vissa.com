import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Visa } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { id } = params;
    const visaData = await request.json();
    visaData.updated_by = headers().get('tokenUserId');

    const logData = { desc: visaData };
    try {
        const [isUpdated] = await Visa.update(visaData, {
            where: {
                id,
            },
        });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Visa not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'The Visa has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
