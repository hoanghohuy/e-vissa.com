'use client';
import React from 'react';
import styles from './About.module.css';
import Image from 'next/image';
import why_banner from '/public/page/about/about_why-banner.png';
import travel1 from '/public/page/about/travel1.png';
import travel2 from '/public/page/about/travel2.png';
import travel3 from '/public/page/about/travel3.png';
import ButtonApply from '@/components/Page/ButtonApply/ButtonApply';
import image_user_default from '/public/avatar/user_default_header.png';
import star from '/public/icons/star.png';
import Link from 'next/link';
import HowItWorkPage from '../../components/Page/IndexPage/HowItWork/howItWork';
import { dataReview } from '../../utils/constants';
import customer1 from '/public/page/reviews_and_ratings/Charlotte_Martin.png';
import ImportantNote from '../../components/Page/ImportantNote/importantNote';
import { QuoteIcon, StarIcon } from '@/components/Icons/Icons';

const dataStep = [
    {
        id: 1,
        number: '01',
        color: '#58BD7D',
        label: 'Save Time',
        text: `Please submit your application whenever it is most convenient for you, and our experts will send it to the government in the appropriate time frame. You will not make mistakes, and you will save time and effort by not having to deal with the difficulties of submitting a travel authorization on your own. 
<br/>Our knowledgeable travel advisers will walk you through the entire process and thoroughly go over all the information you provide.
`,
    },
    {
        id: 2,
        number: '02',
        color: '#4BC9F0',
        label: 'Simplicity',
        text: `We prioritize efficiency and simplicity when clients utilize our services at E-vissa.com. Our application forms are user-friendly and fast-loading, so you can complete them easily and securely. This enables us to fulfill our commitment to providing high-quality service quickly.
<br/>Our method has been designed to make it easier for families or groups to apply. By adding numerous travelers to a single form, you can save time and guarantee that each member's application process is the same.
`,
    },
    {
        id: 3,
        number: '03',
        color: '#CDB4DB',
        label: 'Safe and secure',
        text: `Our service proposition is our customized approach, which ensures that each client's specific needs are satisfied with precision and thoughtfulness. Our goal is to make sure the process of obtaining a travel authorization is simple, secure, and beneficial.`,
    },
    {
        id: 4,
        number: '04',
        color: '#FFD166',
        label: 'Reliability',
        text: `We are dedicated to upholding the strictest security and privacy guidelines for data. Strict data handling procedures and cutting-edge encryption techniques protect your information, guaranteeing its security and confidentiality.`,
    },
    {
        id: 5,
        number: '05',
        color: '#0766AD',
        label: 'Expert Support',
        text: `We take great pride in our customer support, which is available 24/7/365 in English to guarantee that your questions and issues are handled efficiently.
<br/>Make a wise choice! Explore a destination where excellence is the standard, and you may travel with confidence thanks to E-vissa.com's special blend of security, convenience, and knowledge.
`,
    },
];

