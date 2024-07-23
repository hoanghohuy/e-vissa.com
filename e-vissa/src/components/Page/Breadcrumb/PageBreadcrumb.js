import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import stylesSystem from '@/app/page.module.css';
import styles from './css/PageBreadcrumb.module.css';

export default function PageBreadcrumb({ country, title }) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Link underline="hover" key="2" color="inherit" href="/">
            {country}
        </Link>,
        <Typography key="3" color="text.primary">
            {title}
        </Typography>,
    ];
    return (
        <Breadcrumbs
            className={`${stylesSystem.admin__container} ${stylesSystem.max__w__1200px} ${styles.page__breadcrumb}`}
            separator="›"
            aria-label="breadcrumb"
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
}
