import React from 'react';
import AboutPage from './AboutPage';
import { settingsData } from '../../../settings';
import { getMetadata } from '@/helpers/getCategory';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import { getSchemaJsonLd } from '@/helpers/getCategory';

export const revalidate = 60;

export async function generateMetadata() {
    return await getMetadata('about');
}

const About = async () => {
    const { schema } = await getSchemaJsonLd('about');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            <Header />
            <AboutPage />
            <TawkToScript />
            <Footer />
        </>
    );
};

export default About;
