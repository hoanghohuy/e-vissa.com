'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';

export default function ModuleAdd({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [value, setValue] = useState();
    const [currency, setCurrency] = useState('USD');
    const [valueOn, setValueOn] = useState('people');
    const [desc, setDesc] = useState('');
    const [published, setPublished] = useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddModule = () => {
        if (name.trim() == '') {
            ToastNotify('Please enter service name');
            return;
        }
        const newData = {
            name: name,
            value: value,
            currency: currency,
            value_on: valueOn,
            desc: desc,
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
                        <div>Add new service</div>
                        <div>
                            <Button sx={{ minWidth: 'unset' }} className="min-w-0" onClick={handleClose}>
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
                    {/* <DialogContentText>Thêm Module mới vào hệ thống.</DialogContentText> */}
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <div className={stylesSystem.required}>Service name</div>
                            <TextField
                                size="small"
                                fullWidth
                                id="name"
                                name="name"
                                type="text"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div className={stylesSystem.required}>Value</div>
                            <TextField
                                size="small"
                                fullWidth
                                id="value"
                                name="name"
                                type="number"
                                variant="outlined"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div className={stylesSystem.required}>Value on</div>
                            <FormControl size="small" fullWidth>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={'people'}
                                    value={valueOn}
                                    onChange={(e) => setValueOn(e.target.value)}
                                >
                                    <MenuItem value={'people'}>People</MenuItem>
                                    <MenuItem value={'person'}>Person</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={stylesSystem.required}>Status</div>
                            <FormControl size="small" fullWidth>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={1}
                                    value={published}
                                    onChange={(e) => setPublished(e.target.value)}
                                >
                                    <MenuItem value={1}>Published</MenuItem>
                                    <MenuItem value={0}>Disabled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.required}>Description</div>
                            <TextField
                                multiline
                                minRows={4}
                                size="small"
                                fullWidth
                                id="name"
                                name="name"
                                type="text"
                                variant="outlined"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddModule}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
