import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';

export default function AdminBreadcrumb({ screen }) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/admin">
            Admin
        </Link>,
        <Typography key="2" color="text.primary">
            {screen}
        </Typography>,
    ];
    return (
        <div className="px-3 py-5 flex gap-5 items-center bg-[#006989] w-full text-white">
            <div className="font-bold font-inter text-2xl">{screen}</div>
            <Breadcrumbs
                sx={{
                    '& .MuiTypography-root': { fontSize: '14px !important', fontFamily: 'Inter', color: '#fff' },
                    '& .MuiBreadcrumbs-root': {
                        color: '#fff !important',
                    },
                }}
                className="!font-inter !text-[14px] !text-white"
                separator="›"
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </div>
    );
}
