'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, TablePagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { customDataGrid, customTablePagination } from '@/components/Page/CustomMUI/customMUI';
import React, { useEffect, useState } from 'react';
import OrderDetail from './OrderDetail';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataOrder, getAllDataTurkyOrder } from './api/OrderAPI';
import { handleDataOrderForAutocomplete } from '../Function_Admin';
import CachedIcon from '@mui/icons-material/Cached';
import { ToastContainer } from 'react-toastify';
import { settingsData } from 'settings';
import { getAllDataServices } from '../services/api/ServicesAPI';
import styles from './css/Order.module.css';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { onValue, onChildRemoved } from 'firebase/database';
import { orderRef } from '@/libs/firebase';
import { useRouter } from 'next/navigation';

export default function OrderTable({ site }) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [totalData, setTotalData] = useState();
    const [dataServices, setDataServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchCode, setSearchCode] = useState('');
    const [limit, setLimit] = useState(settingsData.defaultLimitPagination);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 120 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 60,
            getActions: (params) => [
                <div className="mx-1">
                    <OrderDetail
                        selectedRow={[params.row]}
                        accessToken={accessToken}
                        onConfirm={onConfirm}
                        dataServices={dataServices}
                        site={site}
                    />
                </div>,
            ],
        },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (params) => {
                return <div className={`${styles[params.value]}`}>{params.value}</div>;
            },
            width: 120,
        },
        {
            field: 'admin_note',
            headerName: 'Admin note',
            width: 180,
        },
        { field: 'created_at', headerName: 'Created at', width: 170 },
        {
            field: 'booking_code',
            headerName: 'Code',
            width: 180,
            renderCell: (params) => {
                return <div className="bg-[#597E52] text-[#fff] py-1 px-2 rounded-md">{params.value}</div>;
            },
        },
        {
            field: 'nationality',
            headerName: 'Nationality',
            width: 180,
            renderCell: (params) => {
                return (
                    <div className="bg-[#176B87] text-[#fff] py-1 px-2 rounded-md">
                        {listCountries.find((item) => item.code == params.value)?.name}
                    </div>
                );
            },
        },
        {
            field: 'xref_visa_country_info',
            headerName: 'Evisa',
            width: 180,
            renderCell: (params) => {
                return (
                    <div className="bg-[#176B87] text-[#fff] py-1 px-2 rounded-md">
                        {listCountries.find((item) => item.code == params.value.country)?.name}
                    </div>
                );
            },
        },
        // { field: 'arrival_date', headerName: 'Arrival date', width: 120 },
        { field: 'customer', headerName: 'Customer', width: 240 },
        {
            field: 'total_price',
            headerName: 'Total price',
            width: 100,
            renderCell: (params) => {
                return (
                    params.value && (
                        <div className="bg-[#7D0A0A] text-[#fff] py-1 px-2 rounded-md">
                            {params.value && `${params.value} USD`}
                        </div>
                    )
                );
            },
        },
        {
            field: 'customer_note',
            headerName: 'Customer note',
            width: 180,
        },
        { field: 'confirm_by', headerName: 'Confirm by', width: 180 },
        // { field: 'arrival_date', headerName: 'Arrival date', width: 120 },
        // { field: 'departure_date', headerName: 'Departure date', width: 120 },
        // { field: 'travel_by', headerName: 'Travel by', width: 150 },
        // { field: 'arrival_port', headerName: 'Arrival port', width: 120 },
        // { field: 'another_people_number', headerName: 'Another people', width: 150 },
        // { field: 'service_ids', headerName: 'Additional service', width: 150 },
    ];

    const onSeachOrderByID = async () => {
        if (searchCode == '' || searchCode.trim < 6) {
            ToastNotify('Order code is not valid');
            return;
        }
        try {
            setLoading(true);
            const [, , code] = searchCode.split('_');
            if (code) {
                let API_LINK_SEARCH = '';
                if (site && site == 'Evissa') {
                    API_LINK_SEARCH = '/api/admin/orders';
                }
                if (site && site == 'Turkey') {
                    API_LINK_SEARCH = '/api/admin/turkey/orders';
                }
                const order = await fetch(`${API_LINK_SEARCH}/${code}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: accessToken || localStorage.getItem('guest_token'),
                        Authorization: accessToken,
                    },
                });
                if (order.status === 200) {
                    const resp = await order.json();
                    if (resp) {
                        let dataArr = [resp];
                        handleDataOrderForAutocomplete(dataArr, site);
                        setData(dataArr);
                    } else {
                        setData([]);
                    }
                }
            } else {
                ToastNotify('Order code is not valid');
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = async (event, page) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setCurrentPage(page);
        if (site && site == 'Evissa') {
            getAllOrder(session.accessToken, page + 1, limit);
        }
        if (site && site == 'Turkey') {
            getAllTurkeyOrder(session.accessToken, page + 1, limit);
        }
    };

    const handleRowPerPageChange = async (event) => {
        const rowPerPageSeleted = event.target.value;
        setLimit(rowPerPageSeleted);
        if (site && site == 'Evissa') {
            getAllOrder(session.accessToken, currentPage + 1, rowPerPageSeleted);
        }
        if (site && site == 'Turkey') {
            getAllTurkeyOrder(session.accessToken, currentPage + 1, rowPerPageSeleted);
        }
    };

    const handleNewOrder = () => {
        if (site && site == 'Evissa') {
            router.push('/admin/order/new');
        }
        if (site && site == 'Turkey') {
            router.push('/admin/turkey-order/new');
        }
    };

    async function getAllTurkeyOrder(accessToken, page, limit) {
        try {
            setLoading(true);
            const resp = await getAllDataTurkyOrder(accessToken, page, limit);
            if (resp.data) {
                handleDataOrderForAutocomplete(resp.data, site);
                setData(resp.data);
                setTotalData(resp.pagination?.totalItems);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function getAllOrder(accessToken, page, limit) {
        try {
            setLoading(true);
            const resp = await getAllDataOrder(accessToken, page, limit);
            if (resp.data) {
                handleDataOrderForAutocomplete(resp.data, site);
                setData(resp.data);
                setTotalData(resp.pagination?.totalItems);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function getAllServices(token) {
        try {
            const resp = await getAllDataServices(token);
            if (resp.data) {
                setDataServices(resp.data);
            }
        } catch (error) {
            throw error;
        }
    }

    const handleReload = () => {
        if (site && site == 'Evissa') {
            getAllOrder(session.accessToken, currentPage + 1, limit);
        }
        if (site && site == 'Turkey') {
            getAllTurkeyOrder(session.accessToken, currentPage + 1, limit);
        }
    };

    async function confirmOrder(statusOrder, accessToken) {
        const id = statusOrder.id;
        try {
            setLoading(true);
            const API_LINK_UPDATE = site && site == 'Turkey' ? '/api/admin/turkey/orders' : '/api/admin/orders';

            const resp = await fetch(`${API_LINK_UPDATE}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(statusOrder),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                if (site && site == 'Evissa') {
                    getAllOrder(session.accessToken, currentPage + 1, limit);
                }
                if (site && site == 'Turkey') {
                    getAllTurkeyOrder(session.accessToken, currentPage + 1, limit);
                }
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

    const onConfirm = (status) => {
        if (accessToken !== '') {
            confirmOrder(status, accessToken);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Session expired!',
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        if (!session || !session.accessToken || site !== 'Evissa') return;
        const unsubscribeLatestOrder = onValue(orderRef, () => {
            getAllOrder(session.accessToken, currentPage + 1, limit);
        });
        const unsubscribeChildRemoved = onChildRemoved(orderRef, () => {
            getAllOrder(session.accessToken, currentPage + 1, limit);
        });

        return () => {
            unsubscribeLatestOrder();
            unsubscribeChildRemoved();
        };
    }, [session, site]);

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            if (site && site == 'Turkey') {
                getAllTurkeyOrder(session.accessToken, currentPage + 1, limit);
            }
            getAllServices(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <div className="pb-2 flex justify-between">
                    <div className="flex gap-2">
                        <input
                            onChange={(e) => setSearchCode(e.target.value)}
                            className="w-[240px] px-2 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block"
                            placeholder="Order ID..."
                        />
                        <Button
                            onClick={onSeachOrderByID}
                            variant="outlined"
                            className={stylesSystem.admin__button__primary}
                        >
                            Search
                        </Button>
                    </div>
                    <Button variant="outlined" onClick={handleReload} className={stylesSystem.admin__button__secondary}>
                        <CachedIcon />
                    </Button>
                </div>
                <>
                    <DataGrid
                        loading={loading}
                        autoHeight
                        rows={data}
                        columns={columns}
                        sx={customDataGrid}
                        hideFooter
                    />
                    <table style={{ width: '100%' }}>
                        <TablePagination
                            onPageChange={handlePageChange}
                            rowsPerPageOptions={[10, 50, 100]}
                            rowsPerPage={limit}
                            onRowsPerPageChange={handleRowPerPageChange}
                            count={totalData}
                            page={currentPage}
                            sx={customTablePagination}
                        />
                    </table>
                </>
                <div className={styles.reload__order__panel}>
                    <Button
                        className={stylesSystem.admin__button__primary}
                        variant="contained"
                        onClick={handleNewOrder}
                    >
                        New order
                    </Button>
                    {/* <OrderAdd onAdd={onAdd} /> */}
                    {/* <OrderEdit onEdit={onEdit} selectedRow={selectedRow} /> */}
                    {/* <OrderDetail
                        selectedRow={selectedRow}
                        accessToken={accessToken}
                        onConfirm={onConfirm}
                        dataServices={dataServices}
                    /> */}

                    {/* <OrderDelete onDelete={onDelete} selectedRow={selectedRow} /> */}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
