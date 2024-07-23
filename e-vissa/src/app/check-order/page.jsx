import React from 'react';
import CheckOrderPage from './checkOrderPage';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import Hotjar from '@hotjar/browser';
Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID, process.env.NEXT_PUBLIC_HOTJAR_VERSION);

export const metadata = {
    title: 'Check order by your order code',
    description: 'About us | Evissa.com',
};

export default function page() {
    return (
        <>
            <Header />
            <CheckOrderPage />
            <TawkToScript />
            <Footer />
        </>
    );
}
