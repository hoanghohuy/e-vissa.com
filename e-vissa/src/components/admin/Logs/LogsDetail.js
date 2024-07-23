'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import stylesAdmin from '@/components/admin/Admin.module.css';
import stylesDetailPost from '@/app/posts/[category]/[post]/page.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';
import { Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function LogsDetail({ selectedRow }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to show detail!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth fullScreen>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Detail log</div>
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
                    <Grid container rowSpacing={2} marginTop={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid item xs={6}>
                            <label className={stylesSystem.label__normal}>Action name:</label>
                            <TextField
                                id="logName"
                                name="logName"
                                type="text"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={selectedRowEdit[0]?.action}
                                readOnly
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <label className={stylesSystem.label__normal}>Account name:</label>
                            <TextField
                                id="accountName"
                                name="accountName"
                                size="small"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={`${selectedRowEdit[0]?.created_by_info?.first_name} ${selectedRowEdit[0]?.created_by_info?.last_name}`}
                                readOnly
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <label className={stylesSystem.label__normal}>IP:</label>
                            <TextField
                                id="IP"
                                name="IP"
                                size="small"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={selectedRowEdit[0]?.IP}
                                readOnly
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <label className={stylesSystem.label__normal}>Log Time:</label>
                            <TextField
                                id="Time"
                                name="IP"
                                size="small"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={selectedRowEdit[0]?.created_at}
                                readOnly
                            />
                        </Grid>
                        {JSON.parse(selectedRowEdit[0]?.desc)?.content ? (
                            <Grid item xs={12}>
                                <div className={`${stylesDetailPost.blog__detail__content} dark:text-[#EDF0FC]`}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: JSON.parse(selectedRowEdit[0]?.desc)?.content,
                                        }}
                                    ></div>
                                </div>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <TextField
                                    id="LogsDescription"
                                    label={'Detail'}
                                    name="LogsDescription"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedRowEdit[0]?.desc}
                                    readOnly
                                    multiline
                                    minRows={4}
                                />
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>

                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
