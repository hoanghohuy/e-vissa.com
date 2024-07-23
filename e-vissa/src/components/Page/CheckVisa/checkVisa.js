import styles from './Checkvisa.module.css';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import ButtonApply from '../ButtonApply/ButtonApply';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';

export default function CheckVisa() {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [errorFrom, setErrorFrom] = useState(false);
    const [errorTo, setErrorTo] = useState(false);

    const handleCheckDocument = () => {
        if (!from || !to) {
            ToastNotify('Please make a selection.');
            return;
        }
        window.location.assign(`/visa/${to}?from=${from}`);
    };

    return (
        <>
            <div className={styles.check__visa__requirements}>
                <div className={styles.check__visa__title}>Check Visa Requirements</div>
                <div className={styles.check__visa__from__to}>
                    <div className={styles.check__visa__item}>
                        <div className={styles.check__visa__item__label}>Where am I from?</div>
                        <div className={styles.check__visa__item__input}>
                            <Autocomplete
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontFamily: 'Poppins',
                                        borderRadius: '12px !important',
                                        padding: '4px 8px !important',
                                        border: '2px solid #E6E8EC !important',
                                        backgroundColor: '#F4F5F6 !important',
                                    },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        border: 'none !important',
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
                                className={styles.page__input__left__input}
                                key={'from'}
                                id="from"
                                options={listCountries}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                // defaultValue={
                                //     listCountries && listCountries.length > 0
                                //         ? listCountries?.find((item) => item.code === 'VN')
                                //         : null
                                // }
                                renderOption={(props, option) => (
                                    <Box
                                        {...props}
                                        key={option.code}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`/flags/png100px/${option.code.toLowerCase()}.png`}
                                            srcSet={`/flags/png100px/${option.code.toLowerCase()}.png 2x`}
                                            alt=""
                                        />
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Where am I From?"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off',
                                        }}
                                    />
                                )}
                                onChange={(event, newInputValue) => {
                                    if (newInputValue) {
                                        setFrom(newInputValue.code);
                                        setErrorFrom(false);
                                    } else {
                                        setFrom('');
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.check__visa__item}>
                        <div className={styles.check__visa__item__label}>Where am I going?</div>
                        <div className={styles.check__visa__item__input}>
                            <Autocomplete
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px !important',
                                        padding: '4px 8px !important',
                                        border: '2px solid #E6E8EC !important',
                                        backgroundColor: '#F4F5F6 !important',
                                    },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        border: 'none !important',
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
                                className={styles.page__input__left__input}
                                key={'to'}
                                id="to"
                                options={listCountries}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                // defaultValue={
                                //     listCountries && listCountries.length > 0
                                //         ? listCountries?.find((item) => item.code === 'VN')
                                //         : null
                                // }
                                renderOption={(props, option) => (
                                    <Box
                                        {...props}
                                        key={option.code}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`/flags/png100px/${option.code.toLowerCase()}.png`}
                                            srcSet={`/flags/png100px/${option.code.toLowerCase()}.png 2x`}
                                            alt=""
                                        />
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Where am I going?"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off',
                                        }}
                                    />
                                )}
                                onChange={(event, newInputValue) => {
                                    if (newInputValue) {
                                        setTo(newInputValue.code);
                                        setErrorTo(false);
                                    } else {
                                        setTo('');
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <button onClick={handleCheckDocument} className="button__booking__secondary w-full">
                    Check now
                </button>
            </div>
        </>
    );
}
