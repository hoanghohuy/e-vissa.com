import BlogPage from './BlogPage';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import TawkToScript from '@/components/tawkTo/tawkToScript';

export const metadata = {
    title: 'Recent posts about e-visa | E-vissa',
    // description: 'Recent posts about e-visa | E-vissa',
    keywords: 'evisa, e-visa new, post evisa, evisa post',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/posts`,
    },
    openGraph: {
        title: 'Recent posts about e-visa | E-vissa',
        url: `https://e-vissa.com/posts/`,
        type: 'website',
        // description: `Recent posts about e-visa | E-vissa`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
    twitter: {
        title: 'Recent posts about e-visa | E-vissa',
        // description: 'Recent posts about e-visa | E-vissa',
        card: 'summary',
        url: `/post`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
};

const Page = () => {
    return (
        <>
            <Header />
            <BlogPage />
            <TawkToScript />
            <Footer />
        </>
    );
};

export default Page;
