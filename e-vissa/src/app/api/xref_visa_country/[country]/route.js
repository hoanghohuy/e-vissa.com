import { validateParams } from '@/utils/validation';
import { NextResponse } from 'next/server';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Xref_visa_country, Visa_country_detail, Visa } = require('@/dbx/e-vissa/models');

// Get countries by allowed_country (country_from)
export const POST = async (request, { params }) => {
    const { country } = params;

    const result = await Xref_visa_country.findAll({
        where: { allowed_country: country },
        attributes: { exclude: ['id', 'allowed_country', 'visa_detail', 'created_at', 'updated_at'] },
        group: ['country'],
        include: [
            {
                model: Visa_country_detail,
                as: 'visa_detail_info',
                attributes: [],
                where: { published: 1 },
            },
        ],
    });

    try {
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

// FE:  FROM - TO
export const GET = async (request, { params }) => {
    try {
        const { country } = params;
        const { from, id } = validateParams(request, ['from', 'id']);
        if (!country) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }
        const where = { country };

        if (id) {
            where.id = id;
        }
        if (from) {
            where.allowed_country = from;
        }

        const result = await Xref_visa_country.findAll({
            where,
            attributes: { exclude: ['visa_detail', 'created_at', 'updated_at', 'created_by', 'updated_by'] },
            include: [
                {
                    where: {
                        published: 1,
                    },
                    model: Visa_country_detail,
                    as: 'visa_detail_info',
                    attributes: {
                        exclude: [
                            'id',
                            'visa',
                            'note',
                            'created_at',
                            'updated_at',
                            'created_by',
                            'updated_by',
                            'published',
                        ],
                    },
                    include: [
                        {
                            model: Visa,
                            as: 'visa_info',
                            attributes: { exclude: ['id', 'created_at', 'updated_at', 'created_by', 'updated_by'] },
                        },
                    ],
                },
            ],
        });
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
