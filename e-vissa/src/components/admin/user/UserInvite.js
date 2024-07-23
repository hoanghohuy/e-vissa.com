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

export default function UserInvite({ onAdd, listRole, disabled, permission, onInvite, accessToken }) {
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
    const [permissionUser, setPermissionUser] = useState({});
    const [loadingCreateLink, setLoadingCreateLink] = useState({ mode: 'new', title: 'Create Link' });
    const [linkInvite, setLinkInvite] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        setPermissionUser(permission);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInvite = () => {
        if (email == '' || !validateEmail(email)) {
            ToastNotify('Email is not valid.');
            return;
        }
        onInvite({ email });
        setOpen(false);
    };

    const handleCreateLink = async () => {
        if (loadingCreateLink.mode == 'created' && linkInvite !== '') {
            navigator.clipboard.writeText(linkInvite);
            ToastNotify('Copied link to clipboard!', 'success');
            return;
        }

        setLoadingCreateLink({ mode: 'creating', title: 'Creating' });
        try {
            const data = await fetch('/api/admin/users_invitation', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            if (data.status === 200) {
                const dataRes = await data.json();
                setLinkInvite(dataRes.result);
                setLoadingCreateLink({ mode: 'created', title: 'Copy link' });
            } else {
                ToastNotify('Something went wrong.', 'error');
                return;
            }
        } catch (error) {
        } finally {
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
                Invite User
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Invite User</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item lg={6} xs={12} md={12} sm={12}>
                            <label className={stylesSystem.required}>Email:</label>
                            <TextField
                                autoFocus
                                fullWidth
                                size="small"
                                // label={<label className={stylesSystem.required}>Post slug (link)</label>}
                                type="text"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={4} xs={12} md={12} sm={12}>
                            <label className={stylesSystem.required}>Role:</label>
                            <FormControl fullWidth size="small">
                                <Select
                                    size="small"
                                    labelId="role-of-user"
                                    id="demo-simple-select"
                                    // value={role}
                                    disabled={permissionUser?.isManager ? true : false}
                                    defaultValue={permissionUser?.role}
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
                        <Grid item lg={2} xs={12} md={12} sm={12}>
                            <label className={stylesSystem.required}>Action:</label>
                            <Button
                                onClick={handleInvite}
                                variant="contained"
                                fullWidth
                                className={stylesSystem.admin__button__primary}
                            >
                                Invite
                            </Button>
                        </Grid>
                        <Grid item lg={12} xs={12} md={12} sm={12}>
                            <label style={{ fontWeight: '600' }}>or</label>
                        </Grid>
                        <Grid item lg={2} xs={12} md={12} sm={12}>
                            <Button
                                onClick={handleCreateLink}
                                variant="contained"
                                fullWidth
                                className={stylesSystem.admin__button__primary}
                            >
                                {loadingCreateLink.title}
                            </Button>
                        </Grid>
                        <Grid item lg={12} xs={12} md={12} sm={12}>
                            <label>{linkInvite && linkInvite}</label>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleClose} className={stylesSystem.admin__button__primary__default}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
