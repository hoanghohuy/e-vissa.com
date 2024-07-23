'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, FormControl, Grid, InputAdornment, MenuItem, Select, Tooltip } from '@mui/material';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Status from '../Status/Status';
import VisaServices from '../VisaServices/VisaServices';
import { filterVisaServiceData, defaultServices } from '../VisaServices/VisaServicesFunction';
import { customDialogTransition, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';

export default function VisaAdd({ onAdd, listTypeVisa, listCurrency, listCountries }) {
    const [open, setOpen] = useState(false);
    const [countryID, setCountryID] = useState('');
    const [typeVisa, setTypeVisa] = useState('');
    const [validity, setValidity] = useState();
    const [validityType, setValidityType] = useState('d');
    const [lengthOfStay, setLengthOfStay] = useState();
    const [governmentFee, setGovernmentFee] = useState();
    const [requirementDesc, setRequirementDesc] = useState('');
    const [portOfEntry, setPortOfEntry] = useState('');
    const [note, setNote] = useState('');
    const [published, setPublished] = useState(1);
    const [governmentFeeCurrency, setGovernmentFeeCurrency] = useState('USD');
    const [listTypeVisaProps, setListTypeVisaProps] = useState([]);
    const [entryType, setEntryType] = useState();
    const [services, setServices] = useState(defaultServices);

    const handleClickOpen = () => {
        setOpen(true);
        setListTypeVisaProps(listTypeVisa);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleResetFieldForm = () => {
        setCountryID('');
        setTypeVisa('');
        setValidity('');
        setGovernmentFee('');
        setRequirementDesc('');
        setPortOfEntry('');
        setPublished(1);
    };

    const handleAddVisa = () => {
        const countryIDObject = listCountries ? listCountries.find((item) => item.name === countryID) : {};
        const typeVisaObject = listTypeVisaProps ? listTypeVisaProps.find((item) => item.desc === typeVisa) : {};
        if (countryID && typeVisa && validity) {
            const newData = {
                country: countryIDObject.code,
                visa: typeVisaObject.id,
                validity: validity,
                validity_type: validityType,
                length_of_stay: lengthOfStay,
                government_fee_currency: governmentFeeCurrency,
                government_fee: governmentFee,
                requirement_desc: requirementDesc,
                port_of_entry: portOfEntry,
                note: note,
                entry_type: entryType,
                services: filterVisaServiceData(services),
                published: published,
            };
            onAdd(newData);
            handleResetFieldForm();
            setOpen(false);
        } else {
            ToastNotify('Please input all (*) required fields.');
        }
    };

    return (
        <>
            <Button
                disableElevation
                variant="contained"
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth={'xl'}
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Add new detail visa</div>
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
                    <Grid container rowSpacing={2} marginTop={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>E-visa</div>
                            <Autocomplete
                                size="small"
                                id="country_id"
                                options={listCountries}
                                renderInput={(params) => (
                                    <TextField {...params} sx={customTextFieldAdmin} variant="outlined" />
                                )}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.code}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`/flags/png100px/${option.code.toLowerCase()}.png`}
                                                srcSet={`/flags/png100px/${option.code.toLowerCase()}.png 2x`}
                                                alt=""
                                                className="mr-2"
                                            />
                                            {option.name}
                                        </li>
                                    );
                                }}
                                value={countryID}
                                onInputChange={(event, newInputValue) => setCountryID(newInputValue)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>Visa type</div>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={typeVisa}
                                onChange={(e) => {
                                    setTypeVisa(e.target.value);
                                }}
                                select
                                sx={customTextFieldAdmin}
                            >
                                {listTypeVisaProps &&
                                    listTypeVisaProps.length > 0 &&
                                    listTypeVisaProps
                                        .filter((item) => item.published !== 0)
                                        .map((item) => (
                                            <MenuItem key={item.id} value={item.desc}>
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
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <div className={stylesAdmin.admin__label__required}>Length of stay</div>
                            <TextField
                                fullWidth
                                size="small"
                                id="length_of_stay"
                                name="length_of_stay"
                                type="number"
                                variant="outlined"
                                value={lengthOfStay}
                                onChange={(e) => setLengthOfStay(e.target.value)}
                                sx={customTextFieldAdmin}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">day(s)</InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <div className={stylesAdmin.admin__label__required}>Government fee</div>
                            <TextField
                                fullWidth
                                id="goverment_fee"
                                name="goverment_fee"
                                size="small"
                                type="number"
                                variant="outlined"
                                value={governmentFee}
                                onChange={(e) => setGovernmentFee(e.target.value)}
                                sx={customTextFieldAdmin}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                }}
                                // InputProps={{
                                //     endAdornment: (
                                //         <Autocomplete
                                //             style={{ width: '150px', transform: 'translateX(15px)' }}
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
                                //             disableClearable
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

                        <Grid item xs={3} sm={3} md={2} lg={3}>
                            <div className={stylesAdmin.admin__label__required}>Entry type:</div>
                            <TextField
                                sx={customTextFieldAdmin}
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={1}
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
                            <Status published={published} setPublished={setPublished} label={false} />{' '}
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
                                sx={customTextFieldAdmin}
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
                                sx={customTextFieldAdmin}
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={stylesAdmin.admin__label}>
                                Note:
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
                                sx={customTextFieldAdmin}
                                size="small"
                                fullWidth
                                id="note"
                                name="note"
                                type="text"
                                variant="outlined"
                                multiline
                                minRows={4}
                                maxRows={10}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddVisa}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
