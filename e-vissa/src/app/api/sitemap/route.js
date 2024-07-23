import { isDevelopmentEnv } from '@/utils/validation';
import { NextResponse } from 'next/server';
const { Category, Post } = require('@/dbx/e-vissa/models');
const URL = process.env.NEXT_PUBLIC_SITE_URL;

export const GET = async (request) => {
    if (isDevelopmentEnv) {
        return NextResponse.json([]);
    }

    try {
        // Handle category
        const defaultCategory = [
            {
                slug: '',
                updated_at: '2024-04-03T03:31:15.000Z',
            },
            {
                slug: 'robots.txt',
                updated_at: '2024-04-03T03:31:15.000Z',
            },
        ];

        const categoryData = await Category.findAll({
            attributes: ['slug', 'updated_at'],
            where: { term: 'category' },
        });

        const categories = [...defaultCategory, ...categoryData].map((item) => ({
            url: `${URL}/${item.slug}`,
            lastModified: item.updated_at,
        }));

        // Handle posts
        const postData = await Post.findAll({
            attributes: ['slug', 'updated_at'],
            include: [
                {
                    model: Category,
                    as: 'category_info',
                    through: { attributes: [] },
                    attributes: ['slug'],
                },
            ],
        });
        const posts = postData.map((item) => ({
            url:
                item.category_info && item.category_info.length > 0
                    ? `${URL}/${item.category_info[0]?.slug}/${item.slug}`
                    : `${URL}/${item.slug}`,
            lastModified: item.updated_at,
        }));

        return NextResponse.json([...categories, ...posts]);
    } catch (error) {
        return NextResponse.json([]);
    }
};
