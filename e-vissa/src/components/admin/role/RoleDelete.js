'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';

export default function RoleDelete({ onDelete, selectedRow }) {
    // console.log("selectedRow", selectedRow);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        if (selectedRowEdit.length === 0) {
            Swal.fire({
                title: 'Thông báo!',
                text: 'Vui lòng chọn dữ liệu để xoá',
                icon: 'info',
                confirmButtonText: 'Đã hiểu',
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
            <Button onClick={handleDelete} disableElevation variant="contained">
                Xoá
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xoá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn xoá dữ liệu đang chọn không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleClose}>
                        Quay lại
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleConfirm} autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
