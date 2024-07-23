'use client';
import stylesSystem from '@/app/page.module.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import VisaEdit from './VisaEdit';
import stylesAdmin from '../Admin.module.css';
import VisaAdd from './VisaAdd';
import VisaDetail from './VisaDetail';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { customDataGrid, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import { getAllTypeVisa } from '../type_visa/getData';
import { handleDataForAutocomplete, handleDataVisaForTable } from '../Function_Admin';
import { useSession } from 'next-auth/react';
import { getAllDataCurrency } from '../currency/api/CurrencyAPI';
import Swal from 'sweetalert2';
import VisaAddCountry from './VisaAddCountry';
import VisaExport from './VisaExport';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import CachedIcon from '@mui/icons-material/Cached';
import VisaSupportingDoc from './VisaSupportingDoc';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function VisaTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCountry, setLoadingCountry] = useState(true);
    const [listCurrency, setListCurrency] = useState([]);
    const [listTypeVisa, setListTypeVisa] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [dataInputSearch, setDataInputSearch] = useState('');
    const [checkSearch, setCheckSearch] = useState(false);

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            width: 140,
            getActions: (params) => [
                <div className="mx-1">
                    <VisaDetail
                        selectedRow={[params.row]}
                        listTypeVisa={listTypeVisa}
                        listCurrency={listCurrency}
                        listCountries={listCountries}
                        accessToken={session.accessToken}
                        onDuppicate={onDuppicate}
                    />
                </div>,
                <div className="mx-1">
                    <VisaEdit
                        onEdit={onEdit}
                        selectedRow={[params.row]}
                        listTypeVisa={listTypeVisa}
                        listCurrency={listCurrency}
                        listCountries={listCountries}
                    />
                </div>,
                <div className="mx-1">
                    <VisaAddCountry
                        listSelected={[]}
                        onEdit={onAddCountry}
                        selectedRow={[params.row]}
                        listTypeVisa={listTypeVisa}
                        listCountries={listCountries}
                        mode={'add'}
                    />
                </div>,
            ],
        },
        { field: 'country_table', headerName: 'Country', width: 80 },
        { field: 'visa_table', headerName: 'Visa type', width: 150 },
        { field: 'validity_table', headerName: 'Validity', width: 120 },
        {
            field: 'length_of_stay',
            headerName: 'Length of stay',
            width: 150,
            renderCell: (params) => {
                return `${params.value} days`;
            },
        },
        {
            field: 'government_fee_table',
            headerName: 'Government fee',
            width: 180,
            renderCell: (params) => {
                return <div className="text-[#fff] bg-[#7D0A0A] py-1 px-2 rounded-md">{params.value}</div>;
            },
        },
        { field: 'allowed_country_table', headerName: 'Allowed country', width: 150 },
        {
            field: 'entry_type',
            headerName: 'Entry type',
            width: 150,
        },
        {
            field: 'published',
            type: 'boolean',
            headerName: 'Status',
            renderCell: (params) => {
                return (
                    <div className={params.row.published ? stylesAdmin.published : stylesAdmin.unPublished}>
                        {params.row.published ? 'Active' : 'Disable'}
                    </div>
                );
            },
            width: 120,
        },
    ];

    async function getDataForVisa(token) {
        try {
            // GET LIST CURRENCY
            // const resp = await getAllDataCurrency();
            // if (resp.data) {
            //     const data = resp.data;
            //     const dataUpdated = handleDataForAutocomplete(data);
            //     setListCurrency(dataUpdated);
            // }
            const resp2 = await getAllTypeVisa(token);
            if (resp2.data) {
                const resp2Updated = handleDataForAutocomplete(resp2.data);
                setListTypeVisa(resp2Updated);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingCountry(false);
        }
    }

    async function handleSearchVisaByCountry(countryCode = undefined) {
        if (dataInputSearch == '' && countryCode === undefined) {
            setCheckSearch(true);
            return;
        } else {
            countryCode = countryCode !== undefined ? countryCode : dataInputSearch;

            try {
                setLoading(true);
                const respOrg = await fetch(`/api/admin/xref_visa_country?country=${countryCode}`, {
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    },
                });
                if (respOrg.status === 200) {
                    const dataJson = await respOrg.json();
                    const resp = handleDataVisaForTable(dataJson);
                    setData(resp);
                } else {
                    setData([]);
                    ToastNotify(`Visa not found for country ${countryCode}`);
                }
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        }
    }

    async function addVisa(newData, accessToken) {
        setLoading(true);
        try {
            const resp = await fetch(`/api/admin/visa_country_detail`, {
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
                handleSearchVisaByCountry();
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

    async function addVisaCountry(newData, accessToken) {
        try {
            setLoading(true);
            const resp = await fetch(`/api/admin/xref_visa_country`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                handleSearchVisaByCountry();
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

    async function editVisa(editData, accessToken) {
        try {
            setLoading(true);
            const id = editData.id;
            const resp = await fetch(`/api/admin/visa_country_detail/${id}`, {
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
                handleSearchVisaByCountry();
            } else {
                ToastNotify('ERROR');
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const onAdd = (newData) => {
        if (accessToken !== '') {
            addVisa(newData, accessToken);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Session expired!',
                icon: 'error',
            });
        }
    };

    const onAddCountry = (newData) => {
        if (accessToken !== '') {
            addVisaCountry(newData, accessToken);
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
            editVisa(editData, accessToken);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Session expired!',
                icon: 'error',
            });
        }
    };

    const onDuppicate = () => {
        handleSearchVisaByCountry();
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getDataForVisa(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <div className="flex items-center gap-3 mb-2">
                    <Autocomplete
                        sx={{
                            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                                paddingTop: '6px',
                            },
                            paddingTop: '0px',
                            '& .MuiOutlinedInput-root': {
                                paddingTop: '6px',
                                height: '40px',
                                fontFamily: 'Inter',
                            },
                        }}
                        loading={loadingCountry}
                        autoFocus
                        openOnFocus
                        style={{ width: '280px' }}
                        disablePortal
                        id="country"
                        size="small"
                        // className={!dataInputSearch ? 'fa-bounce' : ''}
                        options={listCountries}
                        renderInput={(params) => (
                            <TextField
                                sx={customTextFieldAdmin}
                                error={checkSearch}
                                {...params}
                                variant="outlined"
                                placeholder="Select country"
                            />
                        )}
                        renderOption={(props, option) => (
                            <>
                                <Box
                                    {...props}
                                    key={option.code}
                                    component="li"
                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                >
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                    {option.label}
                                </Box>
                            </>
                        )}
                        onChange={(event, newInputValue) => {
                            if (newInputValue) {
                                setDataInputSearch(newInputValue.code);
                                setCheckSearch(false);
                                handleSearchVisaByCountry(newInputValue.code);
                            } else {
                                setDataInputSearch('');
                                setCheckSearch(true);
                            }
                        }}
                    />
                </div>
                <DataGrid
                    localeText={{
                        noRowsLabel: (
                            <>
                                <div style={{ paddingLeft: 10, fontSize: '24px', color: 'green' }}>
                                    Select a country first
                                </div>
                            </>
                        ),
                    }}
                    loading={loading}
                    autoHeight
                    sx={customDataGrid}
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
                    // checkboxSelection
                />
                <div className={stylesSystem.admin__table__control}>
                    <VisaAdd
                        onAdd={onAdd}
                        listTypeVisa={listTypeVisa}
                        listCurrency={listCurrency}
                        listCountries={listCountries}
                    />

                    <VisaSupportingDoc accessToken={accessToken} country={dataInputSearch} />

                    <VisaExport accessToken={accessToken} country={dataInputSearch} />
                    <Button
                        variant="outlined"
                        onClick={() => handleSearchVisaByCountry()}
                        className={stylesSystem.admin__button__secondary}
                    >
                        <CachedIcon />
                    </Button>
                </div>
            </div>
            {/* <UserManual content={content} /> */}
        </>
    );
}
