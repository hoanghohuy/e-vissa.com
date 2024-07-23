export const settingsData = {
    defaultLimitPagination: 10,
    defaultCodeFrom: 'US',
    siteContactPhone: '+44 748 884 4494',
    siteContactEmail: 'support@e-vissa.com',
    siteName: 'e-vissa',
    pathNameImageThumbnail: `${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`,
    siteDomainUppercase: 'E-vissa.com',
    title: 'Explore Global Visas - Your Travel Visa Information Source | E-vissa.com',
    description: 'Explore Global Visas. Your Travel Visa Information Source | E-vissa.com',
    keyword: 'evisa, e-visa, electronic visa, visa, global visa, travel visa, evissa',
    favicon: 'https://www.vietnambooking.com/wp-content/themes/vietnambooking_master/images/favicon.ico',
    ogMeta: {
        title: 'Explore Global Visas - Your Travel Visa Information Source | E-vissa.com',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        type: 'website',
        description: 'Explore Global Visas - Your Travel Visa Information Source | E-vissa.com',
        image: 'https://data.vietnambooking.com/common/logo/banner_logo.jpg',
    },
    twitterMeta: {
        card: 'summary',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        title: 'Explore Global Visas - Your Travel Visa Information Source | E-vissa.com',
        description: 'Explore Global Visas - Your Travel Visa Information Source | E-vissa.com',
        image: 'https://data.vietnambooking.com/common/logo/banner_logo.jpg',
        site: '@vnbkcorp',
        creator: '@vnbkcorp',
    },
};

export const prefixOrder = '#E_VISSA_';
export const prefixTurkeyOrder = '#TR_EVISA_';

export const openGraphImage = { images: [`${process.env.NEXT_PUBLIC_SITE_URL}/evissa_thumbnail.png`] };

export const devMail = ['dev@vietnambooking.com'];
export const notiOrderLimit = 30;

// Add IP addresses to the blacklist
export const blacklist = [];
