import FaqsPage from './faqsPage';
import { getMetadata, getSchemaJsonLd } from '@/helpers/getCategory';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';

export const revalidate = 60;

export async function generateMetadata() {
    return await getMetadata('faqs');
}

const Faqs = async () => {
    const { schema } = await getSchemaJsonLd('faqs');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <FaqsPage />
            <TawkToScript />
            <Footer />
        </>
    );
};

export default Faqs;
