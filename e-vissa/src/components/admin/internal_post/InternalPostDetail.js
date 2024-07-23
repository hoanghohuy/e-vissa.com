'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function CategoryDetail({ selectedRow }) {
    const [open, setOpen] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        {
            field: 'title',
            headerName: 'Title',
            width: 450,
            renderCell: (params) => {
                const prefix = params.row.published === 1 ? `/${params.row.category_slug}/` : '/admin/posts/';
                return (
                    <a target="_blank" href={prefix + params.row.slug}>
                        {params.value}
                    </a>
                );
            },
        },
        { field: 'keyword', headerName: 'Keyword', width: 300 },
        { field: 'category_name', headerName: 'Category', width: 150 },
        { field: 'views', headerName: 'Views', width: 40 },
        { field: 'created_at', headerName: 'Created At', width: 200 },
        { field: 'updated_at', headerName: 'Updated At', width: 200 },
        {
            field: 'published',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                        {params.value == '1' ? 'Published' : 'Disabled'}
                    </div>
                );
            },
        },
    ];

    const handleClickDetail = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth scroll="body">
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Detail Category</DialogTitle>
                <DataGrid
                    autoHeight
                    rows={selectedRow[0].posts}
                    getRowId={(row) => row.slug}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    columns={columns}
                />

                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
