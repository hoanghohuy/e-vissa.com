import { getMetadata, getDetailPost, getJsonLd } from '@/helpers/getPost';
import PostDetail from './PostDetail';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
    return await getMetadata(params.slug);
}

const PageDetail = async ({ params, searchParams }) => {
    const listSlug = params.slug;
    const detail = await getDetailPost(listSlug, {});

    if (detail === null) {
        redirect('/');
    }
    const jsonLd = getJsonLd(detail, listSlug);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <PostDetail detail={detail} />
        </>
    );
};

export default PageDetail;
