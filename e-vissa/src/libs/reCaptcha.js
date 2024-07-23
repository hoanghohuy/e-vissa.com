import APIClient from '@/libs/APIClient';

export async function validateCaptcha(gRecaptchaToken, returnResult = false) {
    if (!gRecaptchaToken) return false;
    const api = new APIClient('https://www.google.com');
    const secretKey = process.env.RECAPTCHA_V3_SECRET_KEY;

    try {
        const result = await api.postUrlencoded('recaptcha/api/siteverify', {
            secret: secretKey,
            response: gRecaptchaToken,
        });
        const { success, score } = result;
        return returnResult === true ? result : success && score > 0.5;
    } catch (error) {
        return false;
    }
}
