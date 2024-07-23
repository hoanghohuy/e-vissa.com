import ApplyVisa from './applyVisa';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';
import { createOrder } from '@/services/serviceOrder';
import Hotjar from '@hotjar/browser';
Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID, process.env.NEXT_PUBLIC_HOTJAR_VERSION);

export const metadata = {
    title: 'Your information for apply Evisa | E-vissa.com',
    description: 'Your information for apply Evisa | E-vissa.com',
    keywords: 'Your information for apply Evisa | E-vissa.com',
};
export default function Page() {
    return (
        <>
            <Header />
            <ApplyVisa createOrder={createOrder} />
            <TawkToScript />
            <Footer />
        </>
    );
}
