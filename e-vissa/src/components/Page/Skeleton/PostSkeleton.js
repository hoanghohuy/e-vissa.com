import { Skeleton } from '@mui/material';
import React from 'react';
import styles from './PostSkeleton.module.css';

export default function PostSkeleton({ length }) {
    return (
        <>
            <div className={styles.skeleton__container}>
                <Skeleton sx={{ height: 200, borderRadius: '12px' }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 200, borderRadius: '12px' }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 200, borderRadius: '12px' }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 200, borderRadius: '12px' }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 200, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
        </>
    );
}
