'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import User from '@/components/admin/user/User';
import stylesAdmin from '../Admin.module.css';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';

function UserPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <User />
            </div>
        </div>
    );
}

export default UserPage;
