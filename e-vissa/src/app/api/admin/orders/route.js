import { NextResponse } from 'next/server';
import { paginationInfo } from '@/utils/pagination';

const { SequelizeValidationError } = require('@/dbx/validators');
const { Visa_country_detail, Xref_visa_country, Order, User } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const pagInfo = await paginationInfo(request, Order);
    try {
        const result = await Order.findAll({
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name', 'email'],
                },
                {
                    model: User,
                    as: 'updated_by_info',
                    attributes: ['first_name', 'last_name', 'email'],
                },
                {
                    model: Xref_visa_country,
                    as: 'xref_visa_country_info',
                    attributes: { exclude: ['created_at', 'updated_at'] },
                    include: [
                        {
                            model: Visa_country_detail,
                            as: 'visa_detail_info',
                            attributes: ['services', 'government_fee'],
                        },
                    ],
                },
            ],
            order: [['created_at', 'DESC']],
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
