import { NextResponse } from 'next/server';
import { validateParams } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Country, Visa_country_detail, Xref_visa_country, Visa } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    try {
        const { country } = validateParams(request, ['country']);
        if (!country) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }
        const visaData1 = await Visa_country_detail.findAll({
            where: { country },
            include: [
                { model: Visa, as: 'visa_info', attributes: ['name', 'type'] },
                {
                    model: Country,
                    as: 'allowed_country_info',
                    attributes: ['name', 'code'],
                    through: { attributes: [] },
                },
            ],
        });

        return NextResponse.json(visaData1);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
