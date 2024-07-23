'use client';
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import contact_banner from '/public/contact_banner.png';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { settingsData } from '../../../settings';
import { validateEmail } from '../../utils/validation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSendContact = async () => {
        if (name.trim().length < 1) {
            ToastNotify('Please enter a name');
            return;
        }
        if (!validateEmail(email)) {
            ToastNotify('Please enter a valid email');
            return;
        }
        if (phone.trim().length < 8 || phone.trim().length > 15) {
            ToastNotify('Please enter a valid phone');
            return;
        }
        if (subject.trim().length < 1) {
            ToastNotify('Please enter a subject');
            return;
        }
        if (message.trim().length < 1) {
            ToastNotify('Please enter a message');
            return;
        }
        const newData = {
            email: email,
            name: name,
            phone_number: phone,
            subject: subject,
            message: message,
            gRecaptchaToken: await executeRecaptcha('inquirySubmit'),
        };
        try {
            setLoading(true);
            const resp = await fetch(`/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (resp.status == 201) {
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
                ToastNotify('Something went wrong! Please try again later');
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`${styles.container} dark:bg-[#121212]`}>
                <Image className={styles.contact__banner__image} src={contact_banner} alt="banner contact" />
                <div className={styles.contact__banner}>
                    <div className={styles.contact_banner__title}>Contact Us</div>
                </div>
                <div>
                    <div
                        className={
                            'max-w-[1392px] mx-auto flex justify-between py-12 xl:px-12 sm:flex-col sm:gap-10 sm:px-8 sm:py-8'
                        }
                    >
                        <div className="w-[636px] flex flex-col gap-[30px] xl:w-[47%] sm:w-full">
                            <img className="w-full" src="/page/contact/contact_banner.png" />
                            <div className="flex gap-[30px] lg:flex-col sm:flex-row sx:flex-col">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-md">
                                        <img className="p-2 bg-primary rounded-md" src="/page/contact/phone.svg" />
                                    </div>

                                    <div>
                                        <div className="text-[#312F2F] font-[500]">Hotline</div>
                                        <a
                                            className="text-[#353945] font-[700]"
                                            href={`tel:${settingsData.siteContactPhone}`}
                                        >
                                            {settingsData.siteContactPhone}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-md">
                                        <img className="p-2 bg-primary rounded-md" src="/page/contact/mail.svg" />
                                    </div>

                                    <div>
                                        <div className="text-[#312F2F] font-[500]">Email</div>
                                        <a
                                            className="text-[#353945] font-[700]"
                                            href={`mailto:${settingsData.siteContactEmail}`}
                                        >
                                            {settingsData.siteContactEmail}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[#312F2F] text-[14px]">
                                E-vissa.com is one of the top portals for travel and associated services. This website
                                is not an official government representative website, and it is private or commercial in
                                nature.
                            </div>
                        </div>
                        <div className="w-[636px] xl:w-[47%] sm:w-full">
                            <div className={styles.contact__header}>
                                <h1 className={`${styles.contact__header__title} dark:text-[#EDF0FC]`}>
                                    Send us an e-mail
                                </h1>
                                <div className={`${styles.contact__header__desc} dark:text-[#EDF0FC]`}>
                                    If you have any questions or inquiries, please fill out the form below. We will do
                                    our best to respond to you as soon as possible.
                                </div>
                            </div>
                            <div className={styles.contact__form}>
                                <div className={styles.contact__form__item}>
                                    <div className={`${styles.contact__form__item__title} dark:text-[#EDF0FC]`}>
                                        Your name
                                    </div>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                height: '48px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        className={styles.contact__form__item__input}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={'Enter your fullname'}
                                        inputProps={{ maxLength: 40 }}
                                    />
                                </div>

                                <div className={styles.contact__form__item}>
                                    <div className={`${styles.contact__form__item__title} dark:text-[#EDF0FC]`}>
                                        Email
                                    </div>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                height: '48px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        className={styles.contact__form__item__input}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={'Enter your email'}
                                        inputProps={{ maxLength: 40 }}
                                    />
                                </div>

                                <div className={styles.contact__form__item}>
                                    <div className={`${styles.contact__form__item__title} dark:text-[#EDF0FC]`}>
                                        Phone number
                                    </div>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                height: '48px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        className={styles.contact__form__item__input}
                                        type="number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder={'Enter your phone number'}
                                        inputProps={{ maxLength: 13 }}
                                    />
                                </div>

                                <div className={styles.contact__form__item}>
                                    <div className={`${styles.contact__form__item__title} dark:text-[#EDF0FC]`}>
                                        Subject
                                    </div>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                height: '48px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        className={styles.contact__form__item__input}
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder={'Enter your subject'}
                                        inputProps={{ maxLength: 50 }}
                                    />
                                </div>

                                <div className={styles.contact__form__item}>
                                    <div className={`${styles.contact__form__item__title} dark:text-[#EDF0FC]`}>
                                        Message
                                    </div>
                                    <TextField
                                        maxRows={4}
                                        multiline
                                        minRows={4}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px !important',
                                                border: '2px solid #E6E8EC !important',
                                                backgroundColor: '#FCFCFD !important',
                                                // height: '58px !important',
                                            },
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                border: 'none !important',
                                            },
                                        }}
                                        inputProps={{ maxLength: 255 }}
                                        className={styles.contact__form__item__input}
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={'Messenge'}
                                    />
                                </div>
                            </div>
                            <div className={styles.contact__form__button}>
                                {loading ? (
                                    <button disabled className="button__booking__primary !px-[56px] sm:w-full mt-5">
                                        Sending
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSendContact}
                                        className="button__booking__primary !px-[56px] sm:w-full mt-5"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
