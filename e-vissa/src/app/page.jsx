import { getMetadata, getSchemaJsonLd } from '@/helpers/getCategory';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import PopularDestinationPage from '@/components/Page/IndexPage/PopularDestination/popularDestination';
import WhyChooseUsPage from '@/components/Page/IndexPage/WhyChooseUs/whyChooseUs';
import HowItWorkPage from '@/components/Page/IndexPage/HowItWork/howItWork';
import ReviewsAndRatingsPage from '@/components/Page/IndexPage/ReviewsAndRatings/reviewsAndRatings';
import EvisaNewsPage from '@/components/Page/IndexPage/EvisaNews/evisaNews';
import ApplyComponent from '@/components/Page/IndexPage/Apply/applyComponent';
import Hotjar from '@hotjar/browser';
Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID, process.env.NEXT_PUBLIC_HOTJAR_VERSION);

export const revalidate = 0;

export const viewport = {
    themeColor: '#3772ff',
};

export async function generateMetadata() {
    return await getMetadata('/');
}

export default async function Home() {
    const { schema } = await getSchemaJsonLd('/');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <main>
                <ApplyComponent />
                <PopularDestinationPage />
                <WhyChooseUsPage />
                <ReviewsAndRatingsPage />
                <HowItWorkPage />
                <EvisaNewsPage />
            </main>
            <TawkToScript />
            <Footer />
        </>
    );
}
