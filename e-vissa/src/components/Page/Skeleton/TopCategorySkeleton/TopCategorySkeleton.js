import { Skeleton } from '@mui/material';
import React from 'react';
import styles from './TopCategorySkeleton.module.css';

export default function TopCategorySkeleton() {
    return (
        <>
            <div className="w-full flex flex-wrap md:flex-col">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        className={
                            'basis-[50%] h-[232px] px-4 py-4 xl:h-[200px] md:basis-auto md:w-full md:h-[190px] md:px-0'
                        }
                    >
                        <Skeleton
                            key={item}
                            sx={{ height: '100%', borderRadius: '12px' }}
                            animation="wave"
                            className="w-full h-full"
                            variant="rectangular"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
