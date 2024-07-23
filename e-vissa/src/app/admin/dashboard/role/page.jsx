'use client';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import adminStyles from '@/components/admin/Admin.module.css';
const Role = dynamic(() => import('@/components/admin/role/Role'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

function page() {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item lg={2} xs={2} md={3} sm={4}>
                <AdminSidebar />
            </Grid>
            <Grid className={adminStyles.module__container} item lg={10} xs={10} md={9} sm={8}>
                <Role />
            </Grid>
        </Grid>
    );
}

export default page;
