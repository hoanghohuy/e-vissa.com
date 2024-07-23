import React from 'react';
import ImagesTable from './ImagesTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Images() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Images'} />
            <ImagesTable />
        </div>
    );
}
