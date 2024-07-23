'use client';
import { useRef, useState } from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import { PageNotify } from '../Page/PageNotify/PageNotify';
import { settingsData } from '/settings';
import { CircularProgress } from '@mui/material';
import {
    FacebookIcon,
    GPayPaymentIcon,
    InstagramIcon,
    JCBPaymentIcon,
    LogoIcon,
    MastercardPaymentIcon,
    PaypalPaymentIcon,
    RightArrowIcon,
    StripePaymentIcon,
    VisaPaymentIcon,
    XIcon,
} from '../Icons/Icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { validateEmail } from '@/utils/validation';

const Footer = ({ dataCategory }) => {
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState({ error: false, message: 'Email is incorrect.' });
    const { executeRecaptcha } = useGoogleReCaptcha();
    const emailRef = useRef();

    const onSubscribe = async () => {
        const email = emailRef.current.value;
        if (!validateEmail(email)) {
            setErrorEmail({ error: true, message: 'Invalid email! Please try again.' });
            return;
        }
        setErrorEmail({ error: 'false', message: '' });
        try {
            setLoading(true);
            const respAddPost = await fetch(`/api/newsletters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, gRecaptchaToken: await executeRecaptcha('inquirySubmit') }),
            });
            if (respAddPost.status == 200) {
                const text = await respAddPost.json();
                if (text.success) PageNotify('success', text.success, 'OK');
                emailRef.current.value = '';
            }

            if (respAddPost.status == 400) {
                PageNotify('warning', 'Email is incorrect.', 'OK');
            }

            if (respAddPost.status == 500) {
                PageNotify('warning', `Sevices error`, 'OK');
            }
        } catch (error) {}
        return setLoading(false);
    };

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            onSubscribe();
        }
    };

    return (
        <footer className={`${styles.footer} dark:bg-[#121212] dark:border-[#424244]`}>
            <div className={styles.container}>
                <div className={`${styles.footer__item__logo} dark:border-[#424244]`}>
                    <Link href="/" className={styles.header__link__logo}>
                        <LogoIcon />
                        <div className={`${styles.footer__link__logo__title} dark:text-[#EDF0FC]`}>eVisa</div>
                    </Link>
                    <div className="flex flex-col gap-6 pt-12 sm:flex-row sm:pt-6">
                        <Link
                            href="/about"
                            onClick={() => handleLoadingProgress('about')}
                            className={`${styles.footer__link} dark:text-[#EDF0FC]`}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => handleLoadingProgress('contact')}
                            className={`${styles.footer__link} dark:text-[#EDF0FC]`}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/faqs"
                            onClick={() => handleLoadingProgress('faqs')}
                            className={`${styles.footer__link} dark:text-[#EDF0FC]`}
                        >
                            FAQs
                        </Link>
                    </div>
                </div>
                <div className={`${styles.footer__item__main} dark:border-[#424244]`}>
                    <div className={styles.footer__link__container}>
                        {dataCategory &&
                            dataCategory
                                .filter((cate) => cate.term == 'category')
                                .map((item) => (
                                    <a
                                        href={`/${item.slug}`}
                                        key={item.slug}
                                        className={`${styles.footer__link} dark:text-[#EDF0FC]`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                    </div>
                    <div className={styles.footer__item}>
                        {dataCategory &&
                            dataCategory
                                .filter((cate) => cate.term == 'menu')
                                .map((item) => (
                                    <a
                                        href={`/${item.slug}`}
                                        key={item.slug}
                                        className={`${styles.footer__link} dark:text-[#EDF0FC]`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                    </div>
                </div>

                <div className={`${styles.footer__item__subscribe} dark:border-[#424244]`}>
                    <div className={`${styles.footer__item__title} dark:text-[#EDF0FC]`}>newsletter</div>
                    <div className={`${styles.footer__item__description} dark:text-[#EDF0FC]`}>
                        Sign Up for Exclusive Updates. Your Passport to Seamless Travel
                    </div>
                    <div className="button-wrapper relative">
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Enter your email"
                            onKeyDown={(e) => handleEnter(e)}
                            className={`${styles.footer__item__input} dark:bg-[#121212] dark:text-[#EDF0FC] dark:border-[#424244]`}
                        ></input>

                        <button
                            disabled={loading}
                            name="btn-subscribe"
                            className={styles.footer__item__button}
                            onClick={onSubscribe}
                        >
                            {loading === false ? (
                                <div className="w-full h-full bg-primary rounded-full">
                                    <RightArrowIcon />
                                </div>
                            ) : (
                                <CircularProgress style={{ width: 32, height: 32, color: '#3772FF' }} />
                            )}
                        </button>
                    </div>
                    {errorEmail.error ? <div className={styles.newletter__notify}>{errorEmail.message}</div> : ''}
                </div>
                <div className={`${styles.footer__item__payment} dark:border-[#424244]`}>
                    <div className={`${styles.footer__item__title} dark:text-[#EDF0FC]`}>payment methods</div>
                    <div className={styles.footer__item__payment__container}>
                        <div className={`${styles.footer__item__payment__item} dark:border-[#424244]`}>
                            <PaypalPaymentIcon />
                        </div>
                        <div className={`${styles.footer__item__payment__item} dark:border-[#424244]`}>
                            <VisaPaymentIcon />
                        </div>
                        <div className={`${styles.footer__item__payment__item} dark:border-[#424244]`}>
                            <MastercardPaymentIcon />
                        </div>
                        <div className={`${styles.footer__item__payment__item} dark:border-[#424244]`}>
                            <JCBPaymentIcon />
                        </div>
                        {/* <div className={`${styles.footer__item__payment__item} dark:border-[#424244]`}>
                                <StripePaymentIcon />
                            </div>
                            <div className={`${styles.footer__item__payment__item} dark:border-[#424244]`}>
                                <GPayPaymentIcon />
                            </div> */}
                    </div>
                </div>
            </div>
            <div className={`${styles.footer__copyright} dark:border-[#424244]`}>
                <div className={styles.footer__copyright__container}>
                    <div className={`${styles.footer__copyright__item} dark:text-[#EDF0FC]`}>
                        Copyright © 2023 {settingsData.siteName}. All rights reserved
                    </div>
                    <div className={styles.footer__copyright__item__middle}>
                        <a href="/terms-and-conditions">
                            <span className="dark:text-[#EDF0FC] cursor-pointer hover:underline">
                                Terms and Conditions
                            </span>
                        </a>
                        <a href="/privacy-policy">
                            <span className="dark:text-[#EDF0FC] cursor-pointer hover:underline">Privacy Policy</span>
                        </a>
                    </div>
                    <div className={styles.footer__copyright__item__right}>
                        <FacebookIcon />
                        <XIcon />
                        <InstagramIcon />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
