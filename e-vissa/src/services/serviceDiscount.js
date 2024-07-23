import { Op } from 'sequelize';
const { sequelize, Coupon } = require('@/dbx/e-vissa/models');

export async function checkCoupon(code, order_price = 0) {
    try {
        const couponData = await Coupon.findOne({
            where: {
                code,
                published: 1,
                date_start: {
                    [Op.lte]: new Date(), // Less than or equal to current date
                },
                date_end: {
                    [Op.gt]: new Date(), // Greater than current date
                },
                usage_count: {
                    // Less than max_usage_limit
                    [Op.lt]: sequelize.col('max_usage_limit'),
                },
                minimum_purchase_amount: { [Op.lte]: order_price },
            },
            // attributes: ['price', 'percent'],
            raw: true,
        });

        return couponData;
    } catch (error) {
        console.error('error to save logs: ' + error.message);
        return {};
    }
}

// Use for checking coupon in order
export async function checkOldCoupon(code, order_price = 0) {
    try {
        const minimum_purchase_amount = await Coupon.findOne({
            where: {
                code,
                // published: 1,
            },
            attributes: ['usage_count', 'minimum_purchase_amount'],
            raw: true,
        });

        if (minimum_purchase_amount > order_price) {
            return { usage_count, result: false };
        }

        return { result: true };
    } catch (error) {
        console.error('error to save logs: ' + error.message);
        return {};
    }
}
