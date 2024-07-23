'use client';
import SettingsPage from '@/components/admin/settings/SettingsPage';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import stylesAdmin from '../../Admin.module.css';

function SettingPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <SettingsPage />
            </div>
        </div>
    );
}

export default SettingPage;
