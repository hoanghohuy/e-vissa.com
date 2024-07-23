'use client';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
const Services = dynamic(() => import('@/components/admin/services/Services'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import stylesAdmin from '../Admin.module.css';

function ServicesPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Services />
            </div>
        </div>
    );
}

export default ServicesPage;
