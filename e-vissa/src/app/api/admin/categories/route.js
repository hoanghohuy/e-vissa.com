import { NextResponse } from 'next/server';
import { addLog } from '@/utils/log';
import { headers } from 'next/headers';
import { validateParams } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Category } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const { condition } = validateParams(request, ['term']);

    try {
        const categories = await Category.findAll({
            where: condition,
            include: [{ model: Category, as: 'parent_id_info' }],
        });
        return NextResponse.json(categories);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

export const POST = async (request) => {
    const categoryData = await request.json();
    categoryData.created_by = headers().get('tokenUserId');

    const logData = { desc: categoryData };
    try {
        const newCategory = await Category.create(categoryData);
        await addLog(logData);
        return NextResponse.json({ success: 'Category has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
