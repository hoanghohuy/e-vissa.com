import { NextResponse } from 'next/server';
import { isEmptyObject } from '@/utils/validation';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Xref_post_category } = require('@/dbx/e-vissa/models');

// Update category for a post
export const PUT = async (request) => {
    const { post_id, cat_ids } = await request.json();

    try {
        // Remove old category
        await Xref_post_category.destroy({
            where: {
                post_id,
            },
        });

        // Add new category
        if (!isEmptyObject(cat_ids) && post_id) {
            const xrefPostCategoryData = cat_ids.map((category_id) => ({
                post_id,
                category_id,
            }));
            await Xref_post_category.bulkCreate(xrefPostCategoryData);
        }

        return NextResponse.json({ success: 'Post has been changed category' });
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
