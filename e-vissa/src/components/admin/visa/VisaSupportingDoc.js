'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import VisaSupportingDocEdit from './VisaSupportingDocEdit';
import { Tooltip } from '@mui/material';

export default function VisaSupportingDoc({ accessToken, country }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action(s)',
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <VisaSupportingDocEdit
                            accessToken={accessToken}
                            onEdit={(updatedData) => setData(updatedData)}
                            selectedRow={[params.row]}
                        />
                    }
                    label="Edit"
                />,
            ],
        },
        { field: 'country_info.name', headerName: 'Country', width: 150 },
        { field: 'allowed_country_info.name', headerName: 'Allowed Country', width: 250 },
        { field: 'supporting_doc', headerName: 'Supporting Doc', width: 600 },
        { field: 'created_at', headerName: 'Created At', width: 200 },
        { field: 'updated_at', headerName: 'Updated At', width: 200 },
    ];

    const handleClickOpen = async () => {
        if (!country) {
            Swal.fire({
                text: 'Please choose a country',
                icon: 'warning',
                showConfirmButton: false,
            });
            return;
        }
        try {
            const resp = await fetch(`/api/admin/xref_visa_country?country=${country}&includeVisa=0`, {
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            const dataJson = await resp.json();
            setData(dataJson);
            setOpen(true);
            return;
        } catch (error) {
            Swal.fire({
                text: 'Something went wrong',
                icon: 'error',
                showConfirmButton: false,
            });
            return;
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {country && (
                <Tooltip
                    title={'The requirement document will apply specifically to the country and its associated visa.'}
                >
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        className={stylesSystem.admin__button__primary}
                    >
                        Supporting Docs
                    </Button>
                </Tooltip>
            )}
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth scroll="body">
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Supporting Document</DialogTitle>
                <DataGrid
                    autoHeight
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    rows={data}
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
