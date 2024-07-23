'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { roleData } from '@/dbx/e-vissa/models/data/role_data';
import stylesAdmin from '../Admin.module.css';
import dayjs from 'dayjs';
import { validateEmail } from '../../../utils/validation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function UserInternalAdd({ onAdd, listRole, disabled }) {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [gender, setGender] = useState(1);
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [published, setPublished] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [listRoleProps, setListRoleProps] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        // setListRoleProps(listRole);
        setPassword('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUser = () => {
        if (firstName.trim().length < 1) {
            ToastNotify('Please input first name');
            return;
        }
        if (lastName.trim().length < 1) {
            ToastNotify('Please input last name');
            return;
        }
        if (password == '' || repassword == '' || password !== repassword) {
            ToastNotify('Passwords do not match');
            return;
        }
        if (email.trim() == '' || !validateEmail(email.trim())) {
            ToastNotify('Email not valid');
            return;
        }
        // if (phone.length < 8 || phone.length > 12) {
        //     ToastNotify('Phone must be between 9 and 12 numbers');
        //     return;
        // }
        if (dob == '') {
            ToastNotify('Please select date of birth');
            return;
        }
        if (phone == '') {
            ToastNotify('Phone not valid');
            return;
        }

        if (role == '') {
            ToastNotify('Please select role');
            return;
        }
        if (password === repassword) {
            const newData = {
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password,
                date_of_birth: dob,
                phone_number: phone,
                role: role,
                gender: gender,
                published: published,
                file: selectedFile,
            };
            onAdd(newData);
            setOpen(false);
        } else {
            ToastNotify('Password not match');
        }
    };

    return (
        <>
            <Button
                disabled={disabled}
                variant="contained"
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                <PersonAddIcon style={{ marginRight: '4px' }} />
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>New User</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                size="small"
                                fullWidth
                                id="first_name"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>First name</label>
                                    </>
                                }
                                name="first_name"
                                type="text"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Last name</label>
                                    </>
                                }
                                fullWidth
                                id="last_name"
                                name="last_name"
                                type="text"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                inputProps={{
                                    autoComplete: 'new-password',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                fullWidth
                                id="user_password"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Password</label>
                                    </>
                                }
                                name="user_password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                inputProps={{
                                    autoComplete: 'new-password',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                fullWidth
                                id="password2"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Confirm password</label>
                                    </>
                                }
                                name="password2"
                                type="password"
                                variant="outlined"
                                value={repassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                fullWidth
                                id="user_email"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Email</label>
                                    </>
                                }
                                name="user_email"
                                type="text"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    size="small"
                                    fullWidth
                                    label={'Gender'}
                                    key={'gender'}
                                    name={'gender'}
                                    defaultValue={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    id="gender"
                                >
                                    <MenuItem key={1} value={1}>
                                        Male
                                    </MenuItem>
                                    <MenuItem key={2} value={0}>
                                        Female
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider size="small" fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    openTo="year"
                                    disableFuture
                                    className={stylesSystem.fullwidth}
                                    size="small"
                                    fullWidth
                                    label={
                                        <>
                                            <label className={stylesSystem.required}>Birthday</label>
                                        </>
                                    }
                                    format="DD/MM/YYYY"
                                    value={dayjs(dob)}
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setDob(moment(newValue.$d).format('L'));
                                    }}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                fullWidth
                                id="phone_number"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Phone number</label>
                                    </>
                                }
                                name="phone_number"
                                type="number"
                                variant="outlined"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="role-of-user">
                                    <label className={stylesSystem.required}>Role</label>
                                </InputLabel>
                                <Select
                                    size="small"
                                    labelId="role-of-user"
                                    id="demo-simple-select"
                                    value={role}
                                    label={
                                        <>
                                            <label className={stylesSystem.required}>Role</label>
                                        </>
                                    }
                                    defaultValue={'guest'}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                >
                                    {roleData.data &&
                                        roleData.data.length > 0 &&
                                        roleData.data.map((role) => (
                                            <MenuItem key={role.id} value={role.value}>
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} xs={12} md={6} sm={12}>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={1}
                                onChange={(e) => setPublished(e.target.value)}
                                select
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Status</label>
                                    </>
                                }
                            >
                                <MenuItem key={1} value={1}>
                                    Active
                                </MenuItem>
                                <MenuItem key={2} value={0}>
                                    Disabled
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                    <Button onClick={handleAddUser} className={stylesSystem.admin__button__primary}>
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
