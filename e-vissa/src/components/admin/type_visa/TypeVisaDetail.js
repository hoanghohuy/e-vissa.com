'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import stylesAdmin from '@/components/admin/Admin.module.css';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import stylesSystem from '@/app/page.module.css';
import Swal from 'sweetalert2';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function TypeVisaDetail({ selectedRow }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                showConfirmButton: false,
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
        <>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                <FontAwesomeIcon icon={faEye} />
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Detail type visa</div>
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
                            <TextField
                                size="small"
                                id="typeVisaCode"
                                label={'Type visa code'}
                                name="typeVisaCode"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={selectedRowEdit[0]?.name}
                                readOnly
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="type-visa-input">Type visa</InputLabel>
                                <Select
                                    size="small"
                                    readOnly
                                    defaultValue={selectedRowEdit[0]?.type}
                                    fullWidth
                                    labelId="type-visa-input"
                                    label="Type visa"
                                >
                                    <MenuItem value={'E-visa'}>Electronic Visa (E-visa)</MenuItem>
                                    <MenuItem value={'ESTA'}>
                                        Electronic System for Travel Authorization (ESTA)
                                    </MenuItem>
                                    <MenuItem value={'ETA'}>Electronic Travel Authorization (ETA)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                readOnly
                                multiline
                                minRows={4}
                                fullWidth
                                label={'Description'}
                                type="text"
                                variant="outlined"
                                value={selectedRowEdit[0]?.desc}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
