'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import stylesAdmin from '../Admin.module.css';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import UserInternal from '../../../components/admin/internal_user/UserInternal';

function UserInternalPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <UserInternal />
            </div>
        </div>
    );
}

export default UserInternalPage;
