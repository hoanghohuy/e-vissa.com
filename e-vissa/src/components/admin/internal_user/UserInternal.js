import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';
import UserInternalTable from './UserInternalTable';

export default function UserInternal() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`Users Internal`} />
            <UserInternalTable />
        </div>
    );
}
