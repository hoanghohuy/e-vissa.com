import { getCategoryBySlug, getMetadata, getPostsByCategorySlug, getSchemaJsonLd } from '@/helpers/getCategory';
import CategoryPage from './categoryPage';
import { redirect } from 'next/navigation';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';

export const revalidate = 10;

export async function generateMetadata({ params }) {
    return await getMetadata(params.category);
}

const Page = async ({ params }) => {
    const category = await getCategoryBySlug(params.category);

    if (category === null) {
        redirect('/');
    }

    const posts = await getPostsByCategorySlug(params.category);
    const { schema } = await getSchemaJsonLd(params.category);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />

            <Header />
            <CategoryPage listPost={posts} />
            <TawkToScript />
            <Footer />
        </>
    );
};

export default Page;
