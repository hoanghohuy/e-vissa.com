import React, { useState } from 'react';
import ButtonApply from '../ButtonApply/ButtonApply';
import { validateEmail, validatePhoneNumber } from '@/utils/validation';
import { ToastNotify } from '../ToastNotify/toastNotify';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('start');

    const handleSendContact = async () => {
        if (!name || name.length < 3) {
            ToastNotify('Please input a name.');
            return;
        }
        if (!email || !validateEmail(email)) {
            ToastNotify('Please enter a valid email!');
            return;
        }
        if (!phone || !validatePhoneNumber(phone)) {
            ToastNotify('Please enter a valid phone number!');
            return;
        }
        const newData = {
            email: email,
            name: name,
            phone_number: phone,
            subject: subject,
            message: message,
        };
        try {
            setStatus('pending');
            const resp = await fetch(`/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 201) {
                setStatus('sent');
                Swal.fire({
                    title: 'Yay! 🎉',
                    text: 'Thank you for reaching out to us. We will get back to you soon. Regards!!',
                    showCloseButton: true,
                    customClass: { confirmButton: `${styles.contact__custom__alert}` },
                });
                setName('');
                setEmail('');
                setSubject('');
                setPhone('');
                setMessage('');
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
    };

    return (
        <>
            <div className="w-full bg-[#2955BF] rounded-lg py-6 px-8">
                <div className="text-[24px] text-[#fff] font-dmsans font-[600] pb-3">
                    Contact us to get more information about E-visa
                </div>
                <div className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="text-[14px] text-black outline-none rounded-md h-[40px] px-3 dark:text-[#EDF0FC] dark:bg-[#121212]"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="text-[14px] text-black outline-none rounded-md h-[40px] px-3 dark:text-[#EDF0FC] dark:bg-[#121212]"
                    />
                    <input
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        pattern="/[^0-9]/g"
                        type="tel"
                        placeholder="Phone number"
                        className="text-[14px] text-black outline-none rounded-md h-[40px] px-3 dark:text-[#EDF0FC] dark:bg-[#121212]"
                    />
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message (optional)"
                        className="text-[14px] text-black outline-none rounded-md p-3 dark:text-[#EDF0FC] dark:bg-[#121212]"
                        rows={4}
                    />
                    {status == 'pending' ? (
                        <button disabled className="button__booking__secondary w-full">
                            Sending
                        </button>
                    ) : (
                        <button onClick={handleSendContact} className="button__booking__secondary w-full">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
