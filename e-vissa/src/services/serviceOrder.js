'use server';
import { addLog } from '@/utils/log';
import { sendEmail } from '@/mailer';
import { hostWebEmail } from '@/utils/constants';
import { subjectEmail_booking_order, bodyEmail_booking_order } from '@/mailer/template/booking_order';
import { validateCaptcha } from '@/libs/reCaptcha';
import { addOrderRealtime } from '@/libs/firebase';
import { devMail } from 'settings';

const { Visa_country_detail, Xref_visa_country, Order, User, Visa, sequelize } = require('@/dbx/e-vissa/models');

export async function getOrder(condition = {}, raw = false) {
    const orderData = await Order.findOne({
        where: condition,
        attributes: { exclude: ['created_by', 'updated_by', 'updated_at', 'created_at'] },
        include: [
            {
                model: User,
                as: 'created_by_info',
                attributes: ['first_name', 'last_name', 'phone_number', 'email', 'address'],
            },
            {
                model: Xref_visa_country,
                as: 'xref_visa_country_info',
                attributes: { exclude: ['id', 'visa_detail', 'created_at', 'updated_at'] },
                include: [
                    {
                        model: Visa_country_detail,
                        as: 'visa_detail_info',
                        attributes: [
                            'validity',
                            'validity_type',
                            'government_fee',
                            'government_fee_currency',
                            'length_of_stay',
                            'length_of_stay_type',
                            'entry_type',
                        ],
                        include: [
                            {
                                model: Visa,
                                as: 'visa_info',
                                attributes: {
                                    exclude: ['id', 'created_at', 'updated_at', 'created_by', 'updated_by'],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
        raw,
    });

    return orderData;
}

async function getServiceVisa(condition = {}, visaServiceId = null) {
    const visaData = await Xref_visa_country.findOne({
        where: condition,
        attributes: [],
        include: [
            {
                model: Visa_country_detail,
                as: 'visa_detail_info',
                attributes: ['services', 'government_fee'],
            },
        ],
        raw: true,
        nest: true,
    });

    // When Sale not fill service
    if (!visaData?.visa_detail_info || !visaData?.visa_detail_info?.services) {
        return null;
    }

    const visaServices = JSON.parse(visaData.visa_detail_info.services);
    const visaFeeItem =
        visaServiceId !== null
            ? visaServices.find((item) => item.id === visaServiceId)
            : visaServices.find((item) => item.published === -1);

    const visaFee = visaFeeItem?.fee ?? 0;
    const governmentFee = visaData?.visa_detail_info?.government_fee ?? 0;
    return { visaFee, governmentFee };
}

export async function calculatePriceOnPerson(orderData) {
    // Number of people go with
    let numberPeople = 0;
    if (orderData?.another_people) {
        const another_people = JSON.parse(orderData.another_people).length;
        numberPeople += another_people;
    }
    const serviceVisa = await getServiceVisa({ id: orderData.xref_visa_country });
    if (serviceVisa === null) {
        return null;
    }

    // Calculate the price of the visa
    const visaStandardFee = parseFloat(serviceVisa['visaFee']);
    const visaGovernmentFee = parseFloat(serviceVisa['governmentFee']);
    const totalPriceVisa = (visaStandardFee + visaGovernmentFee) * numberPeople;
    const original_price = totalPriceVisa; // NOTICE THIS

    return { original_price, totalPriceVisa, numberPeople, visaGovernmentFee, visaStandardFee };
}

export async function calculatePriceVisaService(orderData, visaServiceId) {
    const result = await getServiceVisa({ id: orderData.xref_visa_country }, visaServiceId);
    return { visaPlusFee: parseInt(result.visaFee) };
}

function filterOrderData(orderData) {
    // Filter post data
    const filterKeys = [
        'id',
        'device_id',
        'xref_visa_country',
        'arrival_date',
        'departure_date',
        'travel_by',
        'arrival_port',
        'country_of_residence',
        'nationality',
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'email',
        'another_people',
        'currency',
        'customer_note',
        'passport_number',
    ];

    // Filter object keys based on filterKeys array
    const filteredData = Object.fromEntries(Object.entries(orderData).filter(([key]) => filterKeys.includes(key)));
    return filteredData;
}

export async function createOrder(rawOrderData) {
    const { gRecaptchaToken, ...data } = rawOrderData;
    const captchaResult = await validateCaptcha(gRecaptchaToken);
    if (captchaResult === false) {
        return null;
    }
    const logData = { desc: data };
    const t = await sequelize.transaction();
    try {
        const orderData = filterOrderData(data);
        let { id } = orderData;
        const isNewOder = id ? false : true;

        const detailPrice = await calculatePriceOnPerson(orderData);
        orderData.original_price = detailPrice?.original_price;
        orderData.total_price = detailPrice?.original_price;
        orderData.detail_price = detailPrice ?? JSON.stringify(detailPrice);

        if (isNewOder === true) {
            const newOrder = await Order.create(orderData, { transaction: t });
            id = newOrder.id;
            // Write to Firebase Realtime Database to Notify
            await addOrderRealtime(newOrder);
        } else {
            // Back to step 1-2 then update
            const [isUpdated] = await Order.update(orderData, {
                where: {
                    id,
                },
                transaction: t,
            });
            if (isUpdated === 0) {
                await t.rollback();
                throw new Error('Order not found or not updated.');
            }
        }

        await t.commit();
        await addLog(logData);
        await sendOrderMail(await getOrder({ id }));
        return { id };
    } catch (error) {
        await sendEmail(
            devMail,
            `${process.env.NEXT_PUBLIC_SITE_NAME}: Create order error`,
            JSON.stringify({
                desc: { ...logData, errorMsg: error.message },
            }),
        );
        await addLog({ desc: { ...logData, errorMsg: error.message } }, 'error');
        await t.rollback();
    }
}

export async function updateOrderPayment({ id, status, payment_method, transaction }) {
    // Update order status
    const [isUpdated] = await Order.update(
        { status, payment_method, transaction },
        {
            where: {
                id,
            },
        },
    );

    if (isUpdated === 1) {
        const currentOrder = await Order.findOne({
            where: { id },
            raw: true,
        });
        await sendOrderMail(currentOrder);
    }
}

async function sendOrderMail(order) {
    await sendEmail(order?.email, subjectEmail_booking_order(order.id), bodyEmail_booking_order(order), hostWebEmail);
}
