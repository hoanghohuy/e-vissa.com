import { Skeleton } from '@mui/material';
import React from 'react';

export default function VisaSkeleton() {
    return (
        <div className="pt-4 flex flex-wrap justify-between sm:gap-8">
            <Skeleton
                className="w-[31%] sm:w-full"
                sx={{ height: 400, borderRadius: '12px' }}
                animation="wave"
                variant="rectangular"
            />
            <Skeleton
                className="w-[31%] sm:w-full"
                sx={{ height: 400, borderRadius: '12px' }}
                animation="wave"
                variant="rectangular"
            />
            <Skeleton
                className="w-[31%] sm:w-full"
                sx={{ height: 400, borderRadius: '12px' }}
                animation="wave"
                variant="rectangular"
            />
        </div>
    );
}
