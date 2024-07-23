import React from 'react';
import RoleTable from './RoleTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';

export default function Role() {
    return (
        <>
            <AdminBreadcrumb screen={'Role'} />
            <RoleTable />
        </>
    );
}
