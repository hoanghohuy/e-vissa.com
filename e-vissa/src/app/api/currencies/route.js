import { NextResponse } from 'next/server';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Currency } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Currency);
    try {
        const result = await Currency.findAll({
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
