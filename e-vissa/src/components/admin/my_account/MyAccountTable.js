'use client';
import stylesSystem from '@/app/page.module.css';
import styles from './css/MyAccount.module.css';
import dayjs from 'dayjs';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useSession } from 'next-auth/react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { PageNotify } from '../../Page/PageNotify/PageNotify';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import avatar_default from '/public/avatar/user_avatar_default.png';
import Image from 'next/image';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import { TabContext, TabPanel } from '@mui/lab';

export default function MyAccountTable() {
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [image, setImage] = useState('');
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [idUser, setIdUser] = useState('');
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getDataUser = async (accessToken, idUserToken) => {
        try {
            // const id = localStorage.getItem('client_session_user_id');
            if (!idUserToken) {
                ToastNotify('ID user error.');
                return;
            }
            setIdUser(idUserToken);
            const data = await fetch(`/api/users/${idUserToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            const dataUser = await data.json();
            if (dataUser) {
                setFirstName(dataUser.first_name);
                setLastName(dataUser.last_name);
                setEmail(dataUser.email);
                setPhone(dataUser.phone_number);
                const dataDob = dayjs(moment(dataUser.date_of_birth).format('L'));
                setDob(dataDob);
                setGender(dataUser.gender == 0 ? 'female' : 'male');
                setImage(dataUser.image);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getDataUser(session.accessToken, session.user?.id);
        }
    }, [status]);

    const onSaveInfo = async () => {
        try {
            setLoadingButton(true);
            let pathImagePost;
            if (selectedFile) {
                let fd = new FormData();
                fd.append('images', selectedFile);
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images?private=avatar`, {
                    method: 'POST',
                    headers: {
                        Authorization: accessToken,
                    },
                    body: fd,
                });
                const respJson = await resp.json();
                pathImagePost = await respJson?.uploadedImageNames?.[0];
            }

            const newInfo = {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dob,
                phone_number: phone,
                gender: gender == 'male' ? 1 : 0,
                image: pathImagePost,
            };
            const resp2 = await fetch(`/api/users/${idUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newInfo),
            });
            if (resp2.status == 200) {
                ToastNotify('Update successfully', 'success');
                setLoading(false);
            } else {
                alert(resp2.status + resp2.statusText);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingButton(false);
        }
    };
    return (
        <div className={`${styles.myaccount__container} w-full border border-gray-200 rounded-lg shadow`}>
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} fullWidth>
                        <Tabs
                            className="bg-[#eee] w-full"
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab
                                label={
                                    <div className="flex gap-1 items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M11 5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M2 13C2 14 3 14 3 14H8.25606C8.09023 13.5308 8 13.026 8 12.5C8 11.1463 8.5977 9.93228 9.54358 9.10733C9.07708 9.03817 8.56399 9 8 9C3 9 2 12 2 13Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M11.8855 9.45954C12.0661 8.84682 12.9339 8.84682 13.1145 9.45954L13.1583 9.60814C13.2737 9.99964 13.7209 10.1849 14.0793 9.98963L14.2154 9.91553C14.7763 9.60997 15.39 10.2237 15.0845 10.7846L15.0104 10.9207C14.8151 11.2791 15.0004 11.7263 15.3919 11.8417L15.5405 11.8855C16.1532 12.0661 16.1532 12.9339 15.5405 13.1145L15.3919 13.1583C15.0004 13.2737 14.8151 13.7209 15.0104 14.0793L15.0845 14.2154C15.39 14.7763 14.7763 15.39 14.2154 15.0845L14.0793 15.0104C13.7209 14.8151 13.2737 15.0004 13.1583 15.3919L13.1145 15.5405C12.9339 16.1532 12.0661 16.1532 11.8855 15.5405L11.8417 15.3919C11.7263 15.0004 11.2791 14.8151 10.9207 15.0104L10.7846 15.0845C10.2237 15.39 9.60997 14.7763 9.91553 14.2154L9.98963 14.0793C10.1849 13.7209 9.99964 13.2737 9.60814 13.1583L9.45954 13.1145C8.84682 12.9339 8.84682 12.0661 9.45954 11.8855L9.60814 11.8417C9.99964 11.7263 10.1849 11.2791 9.98963 10.9207L9.91553 10.7846C9.60997 10.2237 10.2237 9.60997 10.7846 9.91553L10.9207 9.98963C11.2791 10.1849 11.7263 9.99964 11.8417 9.60814L11.8855 9.45954ZM14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14C13.3284 14 14 13.3284 14 12.5Z"
                                                fill="black"
                                            />
                                        </svg>
                                        Account
                                    </div>
                                }
                                value="1"
                            />
                            <Tab
                                label={
                                    <div className="flex gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8 0C7.31051 0 6.15738 0.265343 5.07166 0.559653C3.96156 0.860567 2.84316 1.21461 2.18528 1.42928C1.63625 1.60844 1.22098 2.09359 1.14123 2.69209C0.544608 7.16942 1.92804 10.4869 3.606 12.682C4.44183 13.7754 5.35024 14.5904 6.12309 15.1354C6.50924 15.4077 6.86713 15.6165 7.17105 15.7596C7.45186 15.8918 7.7523 16 8 16C8.24771 16 8.54814 15.8918 8.82896 15.7596C9.13287 15.6165 9.49076 15.4077 9.87691 15.1354C10.6498 14.5904 11.5582 13.7754 12.394 12.682C14.072 10.4869 15.4554 7.16942 14.8588 2.6921C14.779 2.09359 14.3637 1.60844 13.8147 1.42928C13.1568 1.21461 12.0384 0.860567 10.9283 0.559652C9.84262 0.265343 8.68949 0 8 0ZM8 5C8.82843 5 9.5 5.67157 9.5 6.5C9.5 7.15311 9.0826 7.70873 8.5 7.91465L8.88494 9.90506C8.94461 10.2136 8.70826 10.5 8.39404 10.5H7.60596C7.29174 10.5 7.05539 10.2136 7.11506 9.90506L7.5 7.91465C6.9174 7.70873 6.5 7.15311 6.5 6.5C6.5 5.67157 7.17157 5 8 5Z"
                                                fill="black"
                                            />
                                        </svg>
                                        Security
                                    </div>
                                }
                                value="2"
                            />
                        </Tabs>
                    </Box>
                    <TabPanel sx={{ '&.MuiTabPanel-root': { padding: '12px 0' } }} value="1">
                        {loading ? (
                            <div className="min-w-[1400px] mx-auto pt-4 px-6">
                                <CircularProgress />
                            </div>
                        ) : (
                            <Grid
                                className="px-6"
                                alignItems="center"
                                container
                                paddingY={2}
                                rowSpacing={2}
                                columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 4 }}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div className={styles.my__account__avatar}>
                                        {selectedImage ? (
                                            <img
                                                className={styles.my__account__avatar__img}
                                                src={selectedImage}
                                                alt="avatar user"
                                            />
                                        ) : image ? (
                                            <img
                                                className={styles.my__account__avatar__img}
                                                src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${image}`}
                                                alt="avatar user"
                                            />
                                        ) : (
                                            <Image
                                                src={avatar_default}
                                                alt="avatar default"
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    border: '2px solid #ccc',
                                                    borderRadius: '8px',
                                                    aspectRatio: 1,
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        )}

                                        <input
                                            style={{ display: 'none' }}
                                            type="file"
                                            size="small"
                                            fullWidth
                                            id="upload_image"
                                            // label={'Image'}
                                            name="upload_image"
                                            accept="image/*"
                                            onChange={({ target }) => {
                                                if (target.files) {
                                                    const file = target.files[0];
                                                    if (file) {
                                                        setSelectedImage(URL ? URL?.createObjectURL(file) : '');
                                                        setSelectedFile(file);
                                                    }
                                                }
                                            }}
                                        />
                                        <div className="pt-1">
                                            <label
                                                className="bg-primary text-[14px] text-white cursor-pointer px-3 py-2 rounded-md"
                                                for="upload_image"
                                            >
                                                <DriveFolderUploadIcon /> Upload
                                            </label>
                                            <div className="pt-2 text-[14px]">
                                                Allowed JPG, GIF or PNG. Max size of 800K
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xl={12} lg={12} xs={12} md={12} sm={12}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                                        <Grid item xl={4} lg={4} xs={12} md={6} sm={6}>
                                            <label className={stylesSystem.required}>First name</label>
                                            <TextField
                                                size="small"
                                                id="typeVisaCode"
                                                name="typeVisaCode"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                // defaultValue={'Ho'}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                sx={customTextFieldAdmin}
                                            />
                                        </Grid>
                                        <Grid item xl={4} lg={4} xs={12} md={6} sm={6}>
                                            <label className={stylesSystem.required}>Last name</label>
                                            <TextField
                                                size="small"
                                                id="typeVisaCode"
                                                name="typeVisaCode"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                // defaultValue={'Huy Hoang'}
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                sx={customTextFieldAdmin}
                                            />
                                        </Grid>
                                        <Grid item xl={4} lg={4} xs={12} md={6} sm={6}>
                                            <label className={stylesSystem.required}>Email</label>
                                            <TextField
                                                size="small"
                                                name="typeVisaCode"
                                                type="email"
                                                variant="outlined"
                                                fullWidth
                                                // defaultValue={'example@gmail.com'}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                sx={customTextFieldAdmin}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xl={4} lg={4} xs={12} md={6} sm={6}>
                                            <label className={stylesSystem.label__normal}>Phone number</label>
                                            <TextField
                                                size="small"
                                                name="typeVisaCode"
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                                // defaultValue={'0909222333'}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                sx={customTextFieldAdmin}
                                            />
                                        </Grid>
                                        <Grid item xl={4} lg={4} xs={12} md={6} sm={6}>
                                            <label className={stylesSystem.required}>Gender</label>
                                            <FormControl fullWidth size="small">
                                                <Select
                                                    size="small"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    defaultValue={gender ?? 'male'}
                                                    onChange={(event) => setGender(event.target.value)}
                                                >
                                                    <MenuItem value={'male'}>Male</MenuItem>
                                                    <MenuItem value={'female'}>Female</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xl={4} lg={4} xs={12} md={6} sm={6}>
                                            <label className={stylesSystem.label__normal}>Date of birth</label>
                                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    defaultValue={dayjs(dob)}
                                                    // value={dob}
                                                    fullWidth
                                                    format="DD/MM/YYYY"
                                                    openTo="year"
                                                    onChange={(newValue) => {
                                                        if (newValue && newValue.$d)
                                                            setDob(moment(newValue.$d).format('L'));
                                                    }}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    // defaultValue={dayjs('2022-04-17')}
                                                    className={styles.trip__details__form__item__datepicker}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            backgroundColor: '#FCFCFD !important',
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xl={12} lg={12} sm={12} md={12}>
                                            {loading ? (
                                                <div className="min-w-[1400px] mx-auto pt-4">
                                                    <CircularProgress />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex gap-2 py-4 sm:flex-col">
                                                        {loadingButton ? (
                                                            <Button
                                                                variant="contained"
                                                                disableElevation
                                                                className={stylesSystem.admin__button__primary}
                                                            >
                                                                <CircularProgress size={20} sx={{ color: '#fff' }} />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="contained"
                                                                disableElevation
                                                                onClick={onSaveInfo}
                                                                className={stylesSystem.admin__button__primary}
                                                            >
                                                                <FontAwesomeIcon
                                                                    style={{ marginRight: '8px' }}
                                                                    icon={faFloppyDisk}
                                                                />
                                                                Save
                                                            </Button>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </TabPanel>
                    <TabPanel value="2">
                        <div className="block">
                            <ChangePassword accessToken={accessToken} idUser={idUser} email={email} />
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
            <>
                <div className="px-6"></div>
            </>
        </div>
    );
}
