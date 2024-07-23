'use client';
import React from 'react';
import styles from './ResetPassword.module.css';
import logo from '/public/logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import stylesSystem from '@/app/page.module.css';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { validateEmail } from '../../../utils/validation';
import { notFound, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingReset, setLoadingReset] = useState(false);
    const [notify, setNotify] = useState({ show: false, status: '', text: '' });
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [disableButton, setDisableButton] = useState(false);
    const key = searchParams.get('key_reset_password');

    const handleSubmit = async () => {
        if (password.trim() == '') {
            ToastNotify('New password field is not valid!');
            return;
        }
        if (confirmPassword.trim() == '') {
            ToastNotify('Confirm password field is not valid!');
            return;
        }
        if (password !== confirmPassword) {
            ToastNotify('Password not match! Please try again.');
            return;
        }
        try {
            const data = {
                key_reset_password: key,
                email: email,
                password: password,
                password1: confirmPassword,
            };
            setLoadingReset(true);
            const request = await fetch(`/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (request.status == 200) {
                setNotify({
                    show: true,
                    status: 'success',
                    text: 'Your password has been changed.',
                });
                setDisableButton(true);
            } else {
                setNotify({ show: true, status: 'error', text: 'Key reset password is not available.' });
            }
        } catch (error) {
            setNotify({ show: true, status: 'error', text: 'Something went wrong.' });
            throw error;
        } finally {
            setLoadingReset(false);
        }
    };
    return (
        <>
            {(!email || !key) && notFound()}
            <div className={styles.container}>
                <div className={styles.forgot__pass__container}>
                    <div className={styles.login__logo}>
                        <Link href={'/'}>
                            <Image width={60} src={logo} />
                        </Link>
                    </div>
                    <div className={styles.forgot__title}>Reset Password 🔒</div>
                    <div className={styles.forgot__title__desc}>
                        Enter your email and we'll send you instructions to reset your password
                    </div>
                    <div className={styles.forgot__form__container}>
                        <label className={stylesSystem.required}>New password</label>
                        <TextField
                            autoFocus={true}
                            placeholder="New password"
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
                        <label className={stylesSystem.required}>Confirm password</label>
                        <TextField
                            placeholder="Confirm password"
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {loadingReset ? (
                        <>
                            <CircularProgress style={{ marginTop: '20px' }} />
                            <br />
                        </>
                    ) : (
                        <button disabled={disableButton} onClick={handleSubmit} className={styles.forgot__button}>
                            Change password
                        </button>
                    )}
                    {notify.show && (
                        <Alert style={{ marginTop: '12px' }} variant="filled" severity={notify.status}>
                            {notify.text}
                        </Alert>
                    )}
                    <Link href={'/login'} className={styles.back__login}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
                        Back to login
                    </Link>
                </div>
            </div>
        </>
    );
}
