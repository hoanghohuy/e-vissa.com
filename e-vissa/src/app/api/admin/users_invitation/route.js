import { randomCode, siteURL } from '@/utils/constants';
import { NextResponse } from 'next/server';
import { isAllowed, isAdmin, isNotGuest, checkUser, isManager } from '@/middlewares/authorization';
import { sendEmail } from '@/mailer';
import { subjectEmail_account_invitation, bodyEmail_account_invitation } from '@/mailer/template/account_invitation';
const { SequelizeValidationError } = require('@/dbx/validators');
let { User } = require('@/dbx/e-vissa/models');
import Internal_users from '@/dbx/internal_users/internal_users';
import { validateParams } from '@/utils/validation';

// Get Inviation link
export const GET = async (request) => {
    const user = await isNotGuest();
    if (!isManager(user)) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
    const { internal, role, websites } = validateParams(request, ['internal', 'role', 'websites']);

    let UserModel = User;
    let userId = user.id;

    if (internal == 1) {
        UserModel = Internal_users;
        userId = user.internal_id;
    }

    const invitationRole = user.role === 'administrator' && role ? role : user.role;
    const { invitationJson, invitationLink } = generateInvitation(user, invitationRole, websites);

    try {
        const [isUpdated] = await UserModel.update(
            { invitation: invitationJson },
            {
                where: {
                    id: userId,
                },
            },
        );
        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Faild to generate invitation.' }, { status: 422 });
        }

        return NextResponse.json({
            result: invitationLink,
        });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

// Invite via email
export const POST = async (request) => {
    try {
        const user = await isNotGuest();
        if (!isManager(user)) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }
        let UserModel = User;
        let userId = user.id;

        const { internal } = validateParams(request, ['internal']);
        if (internal == 1) {
            UserModel = Internal_users;
            userId = user.internal_id;
        }

        const { email, role, websites } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Bad request' }, { status: 400 });
        }

        const invitationRole = user.role === 'administrator' && role ? role : user.role;
        const is_registerd = await UserModel.findOne({ where: { email } });

        if (is_registerd !== null) {
            return NextResponse.json(
                {
                    error: 'Email has already been registered',
                },
                { status: 400 },
            );
        }

        const { invitationJson, invitationLink } = generateInvitation(user, invitationRole, websites);

        await UserModel.update(
            { invitation: invitationJson },
            {
                where: {
                    id: userId,
                },
            },
        );

        await sendEmail(
            email,
            subjectEmail_account_invitation(email, invitationRole),
            bodyEmail_account_invitation(invitationLink, invitationRole),
        );

        return NextResponse.json({
            result: invitationLink,
        });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

function generateInvitation(user, invitationRole, websites) {
    const invitaionCode = randomCode + '_' + Math.floor(Date.now() / 1000);

    const decodedInvitation = user.invitation ? JSON.parse(user.invitation) : [];
    decodedInvitation.push(invitaionCode);
    let internal = '';
    if (websites) {
        internal = '&internal=1';
    }
    return {
        invitationJson: JSON.stringify(decodedInvitation),
        invitaionCode,
        invitationLink:
            process.env.NEXT_PUBLIC_SITE_URL +
            `/register?invitation=${invitaionCode}&role=${invitationRole}&websites=${websites}${internal}`,
    };
}
