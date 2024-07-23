import React from 'react';
import CurrencyTable from './CurrencyTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Currency() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Currency'} />
            <CurrencyTable />
        </div>
    );
}
