import { NextResponse } from 'next/server';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Service } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Service);

    try {
        const result = await Service.findAll({
            where: { published: 1 },
            attributes: { exclude: ['created_at', 'updated_at', 'created_by', 'updated_by', 'published'] },
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
