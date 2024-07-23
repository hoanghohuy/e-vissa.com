'use client';
import MyAccount from '@/components/admin/my_account/MyAccount';
import { Grid } from '@mui/material';

function MyAccountPage() {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item lg={12} xs={12} md={12} sm={12}>
                <MyAccount />
            </Grid>
        </Grid>
    );
}

export default MyAccountPage;
