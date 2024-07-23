'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import adminStyles from '@/components/admin/Admin.module.css';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';
const Currency = dynamic(() => import('@/components/admin/currency/Currency'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import stylesAdmin from '../Admin.module.css';

function CurrencyPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Currency />
            </div>
        </div>
    );
}

export default CurrencyPage;
