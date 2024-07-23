'use client';
import React from 'react';
import styles from './ForgotPassword.module.css';
import logo from '/public/logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import stylesSystem from '@/app/page.module.css';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { validateEmail } from '../../utils/validation';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loadingForgot, setLoadingForgot] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [notify, setNotify] = useState({ show: false, status: '', text: '' });

    const handleSubmit = async () => {
        if (email == '' || !validateEmail(email)) {
            ToastNotify('Email is not valid!');
            return;
        }
        try {
            setLoadingForgot(true);
            const request = await fetch(`/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (request.status == 200) {
                setNotify({
                    show: true,
                    status: 'success',
                    text: 'Your password has been reset successfully. Please check your email to set a new password!',
                });
                setDisableButton(true);
            } else {
                setNotify({ show: true, status: 'error', text: 'Email is not valid!' });
            }
        } catch (error) {
            setNotify({ show: true, status: 'error', text: 'Something went wrong.' });
            throw error;
        } finally {
            setLoadingForgot(false);
        }
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.forgot__pass__container}>
                    <div className={styles.login__logo}>
                        <Link href={'/'}>
                            <Image width={60} src={logo} />
                        </Link>
                    </div>
                    <div className={styles.forgot__title}>Forgot Password? 🔒</div>
                    <div className={styles.forgot__title__desc}>
                        Enter your email and we'll send you instructions to reset your password
                    </div>
                    <div className={styles.forgot__form__container}>
                        <label className={stylesSystem.required}>Email</label>
                        <TextField
                            autoFocus={true}
                            placeholder="Enter your email..."
                            type="text"
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
                    {loadingForgot ? (
                        <>
                            <CircularProgress style={{ marginTop: '20px' }} />
                            <br />
                        </>
                    ) : (
                        <button disabled={disableButton} onClick={handleSubmit} className={styles.forgot__button}>
                            Send reset link
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
