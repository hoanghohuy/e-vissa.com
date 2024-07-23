import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Comment } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { id } = params;
    const dataUpdate = await request.json();
    try {
        const [isUpdated] = await Comment.update(dataUpdate, {
            where: {
                id,
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

export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        const result = await Comment.destroy({
            where: { id },
        });

        return NextResponse.json({ success: 'The Comment has been deleted' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
