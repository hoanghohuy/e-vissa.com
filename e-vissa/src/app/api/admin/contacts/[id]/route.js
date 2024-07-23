import { NextResponse } from 'next/server';
import { addLog } from '@/utils/log';
import { validateEmail } from '@/utils/validation';
import { sendEmail } from '@/mailer';
import { isNotGuest } from '@/middlewares/authorization';
const { SequelizeValidationError } = require('@/dbx/validators');
const { sequelize, Contact } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { id } = params;
    const { email } = await request.json();
    const user = await isNotGuest();
    const confirmed_email = email || user.email;

    if (!validateEmail(confirmed_email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const logData = { desc: confirmed_email };
    const t = await sequelize.transaction();
    try {
        const contactData = await Contact.findOne({
            where: {
                id,
            },
            transaction: t,
        });
        if (contactData === null) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Update db
        contactData.set('confirmed_email', confirmed_email);
        await contactData.save({ transaction: t });

        // Send Mail
        await sendEmail(confirmed_email, `Evissa, ${contactData.email} need your help`, contactData.message);

        // Write log
        await addLog(logData);

        await t.commit();
        return NextResponse.json({ success: 'The Contact has been updated' });
    } catch (error) {
        await t.rollback();
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};

export const GET = async (request, { params }) => {
    const { id } = params;
    try {
        const result = await Contact.findOne({
            where: {
                id,
            },
        });
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

// // Send mail to Dev
// export const POST = async (request, { params }) => {
//     const { header, body } = await request.json();
//     const { id } = params;

//     if (!header || !body || id !== 'dev') {
//         return NextResponse.json({ error: 'Bad request' }, { status: 400 });
//     }

//     try {
//         const IP = ' IP: ' + headers().get('X-Forwarded-For');
//         await sendEmail(
//             devMail,
//             `[${process.env.NEXTAUTH_URL}], Support technical, ` + header,
//             `Message: ${body}, ${IP}`,
//         );
//         return NextResponse.json({ success: 'Feedback has been sent' });
//     } catch (error) {
//         const { message, status } = SequelizeValidationError(error);
//         return NextResponse.json(message, status);
//     }
// };
