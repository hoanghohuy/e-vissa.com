import { NextResponse } from 'next/server';
import { isAllowed } from '@/middlewares/authorization';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Comment, User } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const user = await isAllowed([]);
    if (!user) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    const { id } = params;
    const dataUpdate = await request.json();
    try {
        const [isUpdated] = await Comment.update(dataUpdate, {
            where: {
                id,
                created_by: user.id,
            },
        });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Comment not found or not updated.' }, { status: 422 });
        }

        return NextResponse.json({ success: 'The Comment has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};

// Get comments by post's id
export const GET = async (request, { params }) => {
    const { id } = params;
    try {
        const result = await Comment.findAll({
            where: {
                post_id: id,
            },
            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name', 'image'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
        return NextResponse.json(result);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
