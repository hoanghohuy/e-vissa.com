import { NextResponse } from 'next/server';
import { isAllowed } from '@/middlewares/authorization';
import { addLog } from '@/utils/log';
import { removeKeysInObject } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');
let { User, Country } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { id } = params;
    const userData = await request.json();
    const user = await isAllowed();

    const logData = { desc: userData };
    try {
        if (!user || user.id != id) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }

        // No change |-.-| change password in different API
        const keysToDelete = [
            'email',
            'password',
            'key_reset_password',
            'activation',
            'invitation',
            'permissions',
            'role',
        ];
        const newUserData = removeKeysInObject(userData, keysToDelete);

        const [isUpdated] = await User.update(newUserData, {
            where: {
                id,
            },
        });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'User not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'Data has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};

export const GET = async (request, { params }) => {
    const user = await isAllowed([]);
    const { id } = params;

    if (!user || !id) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    try {
        const user = await User.findOne({
            where: {
                id,
            },

            attributes: {
                exclude: [
                    'role',
                    'permissions',
                    'invitation, activation',
                    'key_reset_password',
                    'password',
                    'updated_at',
                    'invitation',
                    'created_by',
                    'updated_by',
                    'is_manager',
                    'published',
                ],
            },
            include: [
                {
                    model: Country,
                    as: 'country_of_residence_info',
                    attributes: ['name'],
                },
                {
                    model: Country,
                    as: 'nationality_info',
                    attributes: ['name'],
                },
            ],
        });

        if (user === null) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
