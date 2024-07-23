import { randomCode, siteURL } from '@/utils/constants';
import { sendEmail } from '@/mailer';
import { NextResponse } from 'next/server';
import { validateEmail, validateParams } from '@/utils/validation';
import { addLog } from '@/utils/log';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Newsletter } = require('@/dbx/e-vissa/models');
import { Template_Newletter, SubjectNewletter } from '@/mailer/template/newletter';

// Sign up to get newsletter
export const POST = async (request) => {
    const { email } = await request.json();
    if (!validateEmail(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const logData = { desc: email };
    try {
        if ((await Newsletter.findOne({ where: { email } })) !== null) {
            return NextResponse.json({ success: `${email} registered already` });
        } else {
            await Newsletter.create({ email, unsub: randomCode });

            const titleEmail = SubjectNewletter(email);
            const bodyEmail = Template_Newletter(email, randomCode);
            await sendEmail(email, titleEmail, bodyEmail);
            await addLog(logData);
        }
        return NextResponse.json({ success: `${email} has been registered successfully` });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};

// Unsubcribe newsletter
export const GET = async (request) => {
    const { email, unsub } = validateParams(request, ['email', 'unsub']);
    if (!email || !unsub) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const logData = { desc: email };
    try {
        const rowsDeleted = await Newsletter.destroy({
            where: { email, unsub },
        });
        if (rowsDeleted > 0) {
            await addLog(logData);
            return NextResponse.json({ success: 'You unregistered successfully' });
        } else {
            return NextResponse.json({ error: 'No matching records found' }, { status: 404 });
        }
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
