'use client';
import React from 'react';
import styles from '@/app/page.module.css';
import ButtonApply from '../../ButtonApply/ButtonApply';
import Step1 from '/public/page/howItWork/step1.png';
import Step2 from '/public/page/howItWork/step2.png';
import Step3 from '/public/page/howItWork/step3.png';
import Image from 'next/image';

export default function HowItWorkPage() {
    const handleApply = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className={`${styles.page__reason} dark:bg-[#222323]`}>
            <div className={styles.page__reason__container}>
                <h2 className={`${styles.page__reason__title} dark:text-[#EDF0FC]`}>How it Works?</h2>
                <div className={styles.page__reason__step}>
                    <div className={`${styles.page__reason__item} dark:bg-[#1D1D1E]`}>
                        <Image src={Step1} alt="step" width={160} height={160} />
                        <div className={styles.page__reason__item__text}>
                            <div className={styles.page__reason__item__text__main}>
                                <div className={styles.page__reason__item__text__step}>Step 1</div>
                                <div className={`${styles.page__reason__item__text__title} dark:text-[#EDF0FC]`}>
                                    Fill out our online form
                                </div>
                            </div>

                            <div className={styles.page__reason__item__text__desc}>
                                Complete the user-friendly online application and pay securely via credit card or
                                PayPal.
                            </div>
                        </div>
                    </div>
                    <div className={styles.page__reason__divider}>
                        <svg width="89" height="16" viewBox="0 0 89 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.666016 8C0.666016 12.4183 4.24774 16 8.66602 16C13.0843 16 16.666 12.4183 16.666 8C16.666 3.58172 13.0843 0 8.66602 0C4.24774 0 0.666016 3.58172 0.666016 8ZM72.666 8C72.666 12.4183 76.2477 16 80.666 16C85.0843 16 88.666 12.4183 88.666 8C88.666 3.58172 85.0843 0 80.666 0C76.2477 0 72.666 3.58172 72.666 8ZM8.66602 9.5H44.666V6.5H8.66602V9.5ZM44.666 9.5H80.666V6.5H44.666V9.5Z"
                                fill="#4BC9F0"
                            />
                        </svg>
                    </div>
                    <div className={`${styles.page__reason__item} dark:bg-[#1D1D1E]`}>
                        <Image src={Step2} alt="step" width={160} height={160} />

                        <div className={styles.page__reason__item__text}>
                            <div className={styles.page__reason__item__text__main}>
                                <div className={styles.page__reason__item__text__step}>Step 2</div>
                                <div className={`${styles.page__reason__item__text__title} dark:text-[#EDF0FC]`}>
                                    Receive document via email
                                </div>
                            </div>

                            <div className={styles.page__reason__item__text__desc}>
                                Save yourself the trouble of dealing with embassies; we've got you covered, so you can
                                focus on more important things.
                            </div>
                        </div>
                    </div>
                    <div className={styles.page__reason__divider}>
                        <svg width="89" height="16" viewBox="0 0 89 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.666016 8C0.666016 12.4183 4.24774 16 8.66602 16C13.0843 16 16.666 12.4183 16.666 8C16.666 3.58172 13.0843 0 8.66602 0C4.24774 0 0.666016 3.58172 0.666016 8ZM72.666 8C72.666 12.4183 76.2477 16 80.666 16C85.0843 16 88.666 12.4183 88.666 8C88.666 3.58172 85.0843 0 80.666 0C76.2477 0 72.666 3.58172 72.666 8ZM8.66602 9.5H44.666V6.5H8.66602V9.5ZM44.666 9.5H80.666V6.5H44.666V9.5Z"
                                fill="#4BC9F0"
                            />
                        </svg>
                    </div>
                    <div className={`${styles.page__reason__item} dark:bg-[#1D1D1E]`}>
                        <Image src={Step3} alt="step" width={160} height={160} />

                        <div className={styles.page__reason__item__text}>
                            <div className={styles.page__reason__item__text__main}>
                                <div className={styles.page__reason__item__text__step}>Step 3</div>
                                <div className={`${styles.page__reason__item__text__title} dark:text-[#EDF0FC]`}>
                                    Enter your destination
                                </div>
                            </div>

                            <div className={styles.page__reason__item__text__desc}>
                                Present your Passport and the document we provide upon arrival at your destination
                                country.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.page__reason__apply}>
                    {/* <button onClick={handleApply} className={styles.page__reason__button}>
                        Apply Now
                    </button> */}
                    <div onClick={handleApply}>
                        <ButtonApply type={'primary'} title={'Apply now'} />
                    </div>
                </div>
            </div>
        </div>
    );
}
