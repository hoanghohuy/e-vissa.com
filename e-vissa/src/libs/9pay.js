import { siteName } from '@/utils/constants';
import { isDevelopmentEnv } from '@/utils/validation';
const crypto = require('crypto');
const baseUrl = isDevelopmentEnv ? 'https://sand-payment.9pay.vn' : 'https://payment.9pay.vn';
const MERCHANT_KEY = process.env['9PAY_MERCHANT_KEY'];
const MERCHANT_SECRET_KEY = process.env['9PAY_MERCHANT_SECRET_KEY'];
const KEY_CHECKSUM = process.env['9PAY_KEY_CHECKSUM'];

export async function get9payLink({ id, total_price, currency, customer_note }) {
    const returnUrl = process.env.NEXT_PUBLIC_SITE_URL + '/thankyou';
    const time = Math.round(Date.now() / 1000);

    const parameters = {
        merchantKey: MERCHANT_KEY,
        invoice_no: `${siteName}_${id}`,
        time,
        lang: 'en',
        currency: currency ?? 'USD',
        amount: total_price,
        method: 'CREDIT_CARD',
        description: 'Welcome to E-visa',
        return_url: returnUrl,
    };
    const httpQuery = buildHttpQuery(parameters);
    const message = 'POST' + '\n' + baseUrl + '/payments/create' + '\n' + time + '\n' + httpQuery;
    const signature = buildSignature(message, MERCHANT_SECRET_KEY);
    const baseEncode = Buffer.from(JSON.stringify(parameters)).toString('base64');
    const httpBuild = {
        baseEncode: baseEncode,
        signature: signature,
    };
    const directUrl = baseUrl + '/portal?' + buildHttpQuery(httpBuild);
    return { paymentLink: directUrl };
}

function buildHttpQuery(data) {
    let httpQuery = new URLSearchParams();
    const ordered = Object.keys(data)
        .sort()
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});

    Object.keys(ordered).forEach(function (parameterName) {
        httpQuery.append(parameterName, ordered[parameterName]);
    });
    return httpQuery.toString();
}

function buildSignature(data, secret) {
    const token = crypto.createHmac('sha256', secret).update(data).digest().toString('base64');
    return token;
}

export function processIPN(result, checksum) {
    // Create SHA256 hash using crypto module
    const sha256Data = crypto
        .createHash('sha256')
        .update(result + KEY_CHECKSUM)
        .digest('hex')
        .toUpperCase();

    if (sha256Data === checksum) {
        // Decode base64 result to ASCII
        let buff = Buffer.from(result, 'base64');
        let text = buff.toString('ascii');

        return JSON.parse(text);
    }

    return null;
}
