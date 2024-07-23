import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
import { validateParams } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Country, Visa_country_detail, Xref_visa_country, Visa } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    try {
        const { country, includeVisa } = validateParams(request, ['country', 'includeVisa']);
        if (!country) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }
        if (includeVisa == 0) {
            const data = await Xref_visa_country.findAll({
                raw: true,
                where: { country },
                include: [
                    {
                        model: Country,
                        as: 'country_info',
                        attributes: ['name'],
                    },
                    {
                        model: Country,
                        as: 'allowed_country_info',
                        attributes: ['name'],
                    },
                ],
            });
            return NextResponse.json(data);
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

// Admin insert countries
export const POST = async (request) => {
    const xrefData = await request.json();
    const xrefDatas = xrefData?.allowed_country?.map((country) => ({
        ...xrefData,
        allowed_country: country,
    }));

    const logData = { desc: xrefData };
    try {
        const result = await Xref_visa_country.bulkCreate(xrefDatas);
        await addLog(logData);
        return NextResponse.json({ success: 'The country has been allowed' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};

// Admin: Insert and Update
export const PUT = async (request) => {
    const { country, visa_detail, rm_allowed_country, new_allowed_country } = await request.json();

    const logData = { desc: { country, visa_detail, rm_allowed_country, new_allowed_country } };
    try {
        if (rm_allowed_country) {
            const removeContries = rm_allowed_country.map(
                async (allowed_country) =>
                    await Xref_visa_country.destroy({
                        where: {
                            country,
                            allowed_country,
                            visa_detail,
                        },
                    }),
            );
        }

        if (new_allowed_country) {
            const newContries = new_allowed_country.map(
                async (allowed_country) =>
                    await Xref_visa_country.create({
                        country,
                        allowed_country,
                        visa_detail,
                    }),
            );
        }

        await addLog(logData);
        return NextResponse.json({ success: 'Xref has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
