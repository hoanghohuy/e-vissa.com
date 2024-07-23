'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import stylesAdmin from '../Admin.module.css';
import InternalPost from '@/components/admin/internal_post/InternalPost';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';

function InternalPostPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <InternalPost />
            </div>
        </div>
    );
}

export default InternalPostPage;
