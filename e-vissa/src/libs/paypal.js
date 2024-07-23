import APIClient from '@/libs/APIClient';
import { siteName } from '@/utils/constants';
import { isDevelopmentEnv } from '@/utils/validation';
const baseUrl = isDevelopmentEnv ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

async function paypalAccessToken() {
    const auth = `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
    const paypalAPI = new APIClient(baseUrl, { Authorization: `Basic ${Buffer.from(auth).toString('base64')}` });
    const { access_token } = await paypalAPI.postUrlencoded('v1/oauth2/token', {
        grant_type: 'client_credentials',
    });

    return access_token;
}

export async function createPaypalOrder({ id, total_price, currency, customer_note }) {
    const paypalAPI = new APIClient(baseUrl, { Authorization: `Bearer ${await paypalAccessToken()}` });

    let order_data_json = {
        intent: 'capture'.toUpperCase(),
        purchase_units: [
            {
                amount: {
                    currency_code: currency || 'USD',
                    value: total_price,
                },
                description: 'customer_note: ' + customer_note,
                invoice_id: siteName + '_' + id,
            },
        ],
    };

    return await paypalAPI.post('v2/checkout/orders', order_data_json);
}

export async function completePaypalOrder({ paypal_id, intent }) {
    const paypalAPI = new APIClient(baseUrl, { Authorization: `Bearer ${await paypalAccessToken()}` });
    return await paypalAPI.post(`v2/checkout/orders/${paypal_id}/${intent}`);
}
