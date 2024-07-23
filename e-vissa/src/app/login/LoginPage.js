'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Alert, CircularProgress } from '@mui/material';
import Image from 'next/image';
import logo from '/public/logo.svg';
import loadingPage from '/public/loading.gif';
import { validateEmail } from '../../utils/validation';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import stylesSystem from '@/app/page.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const params = useSearchParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session && session.accessToken) {
            redirect('/');
        }
        setLoading(false);
    }, [status]);

    useEffect(() => {
        setError(params.get('error'));
        setSuccess(params.get('success'));
    }, [params]);

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        if (email.trim().length < 5 || !validateEmail(email)) {
            ToastNotify('Your email is not valid.');
            return;
        }
        if (password.trim().length < 1) {
            ToastNotify('Please enter your password.');
            return;
        }
        setLoadingLogin(true);
        e.preventDefault();
        signIn('credentials', {
            email,
            password,
        });
    };

    return (
        <>
            <div className={styles.container}>
                {!loading ? (
                    <div className={`${styles.login__container} border border-gray-200 rounded-lg shadow`}>
                        <div className={styles.login__logo}>
                            <Link href={'/'}>
                                <Image width={60} src={logo} alt="logo" />
                            </Link>
                        </div>
                        <div className={styles.login__title}>Welcome to E-vissa! 👋🏻</div>
                        <div className={styles.login__form__container}>
                            <label className={stylesSystem.required}>Email</label>
                            <input
                                autoFocus={true}
                                type="text"
                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => handleEnter(e)}
                            />
                            <label className={stylesSystem.required}>Password</label>
                            <input
                                type="password"
                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleEnter(e)}
                            />
                        </div>
                        <Link className={styles.forgot__pass} href={'/forgot-password'}>
                            Forgot Password?
                        </Link>
                        {loadingLogin ? (
                            <button disabled className={styles.login__button}>
                                <CircularProgress thickness={5} size={26} className="!text-white mt-1" />
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className={styles.login__button}>
                                Login now
                            </button>
                        )}
                        {error && (
                            <Alert variant="filled" severity="error" className="mt-2">
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert variant="filled" severity="success" className="mt-2">
                                {success}
                            </Alert>
                        )}
                        <div className="w-full h-[1px] bg-[#eee] mt-4 mb-2"></div>
                        <Link
                            href={'/register'}
                            className={styles.login__link}
                            style={{ display: 'block', textAlign: 'center', width: '100%' }}
                        >
                            Create an account
                        </Link>
                        <div style={{ textAlign: 'center', color: '#534F5A' }}>or</div>
                        <button
                            onClick={() => {
                                signIn('google');
                            }}
                            className={styles.login__button__google}
                        >
                            Login by Google
                        </button>
                    </div>
                ) : (
                    <div className={styles.loading__container}>
                        <Image alt="loading" src={loadingPage} width={150} height={150} />
                    </div>
                )}
            </div>
        </>
    );
}
