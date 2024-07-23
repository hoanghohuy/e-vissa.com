import RegisterPage from './RegisterPage';

export const metadata = {
    title: {
        default: 'Register account to E-vissa website | E-vissa.com',
    },
    description: 'Register account to E-vissa website',
    keywords: 'Register account, Evissa',
    openGraph: {
        title: 'Register account to E-vissa website | E-vissa.com',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        type: 'website',
        description: 'Register account to E-vissa website',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
    },
    twitter: {
        title: 'Register account to E-vissa website | E-vissa.com',
        description: 'Register account to E-vissa website',
        card: 'summary',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
};

export default function page() {
    return <RegisterPage />;
}
