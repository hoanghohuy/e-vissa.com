'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
// const Order = dynamic(() => import('@/components/admin/order/Order'), {
//     ssr: false,
//     loading: () => <CircularProgress />,
// });
import Order from '@/components/admin/order/Order';
import stylesAdmin from '../Admin.module.css';

function OrderPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Order site={'Evissa'} />
            </div>
        </div>
    );
}

export default OrderPage;
