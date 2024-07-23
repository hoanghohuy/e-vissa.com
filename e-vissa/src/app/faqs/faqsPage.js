'use client';
import React, { useState } from 'react';
import styles from './faqs.module.css';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { listFaqs, listFaqsCovidAndQuarantine } from '../../utils/constants';
import CheckVisa from '../../components/Page/CheckVisa/checkVisa';
import WhyApplyWithUs from '@/components/Page/WhyApplyWithUs/whyApplyWithUs';
import ContactUs from '@/components/Page/ChildComponent/Post/ContactUs/contactUs';
import { ExpandIcon } from '@/components/Icons/Icons';

export default function FaqsPage() {
    const [expanded, setExpanded] = useState([]);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
    };

    return (
        <div className={`${styles.container} dark:bg-[#121212]`}>
            <div className={styles.faqs__container}>
                <div className={styles.faqs__content}>
                    <h1 className={`${styles.faqs__content__title} dark:text-[#EDF0FC]`}>
                        All you need to know about frequently asked questions (FAQs) for visas
                    </h1>
                    <div className={`${styles.faqs__content__descriptions} dark:text-[#EDF0FC]`}>
                        <a className={styles.link} href="/">
                            E-vissa.com
                        </a>{' '}
                        is a top-rated website specializing in providing expedited visa services for a perfect travel
                        itinerary. Our goal is to deliver the greatest and most effective online travel authorization
                        processing service.
                    </div>
                    <div className={styles.faqs__content__container}>
                        <h2 className="dark:text-[#EDF0FC] font-[600]">FREQUENTLY ASKED QUESTIONS (FAQS) FOR VISAS</h2>
                        {listFaqs &&
                            listFaqs.map((item, index) => (
                                <div className={styles.faqs__content__item} key={item.id}>
                                    <Accordion
                                        key={item.id}
                                        sx={{
                                            borderRadius: '12px',
                                            border: `none`,
                                            boxShadow: 'none',
                                            '&:not(:last-child)': {
                                                borderBottom: 0,
                                            },
                                            '&:before': {
                                                display: 'none',
                                            },
                                        }}
                                        expanded={expanded.includes(item.id) ? true : false}
                                        onChange={handleChange(item.id)}
                                        className={styles.preview__preview__item__container}
                                    >
                                        <AccordionSummary
                                            key={item.id}
                                            expandIcon={<ExpandIcon />}
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            className={styles.faqs__content__item__summary}
                                        >
                                            <h3
                                                className={`${styles.faqs__content__item__text} dark:text-[#EDF0FC] ${
                                                    expanded.includes(item.id) ? '!text-primary' : ''
                                                }`}
                                            >
                                                {index + 1}. {item.text}
                                            </h3>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ padding: '16px 0' }}>
                                            <div
                                                className="text-[15px] dark:text-[#EDF0FC]"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                    </div>
                    <div className={styles.faqs__content__container}>
                        <h2 className="dark:text-[#EDF0FC] font-[600]">
                            FREQUENTLY ASKED QUESTIONS (FAQS) FOR COVID/QUARANTINE
                        </h2>
                        {listFaqsCovidAndQuarantine &&
                            listFaqsCovidAndQuarantine.map((item, index) => (
                                <div className={styles.faqs__content__item} key={item.id}>
                                    <Accordion
                                        key={item.id}
                                        sx={{
                                            borderRadius: '12px',
                                            border: `none`,
                                            boxShadow: 'none',
                                            '&:not(:last-child)': {
                                                borderBottom: 0,
                                            },
                                            '&:before': {
                                                display: 'none',
                                            },
                                        }}
                                        expanded={expanded.includes(item.id) ? true : false}
                                        onChange={handleChange(item.id)}
                                        className={styles.preview__preview__item__container}
                                    >
                                        <AccordionSummary
                                            key={item.id}
                                            expandIcon={<ExpandIcon />}
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            className={styles.faqs__content__item__summary}
                                        >
                                            <h3
                                                className={`${styles.faqs__content__item__text} dark:text-[#EDF0FC] ${
                                                    expanded.includes(item.id) ? '!text-primary' : ''
                                                }`}
                                            >
                                                {index + 1}. {item.text}
                                            </h3>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ padding: '16px 0' }}>
                                            <div
                                                className="text-[15px] dark:text-[#EDF0FC]"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                    </div>
                </div>
                <div className={styles.faqs__right}>
                    <CheckVisa />
                    <WhyApplyWithUs />
                    {/* Start Component Contact Us */}
                    <ContactUs />
                    {/* End Component Contact Us */}
                </div>
            </div>
        </div>
    );
}
