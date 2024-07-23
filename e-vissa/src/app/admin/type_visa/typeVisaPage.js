'use client';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
const TypeVisa = dynamic(() => import('@/components/admin/type_visa/TypeVisa'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import stylesAdmin from '../Admin.module.css';
import AdminHeader from '../../../components/admin/AdminHeader/adminHeader';

function TypeVisaPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <TypeVisa />
            </div>
        </div>
    );
}

export default TypeVisaPage;
