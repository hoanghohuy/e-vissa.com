import React from 'react';
import PostTable from './PostTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Post() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`Posts`} />
            <PostTable />
        </div>
    );
}
