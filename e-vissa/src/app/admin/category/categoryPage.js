'use client';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import Module from '@/components/admin/module_name/Module';
import stylesAdmin from '../Admin.module.css';
import Category from '../../../components/admin/category/Category';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';

function CategoryPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Category />
            </div>
        </div>
    );
}

export default CategoryPage;
