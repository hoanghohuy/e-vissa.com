'use client';
const Dashboard = dynamic(() => import('@/components/admin/dashboard/Dashboard'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import adminStyles from '@/components/admin/Admin.module.css';
import { Grid } from '@mui/material';
import stylesAdmin from '../Admin.module.css';
import dynamic from 'next/dynamic';

export default function DashboardPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Dashboard />
            </div>
        </div>
    );
}
