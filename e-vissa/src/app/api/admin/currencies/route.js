import { NextResponse } from 'next/server';
import { addLog } from '@/utils/log';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Currency } = require('@/dbx/e-vissa/models');

export const POST = async (request) => {
    const currencyData = await request.json();

    const logData = { desc: currencyData };
    try {
        const newCurrency = await Currency.create(currencyData);
        await addLog(logData);
        return NextResponse.json({ success: 'Currency has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
