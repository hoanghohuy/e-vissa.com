'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import stylesAdmin from '@/components/admin/Admin.module.css';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import Status from '../Status/Status';

export default function TypeVisaAdd({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [typeVisaCode, setTypeVisaCode] = useState('');
    const [typeVisaName, setTypeVisaName] = useState('');
    const [typeOfVisa, setTypeOfVisa] = useState('');
    const [published, setPublished] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTypeVisa = () => {
        if (typeVisaCode.trim().length < 3) {
            ToastNotify('Type visa code must > 3 characters');
            return;
        }
        if (typeVisaName.trim().length < 3) {
            ToastNotify('Type visa name must > 3 characters');
            return;
        }
        const newData = {
            name: typeVisaCode,
            desc: typeVisaName,
            type: typeOfVisa,
            published: published,
        };
        onAdd(newData);
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                disableElevation
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>New type visa</div>
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
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={4}>
                            <TextField
                                size="small"
                                id="typeVisaCode"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Type visa code</label>
                                    </>
                                }
                                name="typeVisaCode"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={typeVisaCode}
                                onChange={(e) => setTypeVisaCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">
                                    <label className={stylesSystem.required}>Type visa</label>
                                </InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label={<label className={stylesSystem.required}>Type visa</label>}
                                    onChange={(event) => setTypeOfVisa(event.target.value)}
                                >
                                    <MenuItem value={'E-visa'}>Electronic Visa (E-visa)</MenuItem>
                                    <MenuItem value={'ESTA'}>
                                        Electronic System for Travel Authorization (ESTA)
                                    </MenuItem>
                                    <MenuItem value={'ETA'}>Electronic Travel Authorization (ETA)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6} md={2} lg={2}>
                            <Status published={published} setPublished={setPublished} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                minRows={4}
                                id="typeVisaName"
                                label={'Description'}
                                name="typeVisaName"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={typeVisaName}
                                onChange={(e) => setTypeVisaName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                    <Button onClick={handleAddTypeVisa} className={stylesSystem.admin__button__primary}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
