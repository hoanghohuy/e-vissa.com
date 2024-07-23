'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';

export default function CountryDetail({ selectedRow }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                title: 'Notice',
                text: 'Please select only one field to show detail!',
                icon: 'info',
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
            <Button variant="contained" disableElevation onClick={handleClickDetail}>
                Chi tiết
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth>
                <DialogTitle>Chi tiết</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Chi tiết Country mới vào hệ thống. Chi tiết Country mới vào hệ thống. Chi tiết Country mới vào
                        hệ thống.
                        <br />
                        <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleClose}>
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
