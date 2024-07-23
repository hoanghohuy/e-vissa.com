import LoginPage from './LoginPage';

export const metadata = {
    title: {
        default: 'Login page to retrieve your visa | E-vissa.com',
    },
    description: 'Login page to retrieve your visa | E-vissa.com',
    keywords: 'Login page to retrieve your visa',
    openGraph: {
        title: 'Login | Evissa',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        type: 'website',
        description: 'Login to E-vissa website',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
    },
    twitter: {
        title: 'Login page to retrieve your visa | E-vissa.com',
        description: 'Login page to retrieve your visa | E-vissa.com',
        card: 'summary',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
};

export default function page() {
    return <LoginPage />;
}
