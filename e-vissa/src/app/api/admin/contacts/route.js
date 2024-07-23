import { NextResponse } from 'next/server';
import { paginationInfo } from '@/utils/pagination';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Contact } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Contact);

    try {
        const result = await Contact.findAll({
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
