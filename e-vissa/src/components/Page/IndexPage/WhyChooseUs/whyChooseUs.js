'use client';
import React from 'react';
import styles from '@/app/page.module.css';
import ButtonApply from '../../ButtonApply/ButtonApply';

export default function WhyChooseUsPage() {
    const handleApply = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className={'dark:bg-[#121212]'}>
            <div className={styles.page__why__choose__container}>
                <div className={styles.page__why__choose__text}>
                    <h2 className={`${styles.page__why__choose__text__title} dark:text-[#EDF0FC]`}>Why Choose Us</h2>
                    <div className={`${styles.page__why__choose__text__desc} dark:text-[#EDF0FC]`}>
                        Explore our platform's seamless e-visa solution.
                        <br />
                        Visa details for all countries. Ideal for business or vacation travel.
                    </div>
                    <div className={`${styles.page__why__choose__text__desc__mobile} dark:text-[#EDF0FC]`}>
                        Explore our platform's seamless e-visa solution. Visa details for all countries. Ideal for
                        business or vacation travel.
                    </div>
                </div>
                <div className={styles.page__why__choose__item}>
                    <div className={`${styles.page__why__choose__item__container} bg-[#EFF9F2] dark:bg-[#1C231E]`}>
                        <div className={styles.page__why__choose__item__icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40ZM24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                                    fill="#58BD7D"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 12C25.1046 12 26 12.8954 26 14V23.1716L30.4142 27.5858C31.1953 28.3668 31.1953 29.6332 30.4142 30.4142C29.6332 31.1953 28.3668 31.1953 27.5858 30.4142L22.5858 25.4142C22.2107 25.0391 22 24.5304 22 24V14C22 12.8954 22.8954 12 24 12Z"
                                    fill="#58BD7D"
                                />
                            </svg>
                        </div>
                        <div className={styles.page__why__choose__item__title}>Save Time</div>
                        <div className={`${styles.page__why__choose__item__desc} dark:text-[#EDF0FC]`}>
                            Eliminate the trouble of browsing various sites or visiting embassies for visa information.
                            Access all you need on visas from a single, efficient platform.
                        </div>
                    </div>
                    <div className={`${styles.page__why__choose__item__container} bg-[#ECF9FD] dark:bg-[#192326]`}>
                        <div className={styles.page__why__choose__item__icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <path
                                    d="M18 36H22V40H26V36H30V40H32C33.1046 40 34 40.8954 34 42C34 43.1046 33.1046 44 32 44H16C14.8954 44 14 43.1046 14 42C14 40.8954 14.8954 40 16 40H18V36Z"
                                    fill="#4BC9F0"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8 12L8 28C8 30.2091 9.79086 32 12 32L36 32C38.2091 32 40 30.2091 40 28L40 12C40 9.79086 38.2091 8 36 8L12 8C9.79086 8 8 9.79086 8 12ZM4 28C4 32.4183 7.58172 36 12 36L36 36C40.4183 36 44 32.4183 44 28L44 12C44 7.58172 40.4183 4 36 4L12 4C7.58172 4 4 7.58172 4 12L4 28Z"
                                    fill="#4BC9F0"
                                />
                                <path
                                    d="M14 12C12.8954 12 12 12.8954 12 14C12 15.1046 12.8954 16 14 16H28C29.1046 16 30 15.1046 30 14C30 12.8954 29.1046 12 28 12H14Z"
                                    fill="#4BC9F0"
                                />
                                <path
                                    d="M14 20C12.8954 20 12 20.8954 12 22C12 23.1046 12.8954 24 14 24H18C19.1046 24 20 23.1046 20 22C20 20.8954 19.1046 20 18 20H14Z"
                                    fill="#4BC9F0"
                                />
                            </svg>
                        </div>
                        <div className={styles.page__why__choose__item__title} style={{ color: '#4BC9F0' }}>
                            Convenience
                        </div>
                        <div className={`${styles.page__why__choose__item__desc} dark:text-[#EDF0FC]`}>
                            Access visa details online anytime, anywhere, from the comfort of your own device. No more
                            waiting in long queues or dealing with paperwork for your travels.
                        </div>
                    </div>
                    <div className={`${styles.page__why__choose__item__container} bg-[#F5F0F8] dark:bg-[#27242A]`}>
                        <div className={styles.page__why__choose__item__icon}>
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 44C30.6274 44 36 38.6274 36 32C36 25.3726 30.6274 20 24 20C17.3726 20 12 25.3726 12 32C12 38.6274 17.3726 44 24 44ZM24 48C32.8366 48 40 40.8366 40 32C40 23.1634 32.8366 16 24 16C15.1634 16 8 23.1634 8 32C8 40.8366 15.1634 48 24 48Z"
                                    fill="#CDB4DB"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 36C26.2091 36 28 34.2091 28 32C28 29.7909 26.2091 28 24 28C21.7909 28 20 29.7909 20 32C20 34.2091 21.7909 36 24 36ZM24 40C28.4183 40 32 36.4183 32 32C32 27.5817 28.4183 24 24 24C19.5817 24 16 27.5817 16 32C16 36.4183 19.5817 40 24 40Z"
                                    fill="#CDB4DB"
                                />
                                <path
                                    d="M14.4726 4C12.9858 4 12.0188 5.56462 12.6837 6.89442L17.8491 17.2252C16.6031 17.7445 15.4369 18.4169 14.3738 19.2189L9.10602 8.68328C7.11132 4.69387 10.0123 0 14.4726 0H17.5283C19.8009 0 21.8785 1.28401 22.8949 3.31672L24.0004 5.52782L25.106 3.31672C26.1223 1.28401 28.1999 0 30.4725 0H33.5283C37.9886 0 40.8895 4.69387 38.8948 8.68328L33.627 19.2189C32.564 18.4169 31.3977 17.7446 30.1517 17.2252L35.3171 6.89442C35.982 5.56462 35.015 4 33.5283 4H30.4725C29.715 4 29.0225 4.428 28.6837 5.10557L26.2365 9.99996L29.773 17.073C28.2104 16.4683 26.529 16.1019 24.7736 16.0184L19.3172 5.10557C18.9784 4.42801 18.2859 4 17.5283 4H14.4726Z"
                                    fill="#CDB4DB"
                                />
                            </svg>
                        </div>
                        <div className={styles.page__why__choose__item__title} style={{ color: '#CDB4DB' }}>
                            Reliability
                        </div>
                        <div className={`${styles.page__why__choose__item__desc} dark:text-[#EDF0FC]`}>
                            Count on accurate and up to date visa information. Our platform is regularly updated to
                            ensure you have the latest visa requirements and guidelines.
                        </div>
                    </div>
                    <div className={`${styles.page__why__choose__item__container} bg-[#FFE9E2] dark:bg-[#33241F]`}>
                        <div className={styles.page__why__choose__item__icon}>
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_53_8632)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.29514 4.70486C11.877 2.123 16.147 2.42647 18.3378 5.3475L21.9743 10.1962C23.7659 12.5849 23.5283 15.9275 21.417 18.0389L18.7358 20.72C18.9957 21.3963 19.851 22.8805 22.4558 25.4853C25.0606 28.0901 26.5448 28.9454 27.2211 29.2053L29.9023 26.5241C32.0136 24.4128 35.3562 24.1752 37.7449 25.9668L42.5936 29.6033C45.5147 31.7941 45.8181 36.0641 43.2363 38.646C42.3969 39.4854 42.2548 39.6274 40.854 41.0282C39.4264 42.4558 36.3951 43.7902 33.3261 43.9236C28.5235 44.1324 21.9999 41.9999 13.9706 33.9706C5.94121 25.9412 3.80869 19.4177 4.0175 14.615C4.13366 11.9434 4.98304 9.00916 6.92411 7.09824C8.31371 5.68629 8.49442 5.50558 9.29514 4.70486ZM8.01372 14.7888C7.86898 18.1179 9.27199 23.6151 16.799 31.1421C24.326 38.6691 29.8233 40.0721 33.1523 39.9274C36.2601 39.7923 37.9272 38.2906 38.0256 38.1998L40.4078 35.8176C41.2685 34.9569 41.1673 33.5336 40.1936 32.8033L35.3449 29.1668C34.5487 28.5696 33.4345 28.6488 32.7307 29.3526C31.6703 30.4129 30.9465 31.1475 29.5296 32.559C26.5863 35.4911 21.5482 30.2345 19.6274 28.3137C17.8623 26.5485 12.4829 21.3504 15.3792 18.4198C15.385 18.414 16.1651 17.6339 18.5885 15.2104C19.2923 14.5067 19.3715 13.3925 18.7743 12.5962L15.1378 7.7475C14.4075 6.77382 12.9842 6.67267 12.1236 7.53328C11.3315 8.32539 10.435 9.22183 9.74375 9.91788C8.32101 11.3505 8.08986 13.0376 8.01372 14.7888Z"
                                        fill="#FF6838"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_53_8632">
                                        <rect width="48" height="48" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={styles.page__why__choose__item__title} style={{ color: '#FF6838' }}>
                            Expert Support
                        </div>
                        <div className={`${styles.page__why__choose__item__desc} dark:text-[#EDF0FC]`}>
                            Our dedicated customer support team is available 24/7 to assist you with any visa-related
                            queries, ensuring a smooth and stress free experience.
                        </div>
                    </div>
                </div>
                <div className={styles.page__why__choose__apply}>
                    {/* <button onClick={handleApply} className={styles.page__why__choose__apply__button}>
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
