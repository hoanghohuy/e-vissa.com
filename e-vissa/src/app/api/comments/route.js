import { NextResponse } from 'next/server';
import { isAllowed } from '@/middlewares/authorization';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Comment } = require('@/dbx/e-vissa/models');

export const POST = async (request) => {
    const user = await isAllowed([]);
    if (!user) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    const CommentData = await request.json();
    CommentData.created_by = user.id;
    try {
        const newComment = await Comment.create(CommentData);
        return NextResponse.json({ success: 'Comment has been created' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
