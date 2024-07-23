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

export default function ModuleEdit({ selectedRow, onEdit }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);

    const handleClickOpen = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to edit!',
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

    const handleEditModule = () => {
        const dataEdit = {};
        onEdit(dataEdit);
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button
                variant="contained"
                disableElevation
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth>
                <DialogTitle>Edit Module</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit Module</DialogContentText>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleEditModule} type="submit">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
