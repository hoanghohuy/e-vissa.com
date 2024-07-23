import React from 'react';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import { getMetadata, getSchemaJsonLd } from '@/helpers/getCategory';
import PrivacyPolicyPage from './privacyPolicyPage';

export const revalidate = 60;

const pageSlug = 'privacy-policy';
export async function generateMetadata() {
    return await getMetadata(pageSlug);
}

const Page = async () => {
    const { schema } = await getSchemaJsonLd(pageSlug);
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <PrivacyPolicyPage />
            <Footer />
        </>
    );
};

export default Page;
