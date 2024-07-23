import { Skeleton } from '@mui/material';
import React from 'react';
import styles from './LabelCategorySkeleton.module.css';

export default function LabelCategorySkeleton() {
    return (
        <>
            <div className={styles.container}>
                <Skeleton
                    sx={{ width: 250, height: 42, borderRadius: '12px' }}
                    animation="wave"
                    variant="rectangular"
                />
            </div>
        </>
    );
}
