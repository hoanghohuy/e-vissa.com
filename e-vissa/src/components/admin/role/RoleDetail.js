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
import { Grid, TextField } from '@mui/material';

export default function RoleDetail({ selectedRow }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [name, setName] = useState(selectedRow[0]?.name);
    const [value, setValue] = useState(selectedRow[0]?.value);

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
        setName(selectedRow[0]?.name);
        setValue(selectedRow[0]?.value);
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
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
                <DialogTitle>Chi tiết</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Chi tiết Role mới vào hệ thống. Chi tiết Role mới vào hệ thống. Chi tiết Role mới vào hệ thống.
                    </DialogContentText>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                readOnly
                                fullWidth
                                id="role_name"
                                label={'Tên role'}
                                name="role_name"
                                type="text"
                                variant="outlined"
                                value={name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                readOnly
                                fullWidth
                                id="role_value"
                                label={'Mã role'}
                                name="role_value"
                                type="text"
                                variant="outlined"
                                value={value}
                            />
                        </Grid>
                    </Grid>
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
