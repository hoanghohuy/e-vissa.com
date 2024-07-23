import React from 'react';
import CouponTable from './CouponTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Coupon() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Coupon'} />
            <CouponTable />
        </div>
    );
}
