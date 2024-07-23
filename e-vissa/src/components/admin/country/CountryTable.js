'use client';
import stylesSystem from '@/app/page.module.css';
import styles from './css/Country.module.css';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { columns } from './CountryModel';
import CountryDetail from './CountryDetail';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataCountry } from './api/CountryAPI';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';

export default function CountryTable() {
    const [data, setData] = useState(listCountries);
    const [dataSearch, setDataSearch] = useState(listCountries);
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    const handleSearchCountry = (e) => {
        let dataCurrent = data;
        const valueSearch = e.target.value;
        const search = dataCurrent.filter((country) => country.name.toLowerCase().includes(valueSearch.toLowerCase()));
        setDataSearch(search);
        dataCurrent = data;
    };

    // async function getAllCountry() {
    //     try {
    //         const resp = await getAllDataCountry();
    //         setData(resp);
    //         setDataSearch(resp);
    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //         setSelectedRow([]);
    //     }
    // }

    async function addCountry(newData, accessToken) {
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

    async function editCountry(editData, accessToken) {
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
                getAllCountry();
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

    async function deleteCountry(newData, accessToken) {
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
            addCountry(newData, accessToken);
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
            editCountry(editData, accessToken);
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
            deleteCountry(listData, accessToken);
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

    // useEffect(() => {
    //     getAllCountry();
    // }, []);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                {loading ? (
                    <CircularProgress />
                ) : (
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
                    <>
                        <div className={styles.country__wrapper}>
                            <TextField
                                variant="outlined"
                                placeholder="Search country"
                                size="small"
                                onChange={handleSearchCountry}
                                style={{ paddingBottom: '16px' }}
                            />
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                {dataSearch &&
                                    dataSearch.map((item, index) => (
                                        <Grid item lg={3} xs={12} md={12} sm={12}>
                                            <div className={styles.country__item}>
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
                                                    src={`/flags/png100px/${item.code.toLowerCase()}.png`}
                                                    srcSet={`/flags/png100px/${item.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                                <div className={styles.country__item__title}>
                                                    <div className={styles.country__item__title__name}>{item.name}</div>
                                                    <div className={styles.country__item__title__phone}>
                                                        (+{item.phone || 'Empty'})
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    </>
                )}
                {/* <div className={stylesSystem.admin__table__control}>
                    <CountryDetail selectedRow={selectedRow} />
                </div> */}
            </div>
        </>
    );
}
