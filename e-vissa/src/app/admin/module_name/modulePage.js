'use client';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import Module from '@/components/admin/module_name/Module';
import stylesAdmin from '../Admin.module.css';

function LogPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Module />
            </div>
        </div>
    );
}

export default LogPage;
