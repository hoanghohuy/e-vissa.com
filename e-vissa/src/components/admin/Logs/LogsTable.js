'use client';
import stylesSystem from '@/app/page.module.css';
import { Button, TablePagination, Tooltip } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getAllDataLogs } from './api/LogsAPI';
import LogsDetail from './LogsDetail';
import CachedIcon from '@mui/icons-material/Cached';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { ToastContainer } from 'react-toastify';
import { handleDataLogForTable } from '../Function_Admin';
import { settingsData } from '../../../../settings';
import { customDataGrid } from '../../Page/CustomMUI/customMUI';

export default function LogsTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState();
    const limit = settingsData.defaultLimitPagination;

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params) => [
                <Tooltip title={'Log detail'}>
                    <LogsDetail selectedRow={[params.row]} />
                </Tooltip>,
            ],
        },
        { field: 'action', headerName: 'Action name', width: 240 },
        { field: 'created_at', headerName: 'Created at', width: 180 },
        { field: 'IP', headerName: 'IP', width: 140 },
        { field: 'created_by_table', headerName: 'User', width: 160 },
        { field: 'desc', headerName: 'Detail action', width: 600 },
        // { field: 'created_by', headerName: 'Tài khoản', width: 150 },
    ];

    const handlePageChange = async (event, page) => {
        setLoading(true);
        setCurrentPage(page);
        getAllLogs(accessToken, page + 1, limit);
    };

    async function getAllLogs(token, page, limit) {
        setLoading(true);
        try {
            const resp = await getAllDataLogs(token, page, limit);
            if (resp.error) {
                ToastNotify('Permission denied!');
            } else {
                handleDataLogForTable(resp.data);
                setData(resp.data);
                setTotalData(resp.pagination?.totalItems);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getAllLogs(session.accessToken, currentPage + 1, limit);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <DataGrid
                    sx={customDataGrid}
                    autoHeight
                    loading={loading}
                    rows={data}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    columns={columns}
                    hideFooter
                />

                <div className={stylesSystem.admin__table__control}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            getAllLogs(accessToken, currentPage + 1, limit);
                        }}
                        className={stylesSystem.admin__button__primary__default}
                    >
                        <CachedIcon />
                    </Button>
                    <TablePagination
                        className="w-full border-none"
                        onPageChange={handlePageChange}
                        rowsPerPageOptions={[]}
                        count={totalData}
                        page={currentPage}
                        rowsPerPage={10}
                    />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
