import { NextResponse } from 'next/server';
import { isNotGuest, isManager } from '@/middlewares/authorization';
import Visa_websites from '@/dbx/internal_users/visa_websites';
import { validateParams } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');

// For Internal users only
export const GET = async (request) => {
    const user = await isNotGuest();
    if (!isManager(user)) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
    const { published, condition } = validateParams(request);

    try {
        const result = await Visa_websites.findAll({
            where: condition,
            attributes: { exclude: ['created_at', 'updated_at'] },
        });

        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
