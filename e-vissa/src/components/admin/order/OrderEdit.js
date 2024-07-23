'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import stylesSystem from '@/app/page.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function OrderEdit({ selectedRow, onEdit }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);

    const handleClickOpen = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                title: 'Notice',
                text: 'Please select only one field to edit!',
                icon: 'info',
            });
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddOrder = () => {
        const selectedRowCopy = selectedRow;
        onEdit(selectedRowCopy[0]);
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="contained" disableElevation onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit a new Order into the system
                        <br />
                        <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddOrder} type="submit">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
