import { NextResponse } from 'next/server';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Category, Post, User } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    let attributes = ['id', 'title', 'slug', 'keyword', 'views', 'created_by', 'created_at', 'updated_at', 'published'];
    let include = [
        {
            model: User,
            as: 'created_by_info',
            attributes: ['first_name', 'last_name'],
        },
        {
            model: Category,
            as: 'category_info',
            attributes: ['name', 'slug'],
            through: { attributes: [] },
        },
    ];

    try {
        const result = await Post.findAll({
            attributes,
            include,
        });

        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
