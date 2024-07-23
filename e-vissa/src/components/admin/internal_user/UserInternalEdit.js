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
import {
    Autocomplete,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Select,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { roleData } from '@/dbx/e-vissa/models/data/role_data';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Status from '../Status/Status';
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UserInternalEdit({ selectedRow, onEdit, listRole, userRole, dataWebsite }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(1);
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [isManager, setIsManager] = useState('');
    const [role, setRole] = useState('');
    const [published, setPublished] = useState();
    const [listRoleProps, setListRoleProps] = useState(listRole);
    const [dataWebsiteProps, setDataWebsiteProps] = useState([]);
    const [image, setImage] = useState('');
    const [listWebsite, setListWebsite] = useState([]);
    const [defaultWebsiteProps, setDefaultWebsiteProps] = useState([]);

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
        setDataWebsiteProps(dataWebsite);
        // setListWebsite(selectedRow[0].websites);
        handleSetDefaultListWebsite(selectedRow[0].websites);
    };

    const handleSetDefaultListWebsite = (listSelected) => {
        let charArray = JSON.parse(listSelected);
        let list = [];
        charArray &&
            charArray.length > 0 &&
            charArray.map((item, index) => {
                list.push(dataWebsiteProps?.find((itemFind) => itemFind.name == item));
            });
        setDefaultWebsiteProps(list);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (data) => {
        e.preventDefault();
    };

    const handleEditUser = () => {
        const selectedRowCopy = selectedRow;
        const nameArray = listWebsite.map((item) => item.name);
        const dataEdit = {
            id: selectedRow[0].id,
            role: role,
            published: published,
            is_manager: isManager,
            websites: nameArray,
        };
        onEdit(dataEdit);
        setOpen(false);
    };

    const handleCheckBox = (e) => {
        setIsManager(e.target.checked);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
        setListRoleProps(listRole);
        setDataWebsiteProps(dataWebsite);
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
                    <Grid container rowSpacing={0} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={12} md={3}>
                            <label className={stylesSystem.required}>First name</label>
                            <TextField
                                disabled
                                autoFocus
                                size="small"
                                fullWidth
                                id="first_name"
                                name="first_name"
                                type="text"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <label className={stylesSystem.required}>Last name</label>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                id="last_name"
                                name="last_name"
                                type="text"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className={stylesSystem.required}>Email</label>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                id="user_email"
                                name="user_email"
                                type="text"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <label className={stylesSystem.required}>Gender</label>
                            <FormControl size="small" fullWidth>
                                <Select
                                    disabled
                                    size="small"
                                    fullWidth
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
                        <Grid item xs={12} md={3}>
                            <label className={stylesSystem.label__normal}>Birthday</label>
                            <LocalizationProvider size="small" fullWidth dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    disabled
                                    className={stylesSystem.fullwidth}
                                    size="small"
                                    fullWidth
                                    defaultValue={dayjs(dob)}
                                    // value={dob}
                                    onChange={(newValue) => {
                                        if (newValue && newValue.$d) setDob(moment(newValue.$d).format('L'));
                                    }}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className={stylesSystem.label__normal}>Phone number</label>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                id="phone_number"
                                name="phone_number"
                                type="number"
                                variant="outlined"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <Autocomplete
                                required
                                size="small"
                                id="role"
                                options={roleData}
                                defaultValue={roleData.find((item) => item.value == role)}
                                value={role}
                                renderInput={(params) => <TextField {...params} variant="outlined" label="Role" />}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.id}>
                                            {option.name}
                                        </li>
                                    );
                                }}
                                onChange={(event, newInputValue) => {
                                    if (newInputValue) {
                                        const newRole = newInputValue.value;
                                        setRole('');
                                        setRole(newRole);
                                    } else {
                                        setRole('');
                                    }
                                }}
                            /> */}
                            <label className={stylesSystem.required}>Role</label>
                            <FormControl fullWidth>
                                <Select
                                    disabled={userRole == 'administrator' ? false : true}
                                    size="small"
                                    labelId="role-of-user"
                                    id="demo-simple-select"
                                    value={role}
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
                        <Grid item lg={12} xs={12} md={12} sm={12}>
                            <label className={stylesSystem.required}>Websites:</label>
                            <Autocomplete
                                size="small"
                                multiple
                                aria-multiline
                                options={dataWebsiteProps}
                                defaultValue={defaultWebsiteProps}
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
                                renderInput={(params) => <TextField {...params} />}
                                onChange={(event, newInputValue) => {
                                    setListWebsite(newInputValue);
                                }}
                                // value={listWebsite}
                            />
                        </Grid>
                        <Grid item lg={12} xs={12} md={12} sm={12}>
                            <label className={stylesSystem.label__normal}>Manager?</label>
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
