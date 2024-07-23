import React from 'react';
import ServicesTable from './ServicesTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Services() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Services'} />
            <ServicesTable />
        </div>
    );
}
