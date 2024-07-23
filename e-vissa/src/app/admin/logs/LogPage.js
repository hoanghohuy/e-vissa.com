'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import Logs from '@/components/admin/Logs/Logs';
import stylesAdmin from '../Admin.module.css';

function LogPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Logs />
            </div>
        </div>
    );
}

export default LogPage;
