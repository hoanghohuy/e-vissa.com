import { NextResponse } from 'next/server';
import { isNotGuest, isManager } from '@/middlewares/authorization';
import { addLog } from '@/utils/log';
import { removeKeysInObject, validateParams } from '@/utils/validation';
import { permissionsOfRole } from '@/dbx/e-vissa/models/data/role_data';
const { SequelizeValidationError } = require('@/dbx/validators');
let { User, Country } = require('@/dbx/e-vissa/models');
import Internal_users from '@/dbx/internal_users/internal_users';

export const PUT = async (request, { params }) => {
    const { id } = params;
    const userData = await request.json();
    const user = await isNotGuest();
    if (!user || !id) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    // Model
    let UserModel = User;
    const { internal } = validateParams(request, ['internal']);
    if (internal == 1) {
        UserModel = Internal_users;
        if (userData?.websites) {
            userData.websites = JSON.stringify(userData.websites);
        }
    }

    const logData = { desc: userData };
    try {
        // No change |-.-| change password in different API
        const keysToDelete = [
            'email',
            'password',
            'key_reset_password',
            'activation',
            'invitation',
            'role',
            'permissions',
        ];
        const role = userData?.role;
        const newUserData = removeKeysInObject(userData, keysToDelete);

        // Admin/ Manager update role
        if (isManager(user)) {
            if (role) {
                newUserData.role = role;
                newUserData.permissions = permissionsOfRole(userData.role);
            }
        }

        const [isUpdated] = await UserModel.update(newUserData, {
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
    const { id } = params;

    let includeCountry = [
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
    ];

    let UserModel = User;
    const { internal } = validateParams(request, ['internal']);
    if (internal == 1) {
        UserModel = Internal_users;
        includeCountry = [];
    }

    try {
        const user = await UserModel.findOne({
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
                ],
            },
            include: includeCountry,
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
