import { LayoutEmail } from './_Layout';
import { hostName } from '@/utils/constants';

export const subjectEmail_customer_contact = (customerEmail) => {
    return `[${hostName}] ${customerEmail} need your help`;
};

export const bodyEmail_customer_contact = (contactMsg) => {
    const body = `
        <p>${contactMsg}</p>
    `;
    return LayoutEmail(body);
};
