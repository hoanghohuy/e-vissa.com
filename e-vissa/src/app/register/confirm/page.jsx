import ConfirmPage from './confirmPage';

export const metadata = {
    title: {
        default: 'Confirm your account | Evissa',
    },
    description: 'Confirm your account E-vissa website',
    keywords: 'Confirm your account | Evissa',
    openGraph: {
        title: 'Confirm your account | Evissa',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/register/confirm`,
        type: 'website',
        description: 'Confirm your account E-vissa website',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
    },
    twitter: {
        title: 'Confirm your account | Evissa',
        description: 'Confirm your account E-vissa website',
        card: 'summary',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/register/confirm`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
};

export default function page() {
    return <ConfirmPage />;
}
