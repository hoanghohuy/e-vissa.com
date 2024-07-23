'use client';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { Button, CircularProgress, TablePagination, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import UserDetail from './UserDetail';
import { getAllDataUser } from './api/UserAPI';
import { adminUserFormatDataForTable } from './functions/UserFunction';
import { getAllDataRole } from '../role/api/RoleAPI';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import CachedIcon from '@mui/icons-material/Cached';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { settingsData } from '../../../../settings';
import UserInvite from './UserInvite';
import { customDataGrid } from '@/components/Page/CustomMUI/customMUI';

export default function UserTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const [listRole, setListRole] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [disabledPermission, setDisabledPermission] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState();
    const limit = settingsData.defaultLimitPagination;
    const [permissionSession, setPermissionSession] = useState({ role: '', isManager: 'false' });

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 130,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Edit'}>
                            {(permissionSession.role == 'administrator' || permissionSession.isManager == true) && (
                                <UserEdit
                                    userRole={permissionSession.role}
                                    onEdit={onEdit}
                                    selectedRow={[params.row]}
                                    listRole={listRole}
                                />
                            )}
                        </Tooltip>
                    }
                    label="Delete"
                />,
            ],
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 120,
            renderCell: (params) => {
                return params.value ? (
                    <img
                        style={{ borderRadius: '50%' }}
                        className="object-cover h-9 w-9"
                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${params.value}`}
                        alt="avatar user"
                    />
                ) : (
                    ''
                );
            },
        },
        { field: 'name_table', headerName: 'Fullname', width: 200 },
        { field: 'gender_table', headerName: 'Gender', width: 120 },
        { field: 'date_of_birth_table', headerName: 'Date of birth', width: 120 },
        { field: 'email', headerName: 'Email', width: 240 },
        { field: 'phone_number', headerName: 'Phone number', width: 150 },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
        },
        {
            field: 'is_manager',
            headerName: 'Manager',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className={params.value ? stylesAdmin.isManager : stylesAdmin.unPublished}>
                        {params.value ? 'Manager' : 'No'}
                    </div>
                );
            },
        },
        {
            field: 'published',
            type: 'boolean',
            headerName: 'Status',
            renderCell: (params) => {
                return (
                    <div
                        className={
                            params.value == 1
                                ? stylesAdmin.published
                                : params.value == 2
                                ? stylesAdmin.internal
                                : stylesAdmin.unPublished
                        }
                    >
                        {params.value == 1 ? 'Active' : params.value == 2 ? 'Internal' : 'Disable'}
                    </div>
                );
            },
            width: 120,
        },
    ];

    const handlePageChange = async (event, page) => {
        setLoading(true);
        setCurrentPage(page);
        getAllUser(accessToken, page + 1, limit);
    };

    async function getAllUser(accessToken, page, limit) {
        try {
            setLoading(true);
            const respData = await getAllDataUser(accessToken, page, limit);
            if (respData.error) {
                ToastNotify('Permission denied!');
                setDisabledPermission(true);
            } else {
                adminUserFormatDataForTable(respData.data);
                setData(respData.data);
                setTotalData(respData.pagination?.totalItems);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addUser(newData, accessToken) {
        setLoading(true);
        try {
            let pathImagePost;
            if (newData.file) {
                let fd = new FormData();
                fd.append('images', newData.file);
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images?private=avatar`, {
                    method: 'POST',
                    headers: {
                        Authorization: accessToken,
                    },
                    body: fd,
                });
                const respJson = await resp.json();
                pathImagePost = await respJson?.uploadedImageNames?.[0];
                newData.image = pathImagePost;
            }
            const resp = await fetch(`/api/admin/auth/register`, {
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
                getAllUser(session.accessToken, currentPage + 1, limit);
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

    async function inviteUser(newData, accessToken) {
        setLoading(true);
        try {
            const resp = await fetch(`/api/admin/users_invitation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: `Invited email ${newData.email} !`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
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

    async function editUser(editData, accessToken) {
        setLoading(true);
        try {
            const resp = await fetch(`/api/admin/users/${editData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(editData),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Data added successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllUser(session.accessToken, currentPage + 1, limit);
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

    const onInvite = async (data) => {
        if (accessToken !== '') {
            inviteUser(data, accessToken);
        } else {
            Swal.fire({
                text: 'Session expired!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const onAdd = async (newData) => {
        if (accessToken !== '') {
            addUser(newData, accessToken);
        } else {
            Swal.fire({
                text: 'Session expired!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    const onEdit = (editData) => {
        if (accessToken !== '') {
            editUser(editData, accessToken);
        } else {
            Swal.fire({
                text: 'Session expired!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    const onDelete = (listData) => {};
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
            setPermissionSession({ role: session.user.role, isManager: session?.user?.is_manager ? true : false });
            setAccessToken(session.accessToken);
            getAllUser(session.accessToken, currentPage + 1, limit);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    onRowSelectionModelChange={handleSelectRow}
                    sx={customDataGrid}
                    autoHeight
                    rows={data}
                    loading={loading}
                    columns={columns}
                    // checkboxSelection
                    hideFooter
                />
                <table style={{ width: '100%' }}>
                    <TablePagination
                        onPageChange={handlePageChange}
                        rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]}
                        count={totalData}
                        page={currentPage}
                        rowsPerPage={limit}
                    />
                </table>
                <div className={stylesSystem.admin__table__control}>
                    {/* {(permissionSession.role == 'administrator' || permissionSession.isManager == true) && (
                        <UserInvite onInvite={onInvite} permission={permissionSession} accessToken={accessToken} />
                    )}
                    {permissionSession.role == 'administrator' && (
                        <UserAdd onAdd={onAdd} listRole={listRole} disabled={disabledPermission} />
                    )} */}
                    <Tooltip title={'RELOAD DATA'}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                getAllUser(accessToken, currentPage + 1, limit);
                            }}
                            className={stylesSystem.admin__button__primary__default}
                        >
                            <CachedIcon />
                        </Button>
                    </Tooltip>
                    {/* <UserDetail selectedRow={selectedRow} /> */}
                    {/* <UserDelete onDelete={onDelete} selectedRow={selectedRow} /> */}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
