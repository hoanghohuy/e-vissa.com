'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { isSuccessStatus } from '@/utils/validation';
import Alert from '@mui/material/Alert';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';

export default function ModuleDelete({ onDelete, selectedRow, token, handleAfterDelete }) {
    // console.log("selectedRow", selectedRow);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [open, setOpen] = useState(false);
    const handleDelete = async () => {
        if (selectedRowEdit.length === 0 || selectedRowEdit.length > 1) {
            Swal.fire({
                text: 'Please select only one image to detete!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setOpen(true);
    };
    const handleConfirm = async () => {
        // onDelete(selectedRow);
        // setOpen(false);
        try {
            console.log('selectedRowEdit', selectedRowEdit);
            let fd = new FormData();
            selectedRowEdit.map((item) => {
                fd.append('files', item.name);
            });
            const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/files`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: fd,
            });
            if (isSuccessStatus(request.status)) {
                setOpen(false);
                handleAfterDelete();
            } else {
                const resp = await request.json();
                ToastNotify(`${request.status} ${resp.error}`);
            }
        } catch (error) {
            throw error;
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);
    return (
        <>
            <Button
                onClick={handleDelete}
                disableElevation
                variant="contained"
                className={stylesSystem.admin__button__danger}
            >
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'sm'}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" className={stylesAdmin.custom__header__dialog__danger}>
                    Confirm delete?
                </DialogTitle>
                <DialogContentText></DialogContentText>
                <DialogContent>
                    {selectedRowEdit.map((item) => (
                        <>
                            <img
                                style={{ border: '1px solid #ccc' }}
                                className="w-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item.link}`}
                            />
                            <label className="text-sm">{item.link}</label>
                        </>
                    ))}
                    <Alert className="mt-3" variant="filled" severity="error">
                        You may accidentally delete someone else's photo!
                    </Alert>
                </DialogContent>
                <DialogActions className="pr-6 pb-6">
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__danger} onClick={handleConfirm} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
