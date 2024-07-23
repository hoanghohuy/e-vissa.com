import { NextResponse } from 'next/server';
import { isEmptyObject } from '@/utils/validation';
import { checkCoupon, checkOldCoupon } from '@/services/serviceDiscount';
import { Op } from 'sequelize';
import { getOrder, createOrder, calculatePriceOnPerson, calculatePriceVisaService } from '@/services/serviceOrder';
const { SequelizeValidationError } = require('@/dbx/validators');
const { sequelize, Order, Service, Coupon } = require('@/dbx/e-vissa/models');

export const POST = async (request) => {
    try {
        const rawOrderData = await request.json();
        const result = await createOrder(rawOrderData);
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

// API calculate the price
export const PUT = async (request) => {
    const { order_id, service_ids, visa_service, coupon_code } = await request.json();
    const t = await sequelize.transaction();
    try {
        const condition = { id: order_id };
        const orderData = await getOrder(condition, true);

        if (!orderData) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const { original_price, totalPriceVisa, numberPeople, visaStandardFee, visaGovernmentFee } =
            await calculatePriceOnPerson(orderData);

        // Calculate the service
        let totalPriceService = 0;

        if (visa_service > 1) {
            const { visaPlusFee } = await calculatePriceVisaService(orderData, visa_service);
            totalPriceService += visaPlusFee;
        }

        if (service_ids) {
            const serviceData = await Service.findAll({
                where: {
                    id: {
                        [Op.in]: service_ids,
                    },
                    published: 1,
                },
                attributes: ['value', 'value_on'],
                raw: true,
            });

            if (!serviceData) {
                return NextResponse.json({ error: 'Service not found' }, { status: 404 });
            }
            for (const item of serviceData) {
                if (item.value_on === 'people') {
                    totalPriceService += item.value;
                } else if (item.value_on === 'person') {
                    totalPriceService += item.value * numberPeople;
                }
            }

            // Save services to order
            await Order.update(
                { service_ids: JSON.stringify(service_ids) },
                {
                    where: { id: order_id },
                    transaction: t,
                },
            );
        }

        // Calculate the coupon
        let totalPriceCoupon = 0;
        const orderCoupon = orderData?.coupon;

        // Check old coupon in order
        if (orderCoupon) {
            const { usage_count, result } = await checkOldCoupon(orderCoupon, original_price);
            if (result === false) {
                // Revert number of using coupon
                await Coupon.update(
                    { usage_count: usage_count - 1 },
                    {
                        where: { code: orderCoupon },
                        transaction: t,
                    },
                );
            }
        }

        // Check new coupon
        if (coupon_code) {
            const couponData = await checkCoupon(coupon_code, original_price);

            if (isEmptyObject(couponData)) {
                return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
            }
            const { price, percent, usage_count } = couponData;
            // Check coupon in order
            let couponFlg = false;
            if (!orderCoupon) {
                couponFlg = true;
            }
            if (orderCoupon) {
                if (orderCoupon !== coupon_code) {
                    couponFlg = true;
                }
            }

            // Update number of using coupon
            if (couponFlg === true) {
                await Coupon.update(
                    { usage_count: usage_count + 1 },
                    {
                        where: { code: coupon_code },
                        transaction: t,
                    },
                );
            }

            totalPriceCoupon = price;
            if (percent !== 0) {
                totalPriceCoupon = (original_price / 100) * percent;
            }
        }

        const totalPrice = Math.max(totalPriceVisa + totalPriceService - totalPriceCoupon, 0);

        const detail_price = {
            numberPeople,
            visaStandardFee,
            visaGovernmentFee,
            totalPriceVisa,
            totalPriceService,
            totalPriceCoupon,
            totalPrice,
        };

        // Update price to order
        await Order.update(
            {
                original_price,
                total_price: totalPrice,
                coupon: coupon_code,
                detail_price: JSON.stringify(detail_price),
            },
            {
                where: { id: order_id },
                transaction: t,
            },
        );

        await t.commit();
        return NextResponse.json(detail_price);
    } catch (error) {
        await t.rollback();
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
