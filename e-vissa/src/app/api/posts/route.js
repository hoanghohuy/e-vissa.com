import { NextResponse } from 'next/server';
import { paginationInfo } from '@/utils/pagination';
import { validateParams } from '@/utils/validation';
import { Op } from 'sequelize';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Category, Post, User } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const { keyword, condition } = validateParams(request, ['keyword']);
    if (typeof condition === 'object') {
        condition.published = 1;
    }

    if (keyword) {
        condition[Op.or] = [
            {
                title: {
                    [Op.like]: `%${keyword}%`,
                },
            },
            {
                content: {
                    [Op.like]: `%${keyword}%`,
                },
            },
        ];
        delete condition.keyword;
    }

    const pagInfo = await paginationInfo(request, Post, condition);

    try {
        const result = await Post.findAll({
            attributes: ['title', 'slug', 'image', 'created_at'],
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
            where: condition,
            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name'],
                },
                {
                    model: Category,
                    as: 'category_info',
                    through: { attributes: [] },
                    attributes: ['slug'],
                },
            ],
            order: [['created_at', 'DESC']],
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
