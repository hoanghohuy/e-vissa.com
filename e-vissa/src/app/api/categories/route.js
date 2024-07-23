import { NextResponse } from 'next/server';
import { getAllCategorySlugs } from '@/services/serviceCategory';
import { validateParams } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');

export const GET = async (request) => {
    const { condition } = validateParams(request, ['term']);

    try {
        const categories = await getAllCategorySlugs(condition);
        return NextResponse.json(categories);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
