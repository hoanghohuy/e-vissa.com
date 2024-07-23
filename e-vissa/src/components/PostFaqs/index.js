import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import styles from '@/app/faqs/faqs.module.css';
import { ExpandIcon } from '../Icons/Icons';
import { useState } from 'react';

export default function PostFaqs({ listFaqs }) {
    const [expanded, setExpanded] = useState([]);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
    };
    return (
        <div>
            <h2 className="font-dmsans text-[32px] font-[700]">Frequently Asked Questions</h2>
            {listFaqs.data &&
                listFaqs.data.length > 0 &&
                listFaqs.data.map((item, index) => (
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
                                    {index + 1}. {item.q}
                                </h3>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: '16px 0' }}>
                                <div
                                    className="text-[15px] dark:text-[#EDF0FC]"
                                    dangerouslySetInnerHTML={{
                                        __html: item.a,
                                    }}
                                ></div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
        </div>
    );
}
