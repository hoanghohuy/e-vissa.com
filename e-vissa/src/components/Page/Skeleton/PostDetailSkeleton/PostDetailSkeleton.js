import { Skeleton } from '@mui/material';
import React from 'react';
import styles from './PostDetailSkeleton.module.css';

export default function PostDetailSkeleton() {
    return (
        <>
            <div className={styles.post__detail__skeleton__container}>
                <Skeleton sx={{ height: 84, borderRadius: '12px' }} animation="wave" variant="rectangular" />
                <Skeleton
                    sx={{ width: 270, height: 24, borderRadius: '12px' }}
                    animation="wave"
                    variant="rectangular"
                />
                <Skeleton sx={{ height: 400, borderRadius: '12px' }} animation="wave" variant="rectangular" />

                <Skeleton sx={{ height: 800, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
        </>
    );
}
