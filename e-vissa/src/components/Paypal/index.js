'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import Swal from 'sweetalert2';
import styles from '@/components/apply-visa/Checkout/Checkout.module.css';
import { ToastNotify } from '../Page/ToastNotify/toastNotify';

export default function PayPalComponent({ orderID }) {
    function createPayPalOrder() {
        return fetch(`/api/orders/paypal/${orderID}?create_order=1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                intent: 'capture',
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }

    function onApprove(data) {
        return fetch(`/api/orders/paypal/${orderID}?complete_order=1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paypal_id: data.orderID,
            }),
        })
            .then((response) => response.json())
            .then((orderData) => {
                Swal.fire({
                    title: 'Yay! 🎉',
                    text: 'Great news! Your eVisa order is confirmed and payment is successfully processed. We are now working on your travel documents. Stay tuned for updates via email.',
                    showCloseButton: false,
                    confirmButtonText: 'Check status',
                    customClass: {
                        popup: `${styles.custom__swal__popup}`,
                        title: `${styles.custom__swal__title}`,
                        confirmButton: `${styles.custom__swal__button}`,
                        htmlContainer: `${styles.custom__swal__content}`,
                        closeButton: `${styles.custom__swal__close}`,
                        actions: `${styles.custom__swal__actions}`,
                    },
                })
                    .then(() => window.location.assign(`/check-order?order=${orderID}`))
                    .catch((error) => {
                        alert(error.message);
                    });
            });
    }

    function onError() {
        ToastNotify('Failed payment. Please try again!');
    }

    return (
        <PayPalScriptProvider
            options={{
                'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                currency: 'USD',
                intent: 'capture',
            }}
        >
            <PayPalButtons
                style={{
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    height: 50,
                }}
                // fundingSource={FUNDING.PAYPAL}
                createOrder={createPayPalOrder}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    );
}
