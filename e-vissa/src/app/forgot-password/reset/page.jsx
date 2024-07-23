import ForgotPasswordPage from './resetPasswordPage';

export const metadata = {
    title: {
        default: 'Reset password | Evissa',
    },
    description: 'Reset password E-vissa website',
    keywords: 'Reset password | Evissa',
    openGraph: {
        title: 'Reset password | Evissa',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        type: 'website',
        description: 'Reset password E-vissa website',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
    },
    twitter: {
        title: 'Reset password | Evissa',
        description: 'Reset password E-vissa website',
        card: 'summary',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
        site: '@evissa',
        creator: '@evissa',
    },
};

export default function page() {
    return <ForgotPasswordPage />;
}
