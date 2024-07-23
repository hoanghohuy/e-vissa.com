import React from 'react';
import OrderTable from './OrderTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Order({ site }) {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`${site} Order`} />
            <OrderTable site={site} />
        </div>
    );
}
