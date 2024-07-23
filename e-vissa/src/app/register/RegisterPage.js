'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { CircularProgress, TextField } from '@mui/material';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import Image from 'next/image';
import logo from '/public/logo.svg';
import loadingPage from '/public/loading.gif';
import { validateEmail } from '../../utils/validation';
import stylesSystem from '@/app/page.module.css';
import { settingsData } from '../../../settings';

export default function RegisterPage() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const params = useSearchParams();
    const [loadingRegister, setLoadingRegister] = useState(false);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const invitation = params.get('invitation');
    const role = params.get('role');
    const websites = params.get('websites');
    const internal = params.get('internal');

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

    const handleSubmit = async (e) => {
        if (firstName.trim().length < 1) {
            ToastNotify('Please enter first name.');
            return;
        }
        if (lastName.trim().length < 1) {
            ToastNotify('Please enter last name.');
            return;
        }
        if (email.trim().length < 10 || !validateEmail(email)) {
            ToastNotify('Your email is not valid.');
            return;
        }
        if (password.trim().length < 1) {
            ToastNotify('Password is not valid.');
            return;
        }
        if (repassword.trim().length < 1) {
            ToastNotify('Repassword is not valid.');
            return;
        }
        if (password !== repassword) {
            ToastNotify('Password not match.');
            return;
        }
        let dataRegister = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };
        if (websites && websites.length > 0) {
            dataRegister.websites = websites.split(',');
        }
        if (role && role.length > 0) {
            dataRegister.role = role;
        }
        if (invitation && invitation.length > 0) {
            dataRegister.invitation = invitation;
        }
        let register_api_url = `/api/auth/register`;
        if (invitation && invitation.length > 0 && internal && internal.length > 0) {
            register_api_url = `/api/auth/register?internal=1`;
        }
        try {
            setLoadingRegister(true);
            const res = await fetch(register_api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataRegister),
            });
            res.status === 201 && router.push('/login?success=Check your email to confirm your account.');
            if (res.status === 500) {
                ToastNotify('Email is already registered');
            }
            if (res.status === 422) {
                ToastNotify('Your email is already registered.');
            }
        } catch (error) {
            setError(err);
        } finally {
            setLoadingRegister(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* <img className="absolute w-full brightness-75 h-[100vh] object-cover " src="/auth_background.png" /> */}
            {!loading ? (
                <div className={styles.login__container}>
                    <div className={styles.login__logo}>
                        <Link href={'/'}>
                            <Image width={60} src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className={styles.login__title}>Register for {settingsData.siteDomainUppercase}! 👋🏻</div>
                    <div className={styles.login__title__desc}>Register account and start the adventure</div>
                    <div className={styles.login__form__container}>
                        <div>
                            <label className={stylesSystem.required}>First name:</label>
                            <TextField
                                size="small"
                                autoFocus={true}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        fontFamily: 'Poppins',
                                        borderRadius: '6px',
                                    },
                                }}
                                className={styles.login__form__input}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={stylesSystem.required}>Last name:</label>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        fontFamily: 'Poppins',
                                        borderRadius: '6px',
                                    },
                                }}
                                className={styles.login__form__input}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={stylesSystem.required}>Email:</label>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        fontFamily: 'Poppins',
                                        borderRadius: '6px',
                                    },
                                }}
                                className={styles.login__form__input}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={stylesSystem.required}>Password:</label>
                            <TextField
                                size="small"
                                type="password"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        fontFamily: 'Poppins',
                                        borderRadius: '6px',
                                    },
                                }}
                                className={styles.login__form__input}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={stylesSystem.required}>Confirm password:</label>
                            <TextField
                                size="small"
                                type="password"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        fontFamily: 'Poppins',
                                        borderRadius: '6px',
                                    },
                                }}
                                className={styles.login__form__input}
                                onChange={(e) => setRepassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {loadingRegister ? (
                        <CircularProgress />
                    ) : (
                        <button onClick={handleSubmit} className={styles.login__button}>
                            Register
                        </button>
                    )}
                    {error && (
                        <div style={{ color: 'red', marginTop: '4px' }} severity="error">
                            {error}
                        </div>
                    )}
                    <div style={{ marginTop: '8px', color: '#534F5A' }}>I have account?</div>
                    <Link
                        href={'/login'}
                        className={styles.login__link}
                        style={{ display: 'block', textAlign: 'center', width: '100%' }}
                    >
                        Login by an account
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
                    <Image src={loadingPage} alt="loading" width={150} height={150} />
                </div>
            )}
        </div>
    );
}
