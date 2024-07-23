'use client';
import { Autocomplete, Box, Button, CircularProgress, Grid, InputAdornment, TextField } from '@mui/material';
import styles from './Information.module.css';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { upperFirstLetter, validateEmail } from '../../../utils/validation';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import stylesSystem from '@/app/page.module.css';
import moment from 'moment';
import { getStandardFee } from '../functions';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Information = ({
    complete,
    dataStep,
    writeData,
    dataOrder,
    writeDataOder,
    dataVisaDetail,
    dataStep1,
    createOrder,
}) => {
    const [data, setData] = useState([{ id: 1, first_name: '', last_name: '', passport: '' }]);
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const [, , country, currentStep] = pathName.split('/');
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [firstName, setFirstName] = useState(dataStep?.first_name || '');
    const [lastName, setLastName] = useState(dataStep?.last_name || '');
    const [email, setEmail] = useState(dataStep?.email || '');
    const [phone, setPhone] = useState(dataStep?.phone_number || '');
    const [address, setAddress] = useState(dataStep?.address || '');
    const [note, setNote] = useState(dataStep?.customer_note || '');
    const [prefix, setPrefix] = useState(
        listCountries?.find((item) => item.code === dataStep1.country_of_residence)?.phone,
    );
    const [errorField, setErrorField] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        address: false,
    });
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async () => {
        if (firstName.trim().length < 2) {
            let errorCurrent = Object.assign({}, errorField);
            errorCurrent.firstName = true;
            setErrorField(errorCurrent);
            firstNameRef.current.focus();
            return;
        }
        if (lastName.trim().length < 2) {
            let errorCurrent = Object.assign({}, errorField);
            errorCurrent.lastName = true;
            setErrorField(errorCurrent);
            lastNameRef.current.focus();
            return;
        }
        if (!phone || phone.trim().length < 8 || phone.trim().length > 12) {
            let errorCurrent = Object.assign({}, errorField);
            errorCurrent.phone = true;
            setErrorField(errorCurrent);
            phoneRef.current.focus();
            return;
        }
        if (email == '' || !validateEmail(email)) {
            let errorCurrent = Object.assign({}, errorField);
            errorCurrent.email = true;
            setErrorField(errorCurrent);
            emailRef.current.focus();
            return;
        }
        if (address.trim().length < 2) {
            let errorCurrent = Object.assign({}, errorField);
            errorCurrent.address = true;
            setErrorField(errorCurrent);
            addressRef.current.focus();
            return;
        }
        let error = false;
        data.map((item, index) => {
            if (!item.first_name || !item.last_name) {
                error = true;
            }
        });
        if (error) {
            ToastNotify('Please input First name and Last name of Applicant personal details');
            return;
        }
        try {
            setLoadingButton(true);
            // let newArray = [...data];
            // newArray.map(async (item) => {
            //     try {
            //         if (item.passport) {
            //             let fd = new FormData();
            //             fd.append('images', item.passport);
            //             const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
            //                 method: 'POST',
            //                 headers: {
            //                     Authorization: accessToken || localStorage.getItem('guest_token'),
            //                 },
            //                 body: fd,
            //             });
            //             const respJson = await resp.json();
            //             console.log('respJson', respJson);
            //             const link = await respJson?.uploadedImageNames[0];
            //             item.passport_link = link;
            //         }
            //     } catch (error) {
            //         throw error;
            //     }
            // });
            const dataStep2 = {
                // id: parseInt(localStorage.getItem('user_data_current_order_id')),
                // another_people: JSON.stringify(newArray),
                arrival_date: moment(dataStep1.arrival_date),
                departure_date: moment(dataStep1.departure_date),
                xref_visa_country: parseInt(dataStep1.xref_visa_country),
                country_of_residence: dataStep1.country_of_residence,
                nationality: dataStep1.nationality,
                arrival_port: dataStep1.arrival_port,
                another_people: JSON.stringify(data),
                first_name: firstName,
                last_name: lastName,
                phone_number: `(+${prefix}) ${phone}`,
                email: email,
                address: address,
                currency: 'USD',
                customer_note: note,
                gRecaptchaToken: await executeRecaptcha('inquirySubmit'),
            };
            const updateStep2 = await createOrder(dataStep2);
            writeData(dataStep2);
            writeDataOder(updateStep2);
            complete();
        } catch (error) {
            throw error;
        }
    };

    async function getDataUser(id, accessToken) {
        try {
            const resp = await fetch(`/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            const data = await resp.json();
            if (data) {
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setPhone(data.phone_number);
                setEmail(data.email);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingInfo(false);
        }
    }

    const handleAddPersion = () => {
        const dataCurrent = [...data];
        const newPersion = {
            id: dataCurrent.length + 1,
            first_name: null,
            last_name: null,
            passport: '',
        };
        dataCurrent.push(newPersion);
        setData(dataCurrent);
    };
    const handleDeletePersion = (event) => {
        Swal.fire({
            title: 'Are you sure delete this person?',
            text: "You won't be able to revert this information.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const dataCurrent = [...data];
                const idSelected = event.target.value;
                const newData = dataCurrent.filter((item) => item.id !== parseInt(idSelected));
                setData(newData);
                const dataImageCurrent = [...selectedImage];
                const newDataImage = dataImageCurrent.filter((item) => item.id !== parseInt(idSelected));
                setSelectedImage(newDataImage);
            }
        });
    };
    const handleChangeFirstName = (e) => {
        const dataCurrent = [...data];
        const index = dataCurrent.findIndex((item) => item.id === parseInt(e.target.name));
        if (index != -1) {
            dataCurrent[index].first_name = e.target.value;
        }
        setData(dataCurrent);
    };
    const handleChangeLastName = (e) => {
        const dataCurrent = [...data];
        const index = dataCurrent.findIndex((item) => item.id === parseInt(e.target.name));
        if (index != -1) {
            dataCurrent[index].last_name = e.target.value;
        }
        setData(dataCurrent);
    };
    const handleChangePassport = async (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                const imageView = URL ? URL?.createObjectURL(file) : '';
                const eventName = parseInt(e.target.name);
                let selectedImageCopy = [...selectedImage];
                let objectbyID = selectedImageCopy.find((item) => item.id == eventName);
                if (objectbyID) {
                    objectbyID.url = imageView;
                    objectbyID.name = file.name;
                    setSelectedImage(selectedImageCopy);
                } else {
                    let itemPush = {};
                    itemPush = { id: eventName, url: imageView, name: file.name };
                    selectedImageCopy.push(itemPush);
                    setSelectedImage(selectedImageCopy);
                }
                setSelectedFile(file);
            }

            // const dataCurrent = [...data];
            //     const index = dataCurrent.findIndex((item) => item.id === parseInt(e.target.name));
            //     if (index != -1) {
            //         dataCurrent[index].passport = link;
            //         dataCurrent[index].file_name = file.name;
            //     }
            //     setData(dataCurrent);
            // if (file) {
            //     try {
            //         let fd = new FormData();
            //         fd.append('images', file);
            //         const visaID = localStorage.getItem('user_data_current_order_id');
            //         const resp = await fetch(
            //             `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images?order=${visaID}_${e.target.name}`,
            //             {
            //                 method: 'POST',
            //                 headers: {
            //                     Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVER_FILE_TOKEN}`,
            //                 },
            //                 body: fd,
            //             },
            //         );
            //         const respJson = await resp.json();
            //         const link = await respJson?.uploadedImageNames[0];
            //         if (link) {
            //             const dataCurrent = [...data];
            //             const index = dataCurrent.findIndex((item) => item.id === parseInt(e.target.name));
            //             if (index != -1) {
            //                 dataCurrent[index].passport = link;
            //                 dataCurrent[index].file_name = file.name;
            //             }
            //             setData(dataCurrent);
            //             const dataImage = {
            //                 id: parseInt(e.target.name),
            //                 file_name: URL ? URL?.createObjectURL(file) : '',
            //             };
            //             let dataselectedImage = [...selectedImage];
            //             if (dataselectedImage.includes(dataImage)) {
            //                 let objectToUpdate = dataselectedImage.find((item) => item.id === e.target.name);
            //                 if (objectToUpdate) {
            //                     objectToUpdate.file_name = URL ? URL?.createObjectURL(file) : '';
            //                 }
            //             } else {
            //                 dataselectedImage.push(dataImage);
            //             }
            //             setSelectedImage(dataselectedImage);
            //             setSelectedFile(file);
            //         }
            //     } catch (error) {
            //         throw error.message;
            //     }
            // }
        }
    };

    const onPreviewPassport = (url) => {
        Swal.fire({
            imageUrl: url,
            imageAlt: 'View passport image detail',
            showConfirmButton: false,
            padding: 20,
        });
    };

    const onBack = () => {
        router.push(`/`);
    };

    const getDataOrder = async () => {
        try {
            const visaID = localStorage.getItem('user_data_current_order_id');
            if (visaID) {
                const order = await fetch(`/api/orders/${visaID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: accessToken || localStorage.getItem('guest_token'),
                        Authorization: localStorage.getItem('guest_token'),
                    },
                });
                if (order.status === 200) {
                    const resp = await order.json();
                    setDataOrder(resp);
                } else {
                    // ToastNotify('Something went wrong.');
                    // window.location.assign('/');
                }
            } else {
                // ToastNotify('Something went wrong.');
                // window.location.assign('/');
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingInfo(false);
        }
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getDataUser(session.user?.id, session.accessToken);
        }
    }, [status]);

    useEffect(() => {
        // getDataOrder();
        if (dataStep?.another_people) {
            setData(JSON.parse(dataStep?.another_people));
        }
    }, []);

    return (
        <>
            <div className={styles.your__information__info}>
                <div className={styles.your__information__info__persional}>
                    <div className={styles.trip__details__info__title}>Contact information</div>
                    {loadingInfo ? (
                        <CircularProgress />
                    ) : (
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item lg={6} xs={12} md={6} sm={6}>
                                <div className={styles.your__information__form__item__title}>
                                    <label className={stylesSystem.required}>First name</label>
                                </div>
                                <TextField
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px !important',
                                            border: '2px solid #E6E8EC !important',
                                            backgroundColor: '#FCFCFD !important',
                                            height: '48px !important',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none !important',
                                        },
                                    }}
                                    className={styles.trip__details__form__item__input}
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        let errorCurrent = Object.assign({}, errorField);
                                        errorCurrent.firstName = false;
                                        setErrorField(errorCurrent);
                                    }}
                                    placeholder={'Enter your first name'}
                                    inputProps={{ autoComplete: 'off' }}
                                    error
                                    helperText={errorField.firstName ? 'Enter your first name' : ''}
                                    inputRef={firstNameRef}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12} md={6} sm={6}>
                                <div className={styles.your__information__form__item__title}>
                                    <label className={stylesSystem.required}>Last name</label>
                                </div>
                                <TextField
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px !important',
                                            border: '2px solid #E6E8EC !important',
                                            backgroundColor: '#FCFCFD !important',
                                            height: '48px !important',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none !important',
                                        },
                                    }}
                                    className={styles.trip__details__form__item__input}
                                    type="text"
                                    value={lastName || dataStep.last_name}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        let errorCurrent = Object.assign({}, errorField);
                                        errorCurrent.lastName = false;
                                        setErrorField(errorCurrent);
                                    }}
                                    placeholder={'Enter your last name'}
                                    inputProps={{ autoComplete: 'off' }}
                                    error
                                    helperText={errorField.lastName ? 'Enter your last name' : ''}
                                    inputRef={lastNameRef}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <div className={styles.your__information__form__item__title}>
                                    <label className={stylesSystem.required}>Phone number</label>
                                </div>
                                <TextField
                                    fullWidth
                                    inputProps={{ autoComplete: 'off' }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px !important',
                                            border: '2px solid #E6E8EC !important',
                                            backgroundColor: '#FCFCFD !important',
                                            height: '48px !important',
                                            paddingLeft: '0 !important',
                                            transform: 'translateX(-2px)',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none !important',
                                        },
                                    }}
                                    className={styles.trip__details__form__item__input}
                                    // type="number"
                                    name="phone"
                                    value={phone || dataStep.phone_number}
                                    onChange={(e) => {
                                        // setPhone(e.target.value);
                                        // let errorCurrent = Object.assign({}, errorField);
                                        // errorCurrent.phone = false;
                                        // setErrorField(errorCurrent);
                                        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                        if (onlyNums.length < 12) {
                                            setPhone(onlyNums);
                                            let errorCurrent = Object.assign({}, errorField);
                                            errorCurrent.phone = false;
                                            setErrorField(errorCurrent);
                                        } else if (onlyNums.length === 12) {
                                            const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                                            setPhone(onlyNums);
                                            let errorCurrent = Object.assign({}, errorField);
                                            errorCurrent.phone = false;
                                            setErrorField(errorCurrent);
                                        }
                                    }}
                                    placeholder={'Enter your phone number'}
                                    inputRef={phoneRef}
                                    error
                                    helperText={errorField.phone ? 'Phone number is not valid' : ''}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Autocomplete
                                                    disableClearable={true}
                                                    defaultValue={
                                                        listCountries && listCountries.length > 0
                                                            ? listCountries?.find(
                                                                  (item) =>
                                                                      item.code === dataStep1.country_of_residence,
                                                              )
                                                            : null
                                                    }
                                                    sx={{
                                                        width: '120px',
                                                        paddingLeft: '0px',
                                                        '& .MuiAutocomplete-input': {
                                                            padding: '0 12px !important',
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
                                                    id="prefix"
                                                    options={listCountries}
                                                    autoHighlight
                                                    getOptionLabel={(option) => option.phone}
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
                                                            {option.phone}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            size="small"
                                                            type="text"
                                                            // error={errorTo}
                                                            // helperText={errorTo ? 'Please make a selection' : null}
                                                            {...params}
                                                            placeholder="Prefix"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'off',
                                                            }}
                                                        />
                                                    )}
                                                    onChange={(event, newInputValue) => {
                                                        if (newInputValue) {
                                                            setPrefix(newInputValue.phone);
                                                        } else {
                                                            setPrefix('');
                                                        }
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <div className={styles.your__information__form__item__title}>
                                    <label className={stylesSystem.required}>Email</label>
                                </div>
                                <TextField
                                    fullWidth
                                    inputProps={{ autoComplete: 'off' }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px !important',
                                            border: '2px solid #E6E8EC !important',
                                            backgroundColor: '#FCFCFD !important',
                                            height: '48px !important',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none !important',
                                        },
                                    }}
                                    className={styles.trip__details__form__item__input}
                                    type="email"
                                    value={email || dataStep.email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        let errorCurrent = Object.assign({}, errorField);
                                        errorCurrent.email = false;
                                        setErrorField(errorCurrent);
                                    }}
                                    placeholder={'Enter your email address'}
                                    inputRef={emailRef}
                                    error
                                    helperText={errorField.email ? 'Email address is not valid' : ''}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <div className={styles.your__information__form__item__title}>
                                    <label className={stylesSystem.required}>Address</label>
                                </div>
                                <TextField
                                    fullWidth
                                    inputProps={{ autoComplete: 'off' }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px !important',
                                            border: '2px solid #E6E8EC !important',
                                            backgroundColor: '#FCFCFD !important',
                                            height: '48px !important',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none !important',
                                        },
                                    }}
                                    className={styles.trip__details__form__item__input}
                                    type="text"
                                    value={address || dataStep.address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        let errorCurrent = Object.assign({}, errorField);
                                        errorCurrent.address = false;
                                        setErrorField(errorCurrent);
                                    }}
                                    inputRef={addressRef}
                                    placeholder={'Address'}
                                    error
                                    helperText={errorField.address ? 'Address is not valid' : ''}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <div className={stylesSystem.label__normal}>Note</div>
                                <TextField
                                    fullWidth
                                    inputProps={{ autoComplete: 'off' }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px !important',
                                            border: '2px solid #E6E8EC !important',
                                            backgroundColor: '#FCFCFD !important',
                                            height: '48px !important',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none !important',
                                        },
                                    }}
                                    className={styles.trip__details__form__item__input}
                                    type="text"
                                    value={note || dataStep.customer_note}
                                    onChange={(e) => {
                                        setNote(e.target.value);
                                    }}
                                    placeholder={'Note'}
                                />
                            </Grid>
                        </Grid>
                    )}
                </div>

                {data.map((item, index) => (
                    <>
                        <div className={styles.your__information__persional__details} key={item.id}>
                            <div className="flex justify-between sm:flex-col sm:justify-start sm:items-start">
                                <div className={styles.trip__details__info__title__details}>
                                    {`Applicant #${index + 1} personal details`}
                                </div>
                                {index !== 0 && (
                                    <button
                                        key={item.id}
                                        value={item.id}
                                        onClick={handleDeletePersion}
                                        variant="text"
                                        disableElevation
                                        className={styles.your__information__form__delete}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <Grid container rowSpacing={4} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                                <Grid item lg={6} xs={12} md={6} sm={6}>
                                    <div className={styles.your__information__form__item__title}>
                                        <label className={stylesSystem.required}>First name</label>
                                    </div>
                                    <TextField
                                        key={item.id}
                                        name={item.id}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                height: '48px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        className={styles.trip__details__form__item__input}
                                        type="text"
                                        value={item.first_name}
                                        onChange={handleChangeFirstName}
                                        placeholder={'Enter your fullname'}
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12} md={6} sm={6}>
                                    <div className={styles.your__information__form__item__title}>
                                        <label className={stylesSystem.required}>Last name</label>
                                    </div>
                                    <TextField
                                        key={item.id}
                                        name={item.id}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                height: '48px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        className={styles.trip__details__form__item__input}
                                        type="text"
                                        value={item.last_name}
                                        onChange={handleChangeLastName}
                                        placeholder={'Enter your fullname'}
                                    />
                                </Grid>
                                {/* <Grid
                                    item
                                    lg={12}
                                    xs={12}
                                    md={12}
                                    sm={12}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    gap={'20px'}
                                >
                                    <div className={styles.your__information__form__passport__header}>
                                        <div className={styles.your__information__form__passport__title}>
                                            Passport attachment{' '}
                                            <span className={styles.your__information__form__passport__title__optional}>
                                                Optional
                                            </span>
                                        </div>
                                        <div className={styles.your__information__form__passport__desc}>
                                            Upload a copy of the biometric page of your passport here. you must make
                                            sure that it shows the full passport number and must be clear and all
                                            information visible.
                                        </div>
                                    </div>

                                    <div className={styles.your__information__form__passport__import}>
                                        <div className={styles.your__information__form__passport__import__header}>
                                            Drag and drop files here
                                            <br />- or -
                                        </div>
                                        <div className={styles.your__information__form__passport__import__btn}>
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                size="small"
                                                fullwidth="true"
                                                id={`upload_image_${item.id}`}
                                                accept="image/*"
                                                onChange={handleChangePassport}
                                                key={item.id}
                                                name={item.id}
                                            />
                                            <label
                                                className={styles.your__information__form__passport__import__label}
                                                htmlFor={`upload_image_${item.id}`}
                                            >
                                                Brownse file
                                            </label>
                                        </div>
                                        <div className={styles.your__information__form__passport__import__support}>
                                            Supported document types are: jpg, jpeg, png
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {selectedImage &&
                                            selectedImage.length > 0 &&
                                            selectedImage.find((selected) => selected.id == item.id) && (
                                                <img
                                                    onClick={() =>
                                                        onPreviewPassport(
                                                            selectedImage &&
                                                                selectedImage.length > 0 &&
                                                                selectedImage.find((selected) => selected.id == item.id)
                                                                    .url,
                                                        )
                                                    }
                                                    src={
                                                        selectedImage &&
                                                        selectedImage.length > 0 &&
                                                        selectedImage.find((selected) => selected.id == item.id)?.url
                                                    }
                                                    alt="preview passport"
                                                    className="h-[32px] w-auto cursor-pointer"
                                                />
                                            )}
                                        <label className="text-[14px]">
                                            {selectedImage.length
                                                ? selectedImage.find((selected) => selected.id == item.id)?.name
                                                : ''}
                                        </label>
                                    </div>
                                </Grid> */}
                            </Grid>
                        </div>
                    </>
                ))}

                <Grid container paddingTop={1} rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid item lg={12} xs={12} md={12} sm={12}>
                        <Button
                            fullWidth
                            onClick={handleAddPersion}
                            className={styles.add__persion_button}
                            variant="outlined"
                            disableElevation
                        >
                            <div className={styles.your__information__add__person__title}>Add another person</div>
                            <div className={styles.your__information__add__person__icon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.72375 3.15849C5.79469 3.54534 3.5468 5.79323 3.15996 8.72229C2.89401 10.7359 2.66797 13.2549 2.66797 15.9998C2.66797 18.7448 2.89401 21.2637 3.15996 23.2774C3.5468 26.2064 5.79469 28.4543 8.72375 28.8412C10.7374 29.1071 13.2563 29.3332 16.0013 29.3332C18.7463 29.3332 21.2652 29.1071 23.2789 28.8412C26.2079 28.4543 28.4558 26.2064 28.8426 23.2774C29.1086 21.2637 29.3346 18.7448 29.3346 15.9998C29.3346 13.2549 29.1086 10.7359 28.8426 8.72229C28.4558 5.79323 26.2079 3.54534 23.2789 3.15849C21.2652 2.89255 18.7463 2.6665 16.0013 2.6665C13.2563 2.6665 10.7374 2.89255 8.72375 3.15849ZM16.0013 9.33317C15.2649 9.33317 14.668 9.93012 14.668 10.6665V14.6665H10.668C9.93159 14.6665 9.33464 15.2635 9.33464 15.9998C9.33464 16.7362 9.93159 17.3332 10.668 17.3332H14.668V21.3332C14.668 22.0695 15.2649 22.6665 16.0013 22.6665C16.7377 22.6665 17.3346 22.0695 17.3346 21.3332V17.3332H21.3346C22.071 17.3332 22.668 16.7362 22.668 15.9998C22.668 15.2635 22.071 14.6665 21.3346 14.6665H17.3346V10.6665C17.3346 9.93012 16.7377 9.33317 16.0013 9.33317Z"
                                        fill="#3772FF"
                                    />
                                </svg>
                            </div>
                        </Button>
                    </Grid>
                </Grid>
                <div className={`${styles.trip__details__submit} ${styles.large}`}>
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
                                For more details see the e-vissa Data Security Promise
                            </div>
                        </div>
                    </div>
                    <div className={styles.trip__details__submit__button}>
                        {loadingButton ? (
                            <CircularProgress />
                        ) : (
                            <button onClick={handleSubmit} className={'button__booking__primary'}>
                                Save & Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.trip__details__visa}>
                <div className={styles.trip__details__visa__order__title}>Order Summary</div>
                {loadingInfo ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className={styles.trip__details__visa__order__visa}>
                            {listCountries.find((item) => item.code == country)?.name.split('-')[0]} evisa -{' '}
                            {dataVisaDetail.visa_detail_info.length_of_stay} days{', '}
                            {upperFirstLetter(dataVisaDetail.visa_detail_info?.entry_type) + ' entry'}
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Nationality</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {listCountries.find((item) => item.code == dataStep1.country_of_residence)?.name}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Arrival date</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataStep1.arrival_date}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Departure date</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataStep1.departure_date}
                            </div>
                        </div>
                        {dataStep1.arrival_port !== '' ? (
                            <div className={styles.trip__details__visa__order__fee__item}>
                                <div className={styles.trip__details__visa__order__fee__name}>Arrival port</div>
                                <div className={styles.trip__details__visa__order__fee__price}>
                                    {dataStep1.arrival_port}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Government fee</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataVisaDetail.visa_detail_info?.government_fee} USD
                                {/* {dataVisaDetails?.visa_detail_info?.government_fee_currency} */}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Standard fee</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {getStandardFee(dataVisaDetail.visa_detail_info?.services)} USD
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__divider}></div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__total}>Total fee</div>
                            <div className={styles.trip__details__visa__order__fee__price__total}>
                                {dataVisaDetail.visa_detail_info?.government_fee +
                                    getStandardFee(dataVisaDetail.visa_detail_info?.services)}{' '}
                                USD
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={`${styles.trip__details__submit} ${styles.small}`}>
                <div className={styles.trip__details__submit__policy}>
                    <div className={styles.trip__details__submit__policy__icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path
                                d="M25.1733 8.17758C25.1446 7.54619 25.1446 6.9435 25.1446 6.34081C25.1446 5.85291 24.7715 5.47982 24.2837 5.47982C20.6962 5.47982 17.9698 4.44664 15.7025 2.23677C15.3581 1.92108 14.8415 1.92108 14.4971 2.23677C12.2298 4.44664 9.50339 5.47982 5.91594 5.47982C5.42805 5.47982 5.05496 5.85291 5.05496 6.34081C5.05496 6.9435 5.05496 7.54619 5.02626 8.17758C4.91146 14.2045 4.73926 22.47 14.8128 25.9426L15.0998 26L15.3868 25.9426C25.4316 22.47 25.2881 14.2332 25.1733 8.17758ZM14.411 16.5291C14.2388 16.6726 14.0379 16.7587 13.8083 16.7587H13.7796C13.55 16.7587 13.3204 16.6439 13.1769 16.4717L10.5079 13.5157L11.7994 12.3677L13.8944 14.6924L18.5437 10.2726L19.7204 11.5354L14.411 16.5291Z"
                                fill="#3772FF"
                            />
                        </svg>
                    </div>
                    <div className={styles.trip__details__submit__policy__text}>
                        <div className={styles.trip__details__submit__policy__title}>Your info is safe with us!</div>
                        <div className={styles.trip__details__submit__policy__desc}>
                            For more details see the e-vissa Data Security Promise
                        </div>
                    </div>
                </div>
                <div className={styles.trip__details__submit__button}>
                    {loadingButton ? (
                        <CircularProgress />
                    ) : (
                        // <LoadingButton
                        //     onClick={handleSubmit}
                        //     // loading={loading}
                        //     variant="contained"
                        //     className={styles.trip__details__submit__submit}
                        // >
                        //     Save & Continue
                        // </LoadingButton>
                        <button onClick={handleSubmit} className={'button__booking__primary'}>
                            Save & Continue
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
export default Information;
