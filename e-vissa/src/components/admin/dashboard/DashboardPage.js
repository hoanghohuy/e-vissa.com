'use client';
import React from 'react';
import { useEffect } from 'react';
import stylesSystem from '@/app/page.module.css';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { CircularProgress, Grid } from '@mui/material';
import styles from './Dashboard.module.css';
import { getAllDataOrder } from '../order/api/OrderAPI';
import { useSession } from 'next-auth/react';

export default function DashboardTable() {
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [loadingChart, setLoadingChart] = useState(true);
    const [dataOrderChart, setDataOrderChart] = useState({
        series: [1, 1, 1, 1, 1],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Pending', 'Paid', 'Completed', 'Refunded', 'Cancelled'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            // width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });

    async function getAllOrder(accessToken, page, limit) {
        try {
            const resp = await getAllDataOrder(accessToken, page, limit);
            if (resp.data) {
                const dataOrder = resp.data;
                const statusCounts = {};
                const statusTypes = ['Pending', 'Paid', 'Completed', 'Refunded', 'Cancelled'];

                statusTypes.forEach((type) => {
                    statusCounts[type] = dataOrder.filter((item) => item.status === type).length;
                });
                const resultArray = Object.values(statusCounts);
                setDataOrderChart((prevState) => ({
                    ...prevState,
                    series: resultArray,
                }));
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingChart(false);
        }
    }

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
            getAllOrder(session.accessToken, 1, 99999);
        }
    }, [status]);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid item lg={4} xs={12} md={6} sm={6}>
                        <div className={styles.item__container}>
                            {loadingChart ? (
                                <div style={{ height: '300px' }} className="flex items-center justify-center">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <ReactApexChart
                                    options={dataOrderChart?.options}
                                    series={dataOrderChart?.series}
                                    type="pie"
                                    height={300}
                                />
                            )}
                            <div className={styles.item__label}>Order</div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
