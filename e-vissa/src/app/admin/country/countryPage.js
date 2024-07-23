'use client';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import adminStyles from '@/components/admin/Admin.module.css';
const Country = dynamic(() => import('@/components/admin/country/Country'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import stylesAdmin from '../Admin.module.css';

function CountryPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Country />
            </div>
        </div>
    );
}

export default CountryPage;
