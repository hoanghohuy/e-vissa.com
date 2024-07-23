'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import { Autocomplete, Box, FormControl, Grid, InputAdornment, MenuItem, Select, Tooltip } from '@mui/material';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Status from '../Status/Status';
import VisaServices from '../VisaServices/VisaServices';
import { defaultServices, filterVisaServiceData } from '../VisaServices/VisaServicesFunction';
import { customDialogTransition, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';

export default function VisaEdit({ selectedRow, onEdit, listTypeVisa, listCurrency, listCountries }) {
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
    const [governmentFeeCurrency, setGovernmentFeeCurrency] = useState('');
    const [lengthOfStay, setLengthOfStay] = useState();
    const [entryType, setEntryType] = useState();
    const [published, setPublished] = useState('');
    const [services, setServices] = useState([]);

    const handleClickOpen = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please choose a only one row to edit',
                icon: 'info',
                showConfirmButton: false,
            });
            return;
        } else {
            setOpen(true);
            setCountryID(selectedRow[0].country);
            setTypeVisa(selectedRow[0]?.visa);
            setValidity(selectedRow[0]?.validity);
            setServices(selectedRow[0]?.services ? JSON.parse(selectedRow[0]?.services) : defaultServices);
            setValidityType(selectedRow[0]?.validity_type);
            setGovernmentFee(selectedRow[0]?.government_fee);
            setNote(selectedRow[0]?.note);
            setRequirementDesc(selectedRow[0]?.requirement_desc);
            setPortOfEntry(selectedRow[0]?.port_of_entry);
            setGovernmentFeeCurrency(selectedRow[0]?.government_fee_currency);
            setPublished(selectedRow[0]?.published);
            setLengthOfStay(selectedRow[0]?.length_of_stay);
            setEntryType(selectedRow[0]?.entry_type);
        }
    };

    const handleResetFieldForm = () => {
        setCountryID('');
        setTypeVisa('');
        setValidity('');
        setGovernmentFee('');
        setRequirementDesc('');
        setPortOfEntry('');
        setPublished('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditVisa = () => {
        if (countryID && typeVisa && validity) {
            const countryIDObject = listCountries.find((item) => item.name === countryID);
            const typeVisaObject = listTypeVisa.find((item) => item.id === typeVisa);

            const newData = {
                id: selectedRow[0]?.id,
                country: countryIDObject?.code,
                visa: typeVisaObject?.id,
                services: filterVisaServiceData(services),
                validity: validity,
                validity_type: validityType,
                government_fee: governmentFee,
                requirement_desc: requirementDesc,
                port_of_entry: portOfEntry,
                note: note,
                government_fee_currency: governmentFeeCurrency,
                entry_type: entryType,
                length_of_stay: lengthOfStay,
                published: published,
            };
            onEdit(newData);
            handleResetFieldForm();
            setOpen(false);
        } else {
            Swal.fire({
                text: 'Please insert all required',
                icon: 'info',
                showConfirmButton: false,
            });
        }
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className={stylesAdmin.custom__action__edit}>
                <FontAwesomeIcon icon={faFilePen} />
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
                        <div>Edit detail visa</div>
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
                    {/* <DialogContentText>Edit Visa mới vào hệ thống.</DialogContentText> */}
                    <Grid container rowSpacing={2} marginTop={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>E-visa</div>
                            <Autocomplete
                                disabled
                                size="small"
                                fullWidth
                                disablePortal
                                id="country_id"
                                options={listCountries}
                                renderInput={(params) => (
                                    <TextField sx={customTextFieldAdmin} {...params} variant="outlined" />
                                )}
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
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>Visa type</div>
                            <TextField
                                sx={customTextFieldAdmin}
                                size="small"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {
                                    setTypeVisa(e.target.value);
                                }}
                                select
                                value={typeVisa}
                            >
                                {listTypeVisa &&
                                    listTypeVisa.length > 0 &&
                                    listTypeVisa
                                        .filter((visa) => visa.published == 1)
                                        .map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {`${item.name} ${item.type}`}
                                            </MenuItem>
                                        ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>Validity</div>
                            <TextField
                                fullWidth
                                size="small"
                                id="validity"
                                name="validity"
                                type="number"
                                variant="outlined"
                                value={validity}
                                onChange={(e) => setValidity(e.target.value)}
                                sx={customTextFieldAdmin}
                                InputProps={{
                                    endAdornment: (
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
                                                    labelId="demo-simple-select-label"
                                                    size="small"
                                                    id="demo-simple-select"
                                                    defaultValue={validityType}
                                                    onChange={(event) => setValidityType(event.target.value)}
                                                >
                                                    <MenuItem value={'d'}>days</MenuItem>
                                                    <MenuItem value={'m'}>month(s)</MenuItem>
                                                    <MenuItem value={'y'}>year(s)</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>Length of stay</div>
                            <TextField
                                fullWidth
                                sx={customTextFieldAdmin}
                                size="small"
                                id="length_of_stay"
                                name="length_of_stay"
                                type="number"
                                variant="outlined"
                                value={lengthOfStay}
                                onChange={(e) => setLengthOfStay(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesAdmin.admin__label}>Government fee</div>
                            <TextField
                                fullWidth
                                id="goverment_fee"
                                name="goverment_fee"
                                size="small"
                                type="number"
                                variant="outlined"
                                value={governmentFee}
                                sx={customTextFieldAdmin}
                                onChange={(e) => setGovernmentFee(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                }}
                                // InputProps={{
                                //     endAdornment: (
                                //         <Autocomplete
                                //             style={{ width: '250px', transform: 'translateX(15px)' }}
                                //             disablePortal
                                //             size="small"
                                //             id="governmentFeeCurrency"
                                //             options={listCurrency}
                                //             renderInput={(params) => <TextField {...params} />}
                                //             renderOption={(props, option) => {
                                //                 return (
                                //                     <li {...props} key={option.code}>
                                //                         {`${option.code} ${option.symbol ? option.symbol : ''}`}
                                //                     </li>
                                //                 );
                                //             }}
                                //             defaultValue={governmentFeeCurrency}
                                //             value={governmentFeeCurrency}
                                //             onChange={(event, newInputValue) => {
                                //                 setGovernmentFeeCurrency(newInputValue?.code);
                                //             }}
                                //         />
                                //     ),
                                // }}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <div className={stylesAdmin.admin__label__required}>Entry type:</div>
                            <TextField
                                sx={customTextFieldAdmin}
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={entryType}
                                value={entryType}
                                onChange={(e) => setEntryType(e.target.value)}
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
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            <div className={stylesAdmin.admin__label}>Status:</div>
                            <Status published={published} setPublished={setPublished} label={false} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <VisaServices setServices={setServices} services={services} />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesAdmin.admin__label}>
                                Requirement document:
                                <Tooltip
                                    title={
                                        'The requirement document will apply to all countries utilizing this visa. If modifications are needed for a specific country, please use the "Supporting Doc" button.'
                                    }
                                >
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ paddingLeft: '5px' }} />
                                </Tooltip>
                            </div>
                            <TextField
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
                                onChange={(e) => setRequirementDesc(e.target.value)}
                                sx={customTextFieldAdmin}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesAdmin.admin__label}>
                                Port of entry:
                                <Tooltip
                                    title={
                                        'The port of entry will apply to all countries utilizing this visa. If modifications are needed for a specific country, please use the "Supporting Doc" button.'
                                    }
                                >
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ paddingLeft: '5px' }} />
                                </Tooltip>
                            </div>
                            <TextField
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
                                onChange={(e) => setPortOfEntry(e.target.value)}
                                sx={customTextFieldAdmin}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesAdmin.admin__label}>
                                Note:{' '}
                                <Tooltip
                                    title={
                                        'The note is for sales purposes only and not be displayed in the user interface (UI).'
                                    }
                                >
                                    {' '}
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ paddingLeft: '5px' }} />
                                </Tooltip>
                            </div>
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
                                sx={customTextFieldAdmin}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                    <Button onClick={handleEditVisa} className={stylesSystem.admin__button__primary}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
