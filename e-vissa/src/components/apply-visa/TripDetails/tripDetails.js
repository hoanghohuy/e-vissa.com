import React from 'react';
import styles from './TripDetails.module.css';
import stylesSystem from '@/app/page.module.css';
import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Autocomplete, Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment/moment';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import dayjs from 'dayjs';
import { customDatePicker } from '../../Page/CustomMUI/customMUI';
import { upperFirstLetter } from '../../../utils/validation';
import { getStandardFee } from '../functions';

export default function TripDetails({ complete, data, writeData, writeVisaDetail }) {
    const searchParams = useSearchParams();
    const visaParam = searchParams.get('visa');
    const fromCountry = searchParams.get('from');
    const pathName = usePathname();
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [arrival, setArrival] = useState('');
    const [departure, setDeparture] = useState('');
    const [countryOfResidence, setCountryOfResidence] = useState(fromCountry);
    const [nationality, setNationality] = useState(fromCountry);
    const [arrivalPort, setArrivalPort] = useState('');
    const [listEntryPort, setListEntryPort] = useState([]);
    const [, , country, currentStep] = pathName.split('/');
    const [dataVisaDetail, setDataVisaDetail] = useState({});
    const [supportingDoc, setSupportingDoc] = useState([]);
    const [conditionContinue, setConditionContinue] = useState([]);
    const [disabledButton, setDisabledButton] = useState(true);
    const [error, setError] = useState({
        country_of_residence: false,
        nationality: false,
        arrival: { error: false, message: 'Please select arrival date' },
        departure: { error: false, message: 'Please select departure date' },
        travelBy: false,
        arrivalPort: false,
    });
    const country_of_residenceRef = useRef();
    const nationalityRef = useRef();
    const arrivalRef = useRef();
    const departureRef = useRef();
    const arrival_portRef = useRef();

    useEffect(() => {
        if (data) {
            setArrival(data.arrival);
            setDeparture(data.departure);
        }
        getDataByVisa(visaParam);
    }, []);

    const getDataByVisa = async (id) => {
        try {
            const resp = await fetch(`/api/xref_visa_country/${country}?from=${fromCountry}`);
            if (resp.status == 200) {
                const dataJson = await resp.json();
                const dataSelected = dataJson.find((data) => data.id == visaParam);
                if (dataSelected) {
                    setDataVisaDetail(dataSelected);
                    writeVisaDetail(dataSelected);
                }
                if (dataSelected && (dataSelected.supporting_doc || dataSelected.visa_detail_info?.requirement_desc)) {
                    let arr;
                    if (dataSelected.visa_detail_info?.requirement_desc) {
                        arr = dataSelected.visa_detail_info?.requirement_desc.split('\n');
                    }
                    if (dataSelected.supporting_doc) {
                        arr = dataSelected.supporting_doc.split('\n');
                    }
                    const childArray = new Array(arr.length).fill(false);
                    setConditionContinue(childArray);
                    setSupportingDoc(arr);
                    setDisabledButton(true);
                } else {
                    setConditionContinue([]);
                    setSupportingDoc([]);
                    setDisabledButton(false);
                }
                if (dataSelected && dataSelected.visa_detail_info.port_of_entry) {
                    const dataPort = dataSelected.visa_detail_info.port_of_entry;
                    const listportOfEntry = dataPort.split('\n');
                    setListEntryPort(listportOfEntry);
                }
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingData(false);
        }
    };

    const handleChangeCheckBox = (event, index) => {
        const idSet = event.target.id;
        let temp = [...conditionContinue];
        temp[idSet] = index;
        setConditionContinue(temp);
        const isAvailable = temp.some((value) => value === false);
        if (!isAvailable) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    };

    const handleCheckAll = (event, index) => {
        let copyConditionContinue = [...conditionContinue];
        if (event.target.checked) {
            copyConditionContinue = copyConditionContinue = copyConditionContinue.map(() => true);
        } else {
            copyConditionContinue = copyConditionContinue = copyConditionContinue.map(() => false);
        }
        setConditionContinue(copyConditionContinue);
        const isAvailable = copyConditionContinue.some((value) => value === false);
        if (!isAvailable) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    };

    const onNextStep = async () => {
        const today = new Date();
        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);
        // check arrival null
        if (arrival == '') {
            // ToastNotify('Please insert Arrival date.');
            let errorCurrent = Object.assign({}, error);
            errorCurrent.arrival.error = true;
            setError(errorCurrent);
            arrivalRef.current.focus();
            return;
        }
        // Arrival date must be greater than today
        if (today > arrivalDate) {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.arrival.error = true;
            errorCurrent.arrival.message = 'Arrival date must be greater than today';
            setError(errorCurrent);
            arrivalRef.current.focus();
            return;
        }

        if (arrivalDate.getFullYear() > 2025) {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.arrival.error = true;
            errorCurrent.arrival.message = 'Year of Arrival must be < 2025';
            setError(errorCurrent);
            arrivalRef.current.focus();
            return;
        }

        // check departure null
        if (departure == '') {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.departure.error = true;
            setError(errorCurrent);
            departureRef.current.focus();
            return;
        }
        // check departureDate must be greater than today
        if (departureDate < today || departureDate < arrivalDate) {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.departure.error = true;
            errorCurrent.departure.message = 'Departure date must be greater than today';
            setError(errorCurrent);
            departureRef.current.focus();
            return;
        }

        if (departureDate.getFullYear() > 2025) {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.departure.error = true;
            errorCurrent.departure.message = 'Year of Departure must be < 2025';
            setError(errorCurrent);
            departureRef.current.focus();
            return;
        }
        // check countryOfResidence null
        if (countryOfResidence == '') {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.country_of_residence = true;
            setError(errorCurrent);
            country_of_residenceRef.current.focus();
            return;
        }
        // check nationality null
        if (nationality == '') {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.nationality = true;
            setError(errorCurrent);
            nationalityRef.current.focus();
            return;
        }

        if (moment(arrival) > moment(departure)) {
            ToastNotify('Departure date must be < Arrival date');
            departureRef.current.focus();
            return;
        }
        if (
            new Date(arrival).getFullYear() > 2025 ||
            new Date(arrival).getFullYear() < 2023 ||
            new Date(departure).getFullYear > 2025 ||
            new Date(departure).getFullYear() < 2023
        ) {
            ToastNotify('Your selected date is not valid!');
            // departureRef.current.focus();
            return;
        }

        // if (travelBy == '' || travelBy == 'default') {
        //     let errorCurrent = Object.assign({}, error);
        //     errorCurrent.travelBy = true;
        //     setError(errorCurrent);
        //     travel_byRef.current.focus();
        //     return;
        // }
        if (arrivalPort == '' && listEntryPort.length !== 0) {
            let errorCurrent = Object.assign({}, error);
            errorCurrent.arrivalPort = true;
            setError(errorCurrent);
            arrival_portRef.current.focus();
            return;
        }
        // setLoadingButton(true);

        const dataStep1 = {
            arrival_date: arrival,
            departure_date: departure,
            xref_visa_country: parseInt(visaParam),
            country_of_residence: countryOfResidence,
            nationality: nationality,
            arrival_port: arrivalPort,
        };
        writeData(dataStep1);
        complete();
        // const updateStep1 = await fetch(`/api/orders?step=1`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: token || localStorage.getItem('guest_token'),
        //     },
        //     body: JSON.stringify(dataStep1),
        // });
        // if (updateStep1.status == 201 || updateStep1.status == 200) {
        //     const resp = await updateStep1.json();
        //     localStorage.setItem('user_data_current_order_id', resp.id);
        //     writeData({ arrival, departure });
        //     writeOrderID(resp.id);
        //     writeDataOder(resp);
        //     complete();
        // } else {
        //     ToastNotify('Something went wrong.');
        // }
    };
    return (
        <>
            <div className={styles.trip__details__info}>
                <div className={styles.trip__details__info__title}>Trip details</div>
                <div className={styles.trip__details__form}>
                    <div className={styles.trip__details__form__item}>
                        <div className={styles.trip__details__form__item__title}>
                            <label className={stylesSystem.required}>Date of Arrival</label>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                defaultValue={dayjs(data?.arrival)}
                                disablePast
                                showDaysOutsideCurrentMonth
                                inputRef={arrivalRef}
                                className={styles.trip__details__form__item__datepicker}
                                sx={customDatePicker}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setArrival(moment(newValue.$d).format('L'));
                                        let errorCurrent = Object.assign({}, error);
                                        errorCurrent.arrival.error = false;
                                        setError(errorCurrent);
                                    } else {
                                        setArrival('');
                                        let errorCurrent = Object.assign({}, error);
                                        errorCurrent.arrival.error = true;
                                        setError(errorCurrent);
                                    }
                                }}
                                slotProps={{
                                    textField: {
                                        // error: error.arrival ? true : false,
                                        helperText: error.arrival.error ? (
                                            <label className="font-poppins" style={{ color: 'red' }}>
                                                {error.arrival.message}
                                            </label>
                                        ) : (
                                            ''
                                        ),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className={styles.trip__details__form__item}>
                        <div className={styles.trip__details__form__item__title}>
                            <label className={stylesSystem.required}>Date of Departure</label>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                defaultValue={dayjs(data?.departure)}
                                disablePast
                                showDaysOutsideCurrentMonth
                                minDate={arrival ? dayjs(arrival) : null}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setDeparture(moment(newValue.$d).format('L'));
                                        let errorCurrent = Object.assign({}, error);
                                        errorCurrent.departure.error = false;
                                        setError(errorCurrent);
                                    } else {
                                        setDeparture('');
                                        let errorCurrent = Object.assign({}, error);
                                        errorCurrent.departure.error = true;
                                        setError(errorCurrent);
                                    }
                                }}
                                // defaultValue={dayjs('2022-04-17')}
                                className={styles.trip__details__form__item__datepicker}
                                sx={customDatePicker}
                                inputRef={departureRef}
                                slotProps={{
                                    textField: {
                                        // error: error.arrival ? true : false,
                                        helperText: error.departure.error ? (
                                            <label className="font-poppins" style={{ color: 'red' }}>
                                                {error.departure.message}
                                            </label>
                                        ) : (
                                            ''
                                        ),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className={styles.trip__details__form__item}>
                        <div className={styles.trip__details__form__item__title}>
                            <label className={stylesSystem.required}>Country of residence</label>
                        </div>
                        <Autocomplete
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px !important',
                                    padding: '4px 12px !important',
                                    border: '2px solid #E6E8EC !important',
                                    fontFamily: 'Poppins',
                                    '&.Mui-focused': {
                                        border: '2px solid #1976D2 !important',
                                    },
                                },
                                '& .MuiOutlinedInput-root:hover': {
                                    border: '2px solid #1976D2 !important',
                                },
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    border: 'none !important',
                                },
                                '& .MuiFormHelperText-root.Mui-error': {
                                    fontFamily: 'Poppins',
                                    fontSize: '14px',
                                },
                            }}
                            popupIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                                        fill="#23262F"
                                    />
                                </svg>
                            }
                            className={styles.form__country__residence}
                            key={'from'}
                            id="from"
                            options={listCountries}
                            autoHighlight
                            openOnFocus
                            getOptionLabel={(option) => option.label}
                            defaultValue={
                                listCountries && listCountries.length > 0
                                    ? listCountries?.find((item) => item.code === fromCountry)
                                    : null
                            }
                            renderOption={(props, option) => (
                                <Box
                                    {...props}
                                    key={option.code}
                                    component="li"
                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                    // className={styles.custom__autocomplete__option}
                                >
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`/flags/png100px/${option?.code.toLowerCase()}.png`}
                                        srcSet={`/flags/png100px/${option?.code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                    {option?.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    type="text"
                                    {...params}
                                    placeholder="Country of residence"
                                    helperText={
                                        error.country_of_residence ? (
                                            <label className="font-poppins" style={{ color: 'red' }}>
                                                Please select Country of residence
                                            </label>
                                        ) : null
                                    }
                                    inputRef={country_of_residenceRef}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off', // disable autocomplete and autofill
                                        endadornment: (
                                            <>
                                                {loadingData ? <CircularProgress size={20} /> : null}
                                                {params.InputProps.endadornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            onChange={(event, newInputValue) => {
                                if (newInputValue) {
                                    setCountryOfResidence(newInputValue.code);
                                    let errorCurrent = Object.assign({}, error);
                                    errorCurrent.country_of_residence = false;
                                    setError(errorCurrent);
                                } else {
                                    setCountryOfResidence('');
                                }
                            }}
                        />
                    </div>

                    <div className={styles.trip__details__form__item}>
                        <div className={styles.trip__details__form__item__title}>
                            <label className={stylesSystem.required}>Nationality</label>
                        </div>
                        <Autocomplete
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px !important',
                                    padding: '4px 12px !important',
                                    border: '2px solid #E6E8EC !important',
                                    fontFamily: 'Poppins',
                                    '&.Mui-focused': {
                                        border: '2px solid #1976D2 !important',
                                    },
                                },
                                '& .MuiOutlinedInput-root:hover': {
                                    border: '2px solid #1976D2 !important',
                                },
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    border: 'none !important',
                                },
                                '& .MuiFormHelperText-root.Mui-error': {
                                    fontFamily: 'Poppins',
                                    fontSize: '14px',
                                },
                            }}
                            popupIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                                        fill="#23262F"
                                    />
                                </svg>
                            }
                            className={styles.form__country__residence}
                            key={'from'}
                            id="from"
                            options={listCountries}
                            autoHighlight
                            openOnFocus
                            getOptionLabel={(option) => option.label}
                            defaultValue={
                                listCountries && listCountries.length > 0
                                    ? listCountries?.find((item) => item.code === fromCountry)
                                    : null
                            }
                            renderOption={(props, option) => (
                                <Box
                                    {...props}
                                    key={option.code}
                                    component="li"
                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                    // className={styles.custom__autocomplete__option}
                                >
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`/flags/png100px/${option?.code.toLowerCase()}.png`}
                                        srcSet={`/flags/png100px/${option?.code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                    {option?.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    type="text"
                                    {...params}
                                    placeholder="Nationality"
                                    helperText={
                                        error.nationality ? (
                                            <label className="font-poppins" style={{ color: 'red' }}>
                                                Please select Nationality
                                            </label>
                                        ) : null
                                    }
                                    inputRef={nationalityRef}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off', // disable autocomplete and autofill
                                        endadornment: (
                                            <>
                                                {loadingData ? <CircularProgress size={20} /> : null}
                                                {params.InputProps.endadornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            onChange={(event, newInputValue) => {
                                if (newInputValue) {
                                    setNationality(newInputValue.code);
                                    let errorCurrent = Object.assign({}, error);
                                    errorCurrent.nationality = false;
                                    setError(errorCurrent);
                                } else {
                                    setNationality('');
                                }
                            }}
                        />
                    </div>
                    {listEntryPort && listEntryPort.length > 0 && (
                        <div className={styles.trip__details__form__item}>
                            <div className={styles.trip__details__form__item__title}>
                                <label className={stylesSystem.required}>Port of arrival</label>
                            </div>
                            <Autocomplete
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px !important',
                                        padding: '4px 12px !important',
                                        border: '2px solid #E6E8EC !important',
                                        fontFamily: 'Poppins',
                                        '&.Mui-focused': {
                                            border: '2px solid #1976D2 !important',
                                        },
                                    },
                                    '& .MuiOutlinedInput-root:hover': {
                                        border: '2px solid #1976D2 !important',
                                    },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        border: 'none !important',
                                    },
                                    '& .MuiFormHelperText-root.Mui-error': {
                                        fontFamily: 'Poppins',
                                        fontSize: '14px',
                                    },
                                }}
                                popupIcon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                                            fill="#23262F"
                                        />
                                    </svg>
                                }
                                className={styles.form__country__residence}
                                key={'from'}
                                id="from"
                                options={listEntryPort}
                                autoHighlight
                                openOnFocus
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        type="text"
                                        {...params}
                                        placeholder="Port of arrival"
                                        helperText={
                                            error.arrivalPort ? (
                                                <label className="font-poppins" style={{ color: 'red' }}>
                                                    Please select port of arrival
                                                </label>
                                            ) : null
                                        }
                                        inputRef={arrival_portRef}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off', // disable autocomplete and autofill
                                            endadornment: (
                                                <>
                                                    {loadingData ? <CircularProgress size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                                onChange={(event, newInputValue) => {
                                    if (newInputValue) {
                                        setArrivalPort(newInputValue);
                                        let errorCurrent = Object.assign({}, error);
                                        errorCurrent.arrivalPort = false;
                                        setError(errorCurrent);
                                    } else {
                                        setArrivalPort('');
                                    }
                                }}
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {supportingDoc &&
                            supportingDoc.length > 0 &&
                            supportingDoc.map((item, index) => (
                                <FormGroup
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 0,
                                        },
                                    }}
                                    key={item}
                                >
                                    <FormControlLabel
                                        sx={{
                                            '&.MuiFormControlLabel-root': {
                                                alignItems: 'start',
                                            },
                                            '& .MuiTypography-root': {
                                                fontFamily: 'Poppins',
                                                fontSize: '14px',
                                                marginTop: '10px',
                                            },
                                        }}
                                        control={
                                            <Checkbox
                                                id={index}
                                                sx={{
                                                    '&.MuiCheckbox-root': {
                                                        paddingTop: '9px',
                                                        ':hover': {
                                                            background: 'none',
                                                        },
                                                    },
                                                }}
                                                checked={conditionContinue[index]}
                                                onChange={(event, index) => handleChangeCheckBox(event, index)}
                                            />
                                        }
                                        label={item}
                                    />
                                </FormGroup>
                            ))}
                    </div>
                    <div>
                        {supportingDoc && supportingDoc.length > 1 && (
                            <FormGroup
                                sx={{
                                    '& .MuiFormControlLabel-root': {
                                        marginRight: 0,
                                    },
                                }}
                            >
                                <FormControlLabel
                                    sx={{
                                        '&.MuiFormControlLabel-root': {
                                            alignItems: 'start',
                                        },
                                        '& .MuiTypography-root': {
                                            marginTop: '10px',
                                            fontFamily: 'DM Sans',
                                            fontSize: '14px',
                                        },
                                    }}
                                    control={
                                        <Checkbox
                                            id={'check_all'}
                                            sx={{
                                                '&.MuiCheckbox-root': {
                                                    paddingTop: '9px',
                                                    ':hover': {
                                                        background: 'none',
                                                    },
                                                },
                                            }}
                                            checked={!conditionContinue.some((item) => item == false)}
                                            onChange={(event, index) => {
                                                handleCheckAll(event, index);
                                            }}
                                        />
                                    }
                                    label={'Check all'}
                                />
                            </FormGroup>
                        )}
                    </div>
                </div>
                <div className={styles.trip__details__submit}>
                    <div className={styles.trip__details__submit__policy}>
                        <div className={styles.trip__details__submit__policy__icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    d="M25.1733 8.17758C25.1446 7.54619 25.1446 6.9435 25.1446 6.34081C25.1446 5.85291 24.7715 5.47982 24.2837 5.47982C20.6962 5.47982 17.9698 4.44664 15.7025 2.23677C15.3581 1.92108 14.8415 1.92108 14.4971 2.23677C12.2298 4.44664 9.50339 5.47982 5.91594 5.47982C5.42805 5.47982 5.05496 5.85291 5.05496 6.34081C5.05496 6.9435 5.05496 7.54619 5.02626 8.17758C4.91146 14.2045 4.73926 22.47 14.8128 25.9426L15.0998 26L15.3868 25.9426C25.4316 22.47 25.2881 14.2332 25.1733 8.17758ZM14.411 16.5291C14.2388 16.6726 14.0379 16.7587 13.8083 16.7587H13.7796C13.55 16.7587 13.3204 16.6439 13.1769 16.4717L10.5079 13.5157L11.7994 12.3677L13.8944 14.6924L18.5437 10.2726L19.7204 11.5354L14.411 16.5291Z"
                                    fill="#3772FF"
                                />
                            </svg>
                        </div>
                        <div className={styles.trip__details__submit__policy__text}>
                            <div className={styles.trip__details__submit__policy__title}>
                                Your info is safe with us!
                            </div>
                            <div className={styles.trip__details__submit__policy__desc}>
                                For more details see the E-vissa.com Data Security Promise
                            </div>
                        </div>
                    </div>
                    <div className={styles.trip__details__submit__button}>
                        <div className={styles.trip__details__submit__button}>
                            {loadingButton ? (
                                <CircularProgress />
                            ) : !disabledButton ? (
                                // <div onClick={onNextStep}>
                                //     <ButtonApply type="primary" title="Save & Continue" />
                                // </div>
                                <button onClick={onNextStep} className={'button__booking__primary'}>
                                    Save & Continue
                                </button>
                            ) : (
                                <button disabled className={'button__booking__primary disabled:'}>
                                    Save & Continue
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.trip__details__visa}>
                <div className={styles.trip__details__visa__title}>
                    {listCountries.find((item) => item.code == country)?.name.split('-')[0]} E-visa{' '}
                    {dataVisaDetail?.visa_detail_info?.length_of_stay} days,{' '}
                    {upperFirstLetter(dataVisaDetail?.visa_detail_info?.entry_type) + ' entry'}
                </div>
                {loadingData ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className={styles.trip__details__visa__item}>
                            <div className={styles.trip__details__visa__item__title}>VALIDITY</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {dataVisaDetail?.visa_detail_info?.validity}{' '}
                                {dataVisaDetail?.visa_detail_info?.validity_type == 'd'
                                    ? 'days'
                                    : dataVisaDetail?.visa_detail_info?.validity_type == 'm'
                                    ? 'months'
                                    : 'years'}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__item}>
                            <div className={styles.trip__details__visa__item__title}>NUMBER OF ENTRIES</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {upperFirstLetter(dataVisaDetail?.visa_detail_info?.entry_type)} Entry
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__item}>
                            <div className={styles.trip__details__visa__item__title}>VISA TYPE</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {dataVisaDetail?.visa_detail_info?.visa_info?.name}{' '}
                                {dataVisaDetail?.visa_detail_info?.visa_info?.type}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__item}>
                            <div className={styles.trip__details__visa__item__title}>Length of stay</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {dataVisaDetail?.visa_detail_info?.length_of_stay} days
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__item}>
                            <div className={styles.trip__details__visa__item__title}>Government Fee</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {dataVisaDetail?.visa_detail_info?.government_fee}{' '}
                                {dataVisaDetail?.visa_detail_info?.government_fee_currency}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__item}>
                            <div className={styles.trip__details__visa__item__title}>Standard Fee</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {getStandardFee(dataVisaDetail?.visa_detail_info?.services)}
                                {' USD'}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
