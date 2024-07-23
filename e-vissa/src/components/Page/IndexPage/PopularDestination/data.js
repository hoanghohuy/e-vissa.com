import popDes1 from '/public/page/popular_destination/tr.webp';
import popDes2 from '/public/page/popular_destination/2.jpg';
import popDes3 from '/public/page/popular_destination/3.jpg';
import vn from '/public/page/popular_destination/vn.JPG';
export const dataPopularDestination = [
    { id: 1, key: 1, image: popDes1, flag: 'tr', code: 'TR', country: 'Turkey' },
    { id: 2, key: 2, image: popDes2, flag: 'au', code: 'AU', country: 'Australia' },
    { id: 3, key: 3, image: popDes3, flag: 'in', code: 'IN', country: 'India' },
    { id: 4, key: 4, image: vn, flag: 'ca', code: 'CA', country: 'Canada' },
    { id: 5, key: 5, image: popDes3, flag: 'vn', code: 'VN', country: 'Vietnam' },
    { id: 6, key: 6, image: popDes3, flag: 'fr', code: 'FR', country: 'France' },
];

export const dataPopularDestinationSelect = [
    { id: 1, key: 1, flag: 'kn', code: 'KN', country: 'Saint Kitts and Nevis' },
    { id: 2, key: 2, flag: 'sc', code: 'SC', country: 'Seychelles' },
    { id: 3, key: 3, flag: 'do', code: 'DO', country: 'Dominican Republic' },
    { id: 4, key: 4, flag: 'tn', code: 'TN', country: 'Tunisia' },
    { id: 5, key: 5, flag: 'do', code: 'DO', country: 'Dominican Republic' },
    { id: 6, key: 6, flag: 'tl', code: 'TL', country: 'Timor-Leste' },
    { id: 7, key: 7, flag: 'rs', code: 'RS', country: 'Serbia' },
    { id: 8, key: 8, flag: 'tj', code: 'TJ', country: 'Tajikistan' },
    { id: 9, key: 9, flag: 'lk', code: 'LK', country: 'Sri Lanka' },
    { id: 10, key: 10, flag: 'sl', code: 'SL', country: 'Sierra Leone' },
    { id: 11, key: 11, flag: 'si', code: 'SI', country: 'Slovenia' },
    { id: 12, key: 12, flag: 'nl', code: 'NL', country: 'Netherlands' },
    { id: 13, key: 13, flag: 'rs', code: 'RS', country: 'Serbia' },
    { id: 14, key: 14, flag: 'vn', code: 'VN', country: 'Vietnam' },
    { id: 15, key: 15, flag: 'ch', code: 'CH', country: 'Switzerland' },
    { id: 16, key: 16, flag: 'sr', code: 'SR', country: 'Suriname' },
    { id: 17, key: 17, flag: 'ss', code: 'SS', country: 'South Sudan' },
    { id: 18, key: 18, flag: 'bs', code: 'BS', country: 'Bahamas' },
    { id: 19, key: 19, flag: 'ws', code: 'WS', country: 'Samoa' },
    { id: 20, key: 20, flag: 'nl', code: 'NL', country: 'Netherlands' },
    { id: 21, key: 21, flag: 'tv', code: 'TV', country: 'Tuvalu' },
];

export const settingsSlider = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1392,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
    ],
};
