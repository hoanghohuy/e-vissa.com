'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { roleData } from '@/dbx/e-vissa/models/data/role_data';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Status from '../Status/Status';

export default function UserEdit({ selectedRow, onEdit, listRole, userRole }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [gender, setGender] = useState(1);
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [isManager, setIsManager] = useState('');
    const [role, setRole] = useState('');
    const [published, setPublished] = useState();
    const [listRoleProps, setListRoleProps] = useState(listRole);
    const [image, setImage] = useState('');

    const handleClickOpen = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to edit!',
                icon: 'info',
                showConfirmButton: false,
            });
            return;
        }
        setOpen(true);
        setFirstName(selectedRow[0].first_name);
        setMiddleName(selectedRow[0].middle_name);
        setLastName(selectedRow[0].last_name);
        setEmail(selectedRow[0].email);
        setPassword(selectedRow[0].password);
        setGender(selectedRow[0].gender);
        setDob(selectedRow[0].date_of_birth);
        setPhone(selectedRow[0].phone_number);
        setRole(selectedRow[0].role);
        setIsManager(selectedRow[0].is_manager);
        setPublished(selectedRow[0].published);
        setImage(selectedRow[0].image);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditUser = () => {
        const dataEdit = { id: selectedRow[0].id, role: role, published: published, is_manager: isManager };
        onEdit(dataEdit);
        setOpen(false);
    };

    const handleCheckBox = (e) => {
        setIsManager(e.target.checked);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
        setListRoleProps(listRole);
    }, [selectedRow]);

    return (
        <div>
            <Button
                variant="outlined"
                disableElevation
                onClick={handleClickOpen}
                className={stylesAdmin.custom__action__edit}
            >
                <ManageAccountsIcon color="#fff" />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    Edit user {selectedRow[0]?.first_name} {selectedRow[0]?.last_name}
                </DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                disabled
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                id="last_name"
                                label={
                                    <>
                                        <label className={stylesSystem.required}>Last name</label>
                                    </>
                                }
                                name="last_name"
                                type="text"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
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
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    disabled
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
                                    <MenuItem key={2} value={2}>
                                        Female
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider size="small" fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    disabled
                                    className={stylesSystem.fullwidth}
                                    size="small"
                                    fullWidth
                                    label={
                                        <>
                                            <label className={stylesSystem.required}>Birthday</label>
                                        </>
                                    }
                                    defaultValue={dayjs(dob)}
                                    // value={dob}
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setDob(moment(newValue.$d).format('L'));
                                    }}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="role-of-user">
                                    <label className={stylesSystem.required}>Role</label>
                                </InputLabel>
                                <Select
                                    disabled={userRole == 'administrator' ? false : true}
                                    size="small"
                                    labelId="role-of-user"
                                    id="demo-simple-select"
                                    value={role}
                                    label={
                                        <>
                                            <label className={stylesSystem.required}>Role</label>
                                        </>
                                    }
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    {roleData.data &&
                                        roleData.data.length > 0 &&
                                        roleData.data.map((role) => (
                                            <MenuItem value={role.value}>{role.name}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} xs={12} md={6} sm={12}>
                            <Status published={published} setPublished={setPublished} />
                        </Grid>
                        <Grid item lg={6} xs={12} md={6} sm={12}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleCheckBox} defaultChecked={isManager} />}
                                    label="Manager"
                                />
                            </FormGroup>
                        </Grid>

                        {image ? (
                            <Grid item lg={2} xs={2} md={2} sm={2}>
                                <div>Avatar:</div>
                                <img
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: 'auto',
                                        aspectRatio: '1',
                                        border: '1px solid #ccc',
                                        padding: '4px',
                                        borderRadius: '4px',
                                    }}
                                    src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${image}`}
                                    alt="avatar default"
                                />
                            </Grid>
                        ) : (
                            ''
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                    <Button onClick={handleEditUser} className={stylesSystem.admin__button__primary}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
