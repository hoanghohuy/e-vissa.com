import { NextResponse } from 'next/server';
import { addLog } from '@/utils/log';
import { headers } from 'next/headers';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Category } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { slug } = params;
    const id = Number(slug);
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
    const dataUpdate = await request.json();
    dataUpdate.updated_by = headers().get('tokenUserId');

    const logData = { desc: dataUpdate };
    try {
        const [isUpdated] = await Category.update(dataUpdate, {
            where: {
                id,
            },
        });
        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Category not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'Category has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
