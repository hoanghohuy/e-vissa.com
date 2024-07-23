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
import { Grid, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import moment from 'moment';
import dayjs from 'dayjs';
import stylesAdmin from '@/components/admin/Admin.module.css';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Status from '../Status/Status';

export default function CouponEdit({ selectedRow, onEdit }) {
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
    const [published, setPublished] = useState();
    const [disablePrice, setDisablePrice] = useState(false);
    const [disablePercent, setDisablePercent] = useState(false);

    const handleClickOpen = () => {
        if (selectedRowEdit.length !== 1) {
            ToastNotify('Please select only one field to edit.');
            return;
        }
        setOpen(true);
        setCode(selectedRow[0].code);
        setPrice(selectedRow[0].price);
        setStart(selectedRow[0].date_start);
        setEnd(selectedRow[0].date_end);
        setPercent(selectedRow[0].percent);
        setUsageCount(selectedRow[0].usage_count);
        setMaxUsageLimit(selectedRow[0].max_usage_limit);
        setMinimumPurchaseAmount(selectedRow[0].minimum_purchase_amount);
        setPublished(selectedRow[0].published);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditCoupon = () => {
        if (code.trim().length < 6) {
            ToastNotify('Code at least 6 characters');
            return;
        }
        if (start == '') {
            ToastNotify('Please input start date');
            return;
        }
        if (moment(start) > moment(end)) {
            ToastNotify('Start date must be before End date');
            return;
        }
        if (end == '') {
            ToastNotify('Please input end date');
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
            minimum_purchase_amount: minimumPurchaseAmount,
        };
        onEdit(newData);
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className={stylesAdmin.custom__action__edit}>
                <FontAwesomeIcon icon={faFilePen} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle>Edit coupon</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                fullWidth
                                id="name"
                                label={'Code'}
                                name="name"
                                type="text"
                                variant="outlined"
                                value={code}
                                // onChange={(e) => {
                                //     const dataInput = e.target.value;
                                //     if (isAlphanumeric(dataInput)) {
                                //         setCode(e.target.value);
                                //     }
                                // }}
                                size="small"
                                disabled
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={dayjs(start)}
                                    format="DD/MM/YYYY"
                                    size="small"
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setStart(moment(newValue.$d).format('L'));
                                    }}
                                    label={'Start'}
                                    className={stylesSystem.page}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    defaultValue={dayjs(end)}
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setEnd(moment(newValue.$d).format('L'));
                                    }}
                                    label={'End'}
                                    className={stylesSystem.page}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
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
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
                            <TextField
                                fullWidth
                                id="name"
                                label={'Percent'}
                                name="name"
                                type="number"
                                variant="outlined"
                                value={percent}
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
                                size="small"
                                disabled={disablePercent}
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
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
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
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
                        </Grid>
                        <Grid item lg={4} xs={12} md={6} sm={12}>
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
                    <Button className={stylesSystem.admin__button__primary} onClick={handleEditCoupon} type="submit">
                        Edit Coupon
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
