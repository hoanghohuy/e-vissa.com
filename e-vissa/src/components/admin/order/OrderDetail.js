'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import {
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import styles from './css/Order.module.css';
import stylesDetail from '@/app/check-order/CheckOrder.module.css';
import orderStatus from '@/dbx/e-vissa/seeders/data/order_data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { prefixOrder, prefixTurkeyOrder } from '../../../../settings';

export default function OrderDetail({ selectedRow, accessToken, onConfirm, dataServices, site }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [listPeople, setListPeople] = useState([]);
    const [listService, setListService] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [statusOrder, setStatusOrder] = useState('');
    const [note, setNote] = useState('');
    const [value, setValue] = React.useState('1');
    const [loadingInfo, setLoadingInfo] = useState(true);
    const totalPriceRef = React.useRef();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickDetail = async () => {
        if (selectedRowEdit.length !== 1) {
            ToastNotify('Please select only one field to show detail.');
            return;
        }
        setOpen(true);
        try {
            setLoadingInfo(true);
            const visaID = selectedRow[0].id;
            if (visaID) {
                let API_LINK_SEARCH = '';
                if (site && site == 'Evissa') {
                    API_LINK_SEARCH = '/api/admin/orders';
                }
                if (site && site == 'Turkey') {
                    API_LINK_SEARCH = '/api/admin/turkey/orders';
                }
                const order = await fetch(`${API_LINK_SEARCH}/${visaID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    },
                });
                if (order.status === 200) {
                    const resp = await order.json();
                    setDataOrder(resp);
                }
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingInfo(false);
        }
        const listPeopleOrg = selectedRow[0]?.another_people;
        if (listPeopleOrg) {
            setListPeople(JSON.parse(listPeopleOrg));
        }
        setStatusOrder(selectedRow[0]?.status);
        setNote(selectedRow[0]?.admin_note);
        const listServiceOrg = selectedRow[0]?.service_ids;
        if (listServiceOrg) {
            const listServiceID = JSON.parse(listServiceOrg);
            if (listServiceID && listServiceID.length > 0) {
                const filteredArray = dataServices.filter((obj) => listServiceID.includes(obj.id));
                setListService(filteredArray);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onShowPassport = (link) => {
        if (link) {
            setOpen(false);
            Swal.fire({
                imageUrl: `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${link}`,
                imageAlt: 'View passport image detail',
                showConfirmButton: false,
                padding: 20,
            }).then(() => setOpen(true));
        }
    };

    const handleConfirm = () => {
        let bodyObjectConfirm = {
            id: selectedRow[0]?.id,
            status: statusOrder,
            admin_note: note,
        };
        if (site && (site == 'Evissa') & totalPriceRef.current.value) {
            bodyObjectConfirm.total_price = parseInt(totalPriceRef.current.value);
        }
        onConfirm(bodyObjectConfirm);
        setOpen(false);
    };

    const getStandardFee = (data) => {
        if (!data) {
            return 0;
        } else {
            const dataObj = JSON.parse(data);
            if (dataObj) {
                return dataObj.visaStandardFee;
            } else {
                return 0;
            }
        }
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button
                variant="outlined"
                disableElevation
                onClick={handleClickDetail}
                className={stylesAdmin.custom__action__edit}
            >
                <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: '18px' }} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>
                            Order {site == 'Evissa' ? prefixOrder : prefixTurkeyOrder}
                            {selectedRow[0]?.id} ||{' '}
                            {
                                listCountries.find(
                                    (item) => item.code == selectedRow[0]?.xref_visa_country_info?.country,
                                )?.name
                            }{' '}
                            Evisa
                        </div>
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
                <DialogContent style={{ paddingTop: '16px' }}>
                    {loadingInfo ? (
                        <CircularProgress />
                    ) : (
                        <Grid
                            sx={{ fontFamily: 'DM Sans' }}
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                        >
                            <Grid item lg={2} xs={3} md={3} sm={3}>
                                <div className="block bg-[#F4F4F4] p-2 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div>ID:</div>
                                    <label className={styles.label}>
                                        {/* {site == 'Evissa' ? prefixOrder : prefixTurkeyOrder} */}
                                        {selectedRow[0]?.id}
                                    </label>
                                </div>
                            </Grid>
                            <Grid item lg={2} xs={3} md={3} sm={3}>
                                <div className="block bg-[#F4F4F4] p-2 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div>Payment method:</div>
                                    <div className={styles.label}>
                                        {selectedRow[0]?.payment_method ? selectedRow[0]?.payment_method : 'null'}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={2} xs={3} md={3} sm={3}>
                                <div className="block bg-[#F4F4F4] p-2 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div>Transaction:</div>
                                    <div className={styles.label}>
                                        {selectedRow[0]?.transaction ? selectedRow[0]?.transaction : 'null'}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={2} xs={4} md={4} sm={4}>
                                <div className="block bg-[#F4F4F4] p-2 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div>Place On:</div>
                                    <label className={styles.label}>{selectedRow[0]?.created_at}</label>
                                </div>
                            </Grid>
                            <Grid item lg={2} xs={4} md={4} sm={4}>
                                <div className="block bg-[#F4F4F4] p-2 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div>Latest update:</div>
                                    <label className={styles.label}>{selectedRow[0].updated_at}</label>
                                </div>
                            </Grid>
                            <Grid item lg={2} xs={4} md={4} sm={4}>
                                <div className="block bg-[#F4F4F4] p-2 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div> Status:</div>
                                    <label className={`${styles[selectedRow[0]?.status]}`}>
                                        {selectedRow[0]?.status}
                                    </label>
                                </div>
                            </Grid>
                            <Grid item lg={4} xs={12} md={12} sm={12}>
                                <div className="block bg-[#F4F4F4] p-4 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div className="uppercase font-[600] pb-2">Visa detail</div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <div>From: </div>
                                            <div className="flex gap-2 font-[600]">
                                                {
                                                    listCountries.find(
                                                        (item) =>
                                                            item.code ==
                                                            selectedRow[0]?.xref_visa_country_info?.allowed_country,
                                                    )?.name
                                                }
                                                <img
                                                    className="h-5 w-auto"
                                                    src={`/flags/png100px/${selectedRow[0]?.xref_visa_country_info?.allowed_country.toLowerCase()}.png`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>To: </div>
                                            <div className="flex gap-2 font-[600]">
                                                {
                                                    listCountries.find(
                                                        (item) =>
                                                            item.code ==
                                                            selectedRow[0]?.xref_visa_country_info?.country,
                                                    )?.name
                                                }
                                                <img
                                                    className="h-5 w-auto"
                                                    src={`/flags/png100px/${selectedRow[0]?.xref_visa_country_info?.country.toLowerCase()}.png`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Arrival date: </div>
                                            <div className="font-[600]">{selectedRow[0]?.arrival_date}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Departure date: </div>
                                            <div className="font-[600]">{selectedRow[0]?.departure_date}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Arrival port: </div>
                                            <div className="font-[600]">{selectedRow[0]?.arrival_port}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Entry type: </div>
                                            <div className="font-[600] capitalize">
                                                {site &&
                                                    site == 'Evissa' &&
                                                    dataOrder?.xref_visa_country_info.visa_detail_info.entry_type +
                                                        ' Entry'}
                                                {site && site == 'Turkey'
                                                    ? dataOrder?.xref_visa_country_info.visa_detail_info.is_single
                                                        ? 'Single Entry'
                                                        : 'Multiple Entry'
                                                    : ''}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Validity: </div>
                                            <div className="font-[600]">
                                                {dataOrder?.xref_visa_country_info.visa_detail_info.validity} days
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Length of stay: </div>
                                            <div className="font-[600]">
                                                {dataOrder?.xref_visa_country_info.visa_detail_info.length_of_stay} days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={4} xs={12} md={12} sm={12}>
                                <div className="block bg-[#F4F4F4] p-4 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div className="uppercase font-[600] pb-2">Contact information</div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <div>First name: </div>
                                            <div className="font-[600]">{selectedRow[0]?.first_name}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Last name: </div>
                                            <div className="font-[600]">{selectedRow[0]?.last_name}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Email: </div>
                                            <div className="font-[600]">{selectedRow[0]?.email}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Phone number: </div>
                                            <div className="font-[600]">{selectedRow[0]?.phone_number}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Address: </div>
                                            <div className="font-[600]">{selectedRow[0]?.address}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div>Note: </div>
                                            <div className="font-[600]">{selectedRow[0]?.customer_note}</div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={4} xs={12} md={12} sm={12}>
                                <div className="block bg-[#F4F4F4] p-4 border-[1px] border-[#EFEFEF] rounded-md">
                                    <div className="uppercase font-[600] pb-2">Applicants ({listPeople.length})</div>
                                    {listPeople &&
                                        listPeople.length > 0 &&
                                        listPeople.map((item, index) => (
                                            <ListItemText
                                                key={index}
                                                primary={
                                                    <div className="font-bold">
                                                        {item.first_name} {item.last_name}
                                                    </div>
                                                }
                                                secondary={
                                                    item.passport ? (
                                                        <div
                                                            onClick={() => onShowPassport(item.passport)}
                                                            name={item.passport}
                                                            className="cursor-pointer"
                                                        >
                                                            Detail
                                                        </div>
                                                    ) : (
                                                        <div>Empty document</div>
                                                    )
                                                }
                                            />
                                        ))}
                                </div>
                            </Grid>

                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <div className={styles.price}>
                                    <div className={styles.price__container}>
                                        <div className={stylesDetail.trip__details__visa__order__divider}></div>
                                        <div className="flex justify-between font-[600]">
                                            <div>Number of applicants</div>
                                            <div>{listPeople && listPeople.length}</div>
                                        </div>
                                        <div className="flex justify-between font-[600]">
                                            <div className="text-[15px] font-dmsans font-bold">Gorvernment fee</div>
                                            <div>
                                                {dataOrder?.xref_visa_country_info?.visa_detail_info?.government_fee}{' '}
                                                USD
                                            </div>
                                        </div>
                                        <div className="flex justify-between font-[600]">
                                            <div className="text-[15px] font-dmsans font-bold">Standard fee</div>
                                            <div>
                                                {site == 'Turkey' &&
                                                    dataOrder?.xref_visa_country_info?.visa_detail_info
                                                        ?.standard_fee}{' '}
                                                {site == 'Evissa' && getStandardFee(dataOrder?.detail_price)} USD
                                            </div>
                                        </div>
                                        <div className="flex justify-between font-[600]">
                                            <div>
                                                <div className="text-[15px] font-dmsans font-bold">
                                                    Processing speed
                                                </div>
                                                <div>
                                                    {listService &&
                                                        listService.length > 0 &&
                                                        listService.map((item, index) => (
                                                            <label
                                                                key={index}
                                                                className="font-[400] italic text-[14px]"
                                                            >
                                                                {item.name} {item.value} {item.currency}
                                                            </label>
                                                        ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label>
                                                    (
                                                    {listService &&
                                                        listService.length > 0 &&
                                                        listService.map((item, index) => (
                                                            <label key={index}>
                                                                {item.name} {item.value} {item.currency}
                                                                {index < listService.length - 1 ? ' + ' : ''}
                                                            </label>
                                                        ))}
                                                    )
                                                </label>{' '}
                                                {selectedRow[0]?.original_price
                                                    ? selectedRow[0]?.total_price - selectedRow[0]?.original_price
                                                    : 0}{' '}
                                                USD
                                            </div>
                                        </div>
                                        <div className={stylesDetail.trip__details__visa__order__divider}></div>
                                        <div className={stylesDetail.trip__details__visa__order__fee__item}>
                                            <div className={stylesDetail.trip__details__visa__order__fee__total}>
                                                <div
                                                    className={
                                                        stylesDetail.trip__details__visa__order__fee__total__title
                                                    }
                                                >
                                                    Total Fee
                                                </div>
                                            </div>
                                            <div className={stylesDetail.trip__details__visa__order__fee__price__total}>
                                                <div className="font-[800] text-[16px]">
                                                    <input
                                                        disabled={site && site == 'Turkey'}
                                                        type="number"
                                                        className="px-2 w-[72px] outline-none border border-[#ccc] mr-2"
                                                        defaultValue={selectedRow[0]?.total_price}
                                                        ref={totalPriceRef}
                                                    />{' '}
                                                    USD ({listPeople.length} applicants)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <TextField
                                    label={'Admin Note'}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    placeholder="Admin note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <FormControl size="small" style={{ width: '200px', marginRight: '8px' }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            size="small"
                            value={statusOrder}
                            label="Status"
                            onChange={(e) => setStatusOrder(e.target.value)}
                        >
                            {orderStatus.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleConfirm}>
                        Save
                    </Button>
                    {/* <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
