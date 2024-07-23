import ContactPage from './ContactPage';
import { getMetadata } from '@/helpers/getCategory';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import { getSchemaJsonLd } from '@/helpers/getCategory';

export const revalidate = 60;

export async function generateMetadata() {
    return await getMetadata('contact');
}

const Contact = async () => {
    const { schema } = await getSchemaJsonLd('contact');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <ContactPage />
            <TawkToScript />
            <Footer />
        </>
    );
};

export default Contact;
