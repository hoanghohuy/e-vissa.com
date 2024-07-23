'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import stylesSystem from '@/app/page.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import slugify from 'slugify';
import stylesAdmin from '../Admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import CategoryTerm from './components/CategoryTerm';
import { isSchemaJsonLD } from '@/utils/validation';
import Status from '../Status/Status';

export default function CategoryEdit({ selectedRow, onEdit, listCategory }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [parentID, setParentID] = useState(null);
    const [published, setPublished] = useState(1);
    const [schema, setSchema] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDesc, setMetaDesc] = useState('');
    const [metaKeyword, setMetaKeyword] = useState('');
    const [term, setTerm] = useState('');

    const handleClickOpen = () => {
        if (selectedRowEdit.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to edit!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setPublished(selectedRowEdit[0]?.published);
        setName(selectedRowEdit[0]?.name);
        setSlug(selectedRowEdit[0]?.slug);
        setSchema(selectedRowEdit[0]?.schema);
        setMetaTitle(selectedRowEdit[0]?.meta_title);
        setMetaDesc(selectedRowEdit[0]?.meta_desc);
        setMetaKeyword(selectedRowEdit[0]?.keyword);
        setTerm(selectedRowEdit[0]?.term);
        setParentID(selectedRowEdit[0]?.parent_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditCategory = () => {
        if (name.trim() == '') {
            ToastNotify('Name is not valid.');
            return;
        }
        if (slug.trim() == '') {
            ToastNotify('Slug is not valid.');
            return;
        }

        if (schema && !isSchemaJsonLD(schema)) {
            ToastNotify('The schema (JSON-LD) must be a JSON object.');
            return;
        }

        const editData = {
            id: selectedRow[0]?.id,
            name: name,
            slug: slug,
            schema: schema,
            meta_title: metaTitle,
            meta_desc: metaDesc,
            keyword: metaKeyword,
            term: term,
            parent_id: parentID,
            published: published,
        };
        onEdit(editData);
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faFilePen} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    Edit Category {selectedRow[0]?.name}
                </DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.required}>Category name</label>
                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    let slug = slugify(e.target.value, { locale: 'vi', trim: true, lower: true });
                                    setSlug(slug);
                                }}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.required}>Category slug</label>
                            <TextField
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
                                <Select
                                    size="small"
                                    fullWidth
                                    defaultValue={null}
                                    onChange={(e) => setParentID(e.target.value)}
                                    value={parentID}
                                    id="gender"
                                >
                                    <MenuItem key={0} value={null}>
                                        Empty
                                    </MenuItem>
                                    {listCategory &&
                                        listCategory
                                            .filter((item) => item.term === 'category')
                                            .map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Status published={published} setPublished={setPublished} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <label className={stylesSystem.label__normal}>Meta title</label>
                            <TextField
                                size="small"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
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
                                onChange={(e) => setMetaDesc(e.target.value)}
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
                                onChange={(e) => setMetaKeyword(e.target.value)}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CategoryTerm term={term} setTerm={setTerm} />
                        </Grid>
                        <Grid item xs={12}>
                            <label className={stylesSystem.label__normal}>Schema Structured Data (JSON-LD)</label>
                            <TextField
                                multiline
                                minRows={11}
                                size="small"
                                fullWidth
                                id="schema"
                                name="schema"
                                type="text"
                                variant="outlined"
                                value={schema}
                                onChange={(e) => setSchema(e.target.value)}
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
                    <Button className={stylesSystem.admin__button__primary} onClick={handleEditCategory} type="submit">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
