import React from 'react';
import ThankyouPage from './thankyouPage';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import Hotjar from '@hotjar/browser';
Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID, process.env.NEXT_PUBLIC_HOTJAR_VERSION);

export const metadata = {
    title: 'Thank you!',
};

export default function page() {
    return (
        <>
            <Header />
            <ThankyouPage />
            <Footer />
        </>
    );
}
