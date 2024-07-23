import React from 'react';
import VisaTable from './VisaTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Visa() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`Visa detail`} />
            <VisaTable />
        </div>
    );
}
