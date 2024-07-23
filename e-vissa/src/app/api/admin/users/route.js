import { NextResponse } from 'next/server';
import { isNotGuest } from '@/middlewares/authorization';
import { paginationInfo } from '@/utils/pagination';
import { validateParams } from '@/utils/validation';
import { Op } from 'sequelize';
import Internal_users from '@/dbx/internal_users/internal_users';
const { SequelizeValidationError } = require('@/dbx/validators');
let { User, Country } = require('@/dbx/e-vissa/models');

// Get users in admin page
export const GET = async (request) => {
    const user = await isNotGuest();
    if (!user) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
    let UserModel = User;
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

    const { internal } = validateParams(request, ['internal']);
    if (internal == 1) {
        UserModel = Internal_users;
        includeCountry = [];
    }

    let condition = {};
    if (user.role !== 'administrator') {
        // Not equal internal users
        condition = {
            role: user.role,
            published: {
                [Op.ne]: 2,
            },
        };
    }

    const pagInfo = await paginationInfo(request, UserModel, condition);
    try {
        const result = await UserModel.findAll({
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
            where: condition,
            attributes: { exclude: ['password', 'updated_at', 'key_reset_password', 'activation'] },
            include: includeCountry,
        });

        return NextResponse.json({
            data: result,
            pagination: pagInfo,
        });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
