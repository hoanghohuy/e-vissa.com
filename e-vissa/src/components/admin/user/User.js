import React from 'react';
import UserTable from './UserTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function User() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`Users`} />
            <UserTable />
        </div>
    );
}
