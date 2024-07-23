import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { addLog } from '@/utils/log';
import { paginationInfo } from '@/utils/pagination';
import { validateParams, isEmptyObject } from '@/utils/validation';
import { Op } from 'sequelize';
const { SequelizeValidationError } = require('@/dbx/validators');
const { Category, Xref_post_category, Post, User, sequelize } = require('@/dbx/e-vissa/models');

export const GET = async (request) => {
    const { published, keyword, condition } = validateParams(request, ['published', 'keyword']);

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
    let attributes = [
        'id',
        'title',
        'slug',
        'keyword',
        'meta_desc',
        'image',
        'created_at',
        'updated_at',
        'published',
        'content',
        'faq',
    ];

    // This association is used in admin
    let include = [
        {
            model: User,
            as: 'created_by_info',
            attributes: ['first_name', 'last_name'],
        },
        {
            model: User,
            as: 'updated_by_info',
            attributes: ['first_name', 'last_name'],
        },
        {
            model: Category,
            as: 'category_info',
            through: { attributes: [] },
        },
    ];

    try {
        const result = await Post.findAll({
            attributes,
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
            where: condition,
            include,
            order: [['updated_at', 'DESC']],
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

export const POST = async (request) => {
    const { cat_ids, ...postData } = await request.json();
    postData.created_by = headers().get('tokenUserId');

    const logData = { desc: { cat_ids, ...postData } };
    const t = await sequelize.transaction();
    try {
        const newPost = await Post.create(postData, { transaction: t });

        if (!isEmptyObject(cat_ids) && newPost?.id) {
            const xrefPostCategoryData = cat_ids.map((category_id) => ({
                post_id: newPost.id,
                category_id,
            }));
            await Xref_post_category.bulkCreate(xrefPostCategoryData, { transaction: t });
        }

        await addLog(logData);
        await t.commit();
        return NextResponse.json({ success: 'Post has been created' }, { status: 201 });
    } catch (error) {
        await t.rollback();
        const { message, status } = SequelizeValidationError(error);
        await addLog({ desc: { ...logData, SequelizeError: message, errorMsg: error.message } }, 'error');
        return NextResponse.json(message, status);
    }
};
