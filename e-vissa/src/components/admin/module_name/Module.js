import React from 'react';
import ModuleTable from './ModuleTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Module() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Module'} />
            <ModuleTable />
        </div>
    );
}
