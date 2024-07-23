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
import { Autocomplete, Grid, MenuItem, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { isAlphanumeric } from '../Function_Admin';
import { CouponDocs } from './docs/couponDocs';
import Status from '../Status/Status';

export default function CouponAdd({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [price, setPrice] = useState('');
    const [percent, setPercent] = useState('');
    const [usageCount, setUsageCount] = useState(0);
    const [maxUsageLimit, setMaxUsageLimit] = useState('');
    const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState(0);
    const [published, setPublished] = useState(1);
    const [disablePrice, setDisablePrice] = useState(false);
    const [disablePercent, setDisablePercent] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddCoupon = () => {
        if (code.trim().length < 6) {
            ToastNotify('Code at least 6 characters');
            return;
        }
        if (start == '') {
            ToastNotify('Please input start date');
            return;
        }
        if (end == '') {
            ToastNotify('Please input end date');
            return;
        }
        if (moment(start) > moment(end)) {
            ToastNotify('Start date must be before End date');
            return;
        }
        if (price == '' && percent == '') {
            ToastNotify('Please input price/percent');
            return;
        }
        if (parseInt(percent) < 0 || parseInt(percent) > 100) {
            ToastNotify('Percent value must be between 0 and 100');
            return;
        }
        const newData = {
            code: code,
            price: price,
            date_start: start,
            date_end: end,
            percent: percent,
            usage_count: usageCount,
            max_usage_limit: maxUsageLimit,
            published: published,
        };
        onAdd(newData);
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                className={stylesSystem.admin__button__primary}
                disableElevation
                onClick={handleClickOpen}
            >
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle>Add new coupon</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Tooltip title={CouponDocs.code}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label={<label className={stylesSystem.required}>Coupon code</label>}
                                    name="name"
                                    type="text"
                                    variant="outlined"
                                    value={code}
                                    onChange={(e) => {
                                        const dataInput = e.target.value;
                                        if (isAlphanumeric(dataInput)) {
                                            setCode(e.target.value);
                                        }
                                    }}
                                    size="small"
                                    inputProps={{ autoComplete: 'off' }}
                                />
                            </Tooltip>
                        </Grid>
                        <Tooltip title={CouponDocs.start}>
                            <Grid item lg={4} xs={12} md={6} sm={12}>
                                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => {
                                            if (newValue && newValue.$d) setStart(moment(newValue.$d).format('L'));
                                        }}
                                        label={<label className={stylesSystem.required}>Start date</label>}
                                        className={stylesSystem.page}
                                        size="small"
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Tooltip>
                        <Tooltip title={CouponDocs.end}>
                            <Grid item lg={4} xs={12} md={6} sm={12}>
                                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => {
                                            if (newValue && newValue.$d) setEnd(moment(newValue.$d).format('L'));
                                        }}
                                        label={<label className={stylesSystem.required}>End date</label>}
                                        className={stylesSystem.page}
                                        size="small"
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Tooltip>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Tooltip title={CouponDocs.price}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label={'Price'}
                                    name="name"
                                    type="number"
                                    variant="outlined"
                                    value={price}
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            setPrice(e.target.value);
                                            setDisablePercent(true);
                                            setPercent(0);
                                        } else {
                                            setPrice(e.target.value);
                                            setDisablePercent(false);
                                        }
                                    }}
                                    size="small"
                                    disabled={disablePrice}
                                    inputProps={{
                                        autoComplete: 'off',
                                    }}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Tooltip title={CouponDocs.percent}>
                                <TextField
                                    fullWidth
                                    label={'Percent'}
                                    type="number"
                                    variant="outlined"
                                    value={percent}
                                    size="small"
                                    disabled={disablePercent}
                                    inputProps={{
                                        maxLength: 3,
                                    }}
                                    onChange={(e) => {
                                        const dataInput = e.target.value;
                                        if (dataInput) {
                                            if (parseInt(dataInput) > 100) {
                                                setPercent(100);
                                                return;
                                            }
                                            setPercent(e.target.value);
                                            setDisablePrice(true);
                                            setPrice(0);
                                        } else {
                                            setPercent(e.target.value);
                                            setDisablePrice(false);
                                        }
                                    }}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Tooltip title={CouponDocs.usage_count}>
                                <TextField
                                    fullWidth
                                    id="usage_count"
                                    label={'Usage count'}
                                    name="usage_count"
                                    type="number"
                                    variant="outlined"
                                    value={usageCount}
                                    onChange={(e) => setUsageCount(e.target.value)}
                                    size="small"
                                    disabled
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Tooltip title={CouponDocs.max_usage_limit}>
                                <TextField
                                    fullWidth
                                    id="max_usage_limit"
                                    label={'Max usage limit'}
                                    name="max_usage_limit"
                                    type="number"
                                    variant="outlined"
                                    value={maxUsageLimit}
                                    onChange={(e) => setMaxUsageLimit(e.target.value)}
                                    size="small"
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Tooltip title={CouponDocs.minimum_purcharse_amount}>
                                <TextField
                                    fullWidth
                                    id="minimum_purcharse_amount"
                                    label={'Minimum purcharse amount'}
                                    name="minimum_purcharse_amount"
                                    type="number"
                                    variant="outlined"
                                    value={minimumPurchaseAmount}
                                    onChange={(e) => setMinimumPurchaseAmount(e.target.value)}
                                    size="small"
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <Status published={published} setPublished={setPublished} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddCoupon}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
