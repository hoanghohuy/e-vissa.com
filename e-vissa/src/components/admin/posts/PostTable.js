'use client';
import stylesSystem from '@/app/page.module.css';
import UserStatus from '@/components/FirebaseRealTimeDb/UserStatus';
import { Button, TablePagination, Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getAllDataPost } from './api/PostAPI';
import PostEdit from './PostEdit';
import PostAdd from './PostAdd';
import { PageNotify } from '../../Page/PageNotify/PageNotify';
import { handleDataPostForTable } from './functions/PostFunction';
import CachedIcon from '@mui/icons-material/Cached';
import { settingsData } from '/settings';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import stylesAdmin from '../Admin.module.css';
import { getAllDataCategory } from '../category/api/CategoryAPI';
import PostGuide from './PostGuide';
import PostPreview from './PostPreview';
import { customDataGrid, customTablePagination } from '../../Page/CustomMUI/customMUI';
import moment from 'moment';
import { isSuccessStatus } from '../../../utils/validation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PostTable() {
    const [data, setData] = useState([]);
    const params = useSearchParams();
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState();
    const [dataCategory, setDataCategory] = useState([]);
    const [limit, setLimit] = useState(settingsData.defaultLimitPagination);
    const searchProps = params.get('search');
    const searchRef = useRef();

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    sx={{ '&.MuiIconButton-root:hover': { background: 'none' } }}
                    icon={<PostPreview selectedRow={[params.row]} />}
                    label="Preview"
                />,
                <GridActionsCellItem
                    sx={{ '&.MuiIconButton-root:hover': { background: 'none' } }}
                    icon={
                        <PostEdit
                            selectedRow={[params.row]}
                            accessToken={accessToken}
                            categoryProps={dataCategory}
                            handleAfterEdit={handleUpdateTable}
                        />
                    }
                    label="Edit"
                />,
                <GridActionsCellItem
                    sx={{ '&.MuiIconButton-root:hover': { background: 'none' } }}
                    icon={
                        <Tooltip placement="top" title="COPY LINK" onClick={() => onCopyLink([params.row])}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 2C4 0.89543 4.89543 0 6 0H14C15.1046 0 16 0.895431 16 2V10C16 11.1046 15.1046 12 14 12H6C4.89543 12 4 11.1046 4 10V2ZM6 1C5.44772 1 5 1.44772 5 2V10C5 10.5523 5.44772 11 6 11H14C14.5523 11 15 10.5523 15 10V2C15 1.44772 14.5523 1 14 1H6ZM2 5C1.44772 5 1 5.44772 1 6V14C1 14.5523 1.44772 15 2 15H10C10.5523 15 11 14.5523 11 14V13H12V14C12 15.1046 11.1046 16 10 16H2C0.89543 16 0 15.1046 0 14V6C0 4.89543 0.89543 4 2 4H3V5H2Z"
                                    fill="#1D4ED8"
                                />
                            </svg>
                        </Tooltip>
                    }
                    label="Copy"
                />,
            ],
        },
        // { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Post title', width: 400 },
        {
            field: 'category_info',
            headerName: 'Category',
            width: 130,
            renderCell: (params) => {
                const list = params.value;
                const nameList = list.map((item) => item.name);
                const nameString = nameList.join(', ');
                return nameString;
            },
        },
        // { field: 'meta_desc', headerName: 'Description (meta description)', width: 250 },
        // { field: 'keyword', headerName: 'Keywords', width: 200 },
        // { field: 'content', headerName: 'Content', width: 200 },
        {
            field: 'image',
            headerName: 'Thumbnail',
            width: 140,
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
        { field: 'author', headerName: 'Author', width: 140 },
        {
            field: 'published',
            headerName: 'Status',
            renderCell: (params) => {
                return (
                    <div
                        className={`${
                            params.value == '1'
                                ? stylesAdmin.Post__Published
                                : params.value == '0'
                                ? stylesAdmin.Post__unPublished
                                : stylesAdmin.Post__Draft
                        }`}
                    >
                        {params.value == '1' ? 'Published' : params.value == '0' ? 'Disabled' : 'Draft'}
                    </div>
                );
            },
            width: 120,
        },
        {
            field: 'created_at',
            headerName: 'Created at',
            width: 160,
            renderCell: (params) => {
                return <div>{moment(params.value).format('HH:mm:ss - DD/MM/YYYY')}</div>;
            },
        },
        {
            field: 'updated_at',
            headerName: 'Updated at',
            width: 160,
            renderCell: (params) => {
                return <div>{moment(params.value).format('HH:mm:ss - DD/MM/YYYY')}</div>;
            },
        },
        {
            field: 'updated_by_info',
            headerName: 'Updated by',
            width: 160,
            renderCell: (params) => {
                return `${params.value?.first_name ? params.value?.first_name : ''} ${
                    params.value?.last_name ? params.value?.last_name : ''
                }`;
            },
        },
    ];

    const handlePageChange = async (event, page) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setCurrentPage(page);
        getAllPost(accessToken, page + 1, limit);
    };

    const handleRowPerPageChange = async (event) => {
        const rowPerPageSeleted = event.target.value;
        setLimit(rowPerPageSeleted);
        getAllPost(accessToken, currentPage + 1, rowPerPageSeleted);
    };

    const onCopyLink = (row) => {
        try {
            const link = `${process.env.NEXT_PUBLIC_SITE_URL}/${row[0]?.category_info[0]?.slug}/${row[0]?.slug}`;
            navigator.clipboard.writeText(link);
            ToastNotify('Copied link to clipboard.', 'success');
        } catch (error) {
            ToastNotify('Failed to copy link.');
        }
    };

    const onShowThumbnail = (params) => {
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

    const onSearch = async (accessToken, keyword) => {
        try {
            setLoading(true);
            const dataRespSearch = await fetch(
                `/api/admin/posts?page=${currentPage + 1}&limit=${limit}&keyword=${keyword}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    },
                },
            );
            if (isSuccessStatus(dataRespSearch.status)) {
                const resp = await dataRespSearch.json();
                handleDataPostForTable(resp.data);
                setData(resp.data);
                setTotalData(resp.pagination?.totalItems);
            }
        } catch (error) {
            ToastNotify('Something went wrong!');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    async function getAllPost(token, page, limit) {
        try {
            setLoading(true);
            const resp = await getAllDataPost(token, page, limit);
            if (resp.error) {
                ToastNotify('Error!');
            } else {
                handleDataPostForTable(resp.data);
                setData(resp.data);
                setTotalData(resp.pagination?.totalItems);
                // get post published trash
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function getAllCategory(token) {
        try {
            const resp = await getAllDataCategory(token);
            if (resp.error) {
                ToastNotify('Error!');
            } else {
                setDataCategory(resp);
            }
        } catch (error) {
            throw error;
        }
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            onSearch(accessToken, searchRef.current.value);
        }
    };

    const handleAfterAdd = async () => {
        PageNotify('success', 'Post created', 'OK');
        getAllPost(accessToken, currentPage + 1, limit);
    };

    const handleUpdateTable = async () => {
        getAllPost(accessToken, currentPage + 1, limit);
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getAllCategory(session.accessToken);
            if (searchProps) {
                onSearch(session.accessToken, searchProps);
            } else {
                getAllPost(session.accessToken, currentPage + 1, limit);
            }
        }
    }, [status]);

    return (
        <div className={stylesSystem.admin__container}>
            <div className="absolute right-1 z-[1] top-[-64px] flex items-center">
                <UserStatus />
            </div>
            <div className="absolute right-3 z-[1] top-[-36px] flex items-center">
                <input
                    defaultValue={searchProps}
                    ref={searchRef}
                    onKeyDown={(e) => handleEnter(e)}
                    className="outline-none px-2 py-1 text-[12px] w-[250px] rounded-sm"
                    placeholder="Search post..."
                />
                <button
                    onClick={() => onSearch(accessToken, searchRef.current.value)}
                    className="ml-2 absolute right-[6px]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z"
                            fill="#ccc"
                        />
                    </svg>
                </button>
            </div>
            <DataGrid
                disableRowSelectionOnClick
                sx={customDataGrid}
                autoHeight
                loading={loading}
                rows={data}
                columns={columns}
                hideFooter
            />
            <table style={{ width: '100%' }}></table>
            <div className="flex justify-between pt-3">
                <div className="flex gap-2">
                    {!loading && (
                        <>
                            <PostAdd
                                accessToken={accessToken}
                                categoryProps={dataCategory}
                                handleAfterAdd={handleAfterAdd}
                            />
                            <PostGuide />
                            <Button className={stylesSystem.admin__button__primary}>
                                <Link href={'/admin/posts/all'} target="_blank">
                                    Get list (for SEO)
                                </Link>
                            </Button>
                            <Tooltip title="RELOAD DATA" placement="top">
                                <Button
                                    className={stylesSystem.admin__button__secondary}
                                    variant="outlined"
                                    onClick={() => getAllPost(accessToken, currentPage + 1, limit)}
                                >
                                    <CachedIcon />
                                </Button>
                            </Tooltip>
                        </>
                    )}
                </div>
                {/* <PostTrash
                        data={dataTrash}
                        accessToken={accessToken}
                        handleAfterRestoreTable={handleAfterRestore}
                    /> */}
                <TablePagination
                    sx={customTablePagination}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={[10, 50, 100]}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleRowPerPageChange}
                    count={totalData}
                    page={currentPage}
                    className="border-none"
                />
            </div>
        </div>
    );
}
