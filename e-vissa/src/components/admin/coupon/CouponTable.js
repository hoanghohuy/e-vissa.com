'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import CouponAdd from './CouponAdd';
import CouponEdit from './CouponEdit';
import CouponDetail from './CouponDetail';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataCoupon } from './api/CouponAPI';
import { handleDataCouponForTable } from './functions/CouponFunction';
import CachedIcon from '@mui/icons-material/Cached';
import { customDataGrid } from '../../Page/CustomMUI/customMUI';

export default function CouponTable() {
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
            width: 90,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Detail coupon'}>
                            <CouponDetail selectedRow={[params.row]} />
                        </Tooltip>
                    }
                />,
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Edit coupon'}>
                            <CouponEdit onEdit={onEdit} selectedRow={[params.row]} />
                        </Tooltip>
                    }
                />,
            ],
        },
        { field: 'code', headerName: 'Code', width: 200 },
        { field: 'date_start_table', headerName: 'Start', width: 180 },
        { field: 'date_end_table', headerName: 'End', width: 180 },
        { field: 'price_table', headerName: 'Price', width: 100 },
        { field: 'percent_table', headerName: 'Percent', width: 80 },
        { field: 'usage_count', headerName: 'Usage count', width: 120 },
        { field: 'max_usage_limit', headerName: 'Max usage limit', width: 120 },
        { field: 'published', headerName: 'Published', type: 'boolean', width: 120 },
    ];

    async function getAllCoupon(token) {
        setLoading(true);
        try {
            const resp = await getAllDataCoupon(token);
            if (resp.data) {
                const respConvert = handleDataCouponForTable(resp.data);
                setData(respConvert);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addCoupon(newData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/coupons`, {
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
                });
                getAllCoupon(accessToken);
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

    async function editCoupon(editData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/coupons/${editData.code}`, {
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
                getAllCoupon(accessToken);
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

    async function deleteCoupon(newData, accessToken) {
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
                getAllCoupon(accessToken);
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
            addCoupon(newData, accessToken);
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
            editCoupon(editData, accessToken);
        } else {
            Swal.fire({
                text: 'Session expired!',
                icon: 'error',
                showConfirmButton: false,
            });
        }
    };
    const onDelete = (listData) => {
        if (accessToken !== '') {
            deleteCoupon(listData, accessToken);
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
            getAllCoupon(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    loading={loading}
                    sx={customDataGrid}
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
                    autoHeight
                />
                <div className={stylesSystem.admin__table__control}>
                    <CouponAdd onAdd={onAdd} />
                    <Button className={stylesSystem.admin__button__secondary} onClick={() => getAllCoupon(accessToken)}>
                        <CachedIcon />
                    </Button>
                    {/* <CouponDelete onDelete={onDelete} selectedRow={selectedRow} /> */}
                </div>
            </div>
        </>
    );
}
