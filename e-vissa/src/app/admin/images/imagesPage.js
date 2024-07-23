'use client';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import Images from '@/components/admin/Images/Images';
import stylesAdmin from '../Admin.module.css';

function LogPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Images />
            </div>
        </div>
    );
}

export default LogPage;
