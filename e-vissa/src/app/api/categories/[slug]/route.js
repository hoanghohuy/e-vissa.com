import { NextResponse } from 'next/server';
import { getPostsByCategory } from '@/services/serviceCategory';
const { SequelizeValidationError } = require('@/dbx/validators');

// Get post(s) by category's slug
export const GET = async (request, { params }) => {
    const { slug } = params;
    try {
        return NextResponse.json(await getPostsByCategory(slug, request));
    } catch (error) {
        const { message, status } = SequelizeValidationError(error);
        return NextResponse.json(message, status);
    }
};
