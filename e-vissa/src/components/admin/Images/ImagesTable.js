'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { columns } from './ImagesModel';
import ImagesAdd from './ImagesAdd';
import ImagesEdit from './ImagesEdit';
import ImagesDetail from './ImagesDetail';
import ImagesDelete from './ImagesDelete';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import { getAllDataImages } from './api/imagesAPI';
import { handleDataImagesForTable } from './functions/ImagesFunction';
import { PageNotify } from '@/components/Page/PageNotify/PageNotify';
import { customDataGrid } from '@/components/Page/CustomMUI/customMUI';

export default function ImagesTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'link',
            headerName: 'Preview',
            width: 120,
            renderCell: (params) => {
                return params.value ? (
                    <img
                        onClick={(params) => onShowThumbnail(params)}
                        style={{ border: '1px solid #ccc' }}
                        className="w-auto h-[40px] object-cover"
                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${params.value}`}
                    />
                ) : (
                    ''
                );
            },
        },
        { field: 'name', headerName: 'Name', width: 500 },
    ];

    async function getAllImages(token) {
        setLoading(true);
        try {
            const resp = await getAllDataImages(token);
            const dataValid = handleDataImagesForTable(resp.uploadedImageNames);
            setData(dataValid);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addImages(newData, accessToken) {
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
                getAllImages(accessToken);
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

    async function editImages(editData, accessToken) {
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
                getAllImages(accessToken);
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

    async function deleteImages(newData, accessToken) {
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
                getAllImages(accessToken);
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

    const handleAfterDelete = async () => {
        PageNotify('success', 'Image(s) deleted', 'OK');
        getAllImages(accessToken);
    };

    const handleAfterUpload = () => {
        getAllImages(accessToken);
    };

    const onAdd = (newData) => {
        if (accessToken !== '') {
            addImages(newData, accessToken);
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
            editImages(editData, accessToken);
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
            deleteImages(listData, accessToken);
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

    const onShowThumbnail = (params) => {
        console.log(params.target?.currentSrc);
        Swal.fire({
            imageUrl: `${params.target.currentSrc}`,
            imageAlt: 'link',
            showConfirmButton: false,
            customClass: {
                popup: 'p-4',
                image: 'm-0',
            },
        });
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getAllImages(session.accessToken);
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
                    <ImagesAdd onAdd={onAdd} token={accessToken} handleAfterUpload={handleAfterUpload} />
                    {/* <ImagesEdit onEdit={onEdit} selectedRow={selectedRow} /> */}
                    {/* <ImagesDetail selectedRow={selectedRow} /> */}
                    <ImagesDelete
                        onDelete={onDelete}
                        selectedRow={selectedRow}
                        token={accessToken}
                        handleAfterDelete={handleAfterDelete}
                    />
                    <Tooltip title="RELOAD DATA" placement="top">
                        <Button
                            className={stylesSystem.admin__button__primary__default}
                            variant="outlined"
                            onClick={() => getAllImages(accessToken)}
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
