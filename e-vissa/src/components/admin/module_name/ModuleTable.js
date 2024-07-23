'use client';
import stylesSystem from '@/app/page.module.css';
import { CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { columns } from './ModuleModel';
import ModuleAdd from './ModuleAdd';
import ModuleEdit from './ModuleEdit';
import ModuleDetail from './ModuleDetail';
import ModuleDelete from './ModuleDelete';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import { getAllDataModule } from './api/ModuleAPI';
import { customDataGrid } from '@/components/Page/CustomMUI/customMUI';

export default function ModuleTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    async function getAllModule() {
        setLoading(true);
        try {
            const resp = await getAllDataModule();
            setData(resp);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addModule(newData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/module`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'Data added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Đã hiểu',
                });
                getAllModule();
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

    async function editModule(editData, accessToken) {
        try {
            setLoading(true);
            const id = editData.id;
            const newDataEdit = {
                name: editData.name,
                desc: editData.desc,
            };
            const resp = await fetch(`/api/module/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newDataEdit),
            });
            if (resp.status == 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Updated successfully!',
                    icon: 'success',
                });
                getAllModule();
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

    async function deleteModule(newData, accessToken) {
        const id = newData[0].id;
        try {
            setLoading(true);
            const resp = await fetch(`/api/module/${id}`, {
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
                getAllModule();
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
            addModule(newData, accessToken);
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
            editModule(editData, accessToken);
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
            deleteModule(listData, accessToken);
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
        if (session && session.accessToken) setAccessToken(session.accessToken);
    }, [status]);

    useEffect(() => {
        getAllModule();
    }, []);

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
                    checkboxSelection
                />
                <div className={stylesSystem.admin__table__control}>
                    <ModuleAdd onAdd={onAdd} />
                    <ModuleEdit onEdit={onEdit} selectedRow={selectedRow} />
                    <ModuleDetail selectedRow={selectedRow} />
                    <ModuleDelete onDelete={onDelete} selectedRow={selectedRow} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
