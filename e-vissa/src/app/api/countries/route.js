import { NextResponse } from 'next/server';
import { paginationInfo } from '@/utils/pagination';
const { Country } = require('@/dbx/e-vissa/models');
const { SequelizeValidationError } = require('@/dbx/validators');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Country);
    try {
        const result = await Country.findAll({
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
            attributes: { exclude: ['created_at', 'updated_at'] },
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
