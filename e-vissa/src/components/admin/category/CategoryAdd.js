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
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import stylesAdmin from '../Admin.module.css';
import slugify from 'slugify';
import CategoryTerm from './components/CategoryTerm';
import { isSchemaJsonLD } from '@/utils/validation';
import Status from '../Status/Status';

export default function CategoryAdd({ onAdd, listCategory }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [published, setPublished] = useState(1);
    const [parentID, setParentID] = useState(null);
    const [schema, setSchema] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDesc, setMetaDesc] = useState('');
    const [metaKeyword, setMetaKeyword] = useState('');
    const [term, setTerm] = useState('');

    const handleClickOpen = () => {
        setName('');
        setSlug('');
        setSchema('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddCategory = () => {
        if (name.trim() == '' || slug.trim() == '') {
            ToastNotify('Please input category name');
            return;
        }
        if (slug.trim() == '') {
            ToastNotify('Please input category slug');
            return;
        }

        if (schema && !isSchemaJsonLD(schema)) {
            ToastNotify('The schema (JSON-LD) must be a JSON object.');
            return;
        }

        const newData = {
            name: name,
            slug: slug,
            schema: schema,
            meta_title: metaTitle,
            meta_desc: metaDesc,
            keyword: metaKeyword,
            term: term,
            published: published,
            parent_id: parentID,
        };
        onAdd(newData);
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                disableElevation
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                New category
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Add new Category</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <label className={stylesSystem.required}>Category name</label>
                            <TextField
                                size="small"
                                fullWidth
                                id="name"
                                name="name"
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
                        <Grid item xs={12} sm={12} md={5} lg={5}>
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
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CategoryTerm term={term} setTerm={setTerm} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
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

                        <Grid item xs={12}>
                            <label className={stylesSystem.label__normal}>Schema Structured Data (JSON-LD)</label>
                            <TextField
                                multiline
                                minRows={11}
                                size="small"
                                fullWidth
                                id="slug"
                                name="slug"
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
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddCategory}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
