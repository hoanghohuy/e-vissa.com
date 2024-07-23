import { NextResponse } from 'next/server';
import { addLog } from '@/utils/log';
const { Country } = require('@/dbx/e-vissa/models');
const { SequelizeValidationError } = require('@/dbx/validators');

export const POST = async (request) => {
    const countryData = await request.json();

    const logData = { desc: countryData };
    try {
        const newCountry = await Country.create(countryData);
        await addLog(logData);
        return NextResponse.json({ success: 'Country has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
