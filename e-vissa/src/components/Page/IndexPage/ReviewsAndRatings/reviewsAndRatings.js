'use client';
import React from 'react';
import styles from '@/app/page.module.css';
import Slider from 'react-slick';
import listReviews from '/public/page/reviews_and_ratings/list_reviews.png';
import './customSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { dataReview } from '../../../../utils/constants';

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0523 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z"
                fill="white"
            />
        </svg>
    </div>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.90906 7.26521C9.50324 6.8906 8.87058 6.9159 8.49597 7.32172L5.2652 10.8217C4.9116 11.2047 4.9116 11.7952 5.26519 12.1782L8.49597 15.6783C8.87057 16.0841 9.50323 16.1094 9.90905 15.7348C10.3149 15.3602 10.3402 14.7276 9.96558 14.3217L8.28397 12.5L18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5L8.284 10.5L9.96557 8.67829C10.3402 8.27247 10.3149 7.63981 9.90906 7.26521Z"
                fill="white"
            />
        </svg>
    </div>
);

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SlickArrowLeft />,
    prevArrow: <SlickArrowRight />,
    responsive: [
        {
            breakpoint: 1392,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function ReviewsAndRatingsPage() {
    return (
        <div className={styles.page__review}>
            <div className={styles.page__review__container}>
                <div className={styles.page__review__left}>
                    <h2 className={styles.page__review__left__title}>
                        Customer
                        <br /> Reviews & Ratings
                    </h2>
                    <div className={styles.page__review__left__desc}>
                        Discover How Our E-Visa Solution Impresses Our Customers.
                    </div>
                    <div className={styles.page__review__left__rate}>
                        <Image className={styles.page__review__left__image} src={listReviews} alt="list reviews" />
                        <div className={styles.page__review__left__text}>
                            <div>1450 Reviews</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                <circle cx="3" cy="3" r="3" fill="white" />
                            </svg>
                            <div>650 Ratings</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.page__review__right} custom__slider`}>
                    <Slider {...settings}>
                        {dataReview &&
                            dataReview.map((item) => (
                                <div className={styles.page__review__right__item} key={item.id}>
                                    <div className={`${styles.page__review__right__item__container} dark:bg-[#121212]`}>
                                        <div className="flex flex-col gap-2">
                                            <div
                                                className={`${styles.page__review__right__item__title} dark:text-[#EDF0FC]`}
                                            >
                                                {item.title}
                                            </div>
                                            <div className="flex">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.0811 3.12771C11.4285 2.32266 12.57 2.32266 12.9174 3.12771L15.0974 8.1796C15.2445 8.52048 15.5684 8.75181 15.9386 8.78042L21.5292 9.21241C22.4262 9.28172 22.7826 10.4078 22.0888 10.9806L17.8845 14.4518C17.5879 14.6967 17.458 15.0899 17.5504 15.4632L18.8443 20.6916C19.0571 21.5514 18.1296 22.2429 17.3663 21.7935L12.5066 18.9326C12.1935 18.7482 11.805 18.7482 11.4919 18.9326L6.63219 21.7935C5.86889 22.2429 4.94136 21.5514 5.15415 20.6916L6.44809 15.4632C6.54048 15.0899 6.41061 14.6967 6.11405 14.4518L1.90966 10.9806C1.21591 10.4078 1.57231 9.28172 2.4693 9.21241L8.05995 8.78042C8.43011 8.75181 8.75396 8.52048 8.90107 8.1796L11.0811 3.12771Z"
                                                        fill="#FFD166"
                                                    />
                                                </svg>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.0811 3.12771C11.4285 2.32266 12.57 2.32266 12.9174 3.12771L15.0974 8.1796C15.2445 8.52048 15.5684 8.75181 15.9386 8.78042L21.5292 9.21241C22.4262 9.28172 22.7826 10.4078 22.0888 10.9806L17.8845 14.4518C17.5879 14.6967 17.458 15.0899 17.5504 15.4632L18.8443 20.6916C19.0571 21.5514 18.1296 22.2429 17.3663 21.7935L12.5066 18.9326C12.1935 18.7482 11.805 18.7482 11.4919 18.9326L6.63219 21.7935C5.86889 22.2429 4.94136 21.5514 5.15415 20.6916L6.44809 15.4632C6.54048 15.0899 6.41061 14.6967 6.11405 14.4518L1.90966 10.9806C1.21591 10.4078 1.57231 9.28172 2.4693 9.21241L8.05995 8.78042C8.43011 8.75181 8.75396 8.52048 8.90107 8.1796L11.0811 3.12771Z"
                                                        fill="#FFD166"
                                                    />
                                                </svg>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.0811 3.12771C11.4285 2.32266 12.57 2.32266 12.9174 3.12771L15.0974 8.1796C15.2445 8.52048 15.5684 8.75181 15.9386 8.78042L21.5292 9.21241C22.4262 9.28172 22.7826 10.4078 22.0888 10.9806L17.8845 14.4518C17.5879 14.6967 17.458 15.0899 17.5504 15.4632L18.8443 20.6916C19.0571 21.5514 18.1296 22.2429 17.3663 21.7935L12.5066 18.9326C12.1935 18.7482 11.805 18.7482 11.4919 18.9326L6.63219 21.7935C5.86889 22.2429 4.94136 21.5514 5.15415 20.6916L6.44809 15.4632C6.54048 15.0899 6.41061 14.6967 6.11405 14.4518L1.90966 10.9806C1.21591 10.4078 1.57231 9.28172 2.4693 9.21241L8.05995 8.78042C8.43011 8.75181 8.75396 8.52048 8.90107 8.1796L11.0811 3.12771Z"
                                                        fill="#FFD166"
                                                    />
                                                </svg>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.0811 3.12771C11.4285 2.32266 12.57 2.32266 12.9174 3.12771L15.0974 8.1796C15.2445 8.52048 15.5684 8.75181 15.9386 8.78042L21.5292 9.21241C22.4262 9.28172 22.7826 10.4078 22.0888 10.9806L17.8845 14.4518C17.5879 14.6967 17.458 15.0899 17.5504 15.4632L18.8443 20.6916C19.0571 21.5514 18.1296 22.2429 17.3663 21.7935L12.5066 18.9326C12.1935 18.7482 11.805 18.7482 11.4919 18.9326L6.63219 21.7935C5.86889 22.2429 4.94136 21.5514 5.15415 20.6916L6.44809 15.4632C6.54048 15.0899 6.41061 14.6967 6.11405 14.4518L1.90966 10.9806C1.21591 10.4078 1.57231 9.28172 2.4693 9.21241L8.05995 8.78042C8.43011 8.75181 8.75396 8.52048 8.90107 8.1796L11.0811 3.12771Z"
                                                        fill="#FFD166"
                                                    />
                                                </svg>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.0811 3.12771C11.4285 2.32266 12.57 2.32266 12.9174 3.12771L15.0974 8.1796C15.2445 8.52048 15.5684 8.75181 15.9386 8.78042L21.5292 9.21241C22.4262 9.28172 22.7826 10.4078 22.0888 10.9806L17.8845 14.4518C17.5879 14.6967 17.458 15.0899 17.5504 15.4632L18.8443 20.6916C19.0571 21.5514 18.1296 22.2429 17.3663 21.7935L12.5066 18.9326C12.1935 18.7482 11.805 18.7482 11.4919 18.9326L6.63219 21.7935C5.86889 22.2429 4.94136 21.5514 5.15415 20.6916L6.44809 15.4632C6.54048 15.0899 6.41061 14.6967 6.11405 14.4518L1.90966 10.9806C1.21591 10.4078 1.57231 9.28172 2.4693 9.21241L8.05995 8.78042C8.43011 8.75181 8.75396 8.52048 8.90107 8.1796L11.0811 3.12771Z"
                                                        fill="#FFD166"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                className={`${styles.page__review__right__item__desc} dark:text-[#EDF0FC]`}
                                            >
                                                {item.text}
                                            </div>
                                        </div>
                                        <div className={styles.page__review__right__person}>
                                            <img
                                                alt={`customer${item.id}`}
                                                src={`/page/reviews_and_ratings/user${item.id}.png`}
                                            />
                                            <div className={styles.page__review__right__person__info}>
                                                <div
                                                    className={`${styles.page__review__right__person__name} dark:text-[#EDF0FC]`}
                                                >
                                                    {item.customerName}
                                                </div>
                                                <div className={styles.page__review__right__person__from}>
                                                    {item.country}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
