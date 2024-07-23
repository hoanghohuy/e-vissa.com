'use client';
import React, { useEffect, useState } from 'react';
import styles from './FeedbackDev.module.css';
import { CircularProgress, TextField } from '@mui/material';
import ButtonApply from '@/components/Page/ButtonApply/ButtonApply';
import Swal from 'sweetalert2';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { isSuccessStatus } from '../../../utils/validation';

export default function FeedbackDev() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const onFeedback = async () => {
        if (content.trim().length < 5) {
            ToastNotify('Feedback content must be > 10 characters!');
            return;
        }
        try {
            setLoading(true);
            const req = await fetch(`/api/contacts/dev`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    header: ' Send Feedback',
                    body: content,
                }),
            });

            if (isSuccessStatus(req.status)) {
                Swal.fire({
                    title: '🎉',
                    text: 'Thank you!',
                    showCloseButton: true,
                    confirmButtonText: 'Home page',
                    customClass: { confirmButton: `${styles.contact__custom__alert}` },
                }).then(() => window.location.assign('/'));
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        Swal.fire({
            text: 'Enter password',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                type: 'new password',
            },
            showCancelButton: false,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            customClass: { confirmButton: `${styles.contact__custom__alert}` },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value !== 'dev') {
                    window.location.assign('/');
                }
            } else {
                window.location.assign('/');
            }
        });
    }, []);
    return (
        <div className={styles.container}>
            <h1>Feedback</h1>
            <br />
            <TextField
                sx={{ marginBottom: '12px' }}
                type="text"
                fullWidth
                multiline
                minRows={5}
                onChange={(e) => setContent(e.target.value)}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <div onClick={onFeedback}>
                    <ButtonApply type={'primary'} title="Send feedback" />
                </div>
            )}
        </div>
    );
}
