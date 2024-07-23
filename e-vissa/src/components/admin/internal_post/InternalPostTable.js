'use client';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';
import { Tooltip } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import InternalPostDetail from './InternalPostDetail';
import { useSession } from 'next-auth/react';
import { getAllDataPosts } from './api/InternalPostAPI';
import { customDataGrid, customSmallDatePicker } from '../../Page/CustomMUI/customMUI';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function InternalPostTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchStartDate, setSearchStartDate] = useState(null);
    const [searchEndDate, setSearchEndDate] = useState(new Date().getTime());
    const [dataPosts, setDataPosts] = useState([]);
    const { data: session, status } = useSession();
    const [count, setCount] = useState(0);

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Detail',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Detail InternalPost'}>
                            <InternalPostDetail selectedRow={[params.row]} />
                        </Tooltip>
                    }
                />,
            ],
        },
        { field: 'created_by', headerName: 'Author', width: 160 },
        { field: 'total_posts', headerName: 'Total Posts', width: 120 },

        {
            field: 'recent_created_post_title',
            headerName: 'Recent Created Post',
            width: 340,
            renderCell: (params) => {
                const prefix =
                    params.row.recent_created_post_status === 1
                        ? `/${params.row.recent_created_post_category_slug}/`
                        : '/admin/posts/';
                return (
                    <a target="_blank" className="underline" href={prefix + params.row.recent_created_post_slug}>
                        {params.value}
                    </a>
                );
            },
        },
        { field: 'recent_created_post_category_name', headerName: 'Category', width: 150 },
        {
            field: 'recent_created_post_status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                        {params.value == '1' ? 'Published' : 'Disabled'}
                    </div>
                );
            },
        },
        {
            field: 'recent_updated_post_title',
            headerName: 'Recent Updated Post',
            width: 340,
            renderCell: (params) => {
                const prefix =
                    params.row.recent_created_post_status === 1
                        ? `/${params.row.recent_created_post_category_slug}/`
                        : '/admin/posts/';
                return (
                    <a target="_blank" className="underline" href={prefix + params.row.recent_updated_post_slug}>
                        {params.value}
                    </a>
                );
            },
        },
        { field: 'recent_updated_post_category_name', headerName: 'Category', width: 150 },
        {
            field: 'recent_updated_post_status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                        {params.value == '1' ? 'Published' : 'Disabled'}
                    </div>
                );
            },
        },
    ];

    async function getAllInternalPost(accessToken) {
        setLoading(true);
        try {
            const dataApiPosts = await getAllDataPosts(accessToken);

            if (dataApiPosts) {
                filterPosts(dataApiPosts);
                setDataPosts(dataApiPosts);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function resetDateHour(originalDate) {
        const modifiedDate = new Date(originalDate);
        modifiedDate.setUTCHours(0, 0, 0, 0);
        return modifiedDate.getTime();
    }

    function filterPosts(dataPosts, searchStartDate = null, searchEndDate = null) {
        const result = [];
        let countPosts = 0;
        for (const item of dataPosts) {
            const { created_by, created_at, updated_at } = item;
            const createdTimestamp = resetDateHour(created_at);
            const updatedTimestamp = resetDateHour(updated_at);

            if (searchStartDate !== null && searchEndDate !== null) {
                if (createdTimestamp < searchStartDate || createdTimestamp > searchEndDate) {
                    continue;
                }
            }
            ++countPosts;
            let existingUser = result.find((user) => user.id === created_by);

            if (!existingUser) {
                existingUser = {
                    id: created_by,
                    total_posts: 0,
                    created_by: `${item.created_by_info.first_name} ${item.created_by_info.last_name}`,
                    recent_created_post: 0,
                    recent_created_post_slug: '',
                    recent_created_post_title: '',
                    recent_created_post_status: 0,
                    recent_updated_post: 0,
                    recent_updated_post_slug: '',
                    recent_updated_post_title: '',
                    recent_updated_post_status: 0,
                    posts: [],
                };
                result.push(existingUser);
            }

            existingUser.total_posts += 1;

            if (createdTimestamp > existingUser.recent_created_post) {
                Object.assign(existingUser, {
                    recent_created_post: createdTimestamp,
                    recent_created_post_title: item.title,
                    recent_created_post_slug: item.slug,
                    recent_created_post_category_name: item.category_info?.[0]?.name,
                    recent_created_post_category_slug: item.category_info?.[0]?.slug,
                    recent_created_post_status: item.published,
                });
            }

            if (updatedTimestamp > existingUser.recent_updated_post) {
                Object.assign(existingUser, {
                    recent_updated_post: updatedTimestamp,
                    recent_updated_post_title: item.title,
                    recent_updated_post_slug: item.slug,
                    recent_updated_post_category_name: item.category_info?.[0]?.name,
                    recent_updated_post_category_slug: item.category_info?.[0]?.slug,
                    recent_updated_post_status: item.published,
                });
            }

            existingUser.posts.push({
                ...item,
                category_name: item.category_info?.[0]?.name,
                category_slug: item.category_info?.[0]?.slug,
            });
        }
        setCount(countPosts);
        setData(result);
    }

    const handleSearchByDateRange = ({ startDate = null, endDate = null }) => {
        if (startDate === null) {
            startDate = searchStartDate;
        }

        if (endDate === null) {
            endDate = searchEndDate;
        }

        if (dataPosts && startDate && endDate) {
            filterPosts(dataPosts, startDate, endDate);
        }
    };

    useEffect(() => {
        if (session && session.accessToken) {
            getAllInternalPost(session.accessToken);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <span className="text-sm font-inter">Total all: {count} posts</span>
                <div className="absolute right-3 z-[1] top-[-48px] flex gap-2 items-center text-[12px]">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            showDaysOutsideCurrentMonth
                            format="DD/MM/YYYY"
                            sx={customSmallDatePicker}
                            onChange={(newValue) => {
                                if (newValue) {
                                    const startDate = resetDateHour(new Date(newValue.$d).toISOString());
                                    setSearchStartDate(startDate);
                                    handleSearchByDateRange({ startDate });
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <div className="text-white">to</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            defaultValue={dayjs(searchEndDate)}
                            disableFuture
                            showDaysOutsideCurrentMonth
                            format="DD/MM/YYYY"
                            sx={customSmallDatePicker}
                            onChange={(newValue) => {
                                if (newValue) {
                                    const endDate = resetDateHour(new Date(newValue.$d).toISOString());
                                    setSearchEndDate(endDate);
                                    handleSearchByDateRange({ endDate });
                                }
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <DataGrid
                    sx={customDataGrid}
                    loading={loading}
                    autoHeight
                    rows={data}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    columns={columns}
                    pageSizeOptions={[10, 50]}
                />
            </div>
        </>
    );
}
