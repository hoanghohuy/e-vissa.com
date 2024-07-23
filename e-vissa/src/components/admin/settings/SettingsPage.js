import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import Settings from './Settings';
import stylesAdmin from '../Admin.module.css';

export default function SettingsPage() {
    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={'Settings'} />
            <Settings />
        </div>
    );
}
