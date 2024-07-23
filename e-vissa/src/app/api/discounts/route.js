import { NextResponse } from 'next/server';
import { isAllowed } from '@/middlewares/authorization';
import { Op } from 'sequelize';
const { SequelizeValidationError } = require('@/dbx/validators');
const { sequelize, Coupon } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    try {
        const user = await isAllowed([]);
        if (!user) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }
        const coupons = await Coupon.findAll({
            where: {
                published: 1,
                date_start: {
                    [Op.lte]: new Date(), // Less than or equal to current date
                },
                date_end: {
                    [Op.gt]: new Date(), // Greater than current date
                },
                usage_count: {
                    // Less than to max_usage_limit
                    [Op.lt]: sequelize.col('max_usage_limit'),
                },
            },
        });

        return NextResponse.json({
            coupons,
        });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
