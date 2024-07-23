import VisaApplycationPage from './visaApplicationPage';
import { getMetadata } from '@/helpers/getCategory';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import { getSchemaJsonLd } from '@/helpers/getCategory';

export const revalidate = 60;

export async function generateMetadata() {
    return await getMetadata('visa-applications');
}

export default async function page() {
    const { schema } = await getSchemaJsonLd('visa-applications');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <VisaApplycationPage />
            <TawkToScript />
            <Footer />
        </>
    );
}
