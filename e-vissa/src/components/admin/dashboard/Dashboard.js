import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';
import DashboardTable from './DashboardPage';

export default function Dashboard() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Dashboard'} />
            <DashboardTable />
        </div>
    );
}
