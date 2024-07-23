import { NextResponse } from 'next/server';
import { getPost } from '@/services/servicePost';
import { isEmptyObject, validateParams } from '@/utils/validation';
import { Op } from 'sequelize';
const { SequelizeValidationError } = require('@/dbx/validators');
const { User, Post, Xref_post_category } = require('@/dbx/e-vissa/models');

export const GET = async (request, { params }) => {
    const { slug } = params;
    if (!slug) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
    try {
        const post = await getPost(slug);

        if (isEmptyObject(post)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const { category_id, num_posts } = validateParams(request, ['category_id', 'num_posts']);
        const limit = num_posts ? Math.min(num_posts, 10) : 10;

        // Popular
        const popular_posts = await Post.findAll({
            limit,
            where: { published: 1 },
            attributes: ['title', 'slug', 'image', 'created_at', 'views'],
            order: [['views', 'DESC']],
        });
        post.popular_posts = popular_posts;

        // Related
        if (category_id) {
            const related_posts = await Xref_post_category.findAll({
                raw: true,
                nest: true,
                limit,
                where: { category_id },
                attributes: [],
                include: [
                    {
                        model: Post,
                        as: 'post_info',
                        where: {
                            published: 1,
                            id: {
                                [Op.ne]: post.id,
                            },
                        },
                        attributes: ['id', 'slug', 'image', 'title', 'created_at'],
                        order: [['created_at', 'DESC']],
                        include: [
                            {
                                model: User,
                                as: 'created_by_info',
                                attributes: ['first_name', 'last_name'],
                            },
                        ],
                    },
                ],
            });
            post.related_posts = related_posts;
            return NextResponse.json(post);
        }

        return NextResponse.json(post);
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
