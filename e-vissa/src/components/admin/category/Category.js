import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';
import CategoryTable from './CategoryTable';

export default function Category() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Category'} />
            <CategoryTable />
        </div>
    );
}
