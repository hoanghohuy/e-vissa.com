import React from 'react';
import CountryTable from './CountryTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Country() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Country'} />
            <CountryTable />
        </div>
    );
}
