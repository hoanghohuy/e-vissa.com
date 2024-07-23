'use client';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
const Order = dynamic(() => import('@/components/admin/order/Order'), { ssr: false, loading: () => <p>Loading...</p> });
import stylesAdmin from '../Admin.module.css';

function TurkeyOrderPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Order site={'Turkey'} />
            </div>
        </div>
    );
}

export default TurkeyOrderPage;
