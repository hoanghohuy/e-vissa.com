import { NextResponse } from 'next/server';
import { checkUser, checkInternalUser } from '@/middlewares/authorization';
import { sendEmail } from '@/mailer';
import { subjectEmail_account_reset_pass, bodyEmail_account_reset_pass } from '@/mailer/template/account_reset_pass';
import bcrypt from 'bcryptjs';
import Internal_users from '@/dbx/internal_users/internal_users';
import { firebaseMessaging } from '@/libs/FCM';
import { generateRandomNumber } from '@/utils/constants';
const ramdomNumber = generateRandomNumber(6, 6);
const { SequelizeValidationError } = require('@/dbx/validators');
let { User } = require('@/dbx/e-vissa/models');

// Forgot | Reset password
export const PUT = async (request) => {
    const { email, key_reset_password, device_id, old_password, password, password1 } = await request.json();

    try {
        let user = await checkUser({ email });
        let UserModel = User;

        if (!user) {
            UserModel = Internal_users;
            user = await checkInternalUser({ email });
        }

        if (user) {
            // Send key code
            if (!key_reset_password && !old_password) {
                // Use firebaseMessaging
                if (device_id) {
                    const device_info = JSON.parse(user.device_info);
                    if (device_id === 'check') {
                        if (device_info) {
                            return NextResponse.json({ success: device_info });
                        }
                        return NextResponse.json({ error: 'Device not found' }, { status: 404 });
                    }

                    if (!device_info || device_info?.device_id !== device_id) {
                        return NextResponse.json({ error: 'Device not found' }, { status: 404 });
                    }

                    await UserModel.update(
                        { key_reset_password: ramdomNumber },
                        {
                            where: {
                                email,
                            },
                        },
                    );
                    const messageFirebase = await firebaseMessaging(device_info, 2.1, { code: ramdomNumber });
                    if (messageFirebase === false) {
                        return NextResponse.json({ error: 'Oops, something went wrong' }, { status: 500 });
                    }
                    return NextResponse.json(messageFirebase);
                } else {
                    // Send via mail
                    await UserModel.update(
                        { key_reset_password: ramdomNumber },
                        {
                            where: {
                                email,
                            },
                        },
                    );
                    await sendEmail(
                        email,
                        subjectEmail_account_reset_pass(user?.first_name || email),
                        bodyEmail_account_reset_pass(
                            `${process.env.NEXT_PUBLIC_SITE_URL}/forgot-password/reset?email=${email}&key_reset_password=${ramdomNumber}`,
                            ramdomNumber,
                        ),
                    );

                    return NextResponse.json({ success: 'Email was sent successfully' });
                }
            }

            if ((key_reset_password || old_password) && password && password1 && password === password1) {
                // Check old password
                if (old_password && !(await bcrypt.compare(old_password, user.password))) {
                    return NextResponse.json({ error: 'Old password is not correct' }, { status: 400 });
                }

                // Check code
                if (key_reset_password && key_reset_password !== user.key_reset_password) {
                    return NextResponse.json({ error: 'Wrong code to reset password' }, { status: 400 });
                }

                await UserModel.update(
                    { key_reset_password: null, password: await bcrypt.hash(password, 5) },
                    {
                        where: {
                            email,
                        },
                    },
                );
                return NextResponse.json({ success: 'Password has been updated successfully' });
            }
        }
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
