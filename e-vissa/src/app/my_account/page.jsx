import React from 'react';
import MyAccountPage from './MyAccountPage';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';

export const metadata = {
    title: 'My account',
};

export default function page() {
    return (
        <>
            <Header />
            <MyAccountPage />
            <Footer />
        </>
    );
}
