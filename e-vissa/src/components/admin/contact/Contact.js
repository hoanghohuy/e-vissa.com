import React from 'react';
import ContactTable from './ContactTable';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import stylesAdmin from '../Admin.module.css';

export default function Contact() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Contact'} />
            <ContactTable />
        </div>
    );
}
