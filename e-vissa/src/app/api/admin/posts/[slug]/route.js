import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Post } = require('@/dbx/e-vissa/models');

export const PUT = async (request, { params }) => {
    const { slug } = params;
    const id = Number(slug);
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
    const postData = await request.json();
    postData.updated_by = headers().get('tokenUserId');
    const logData = { desc: postData };
    try {
        const [isUpdated] = await Post.update(postData, {
            where: {
                id,
            },
        });

        if (isUpdated === 0) {
            return NextResponse.json({ error: 'Order not found or not updated.' }, { status: 422 });
        }

        await addLog(logData);
        return NextResponse.json({ success: 'Post has been updated' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};

export const GET = async (request, { params }) => {
    const { slug } = params;
    try {
        const result = await Post.findOne({
            where: {
                slug,
            },
        });

        if (result === null) {
            return NextResponse.json({ success: 'Slug is available' });
        }

        return NextResponse.json({ error: 'Slug is existed' }, { status: 201 });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
