import React from 'react';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import { getMetadata, getSchemaJsonLd } from '@/helpers/getCategory';
import TermsAndConditionsPage from './termsAndConditionsPage';

export const revalidate = 60;
const pageSlug = 'terms-and-conditions';
export async function generateMetadata() {
    return await getMetadata(pageSlug);
}

const Page = async () => {
    const { schema } = await getSchemaJsonLd(pageSlug);
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <TermsAndConditionsPage />
            <Footer />
        </>
    );
};

export default Page;
