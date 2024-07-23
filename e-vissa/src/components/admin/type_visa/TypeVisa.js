import React from 'react';
import TypeVisaTable from './TypeVisaTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function TypeVisa() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`Visa type`} />
            <TypeVisaTable />
        </div>
    );
}
