'use client';

import { useEffect, useState } from 'react';
import { orderRef } from '@/libs/firebase';
import { child, onValue, remove } from 'firebase/database';
import { prefixOrder } from 'settings';
import { Badge, Box, CircularProgress, Divider, IconButton, Menu, Tooltip } from '@mui/material';
import { MailIcon } from '@/components/Icons/Icons';
import moment from 'moment';
import Swal from 'sweetalert2';

const NewOrder = ({ accessToken }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState('');
    const [newOrder, setNewOrder] = useState(0);
    const [anchorNotification, setAnchorNotification] = useState(null);
    const openNotification = Boolean(anchorNotification);

    const handleClickNotification = (event) => {
        setAnchorNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorNotification(null);
    };

    const handleConfirm = async (orderID) => {
        try {
            const API_LINK_UPDATE = '/api/admin/orders';
            setLoading(orderID);
            const resp = await fetch(`${API_LINK_UPDATE}/${orderID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify({}),
            });
            if (resp.status == 200) {
                Swal.fire({
                    text: `Order ${orderID} is confirmed!`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Delete
                const userStatusRef = child(orderRef, orderID);
                remove(userStatusRef);
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
            setLoading('');
            setAnchorNotification(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onValue(orderRef, (snapshot) => {
            const ordersData = snapshot.val();
            if (ordersData) {
                const ordersArray = Object.entries(ordersData)
                    .map(([id, order]) => ({ id, ...order }))
                    .sort((a, b) => b.created_at - a.created_at);
                setNewOrder(ordersArray.length);
                setOrders(ordersArray);
            } else {
                setOrders([]);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Notifications">
                    <IconButton
                        onClick={handleClickNotification}
                        size="small"
                        aria-controls={openNotification ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openNotification ? 'true' : undefined}
                    >
                        <Badge badgeContent={newOrder} color="primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.37546 5.66957C2.66565 3.98488 4.00472 2.74648 5.69477 2.48932C7.31411 2.24293 9.53559 2 12 2C14.4644 2 16.6859 2.24293 18.3052 2.48932C19.9953 2.74648 21.3344 3.98488 21.6245 5.66957C21.8268 6.84372 22 8.33525 22 10C22 11.6647 21.8268 13.1563 21.6245 14.3304C21.3344 16.0151 19.9953 17.2535 18.3052 17.5107C16.8238 17.7361 14.8384 17.9586 12.6241 17.9949L6.50873 21.6085C5.84211 22.0024 5 21.5219 5 20.7476V17.344C3.64656 16.8939 2.62456 15.7766 2.37546 14.3304C2.17321 13.1563 2 11.6647 2 10C2 8.33525 2.17321 6.84372 2.37546 5.66957ZM6 8C6 7.44772 6.44772 7 7 7H17C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H7C6.44771 9 6 8.55228 6 8ZM6 12C6 11.4477 6.44772 11 7 11H11C11.5523 11 12 11.4477 12 12C12 12.5523 11.5523 13 11 13H7C6.44772 13 6 12.5523 6 12Z"
                                    fill="#6F767E"
                                />
                            </svg>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorNotification}
                id="account-menu"
                open={openNotification}
                onClose={handleCloseNotification}
                // onClick={handleCloseNotification}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'auto',
                        maxHeight: '512px',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className="px-5 pb-2 font-[600] text-[18px]">New Order Notifications</div>
                <Divider />
                {orders.map((order) => (
                    <div className="h-full px-2" key={order.id}>
                        <div className="flex items-center gap-4 h-full w-full py-2 px-3 text-left rounded-md hover:bg-[#f9fafb]">
                            <div>
                                <div className="text-[14px] font-[500]">
                                    New order {prefixOrder}
                                    {order.id}
                                </div>
                                <div className="text-[12px]">
                                    {order.total_price} USD | {moment(order.created_at).startOf('hour').fromNow()}
                                </div>
                            </div>
                            {loading == order.id ? (
                                <CircularProgress size={22} />
                            ) : (
                                <button onClick={() => handleConfirm(order.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C9.00262 2.5 9.94117 2.76782 10.7496 3.2355C10.9887 3.37377 11.2945 3.29209 11.4328 3.05306C11.5711 2.81403 11.4894 2.50816 11.2504 2.36989C10.2938 1.81654 9.1831 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 7.72386 14.2761 7.5 14 7.5C13.7239 7.5 13.5 7.72386 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M15.3536 3.35355C15.5488 3.15829 15.5488 2.84171 15.3536 2.64645C15.1583 2.45118 14.8417 2.45118 14.6464 2.64645L8 9.29289L5.35355 6.64645C5.15829 6.45118 4.84171 6.45118 4.64645 6.64645C4.45118 6.84171 4.45118 7.15829 4.64645 7.35355L7.64645 10.3536C7.84171 10.5488 8.15829 10.5488 8.35355 10.3536L15.3536 3.35355Z"
                                            fill="black"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </Menu>
        </div>
    );
};

export default NewOrder;
