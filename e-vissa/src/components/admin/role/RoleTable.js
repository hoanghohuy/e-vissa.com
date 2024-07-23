'use client';
import stylesSystem from '@/app/page.module.css';
import { CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { columns } from './RoleModel';
import RoleAdd from './RoleAdd';
import RoleEdit from './RoleEdit';
import RoleDetail from './RoleDetail';
import RoleDelete from './RoleDelete';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataRole } from './api/RoleAPI';
import { handleDataRoleForTable } from './functions/RoleFunction';

export default function RoleTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    async function getAllRole() {
        try {
            const resp = await getAllDataRole();
            const respData = handleDataRoleForTable(resp);
            setData(respData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addRole(newData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/roles`, {
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
                    confirmButtonText: 'Confirm',
                });
                getAllRole();
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

    async function editRole(editData, accessToken) {
        try {
            setLoading(true);
            const id = editData.id;
            const newDataEdit = {
                name: editData.name,
                value: editData.value,
            };
            const resp = await fetch(`/api/admin/roles/${id}`, {
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
                getAllRole();
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

    async function deleteRole(newData, accessToken) {
        const id = newData[0].id;
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/roles/${id}`, {
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
                getAllRole();
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
            addRole(newData, accessToken);
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
            editRole(editData, accessToken);
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
            deleteRole(listData, accessToken);
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
        getAllRole();
    }, []);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <DataGrid
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
                )}
                <div className={stylesSystem.admin__table__control}>
                    <RoleAdd onAdd={onAdd} />
                    {/* <RoleEdit onEdit={onEdit} selectedRow={selectedRow} /> */}
                    <RoleDetail selectedRow={selectedRow} />
                    {/* <RoleDelete onDelete={onDelete} selectedRow={selectedRow} /> */}
                </div>
            </div>
        </>
    );
}
