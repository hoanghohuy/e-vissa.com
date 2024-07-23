import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';
import InternalPostTable from './InternalPostTable';

export default function InternalPost() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Post Management'} />
            <InternalPostTable />
        </div>
    );
}
