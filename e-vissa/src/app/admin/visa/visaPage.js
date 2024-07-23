'use client';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
const Visa = dynamic(() => import('@/components/admin/visa/Visa'), { ssr: false });
import stylesAdmin from '../Admin.module.css';
import AdminHeader from '../../../components/admin/AdminHeader/adminHeader';

function VisaPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Visa />
            </div>
        </div>
    );
}

export default VisaPage;
