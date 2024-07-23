import { NextResponse } from 'next/server';
import { isAllowed, isManager } from '@/middlewares/authorization';
import { Op } from 'sequelize';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Post } = require('@/dbx/e-vissa/models');

export const POST = async (request) => {
    const user = await isAllowed(['administrator', 'editor']);

    if (!isManager(user)) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
    const { uploadedImageNames } = await request.json();

    let uselessImages = [];

    // Use Promise.all to handle multiple asynchronous operations
    await Promise.all(
        uploadedImageNames.map(async (imageName) => {
            let result = await Post.findOne({
                where: {
                    [Op.or]: [
                        {
                            content: {
                                [Op.substring]: imageName,
                            },
                        },
                        {
                            image: {
                                [Op.substring]: imageName,
                            },
                        },
                    ],
                },
            });

            // Check if the result is null (not found)
            if (!result) {
                uselessImages.push(imageName);
            }
        }),
    );

    try {
        return NextResponse.json({ uselessImages });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
