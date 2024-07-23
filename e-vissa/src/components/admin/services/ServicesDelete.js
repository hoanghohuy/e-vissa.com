'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';

export default function ModuleDelete({ onDelete, selectedRow }) {
    // console.log("selectedRow", selectedRow);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        if (selectedRowEdit.length === 0) {
            Swal.fire({
                text: 'Please select only one field to delete!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setOpen(true);
    };
    const handleConfirm = () => {
        onDelete(selectedRow);
        setOpen(false);
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
                className={stylesSystem.admin__button__primary}
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
                <DialogTitle id="alert-dialog-title">Confirm Detele</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Confirm Detele</DialogContentText>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__danger} onClick={handleConfirm} autoFocus>
                        Confirm Detele
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
