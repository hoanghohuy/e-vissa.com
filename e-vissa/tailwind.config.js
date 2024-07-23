/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        fontFamily: {
            poppins: ['Poppins', 'san-serif'],
            dmsans: ['DM Sans', 'san-serif'],
            inter: ['Inter', 'san-serif'],
        },
        extend: {
            boxShadow: {
                header: '0 0 5px 1px rgba(5, 56, 111, 0.1)',
            },
        },
        colors: {
            ...colors,
            primary: 'var(--primary-color)',
            black: '#131212',
            white: '#fff',
            black2: '#23262f',
        },
        screens: {
            xl: { max: '1392px' },
            lg: { max: '1200px' },
            md: { max: '1000px' },
            sm: { max: '767px' },
            sx: { max: '540px' },
        },
    },
    plugins: [],
};
