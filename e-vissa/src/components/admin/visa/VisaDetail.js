'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import Swal from 'sweetalert2';
import { Autocomplete, FormControl, Grid, InputAdornment, MenuItem, Select } from '@mui/material';
import { customDialogTransition, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import VisaServices from '../VisaServices/VisaServices';
import { defaultServices } from '../VisaServices/VisaServicesFunction';
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function VisaDetail({
    accessToken,
    selectedRow,
    listTypeVisa,
    listCurrency,
    listCountries,
    onDuppicate,
}) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [countryID, setCountryID] = useState('');
    const [typeVisa, setTypeVisa] = useState('');
    const [validity, setValidity] = useState();
    const [validityType, setValidityType] = useState('');
    const [governmentFee, setGovernmentFee] = useState();
    const [requirementDesc, setRequirementDesc] = useState('');
    const [portOfEntry, setPortOfEntry] = useState('');
    const [note, setNote] = useState('');

    const [governmentFeeCurrency, setGovernmentFeeCurrency] = useState('USD');
    const [lengthOfStay, setLengthOfStay] = useState();
    const [entryType, setEntryType] = useState();
    const [status, setStatus] = useState('');
    const [allowedCountry, setAllowedCountry] = useState([]);
    const [services, setServices] = useState([]);

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please choose a only one row to show detail',
                icon: 'info',
                showConfirmButton: false,
            });
            return;
        } else {
            setOpen(true);
            setCountryID(selectedRow[0].country);
            setTypeVisa(selectedRow[0]?.visa);
            setValidity(selectedRow[0]?.validity);
            setValidityType(selectedRow[0]?.validity_type);
            setGovernmentFee(selectedRow[0]?.government_fee);
            setRequirementDesc(selectedRow[0]?.requirement_desc);
            setPortOfEntry(selectedRow[0]?.port_of_entry);
            setNote(selectedRow[0]?.note);
            setGovernmentFeeCurrency(selectedRow[0]?.government_fee_currency);
            // setCurrency(selectedRow[0].currency)
            setLengthOfStay(selectedRow[0]?.length_of_stay);
            setEntryType(selectedRow[0]?.entry_type);
            setStatus(selectedRow[0]?.published);
            setServices(selectedRow[0]?.services ? JSON.parse(selectedRow[0]?.services) : defaultServices);
            handleSetDefaultlistCountries(selectedRow[0]?.allowed_country_info);
        }
        setOpen(true);
    };

    const handleSetDefaultlistCountries = (listSelected) => {
        let list = [];
        listSelected &&
            listSelected.length > 0 &&
            listSelected?.map((item, index) => {
                list.push(listCountries?.find((itemFind) => itemFind.code == item));
            });
        setAllowedCountry(list);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    const handleDuplicate = async () => {
        handleClose();
        const data = {
            visa_detail_id: selectedRow[0].id,
            visa_id: selectedRow[0].visa,
        };

        const resp = await fetch(`/api/admin/xref_visa_country/${selectedRow[0].country}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
            body: JSON.stringify(data),
        });
        const dataJson = await resp.json();
        if (dataJson && dataJson.success) {
            ToastNotify(dataJson.success, 'success');
            onDuppicate();
        } else {
            ToastNotify('Something went wrong');
        }
    };

    return (
        <>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xl'}
                fullWidth
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Show detail visa</div>
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
                    {/* <DialogContentText>Chi tiết Visa mới vào hệ thống.</DialogContentText> */}
                    <Grid container rowSpacing={2} marginTop={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.required}>E-visa for</div>
                            <Autocomplete
                                size="small"
                                readOnly
                                fullWidth
                                disablePortal
                                id="country_id"
                                options={listCountries}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                defaultValue={listCountries.find((item) => item.code == countryID)}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.code}>
                                            {option.name}
                                        </li>
                                    );
                                }}
                                onInputChange={(event, newInputValue) => setCountryID(newInputValue)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.required}>Visa type</div>
                            <TextField size="small" readOnly fullWidth variant="outlined" select value={typeVisa}>
                                {listTypeVisa &&
                                    listTypeVisa.length > 0 &&
                                    listTypeVisa.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.required}>Validity</div>
                            <TextField
                                size="small"
                                readOnly
                                fullWidth
                                id="validity"
                                name="validity"
                                type="text"
                                variant="outlined"
                                value={validity}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <InputAdornment position="end">
                                                <FormControl
                                                    fullWidth
                                                    style={{
                                                        width: '100px',
                                                        transform: 'translateX(15px)',
                                                        border: 'none',
                                                    }}
                                                >
                                                    <Select
                                                        size="small"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        defaultValue={validityType}
                                                        onChange={(event) => setValidityType(event.target.value)}
                                                    >
                                                        <MenuItem value={'d'}>day(s)</MenuItem>
                                                        <MenuItem value={'m'}>month</MenuItem>
                                                        <MenuItem value={'y'}>year</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </InputAdornment>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.required}>Length of stay</div>
                            <TextField
                                fullWidth
                                size="small"
                                id="length_of_stay"
                                name="length_of_stay"
                                type="number"
                                variant="outlined"
                                value={lengthOfStay}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.label__normal}>Government fee</div>
                            <TextField
                                size="small"
                                readOnly
                                fullWidth
                                id="goverment_fee"
                                name="goverment_fee"
                                type="number"
                                variant="outlined"
                                value={governmentFee}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.required}>Entry type:</div>
                            <TextField
                                readOnly
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={entryType}
                                value={entryType}
                                select
                            >
                                <MenuItem key={1} value={'single'}>
                                    Single entry
                                </MenuItem>
                                <MenuItem key={2} value={'double'}>
                                    Double entry
                                </MenuItem>
                                <MenuItem key={3} value={'triple'}>
                                    Triple entry
                                </MenuItem>
                                <MenuItem key={4} value={'multiple'}>
                                    Multiple entry
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesSystem.label__normal}>Status</div>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                select
                            >
                                <MenuItem key={1} value={1}>
                                    Active
                                </MenuItem>
                                <MenuItem key={2} value={0}>
                                    Disabled
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <VisaServices setServices={setServices} services={services} />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.label__normal}>Country:</div>
                            <Autocomplete
                                multiple
                                size="small"
                                readOnly
                                options={listCountries}
                                defaultValue={allowedCountry}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </li>
                                )}
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder="Allowed with" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.label__normal}>Requirement document:</div>
                            <TextField
                                readOnly
                                size="small"
                                fullWidth
                                id="requirement_desc"
                                name="requirement_desc"
                                type="text"
                                variant="outlined"
                                multiline
                                minRows={5}
                                maxRows={10}
                                value={requirementDesc}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.label__normal}>Port of entry:</div>
                            <TextField
                                readOnly
                                size="small"
                                fullWidth
                                id="port_of_entry"
                                name="port_of_entry"
                                type="text"
                                variant="outlined"
                                multiline
                                minRows={5}
                                maxRows={10}
                                value={portOfEntry}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesSystem.label__normal}>Note:</div>
                            <TextField
                                size="small"
                                fullWidth
                                id="note"
                                name="note"
                                type="text"
                                variant="outlined"
                                multiline
                                minRows={5}
                                maxRows={10}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleDuplicate}>
                        Duplicate
                    </Button>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
