'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import ServicesAdd from './ServicesAdd';
import ServicesEdit from './ServicesEdit';
import ServicesDetail from './ServicesDetail';
import ServicesDelete from './ServicesDelete';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataServices } from './api/ServicesAPI';
import { ToastContainer } from 'react-toastify';
import { handleDataServicesForTable } from './functions/ServicesFunction';
import CachedIcon from '@mui/icons-material/Cached';
import { customDataGrid } from '../../Page/CustomMUI/customMUI';
import stylesAdmin from '../Admin.module.css';

export default function ServicesTable() {
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
            width: 88,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Detail Service'}>
                            <ServicesDetail selectedRow={[params.row]} />
                        </Tooltip>
                    }
                />,
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Edit Service'}>
                            <ServicesEdit onEdit={onEdit} selectedRow={[params.row]} />
                        </Tooltip>
                    }
                />,
            ],
        },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'value', headerName: 'Value (USD)', width: 130 },
        {
            field: 'value_on',
            headerName: 'Value on',
            width: 130,
            renderCell: (params) => {
                return (
                    <div
                        className={`${
                            params.value == 'person'
                                ? 'text-[#fff] bg-[#FFA732] py-1 px-3 rounded-md'
                                : 'bg-[#5C8374] text-[#fff] py-1 px-3 rounded-md'
                        }`}
                    >
                        {params.value}
                    </div>
                );
            },
        },
        { field: 'desc', headerName: 'Desc', width: 600 },
        {
            field: 'published',
            type: 'boolean',
            headerName: 'Published',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                        {params.value == '1' ? 'Active' : 'Disabled'}
                    </div>
                );
            },
        },
    ];

    async function getAllServices(token) {
        setLoading(true);
        try {
            const resp = await getAllDataServices(token);
            if (resp.data) {
                const restUpdated = handleDataServicesForTable(resp.data);
                setData(restUpdated);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addServices(newData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 201) {
                Swal.fire({
                    text: 'Data added successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllServices(accessToken);
                setLoading(false);
            } else {
                Swal.fire({
                    text: `${resp.status} + ${resp.statusText}`,
                    icon: 'info',
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function editServices(editData, accessToken) {
        try {
            setLoading(true);
            const id = editData.id;
            const resp = await fetch(`/api/admin/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(editData),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllServices(accessToken);
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

    async function deleteServices(newData, accessToken) {
        const id = newData[0].id;
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Data deleted successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllServices(accessToken);
            } else {
                Swal.fire({
                    text: `${resp.status} ${resp.statusText}`,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const onAdd = (newData) => {
        if (accessToken !== '') {
            addServices(newData, accessToken);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Session expired!',
                icon: 'error',
            });
        }
    };
    const onEdit = (editData) => {
        if (accessToken !== '') {
            editServices(editData, accessToken);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Session expired!',
                icon: 'error',
            });
        }
    };
    const onDelete = (listData) => {
        if (accessToken !== '') {
            deleteServices(listData, accessToken);
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
            getAllServices(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    loading={loading}
                    sx={customDataGrid}
                    autoHeight
                    onRowSelectionModelChange={handleSelectRow}
                    rows={data}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 50]}
                />
                <div className={stylesSystem.admin__table__control}>
                    <ServicesAdd onAdd={onAdd} />
                    <Button
                        className={stylesSystem.admin__button__secondary}
                        onClick={() => getAllServices(accessToken)}
                    >
                        <CachedIcon />
                    </Button>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}
