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
import { Grid } from '@mui/material';

export default function RoleEdit({ selectedRow, onEdit }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [name, setName] = useState(selectedRow[0]?.name);
    const [value, setValue] = useState(selectedRow[0]?.value);

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
        setName(selectedRow[0]?.name);
        setValue(selectedRow[0]?.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditRole = () => {
        if (name !== '' && value !== '') {
            const editData = {
                id: selectedRow[0].id,
                name: name,
                value: value,
            };
            onEdit(editData);
            setOpen(false);
        } else {
            setOpen(false);
            Swal.fire({
                title: 'Thông báo!',
                text: 'Vui lòng nhập đủ thông tin',
                icon: 'info',
                confirmButtonText: 'Đã hiểu',
            }).then(() => {
                setOpen(true);
            });
        }
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
                    <DialogContentText>Edit a new Role into the system</DialogContentText>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="role_name"
                                label={'Tên role'}
                                name="role_name"
                                type="text"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="role_value"
                                label={'Mã role'}
                                name="role_value"
                                type="text"
                                variant="outlined"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleEditRole} type="submit">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
