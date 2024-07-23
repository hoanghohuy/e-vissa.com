import { Backdrop, CircularProgress } from '@mui/material';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} open={true}>
            <img src="/icons/loading-logo.svg" alt="loading logo" className="absolute" />
            <CircularProgress size={60} className="text-[#fff]" color="inherit" />
        </Backdrop>
    );
}
