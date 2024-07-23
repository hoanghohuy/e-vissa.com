'use client';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import CategoryAdd from './CategoryAdd';
import CategoryEdit from './CategoryEdit';
import CategoryDetail from './CategoryDetail';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import { getAllDataCategory } from './api/CategoryAPI';
import CachedIcon from '@mui/icons-material/Cached';
import { customDataGrid } from '../../Page/CustomMUI/customMUI';

export default function CategoryTable() {
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
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Detail category'}>
                            <CategoryDetail selectedRow={[params.row]} listCategory={data} />
                        </Tooltip>
                    }
                    label="Detail"
                />,
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Edit category'}>
                            <CategoryEdit onEdit={onEdit} selectedRow={[params.row]} listCategory={data} />
                        </Tooltip>
                    }
                    label="Edit"
                />,
            ],
        },
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'slug', headerName: 'Slug', width: 160 },
        {
            field: 'parent_id',
            headerName: 'Parent Path',
            width: 160,
            valueGetter: (params) => {
                if (params.row.parent_id_info) {
                    return params.row.parent_id_info.name;
                }
            },
        },
        // { field: 'image', headerName: 'Image', width: 120 },
        { field: 'desc', headerName: 'Note', width: 160 },
        {
            field: 'published',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                        {params.value == '1' ? 'Published' : 'Disabled'}
                    </div>
                );
            },
        },
        { field: 'meta_title', headerName: 'Meta title', width: 160 },
        { field: 'meta_desc', headerName: 'Meta description', width: 160 },
        { field: 'keyword', headerName: 'Meta keyword', width: 160 },
        { field: 'term', headerName: 'Term', width: 120 },
    ];

    async function getAllCategory(accessToken) {
        setLoading(true);
        try {
            const resp = await getAllDataCategory(accessToken);
            if (resp) {
                setData(resp);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addCategory(newData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 201) {
                Swal.fire({
                    text: 'Add category successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllCategory(accessToken);
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

    async function editCategory(editData, accessToken) {
        try {
            setLoading(true);
            const id = editData.id;
            const resp = await fetch(`/api/admin/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(editData),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Category updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllCategory(accessToken);
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

    async function deleteCategory(newData, accessToken) {
        const id = newData[0].id;
        try {
            setLoading(true);
            const resp = await fetch(`/api/Category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            if (resp.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Data deleted successfully!',
                    icon: 'success',
                    confirmButtonText: 'Đã hiểu',
                });
                getAllCategory(accessToken);
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

    const onAdd = (newData) => {
        if (accessToken !== '') {
            addCategory(newData, accessToken);
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
            editCategory(editData, accessToken);
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
            deleteCategory(listData, accessToken);
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
            getAllCategory(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    sx={customDataGrid}
                    loading={loading}
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
                    <CategoryAdd onAdd={onAdd} listCategory={data} />
                    {/* <CategoryEdit onEdit={onEdit} selectedRow={selectedRow} /> */}
                    {/* <CategoryDetail selectedRow={selectedRow} /> */}
                    {/* <CategoryDelete onDelete={onDelete} selectedRow={selectedRow} /> */}
                    <Tooltip title="RELOAD DATA" placement="top">
                        <Button
                            className={stylesSystem.admin__button__secondary}
                            variant="outlined"
                            onClick={() => getAllCategory(accessToken)}
                        >
                            <CachedIcon />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
