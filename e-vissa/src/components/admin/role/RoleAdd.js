'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Grid, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

export default function RoleAdd({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddRole = () => {
        if (name !== '' && value !== '') {
            const newData = {
                name: name,
                value: value,
            };
            onAdd(newData);
            setOpen(false);
        } else {
            setOpen(false);
            Swal.fire({
                title: 'Notice!',
                text: 'Please enter sufficient information',
                icon: 'info',
                confirmButtonText: 'Confirm',
            }).then(() => {
                setOpen(true);
            });
        }
    };

    return (
        <>
            <Button variant="contained" disableElevation onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
                <DialogTitle>Add a new role</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add a new account to the system.</DialogContentText>
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
                        Cancel
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddRole}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
