'use client';
import { CircularProgress } from '@mui/material';
import { notFound, useSearchParams } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Confirm.module.css';
import Image from 'next/image';
import success from '/public/page/notification/success.png';
import error from '/public/page/notification/error.png';
import Link from 'next/link';

export default function ConfirmPage() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [dataNotification, setDataNotification] = useState({ status: '', text: '' });
    const visaParam = searchParams.get('email');
    const fromCountry = searchParams.get('activation');
    const internal = searchParams.get('internal');

    const confirmEmail = async () => {
        try {
            const request = await fetch(
                `/api/auth/register?email=${visaParam}&activation=${fromCountry}&internal=${internal}`,
            );
            if (request.status == 200) {
                const data = await request.json();
                console.log('okee', data);
                setDataNotification({ status: 'Success', text: 'Your account has been activated!' });
            } else {
                const data = await request.json();
                console.log('fail', data);
                setDataNotification({ status: 'Error', text: data.error });
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        confirmEmail();
    }, []);

    return (
        <>
            {(!visaParam || !fromCountry) && notFound()}
            <div className={styles.container}>
                {loading ? (
                    <div className={styles.confirm__container}>
                        <CircularProgress />
                    </div>
                ) : (
                    <div className={styles.confirm__container}>
                        {dataNotification.status == 'Success' ? (
                            <>
                                <Image width={80} height={80} src={success} />
                            </>
                        ) : (
                            <>
                                <Image width={80} height={80} src={error} />
                            </>
                        )}
                        <div className={styles.confirm__status}>{dataNotification.status}</div>
                        <div className={styles.confirm__desc}>{dataNotification.text}</div>
                        <Link href={'/login'} className={styles.confirm__button}>
                            Back to login
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
