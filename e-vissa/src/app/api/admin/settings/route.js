import { validateEmail } from '@/utils/validation';
import { sendEmail } from '@/mailer';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    const { testingEmail } = await request.json();

    if (!validateEmail(testingEmail)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    try {
        await sendEmail(
            testingEmail,
            `[${process.env.NEXT_PUBLIC_SITE_NAME}] This is tesing email: ${new Date()}`,
            `[${process.env.NEXT_PUBLIC_SITE_NAME}] This is tesing email from ${process.env.NEXT_PUBLIC_SITE_URL}`,
        );
        return NextResponse.json({ success: 'Sent sucessfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error sending mail: ' + error.message }, { status: 500 });
    }
};
