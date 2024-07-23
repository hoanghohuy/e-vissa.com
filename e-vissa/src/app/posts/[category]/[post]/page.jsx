import { getMetadata, getDetailPost, getJsonLd } from '@/helpers/getPost';
import { getCategoryBySlug } from '@/helpers/getCategory';
import PostDetail from './PostDetail';
import { notFound } from 'next/navigation';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    return await getMetadata(params);
}

const PageDetail = async ({ params }) => {
    const category = await getCategoryBySlug(params.category);
    if (category === null) {
        return notFound();
    }

    const detail = await getDetailPost(params.post);
    if (detail === null) {
        return notFound();
    }
    const jsonLd = getJsonLd(detail, params.category);
    console.log(detail.heading_tags);
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Header />
            <PostDetail detail={detail} params={params} />
            <TawkToScript />
            <Footer />
        </>
    );
};

export default PageDetail;
