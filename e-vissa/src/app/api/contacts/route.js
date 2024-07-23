import { NextResponse } from 'next/server';
import { validateEmail } from '@/utils/validation';
import { addLog } from '@/utils/log';
import { subjectEmail_customer_contact, bodyEmail_customer_contact } from '@/mailer/template/customer_contact';
import { sendEmail } from '@/mailer';
import { hostWebEmail } from '@/utils/constants';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Contact } = require('@/dbx/e-vissa/models');

export const POST = async (request) => {
    const contactData = await request.json();
    if (!validateEmail(contactData.email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const logData = { desc: contactData };
    try {
        const newContact = await Contact.create(contactData);
        await sendEmail(
            hostWebEmail,
            subjectEmail_customer_contact(contactData.email),
            bodyEmail_customer_contact(contactData.message),
        );

        await addLog(logData);
        return NextResponse.json({ success: 'Contact has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
