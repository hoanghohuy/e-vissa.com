const { Category, User, Post } = require('@/dbx/e-vissa/models');
import { paginationInfo } from '@/utils/pagination';
import { validateParams } from '@/utils/validation';

export async function getAllCategorySlugs(condition = {}) {
    try {
        const categories = await Category.findAll({
            raw: true,
            where: { ...condition, published: 1 },
            attributes: ['id', 'name', 'slug', 'term', 'parent_id'],
        });

        // Create a function to build the nested structure
        const buildCategoryTree = (categories, parentId = null) => {
            return categories
                .filter((category) => category.parent_id === parentId)
                .map((category) => ({
                    slug: category.slug,
                    name: category.name,
                    term: category.term,
                    sub_category: buildCategoryTree(categories, category.id),
                }));
        };

        return buildCategoryTree(categories);
    } catch (error) {
        return null;
    }
}

export async function getCategory(slug) {
    try {
        return await Category.findOne({
            where: { slug, published: 1 },
        });
    } catch (error) {
        return null;
    }
}

export async function getSchema(slug) {
    try {
        return await Category.findOne({
            where: { slug, published: 1 },
            attributes: ['schema'],
            raw: true,
        });
    } catch (error) {
        return { schema: '' };
    }
}

export async function getPostsByCategory(slug, request) {
    try {
        const category = await Category.findOne({
            raw: true,
            where: { slug, published: 1 },
            attributes: {
                exclude: ['id', 'created_at', 'updated_at', 'created_by', 'updated_by', 'published'],
            },
        });

        if (category === null) {
            return null;
        }

        const { condition } = validateParams(request);
        condition.published = 1;

        // Paginate posts by Xref category
        const includeCate = {
            model: Category,
            as: 'category_info',
            attributes: [],
            through: { attributes: [] },
            where: { slug },
        };
        const pagInfo = await paginationInfo(request, Post, condition, [includeCate]);

        // Get posts
        const posts = await Post.findAll({
            raw: true,
            nest: true,
            where: condition,
            offset: pagInfo?.offset,
            limit: pagInfo?.limit,
            attributes: {
                exclude: ['id', 'updated_at', 'created_by', 'updated_by', 'content', 'publish_at', 'published'],
            },

            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name'],
                },
                includeCate,
            ],
            order: [['created_at', 'DESC']],
        });

        return {
            category,
            posts,
            pagination: pagInfo,
        };
    } catch (error) {
        return null;
    }
}
