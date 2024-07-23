import { NextResponse } from 'next/server';
import { Op } from 'sequelize';
const { Post } = require('@/dbx/e-vissa/models');

export async function GET() {
    try {
        // Publish post
        // const result = await Post.update(
        //     { published: 1 },
        //     {
        //         where: {
        //             publish_at: {
        //                 [Op.lte]: new Date(),
        //             },
        //         },
        //     },
        // );
        return NextResponse.json({ success: 'Good job' });
    } catch (error) {
        console.error('Error running cron every minite:', error.message);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
