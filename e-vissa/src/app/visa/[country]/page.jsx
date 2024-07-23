import VisaPage from './visaPage';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import Hotjar from '@hotjar/browser';
Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID, process.env.NEXT_PUBLIC_HOTJAR_VERSION);

export const generateMetadata = ({ params }) => {
    const countryName = listCountries.find((country) => country.code === params.country)?.name;
    return {
        title: `${countryName.split('-')[0]} Evisa - Chose Evisa type and apply now | Evissa.com`,
        description: `${countryName.split('-')[0]} Evisa - Chose Evisa type and apply now | Evissa.com`,
        keywords: 'evisa, e-visa new, post evisa, evisa post',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/visa/${params.country}`,
        },
        openGraph: {
            title: `${countryName.split('-')[0]} Evisa - Chose Evisa type and apply now | Evissa.com`,
            description: `${countryName.split('-')[0]} Evisa - Chose Evisa type and apply now | Evissa.com`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/visa/${params.country}`,
            type: 'website',
            images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
            site: '@evissa',
            creator: '@evissa',
        },
        twitter: {
            title: `${countryName.split('-')[0]} Evisa - Chose Evisa type and apply now | Evissa.com`,
            description: `${countryName.split('-')[0]} Evisa - Chose Evisa type and apply now | Evissa.com`,
            card: 'summary',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/visa/${params.country}`,
            images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
            site: '@evissa',
            creator: '@evissa',
        },
    };
};

export default function Page() {
    return (
        <>
            <Header />
            <VisaPage />
            <TawkToScript />
            <Footer />
        </>
    );
}
