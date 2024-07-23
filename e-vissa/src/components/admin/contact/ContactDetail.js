'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import stylesAdmin from '../Admin.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';
import { Grid, TextField, Tooltip } from '@mui/material';
import { validateEmail } from '../../../utils/validation';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function ContactDetail({ selectedRow, onConfirm }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [email, setEmail] = useState('');

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to show detail!',
                icon: 'info',
                showConfirmButton: false,
            });
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if (email !== '' && !validateEmail(email.trim())) {
            ToastNotify('Email is not valid');
            return;
        }
        const data = {
            email: email,
            id: selectedRowEdit[0].id,
        };
        setOpen(false);
        onConfirm(data);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            {' '}
            <Tooltip title={"Let assign sales' email"}>
                <Button variant="outlined" onClick={handleClickDetail} className={stylesAdmin.custom__action__edit}>
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{
                            fontSize: '2em',
                            color: selectedRow[0]?.confirmed_email ? 'green' : 'grey',
                        }}
                    />
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Detail contact</div>
                        <div>
                            <Button sx={{ minWidth: 'unset' }} className="min-w-0" onClick={handleClose}>
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
                        <Grid item lg={4} xs={6}>
                            <div className={stylesSystem.required}>Customer name</div>
                            <TextField
                                minRows={4.5}
                                defaultValue={selectedRow[0]?.name}
                                name="confirm by"
                                variant="outlined"
                                size="small"
                                fullWidth
                                readOnly
                                disabled
                            />
                        </Grid>
                        <Grid item lg={5} xs={6}>
                            <div className={stylesSystem.required}>Email</div>
                            <TextField
                                minRows={4.5}
                                defaultValue={selectedRow[0]?.email}
                                name="confirm by"
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item lg={3} xs={6}>
                            <div className={stylesSystem.required}>Phone</div>
                            <TextField
                                minRows={4}
                                defaultValue={selectedRow[0]?.phone_number}
                                name="confirm by"
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item lg={12} xs={6}>
                            <div className={stylesSystem.required}>Subject</div>
                            <TextField
                                minRows={4}
                                defaultValue={selectedRow[0]?.subject}
                                name="confirm by"
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item lg={12} xs={6}>
                            <div className={stylesSystem.required}>Message</div>
                            <TextField
                                multiline
                                minRows={5}
                                defaultValue={selectedRow[0]?.message}
                                name="confirm by"
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item lg={12} xs={6}>
                            <div className={stylesSystem.required}>Salesperson's email:</div>
                            <TextField
                                name="confirm by"
                                variant="outlined"
                                size="small"
                                fullWidth
                                autoFocus
                                placeholder="Empty field: Assign to myself for processing this contact"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    {/* <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button className={stylesSystem.admin__button__primary} onClick={handleConfirm}>
                        Confirm contact
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
