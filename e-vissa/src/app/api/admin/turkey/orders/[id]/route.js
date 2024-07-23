import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { checkOrderId } from '@/utils/validation';
import Order from '@/dbx/turkey-evisagov/Order';
import User from '@/dbx/turkey-evisagov/User';
import Xref_visa_country from '@/dbx/turkey-evisagov/Xref_visa_country';
import Visa_country_detail from '@/dbx/turkey-evisagov/Visa_country_detail';
const { SequelizeValidationError } = require('@/dbx/validators');

export const GET = async (request, { params }) => {
    const { id } = params;

    if (checkOrderId(id === false)) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    try {
        const orderData = await Order.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name', 'phone_number', 'email', 'address'],
                },
                {
                    model: Xref_visa_country,
                    as: 'xref_visa_country_info',
                    attributes: { exclude: ['created_at', 'updated_at'] },
                    include: [
                        {
                            model: Visa_country_detail,
                            as: 'visa_detail_info',
                            attributes: [
                                'validity',
                                'validity_type',
                                'processing_times',
                                'standard_fee',
                                'standard_fee_currency',
                                'government_fee',
                                'government_fee_currency',
                                'length_of_stay',
                                'length_of_stay_type',
                                'is_single',
                            ],
                        },
                    ],
                },
            ],
        });
        return NextResponse.json(orderData);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
export const PUT = async (request, { params }) => {
    const { id } = params;
    const { status, admin_note } = await request.json();

    try {
        const [isUpdated] = await Order.update(
            { status, admin_note },
            {
                where: {
                    id,
                },
            },
        );

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Order not found or not updated.' }, { status: 422 });
        }

        return NextResponse.json({ success: 'The Order has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
