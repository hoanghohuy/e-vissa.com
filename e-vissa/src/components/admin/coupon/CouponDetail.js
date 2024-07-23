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
import stylesSystem from '@/app/page.module.css';
import { Grid, MenuItem, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import dayjs from 'dayjs';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import stylesAdmin from '@/components/admin/Admin.module.css';

export default function CouponDetail({ selectedRow }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [code, setCode] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [price, setPrice] = useState('');
    const [percent, setPercent] = useState('');
    const [usageCount, setUsageCount] = useState('');
    const [maxUsageLimit, setMaxUsageLimit] = useState('');
    const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState('');
    const [published, setPublished] = useState(1);

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            ToastNotify('Please select only one field to show detail.');
            return;
        }
        setOpen(true);
        setCode(selectedRow[0].code);
        setPrice(selectedRow[0].price);
        setStart(selectedRow[0].start_date);
        setEnd(selectedRow[0].start_end);
        setPercent(selectedRow[0].percent);
        setUsageCount(selectedRow[0].usage_count);
        setMaxUsageLimit(selectedRow[0].max_usage_limit);
        setMinimumPurchaseAmount(selectedRow[0].minimum_purchase_amount);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle>Coupon detail</DialogTitle>
                <DialogContent>
                    <DialogContentText>Detail coupon: {code}</DialogContentText>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="name"
                                label={'Code'}
                                name="name"
                                type="text"
                                variant="outlined"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disabled
                                    format="DD/MM/YYYY"
                                    size="small"
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setStart(moment(newValue.$d).format('L'));
                                    }}
                                    label={'Start'}
                                    className={stylesSystem.page}
                                    slotProps={{ textField: { size: 'small' } }}
                                    defaultValue={dayjs(start)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disabled
                                    format="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setEnd(moment(newValue.$d).format('L'));
                                    }}
                                    label={'End'}
                                    className={stylesSystem.page}
                                    slotProps={{ textField: { size: 'small' } }}
                                    defaultValue={dayjs(end)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="name"
                                label={'Price'}
                                name="name"
                                type="text"
                                variant="outlined"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="name"
                                label={'Percent'}
                                name="name"
                                type="text"
                                variant="outlined"
                                value={percent}
                                onChange={(e) => setPercent(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="usage_count"
                                label={'Usage count'}
                                name="usage_count"
                                type="text"
                                variant="outlined"
                                value={usageCount}
                                onChange={(e) => setUsageCount(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                disabled
                                fullWidth
                                id="max_usage_limit"
                                label={'Max usage limit'}
                                name="max_usage_limit"
                                type="text"
                                variant="outlined"
                                value={maxUsageLimit}
                                onChange={(e) => setMaxUsageLimit(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                fullWidth
                                disabled
                                id="minimum_purcharse_amount"
                                label={'Minimum purcharse amount'}
                                name="minimum_purcharse_amount"
                                type="text"
                                variant="outlined"
                                value={minimumPurchaseAmount}
                                onChange={(e) => setMinimumPurchaseAmount(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                fullWidth
                                disabled
                                variant="outlined"
                                defaultValue={1}
                                value={published}
                                onChange={(e) => setPublished(e.target.value)}
                                select
                                label="Published"
                                size="small"
                            >
                                <MenuItem key={1} value={1}>
                                    Published
                                </MenuItem>
                                <MenuItem key={2} value={0}>
                                    Disabled
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
