import { NextResponse } from 'next/server';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Visa_country_detail } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    try {
        const data = await Visa_country_detail.findAll({
            attributes: ['country'],
            group: ['country'],
        });
        return NextResponse.json(data);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
