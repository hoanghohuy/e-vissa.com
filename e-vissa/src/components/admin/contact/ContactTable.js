'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import ContactDetail from './ContactDetail';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataContact } from './api/ContactAPI';
import CachedIcon from '@mui/icons-material/Cached';
import { handleDataContactForTable } from './functions/ContactFunction';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { ToastContainer } from 'react-toastify';
import { customDataGrid } from '../../Page/CustomMUI/customMUI';
import moment from 'moment';
import stylesAdmin from '../Admin.module.css';

export default function ContactTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action(s)',
            width: 83,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Detail contact'}>
                            <ContactDetail selectedRow={[params.row]} onConfirm={onConfirm} />
                        </Tooltip>
                    }
                />,
            ],
        },

        { field: 'name', headerName: 'Customer name', width: 180 },
        { field: 'email', headerName: 'Email', width: 240 },
        { field: 'phone_number', headerName: 'Phone number', width: 120 },
        { field: 'subject', headerName: 'Subject', width: 240 },
        { field: 'message', headerName: 'Message', width: 260 },
        { field: 'confirmed_email', headerName: 'Confirmed by', width: 240 },
        {
            field: 'created_at',
            headerName: 'Created at',
            width: 160,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY HH:mm');
            },
        },
        // { field: 'updated_at', headerName: 'Ngày cập nhật', width: 200 },
    ];

    async function getAllContact(token) {
        setLoading(true);
        try {
            const resp = await getAllDataContact(token);
            if (resp.error) {
                ToastNotify('Permission denied!');
                return;
            }
            handleDataContactForTable(resp.data);
            setData(resp.data);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function confirmContact(data, accessToken) {
        try {
            setLoading(true);
            const id = data.id;
            delete data.id;
            const resp = await fetch(`/api/admin/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(data),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Data added successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllContact(accessToken);
                setLoading(false);
            } else {
                Swal.fire({
                    title: resp.status,
                    text: resp.statusText,
                    icon: 'info',
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const onConfirm = (data) => {
        if (accessToken !== '') {
            confirmContact(data, accessToken);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Session expired!',
                icon: 'error',
            });
        }
    };
    const handleSelectRow = (list) => {
        let listrowSelected = [];
        list.map((item, index) => {
            const rowSelected = data.find((item) => item.id == list[index]);
            listrowSelected.push(rowSelected);
        });
        setSelectedRow(listrowSelected);
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getAllContact(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    onRowSelectionModelChange={handleSelectRow}
                    rows={data}
                    loading={loading}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    autoHeight
                    columns={columns}
                    sx={customDataGrid}
                />
                <div className={stylesSystem.admin__table__control}>
                    <Button
                        variant="outlined"
                        onClick={() => getAllContact(accessToken)}
                        className={stylesSystem.admin__button__secondary}
                    >
                        <CachedIcon />
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
