'use client';
import React, { useState } from 'react';
import applicationStyles from './VisaApplications.module.css';
import styles from '../faqs/faqs.module.css';
import PopularDestinationPage from '@/components/Page/IndexPage/PopularDestination/popularDestination';
import { dataPopularDestinationSelect } from '@/components/Page/IndexPage/PopularDestination/data';
import { listFaqs } from '@/utils/constants';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { CountrySelection } from '@/components/CountrySelection/CountrySelection';
import { ExpandIcon } from '@/components/Icons/Icons';
import { listFaqsCovidAndQuarantine } from '../../utils/constants';

export default function VisaApplycationPage() {
    const [expanded, setExpanded] = useState([]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
    };

    return (
        <>
            <div className={applicationStyles.banner}>
                <div className={applicationStyles.banner__desc}>99.9% visa on time</div>
                <h1 className={applicationStyles.banner__title}>Get Your Visa on Time</h1>
                <div className={applicationStyles.banner__apply}>
                    <CountrySelection page={'application'} />
                </div>
            </div>
            <div className={applicationStyles.container}>
                <PopularDestinationPage data={dataPopularDestinationSelect} />
            </div>
            <div className={applicationStyles.container__faqs}>
                <div className={styles.faqs__content}>
                    <div className={styles.faqs__content__title}>Frequently Asked Questions</div>
                    <div className={styles.faqs__content__container}>
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
                                            <h3 className={styles.faqs__content__item__text}>
                                                {index + 1}. {item.text}
                                            </h3>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ padding: '16px 0' }}>
                                            <p
                                                className="text-[15px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></p>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                    </div>
                    <div className="font-[600]">FREQUENTLY ASKED QUESTIONS (FAQS) FOR COVID/QUARANTINE</div>
                    <div className={styles.faqs__content__container}>
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
                                            <h3 className={styles.faqs__content__item__text}>
                                                {index + 1}. {item.text}
                                            </h3>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ padding: '16px 0' }}>
                                            <p
                                                className="text-[15px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></p>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
