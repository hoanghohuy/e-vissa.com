import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumb';
import MyAccountTable from './MyAccountTable';
import styles from './css/MyAccount.module.css';

export default function MyAccount() {
    return (
        <>
            <div className={styles.layout}>
                <MyAccountTable />
            </div>
        </>
    );
}
