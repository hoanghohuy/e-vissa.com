'use client';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import stylesAdmin from '../Admin.module.css';
const Coupon = dynamic(() => import('@/components/admin/coupon/Coupon'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

function CouponPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Coupon />
            </div>
        </div>
    );
}

export default CouponPage;
