import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import stylesAdmin from './Admin.module.css';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';

export default function AdminPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <div className="mx-6 text-sm">
                    <br />
                    <h3 className="font-bold text-[20px]">Welcome to Admin!</h3>
                    <br />
                    <div>
                        <h4>Đóng góp về chức năng website: </h4>
                        <p>
                            Không lưu bất kỳ thông tin tài khoản. Rất mong được sự đóng góp của Anh/ Chị để hoàn thiện
                            website:
                        </p>
                        <label>{process.env.NEXT_PUBLIC_SITE_URL}/contact/dev (password: dev)</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
