import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import stylesSystem from '@/app/page.module.css';
import { PageNotify } from '../../Page/PageNotify/PageNotify';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import stylesAdmin from '@/components/admin/Admin.module.css';

export default function ChangePassword({ accessToken, idUser, email }) {
    const [open, setOpen] = useState(false);
    const [pwd, setPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [renewPwd, setRenewPwd] = useState('');
    const [error, setError] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChangePassword = async () => {
        if (pwd == '' || newPwd == '' || renewPwd == '') {
            setError('Please insert password');
            return;
        }
        if (newPwd !== renewPwd) {
            setError('Password not match.');
            return;
        }
        if (pwd.length < 6 || newPwd.length < 6 || renewPwd.length < 6) {
            setError('Password at least 6 characters.');
            return;
        }
        setError('');
        setOpen(false);
        try {
            const newInfo = {
                email: email,
                old_password: pwd,
                password: newPwd,
                password1: renewPwd,
            };
            const resp2 = await fetch(`/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newInfo),
            });
            if (resp2.status == 200) {
                PageNotify('success', 'Update password successfully', 'OK');
            } else {
                alert(resp2.status + resp2.statusText);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <Button
                variant="contained"
                disableElevation
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                Change password
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Change password</div>
                        <div>
                            <Button className="min-w-0" onClick={handleClose}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                >
                                    <path
                                        d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L4 3.29289L6.64645 0.646447C6.84171 0.451184 7.15829 0.451184 7.35355 0.646447C7.54882 0.841709 7.54882 1.15829 7.35355 1.35355L4.70711 4L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L4 4.70711L1.35355 7.35355C1.15829 7.54882 0.841709 7.54882 0.646447 7.35355C0.451184 7.15829 0.451184 6.84171 0.646447 6.64645L3.29289 4L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                                        fill="white"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={12}>
                            <div className={stylesSystem.required}>Current password</div>
                            <TextField
                                size="small"
                                id="typeVisaCode"
                                name="typeVisaCode"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                inputProps={{
                                    autoComplete: 'new-password',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.required}>New password</div>
                            <TextField
                                size="small"
                                id="typeVisaCode"
                                name="typeVisaCode"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.required}>Renew password</div>
                            <TextField
                                size="small"
                                id="typeVisaCode"
                                name="typeVisaCode"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={renewPwd}
                                onChange={(e) => setRenewPwd(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    {error !== '' ? (
                        <Alert style={{ marginTop: '8px' }} severity="error">
                            {error}
                        </Alert>
                    ) : (
                        ''
                    )}
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                    <Button onClick={handleChangePassword} className={stylesSystem.admin__button__primary}>
                        Change password
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
