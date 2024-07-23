import Image from 'next/image';
import Link from 'next/link';
import gif404 from '/public/404.gif';
import stylesSystem from './page.module.css';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';

export const metadata = {
    title: {
        default: 'Page not found | Evissa',
    },
    openGraph: {
        title: 'Page not found | Evissa',
        type: 'website',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
    },
    twitter: {
        title: 'Page not found | Evissa',
        card: 'summary',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
};

export default function NotFound() {
    return (
        <>
            <Header />
            <main className={stylesSystem.notfound__container}>
                <Image src={gif404} />
                <Link href="/">
                    <button className={stylesSystem.notfount__button}>Return home</button>
                </Link>
            </main>
            <Footer />
        </>
    );
}
