'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import TypeVisaAdd from './TypeVisaAdd';
import TypeVisaEdit from './TypeVisaEdit';
import TypeVisaDetail from './TypeVisaDetail';
import { getAllTypeVisa } from './api/TypeVisaAPI';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { handleDataTypeVisaForTable } from '../Function_Admin';
import CachedIcon from '@mui/icons-material/Cached';
import { ToastContainer } from 'react-toastify';
import { customDataGrid } from '../../Page/CustomMUI/customMUI';
import stylesAdmin from '../Admin.module.css';

export default function TypeVisaTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    async function getAllVisa(token) {
        setLoading(true);
        try {
            const respData = await getAllTypeVisa(token);
            const resp = handleDataTypeVisaForTable(respData.data);
            setData(resp);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action(s)',
            width: 90,
            getActions: (params) => [
                <div className="mx-1">
                    <TypeVisaDetail selectedRow={[params.row]} />
                </div>,
                <div className="mx-1">
                    <TypeVisaEdit onEdit={onEdit} selectedRow={[params.row]} />
                </div>,
            ],
        },
        { field: 'name', headerName: 'Visa name', width: 150 },
        { field: 'type', headerName: 'Visa type', width: 120 },
        { field: 'desc', headerName: 'Description', width: 600 },
        { field: 'created_at', headerName: 'Created at', width: 160 },
        { field: 'updated_at', headerName: 'Updated at', width: 160 },
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

    async function addTypeVisa(newData, accessToken) {
        try {
            const resp = await fetch(`/api/admin/visas`, {
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
                getAllVisa(accessToken);
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

    async function editTypeVisa(newData, accessToken) {
        try {
            setLoading(true);
            const id = newData.id;
            const newDataEdit = {
                name: newData.name,
                desc: newData.desc,
                published: newData.published,
                type: newData.type,
            };
            const resp = await fetch(`/api/admin/visas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newDataEdit),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllVisa(accessToken);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getAllVisa(session.accessToken);
        }
    }, [status]);

    const onAdd = async (newData) => {
        if (accessToken !== '') {
            addTypeVisa(newData, accessToken);
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
            editTypeVisa(editData, accessToken);
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

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    loading={loading}
                    // onRowSelectionModelChange={handleSelectRow}
                    sx={customDataGrid}
                    autoHeight
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
                    pageSizeOptions={[10, 20]}
                />
                <div className={stylesSystem.admin__table__control}>
                    <TypeVisaAdd onAdd={onAdd} />
                    {/* <TypeVisaEdit onEdit={onEdit} selectedRow={selectedRow} />
                    <TypeVisaDetail selectedRow={selectedRow} /> */}
                    <Button
                        variant="contained"
                        onClick={() => {
                            getAllVisa(accessToken);
                        }}
                        className={stylesSystem.admin__button__secondary}
                    >
                        <CachedIcon />
                    </Button>
                </div>
            </div>
            {/* <UserManual content={content} /> */}
            <ToastContainer />
        </>
    );
}
