import ForgotPasswordPage from './forgotPasswordPage';

export const metadata = {
    title: {
        default: 'Forgot password | Evissa',
    },
    description: 'Forgot password E-vissa website',
    keywords: 'Forgot password | Evissa',
    openGraph: {
        title: 'Forgot password | Evissa',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
        type: 'website',
        description: 'Forgot password E-vissa website',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`],
    },
    twitter: {
        title: 'Forgot password | Evissa',
        description: 'Forgot password E-vissa website',
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
