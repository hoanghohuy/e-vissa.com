import { NextResponse } from 'next/server';
import { isAllowed } from '@/middlewares/authorization';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Log, User } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const user = await isAllowed(['administrator', 'editor']);
    if (!user) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
    const pagInfo = await paginationInfo(request, Log);
    try {
        const result = await Log.findAll({
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,

            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name'],
                },
            ],
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
    const user = await isAdmin();
    if (!user) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    const logData = await request.json();

    try {
        const newLog = await Log.create(logData);

        return NextResponse.json({
            newLog,
        });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