const dataTravel = [
    { id: 1, image: travel1, title: 'Explore the World', desc: 'Discover unique countries and cultures effortlessly.' },
    {
        id: 2,
        image: travel2,
        title: 'Plan with Confidence',
        desc: 'Skip the paperwork, focus on your journey.',
    },
    {
        id: 3,
        image: travel3,
        title: 'Your Travel Partner',
        desc: 'For family, leisure, or business, trust E-vissa.com.',
    },
];
function AboutPage() {
    const onApply = () => {
        console.log('applyyy');
    };
    return (
        <>
            {/* <div className={styles.banner}>
                <div className={styles.container}>
                    <Image src={about} alt="about banner" style={{ width: '100%', height: 'auto' }} />
                </div>
            </div> */}
            <div className={`${styles.travel} dark:bg-[#121212]`}>
                <div className={styles.container}>
                    <div className={styles.travel__container}>
                        <div className={styles.travel__header}>
                            <h1 className={styles.travel__header__title}>Full Details About Us For Your Reference</h1>
                            <p className={styles.travel__header__desc}>
                                <Link href="/">E-vissa.com</Link> is a top-rated website specializing in providing
                                expedited visa services for a perfect travel itinerary. <br />
                                Our goal is to deliver the greatest and most effective online travel authorization
                                processing service.
                            </p>
                        </div>
                        <div className={styles.travel__content}>
                            {dataTravel &&
                                dataTravel.map((item, index) => (
                                    <div key={item.id} className={styles.travel__content__item}>
                                        <div className={styles.travel__content__item__img}>
                                            <Image
                                                alt="image data travel"
                                                src={item.image}
                                                className={styles.travel__content__item__image}
                                            />
                                        </div>
                                        <div className={styles.travel__content__item__text}>
                                            <div className={styles.travel__content__item__title}>{item.title}</div>
                                            <div className={styles.travel__content__item__desc}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.why}>
                <div className={styles.why__container}>
                    <h2 className={styles.why__title}>Why Choose E-Vissa.com?</h2>
                    <p className={styles.why__desc}>
                        Many passengers are faced with the difficult decision of using a specialized service or
                        navigating convoluted government procedures. E-vissa.com is the best initiative for visitors to
                        choose from when having the intention to visit a certain country around the world. With our team
                        of experts, we can assist in finalizing the visa procedures in a simplified manner for a
                        meaningful overseas trip.
                        <br />
                        Using the E-vissa.com portal is a rewarding experience that highlights more than a service;
                        rather, it represents a complete solution that has been painstakingly designed to both meet and
                        exceed our clients' expectations.
                    </p>
                    <div className={styles.why__content}>
                        <div className={styles.why__step}>
                            {dataStep &&
                                dataStep.map((step) => (
                                    <div key={step.id} className={styles.why__step__item}>
                                        <div className={styles.why__step__item__header}>
                                            <div
                                                style={{ backgroundColor: step.color }}
                                                className={styles.why__step__item__header__number}
                                            >
                                                {step.number}
                                            </div>
                                            <h3 className={styles.why__step__item__header__title}>{step.label}</h3>
                                        </div>
                                        <div className={styles.why__step__item__content}>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: step.text,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                ))}
                            <Link href={'/visa-applications'}>
                                <ButtonApply type="primary" title={'Get started now'} />
                            </Link>
                        </div>
                        <div className={styles.why__step__banner}>
                            <Image src={why_banner} alt="why banner" className={styles.why__step__banner__img} />
                            {dataReview &&
                                dataReview.map((review) => (
                                    <div
                                        className={`${styles.why__step__banner__item} ${styles[`item__` + review.id]}`}
                                        key={review.id}
                                    >
                                        <img
                                            alt={`customer${review.id}`}
                                            src={`/page/reviews_and_ratings/user${review.id}.png`}
                                        />
                                        <div className={styles.why__user__label__text}>
                                            <div className={styles.why__user__label__name}>{review.customerName}</div>
                                            <div className="flex">
                                                <Image src={star} alt="star" />
                                                <Image src={star} alt="star" />
                                                <Image src={star} alt="star" />
                                                <Image src={star} alt="star" />
                                                <Image src={star} alt="star" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Start component how it works? */}
            <HowItWorkPage onApply={onApply} />
            {/* End component how it works? */}
            <div className={styles.review}>
                <div className={styles.review__container}>
                    <h2 className={styles.review__title}>What Clients Say About Us and Our Services</h2>
                    <div className={styles.review__list}>
                        {dataReview &&
                            dataReview.map((item) => (
                                <div className={styles.review__item} key={item.id}>
                                    <div className={styles.review__item__header}>
                                        <div className={styles.review__item__header__info}>
                                            <img
                                                alt={`customer${item.id}`}
                                                src={`/page/reviews_and_ratings/user${item.id}.png`}
                                            />
                                            <div className={styles.review__item__name}>{item.customerName}</div>
                                        </div>
                                        <div className={styles.review__item__header__icon}>
                                            <QuoteIcon />
                                        </div>
                                    </div>
                                    <div className={styles.review__item__content}>{item.text}</div>
                                    <div className={styles.review__item__divider}></div>
                                    <div className={styles.review__item__footer}>
                                        <div className="flex">
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                        </div>
                                        <div className="font-dmsans">({item.country})</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <ImportantNote />
        </>
    );
}

export default AboutPage;
