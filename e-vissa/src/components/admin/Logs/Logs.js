import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import LogsTable from './LogsTable';
import stylesAdmin from '../Admin.module.css';

export default function Logs() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Logs'} />
            <LogsTable />
        </div>
    );
}
