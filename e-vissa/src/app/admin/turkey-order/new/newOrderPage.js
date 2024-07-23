'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import stylesAdmin from '@/app/admin/Admin.module.css';
import NewOrder from '@/components/admin/order/NewOrder/newOrder';

function NewOrderPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <NewOrder site={'Turkey'} />
            </div>
        </div>
    );
}

export default NewOrderPage;
