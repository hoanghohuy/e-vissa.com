'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CategoryDetail({ selectedRow, listCategory }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [published, setPublished] = useState(1);
    const [parentID, setParentID] = useState(null);
    const [desc, setDesc] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDesc, setMetaDesc] = useState('');
    const [metaKeyword, setMetaKeyword] = useState('');
    const [term, setTerm] = useState('');

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to show detail!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setPublished(selectedRowEdit[0]?.published);
        setName(selectedRowEdit[0]?.name);
        setSlug(selectedRowEdit[0]?.slug);
        setDesc(selectedRowEdit[0]?.desc);
        setParentID(selectedRowEdit[0]?.parent_id);
        setMetaTitle(selectedRowEdit[0]?.meta_title);
        setMetaDesc(selectedRowEdit[0]?.meta_desc);
        setMetaKeyword(selectedRowEdit[0]?.keyword);
        setTerm(selectedRowEdit[0]?.term);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Detail Category</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.required}>Category name</label>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                id="name"
                                name="name"
                                type="text"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.required}>Category slug</label>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                id="slug"
                                name="slug"
                                type="text"
                                variant="outlined"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.label__normal}>Parent category:</label>
                            <FormControl size="small" fullWidth>
                                <Select disabled size="small" fullWidth value={parentID} id="gender">
                                    <MenuItem key={0} value={null}>
                                        Empty
                                    </MenuItem>
                                    {listCategory &&
                                        listCategory.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.required}>Status</label>
                            <FormControl size="small" fullWidth>
                                <Select
                                    disabled
                                    size="small"
                                    fullWidth
                                    defaultValue={published}
                                    onChange={(e) => setPublished(e.target.value)}
                                    value={published}
                                    id="gender"
                                >
                                    <MenuItem key={1} value={1}>
                                        Published
                                    </MenuItem>
                                    <MenuItem key={2} value={0}>
                                        Disabled
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className={stylesSystem.label__normal}>Meta title</label>
                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={metaTitle}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className={stylesSystem.label__normal}>Meta description</label>
                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={metaDesc}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className={stylesSystem.label__normal}>Meta keywords</label>
                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={metaKeyword}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className={stylesSystem.required}>Term</label>
                            <FormControl size="small" fullWidth>
                                <Select readOnly size="small" fullWidth defaultValue={term} value={term}>
                                    <MenuItem key={1} value={'category'}>
                                        Category
                                    </MenuItem>
                                    <MenuItem key={3} value={'info-page'}>
                                        Info page
                                    </MenuItem>
                                    <MenuItem disabled key={4} value={'tag'}>
                                        Tag
                                    </MenuItem>
                                    <MenuItem disabled key={5} value={'menu'}>
                                        Menu
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <label className={stylesSystem.label__normal}>Note</label>
                            <TextField
                                disabled
                                multiline
                                minRows={3}
                                size="small"
                                fullWidth
                                id="desc"
                                name="desc"
                                type="text"
                                variant="outlined"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
