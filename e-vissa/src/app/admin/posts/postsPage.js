'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader/adminHeader';
const Post = dynamic(() => import('@/components/admin/posts/Post'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex justify-center items-center">
            <CircularProgress />
        </div>
    ),
});
import stylesAdmin from '../Admin.module.css';
import { CircularProgress } from '@mui/material';

function PostPage() {
    return (
        <div className={stylesAdmin.layout__admin}>
            <AdminSidebar />
            <div className={stylesAdmin.layout__admin__content}>
                <AdminHeader />
                <Post />
            </div>
        </div>
    );
}

export default PostPage;
