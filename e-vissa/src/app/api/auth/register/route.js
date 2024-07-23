import bcrypt from 'bcryptjs';
import { sendEmail } from '@/mailer';
import { NextResponse } from 'next/server';
import { randomCode } from '@/utils/constants';
import { subjectEmail_account_activation, bodyEmail_account_activation } from '@/mailer/template/account_activation';
import { subjectEmail_account_invited, bodyEmail_account_invited } from '@/mailer/template/account_invited';
import { isNotGuest, checkUser, isManager, checkInternalUser } from '@/middlewares/authorization';
import { validateParams, removeKeysInObject, isEmptyObject } from '@/utils/validation';
import { Op } from 'sequelize';
import { addLog } from '@/utils/log';
import { permissionsOfRole } from '@/dbx/e-vissa/models/data/role_data';
const { SequelizeValidationError } = require('@/dbx/validators');
let { User } = require('@/dbx/e-vissa/models');
import Internal_users from '@/dbx/internal_users/internal_users';

// Create a new user
export const POST = async (request) => {
    const userData = await request.json();
    const hashedPassword = await bcrypt.hash(userData.password, 5);
    userData.password = hashedPassword;
    userData.activation = randomCode;
    if (userData.websites && !isEmptyObject(userData.websites)) {
        userData.websites = JSON.stringify(userData.websites);
    }

    let UserModel = User;
    const { internal } = validateParams(request, ['internal']);
    if (internal == 1) {
        UserModel = Internal_users;
    }

    let newUser;
    const logData = { desc: userData };
    try {
        // Register with the invitation
        if (userData.invitation) {
            // Invitation must not be used
            const invitee = await UserModel.findOne({
                attributes: ['id'],
                where: {
                    invitation: userData.invitation,
                },
            });

            if (invitee !== null) {
                return NextResponse.json({ error: 'Oops, Your invitation is expired' }, { status: 400 });
            }

            // Check invitation
            const inviter = await UserModel.findOne({
                where: {
                    invitation: {
                        [Op.regexp]: `.*"${userData.invitation}".*`,
                    },
                },
            });

            if (inviter === null) {
                return NextResponse.json({ error: 'Inviter not found' }, { status: 404 });
            }

            // Admin || Manger can invite user with role
            if (userData.role) {
                if (!isManager(inviter)) {
                    return NextResponse.json({ error: 'Manager not found' }, { status: 404 });
                }

                // Only Admin is allowed to set any roles
                if (inviter.role !== 'administrator' && inviter.role !== userData.role) {
                    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
                }

                userData.permissions = permissionsOfRole(userData.role);
                newUser = await UserModel.create(userData);

                await sendEmail(
                    inviter?.email,
                    subjectEmail_account_invited(userData?.email, userData.role),
                    bodyEmail_account_invited(userData?.email, userData.role),
                );
            } else {
                // TODO: Guest invites friend...
            }
        } else {
            const userFromToken = await isNotGuest();
            const keysToDelete = ['key_reset_password', 'invitation'];

            // Admin/ Manager create his member
            if (isManager(userFromToken)) {
                if (userData.role) {
                    userData.permissions = permissionsOfRole(userData.role);
                }
            } else {
                // is Guest
                keysToDelete.push(['permissions', 'role']);
            }

            // Remove input fields
            const newUserData = removeKeysInObject(userData, keysToDelete);

            // Create new user
            newUser = await UserModel.create(newUserData);
        }

        // Send activation code to new user
        await sendEmailConfirmation(userData);
        await addLog(logData);

        return NextResponse.json(
            { success: 'User has been created' },
            {
                status: 201,
            },
        );
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};

// Send activation again
export const PUT = async (request) => {
    const { email } = await request.json();

    try {
        let user = await checkUser({ email });

        const { internal } = validateParams(request, ['internal']);
        if (internal == 1) {
            user = await checkInternalUser({ email });
        }

        if (!user?.activation) {
            return NextResponse.json({ success: 'Your account has been activated already' });
        }

        if (user) {
            await sendEmailConfirmation(user);
            return NextResponse.json({ success: 'Email was sent successfully' });
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

async function sendEmailConfirmation(user) {
    await sendEmail(
        user?.email,
        subjectEmail_account_activation(user?.first_name),
        bodyEmail_account_activation(
            `${process.env.NEXT_PUBLIC_SITE_URL}/register/confirm?email=${user?.email}&activation=${user?.activation}`,
        ),
    );
}

// Activate the user
export const GET = async (request) => {
    try {
        const { email, activation } = validateParams(request, ['email', 'activation']);

        if (!email || !activation) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        let user = await checkUser({ email });
        let UserModel = User;
        const { internal } = validateParams(request, ['internal']);
        if (internal == 1) {
            user = await checkInternalUser({ email });
            UserModel = Internal_users;
        }

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        if (!user?.activation) {
            return NextResponse.json({ success: 'Your account has been activated already' });
        }

        if (user.activation !== activation) {
            return NextResponse.json({ error: 'Invalid activation link' }, { status: 404 });
        }

        const [isUpdated] = await UserModel.update({ activation: '' }, { where: { email } });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Account not found or not activated.' }, { status: 422 });
        }

        return NextResponse.json({ success: 'Your account is activated successfully' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
