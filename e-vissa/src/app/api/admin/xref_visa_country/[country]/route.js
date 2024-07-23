import { NextResponse } from 'next/server';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Xref_visa_country, Visa_country_detail } = require('@/dbx/e-vissa/models');

// Update supporting doc
export const PUT = async (request, { params }) => {
    const { country } = params;
    const id = country;
    const { supporting_doc } = await request.json();

    if (!supporting_doc || !id) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    try {
        const [isUpdated] = await Xref_visa_country.update(
            { supporting_doc },
            {
                where: {
                    id,
                },
            },
        );

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Data not found or not updated.' }, { status: 422 });
        }
        return NextResponse.json({ success: 'Supporting doc has bean updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

// Duplicate Visa
export const POST = async (request, { params }) => {
    const { country } = params;
    const { visa_detail_id, visa_id } = await request.json();

    try {
        let allowedContries = await Xref_visa_country.findAll({
            where: {
                country,
                visa_detail: visa_detail_id,
            },

            attributes: ['allowed_country'],
        });

        let visa_detail = await Visa_country_detail.findOne({
            where: {
                id: visa_detail_id,
            },
            attributes: { exclude: ['id', 'created_at', 'updated_at'] },
            raw: true,
        });

        if (visa_detail) {
            let newVisaDetail = await Visa_country_detail.create(visa_detail);
            if (newVisaDetail && newVisaDetail?.id && allowedContries) {
                const visaCountry = allowedContries.map((item) => {
                    return { allowed_country: item.allowed_country, visa_detail: newVisaDetail?.id, country: country };
                });
                await Xref_visa_country.bulkCreate(visaCountry);
            }
        }

        return NextResponse.json({ success: 'Visa data is cloned successfully' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
