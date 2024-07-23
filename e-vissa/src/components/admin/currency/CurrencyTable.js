'use client';
import stylesSystem from '@/app/page.module.css';
import styles from './css/Currency.module.css';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { columns } from './CurrencyModel';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
// import { getAllDataCurrency } from './api/CurrencyAPI';
import currencyData from '@/dbx/e-vissa/seeders/data/currency_data.json';

export default function CurrencyTable() {
    const [data, setData] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    const handleSearchCurrency = (e) => {
        let dataCurrent = data;
        const valueSearch = e.target.value;
        const search = dataCurrent.filter((country) => country.name.toLowerCase().includes(valueSearch.toLowerCase()));
        setDataSearch(search);
        dataCurrent = data;
    };

    async function getAllCurrency() {
        try {
            // const resp = await getAllDataCurrency();
            // setData(resp?.data);
            // setDataSearch(resp?.data);
            setData(currencyData);
            setDataSearch(currencyData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    }

    async function addCurrency(newData, accessToken) {
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
                    text: 'Data added successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                getAllVisa();
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

    async function editCurrency(editData, accessToken) {
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
                getAllCurrency();
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

    async function deleteCurrency(newData, accessToken) {
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
                getAllVisa();
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
            addCurrency(newData, accessToken);
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
            editCurrency(editData, accessToken);
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
            deleteCurrency(listData, accessToken);
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
        getAllCurrency();
    }, []);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className={styles.currency__wrapper}>
                            <TextField
                                variant="outlined"
                                placeholder="Search currency"
                                size="small"
                                onChange={handleSearchCurrency}
                                style={{ paddingBottom: '16px' }}
                            />
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                {dataSearch &&
                                    dataSearch.map((item, index) => (
                                        <Grid item lg={3} xs={12} md={6} sm={12}>
                                            <div className={styles.currency__item}>
                                                <div
                                                    style={{
                                                        width: '28px',
                                                        textAlign: 'center',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {index + 1}
                                                </div>
                                                <img
                                                    style={{ borderRadius: '4px' }}
                                                    loading="lazy"
                                                    width={40}
                                                    height={40}
                                                    src={`/flags/currency/${
                                                        item.isObsolete ? '0_Symbol_Money' : item.code
                                                    }.svg`}
                                                    // srcSet={`/flags/currency/0_Symbol_Money.svg`}
                                                />
                                                <div className={styles.currency__item__text}>
                                                    <div className={styles.currency__item__title}>{item.name}</div>
                                                    <div className={styles.currency__item__symbol}>
                                                        {item.symbol ? item.symbol : item.code} (
                                                        {item.isObsolete ? 'Obsolete' : 'Active'})
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    </>
                    // <DataGrid
                    //     onRowSelectionModelChange={handleSelectRow}
                    //     rows={data}
                    //     slots={{
                    //         toolbar: GridToolbar,
                    //     }}
                    //     columns={columns}
                    //     initialState={{
                    //         pagination: {
                    //             paginationModel: { page: 0, pageSize: 10 },
                    //         },
                    //     }}
                    //     pageSizeOptions={[10, 50]}
                    //     checkboxSelection
                    // />
                )}
            </div>
        </>
    );
}
