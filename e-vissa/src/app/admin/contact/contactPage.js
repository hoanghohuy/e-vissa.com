'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
const Contact = dynamic(() => import('@/components/admin/contact/Contact'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import dynamic from 'next/dynamic';
import stylesAdmin from '../Admin.module.css';

function ContactPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Contact />
            </div>
        </div>
    );
}

export default ContactPage;
