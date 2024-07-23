'use client';
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Typography } from '@mui/material';
import { notFound, useSearchParams } from 'next/navigation';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import styles from './CheckOrder.module.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import PayPalComponent from '../../components/Paypal';

const CheckOrderPage = () => {
    const searchParams = useSearchParams();
    const orderParam = searchParams.get('order');
    const [loadingInfo, setLoadingInfo] = useState(true);
    const [dataOrder, setDataOrder] = useState({});
    const [applicantInformation, setApplicantInformation] = useState([]);
    const [orderNotFound, setOrderNotFound] = useState(false);
    const [orderID, setOrderID] = useState();

    const getStandardFee = (data) => {
        if (!data) {
            return 0;
        } else {
            const dataObj = JSON.parse(data);
            if (dataObj) {
                return dataObj.visaStandardFee;
            } else {
                return 0;
            }
        }
    };

    const getDataOrder = async (idOrder) => {
        try {
            const visaID = idOrder;
            if (visaID) {
                const order = await fetch(`/api/orders/${visaID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: accessToken || localStorage.getItem('guest_token'),
                        Authorization: localStorage.getItem('guest_token'),
                    },
                });
                if (order.status === 200) {
                    const resp = await order.json();
                    if (resp) {
                        setDataOrder(resp);
                        if (resp.another_people) {
                            setApplicantInformation(JSON.parse(resp.another_people));
                        }
                    } else {
                        setOrderNotFound(true);
                    }
                }
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingInfo(false);
        }
    };

    const onViewPassport = (link) => {
        Swal.fire({
            imageUrl: `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${link}`,
            imageAlt: 'View passport image detail',
            showConfirmButton: false,
            padding: 20,
        });
    };

    useEffect(() => {
        let idOrder;
        const url = new URL(window?.location.href);
        if (url) {
            const params = new URLSearchParams(url?.search);
            idOrder = params.get('order');
        }
        if (!idOrder) {
            notFound();
        }
        setOrderID(idOrder);
        // getDataVisa();
        getDataOrder(idOrder);
    }, []);
    return (
        <>
            <div className={styles.page}>
                <div className={styles.preview__container}>
                    <div className={styles.preview__preview}>
                        {loadingInfo ? (
                            <CircularProgress />
                        ) : orderNotFound ? (
                            `Your order ${orderID} not found.`
                        ) : (
                            <>
                                <div className={styles.preview__preview__item}>
                                    <Accordion
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
                                        expanded={true}
                                        className={styles.preview__preview__item__container}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            className={styles.preview__preview__item__container__summary}
                                        >
                                            <div className={styles.preview__preview__item__title}>
                                                Your Trip Details
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>
                                                    Date of Arrival
                                                </div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && moment(dataOrder.arrival_date).format('MM/DD/YYYY')}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>
                                                    Date of Departure
                                                </div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && moment(dataOrder.departure_date).format('MM/DD/YYYY')}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>Arrival port</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.arrival_port}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>
                                                    Payment method
                                                </div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.payment_method}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>
                                                    Transaction code
                                                </div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.transaction}
                                                </div>
                                            </div>
                                            {/* <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>
                                                    How are you going to travel?
                                                </div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.travel_by}
                                                </div>
                                            </div>

                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>
                                                    What is your Port of Arrival?
                                                </div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.arrival_port}
                                                </div>
                                            </div> */}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                                <div className={styles.preview__preview__item}>
                                    <Accordion
                                        sx={{
                                            border: `none`,
                                            boxShadow: 'none',
                                            '&:not(:last-child)': {
                                                borderBottom: 0,
                                            },
                                            '&:before': {
                                                display: 'none',
                                            },
                                        }}
                                        expanded={true}
                                        className={styles.preview__preview__item__container}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel2d-content"
                                            id="panel2d-header"
                                            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                                        >
                                            <Typography className={styles.preview__preview__item__title}>
                                                Contact information
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>First name</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.first_name}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>Last name</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.last_name}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>Phone number</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.phone_number}
                                                </div>
                                            </div>

                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>Email</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.email}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>Address</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.address}
                                                </div>
                                            </div>
                                            <div className={styles.preview__tripdetails__item}>
                                                <div className={styles.preview__details__item__label}>Note</div>
                                                <div className={styles.preview__details__item__value}>
                                                    {dataOrder && dataOrder.customer_note}
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                                <div className={styles.preview__preview__item}>
                                    <Accordion
                                        sx={{
                                            border: `none`,
                                            boxShadow: 'none',
                                            '&:not(:last-child)': {
                                                borderBottom: 0,
                                            },
                                            '&:before': {
                                                display: 'none',
                                            },
                                        }}
                                        expanded={true}
                                        className={styles.preview__preview__item__container}
                                    >
                                        <AccordionSummary
                                            aria-controls="panel3d-content"
                                            id="panel3d-header"
                                            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                                        >
                                            <Typography className={styles.preview__preview__item__title}>
                                                Applicant personal details
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={styles.preview__table__header}>
                                                <div className={styles.preview__table__header__firstname}>
                                                    First name
                                                </div>
                                                <div className={styles.preview__table__header__lastname}>Last name</div>
                                                <div className={styles.preview__table__header__passport}>
                                                    Passport document
                                                </div>
                                            </div>
                                            {applicantInformation && applicantInformation.length > 0
                                                ? applicantInformation.map((applicant, index) => (
                                                      <div className={styles.preview__table__row} key={index + 1}>
                                                          <div className={styles.preview__table__item}>
                                                              {applicant.first_name}
                                                          </div>
                                                          <div className={styles.preview__table__item}>
                                                              {applicant.last_name}
                                                          </div>
                                                          {applicant.passport && (
                                                              <a
                                                                  onClick={() => onViewPassport(applicant.passport)}
                                                                  className={styles.preview__table__item__view}
                                                              >
                                                                  View
                                                              </a>
                                                          )}
                                                      </div>
                                                  ))
                                                : 'No info detail.'}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </>
                        )}
                    </div>
                    {loadingInfo ? (
                        ''
                    ) : orderNotFound ? (
                        ''
                    ) : (
                        <div className={styles.preview__details}>
                            <div className={styles.trip__details__visa__order__title}>Application Details</div>
                            <div className={styles.review__your__code__container}>
                                <div className={styles.review__your__code__title}>Your Application Code</div>
                                <div className={styles.review__your__code}>#E_VISSA_{orderID}</div>
                            </div>
                            <div className={styles.review__application__status}>
                                <div className={styles.review__application__status__header}>
                                    <div className={styles.review__application__status__title}>Application status</div>
                                    <div className={styles.review__application__status__review}>
                                        <label className={`${styles[dataOrder?.status]}`}>{dataOrder?.status}</label>
                                    </div>
                                </div>
                                <div className={styles.review__application__status__content}>
                                    We are now working on your travel documents. Stay tuned for updates via email.
                                </div>
                            </div>
                            <div className={styles.trip__details__visa__order__divider}></div>
                            <div className="w-full flex flex-col gap-2">
                                <div className={styles.trip__details__visa__order__visa}>
                                    {
                                        listCountries
                                            .find((item) => item.code == dataOrder?.xref_visa_country_info?.country)
                                            ?.name.split('-')[0]
                                    }{' '}
                                    Evisa {dataOrder?.xref_visa_country_info?.visa_detail_info?.length_of_stay} days,{' '}
                                    {dataOrder?.xref_visa_country_info?.visa_detail_info?.entry_type + ' Entry'}
                                    <div className={styles.trip__details__visa__order__visa__applicants}>
                                        {applicantInformation && applicantInformation.length} applicants
                                    </div>
                                </div>
                                <div className={styles.trip__details__visa__order__fee__item}>
                                    <div className={styles.trip__details__visa__order__fee__name}>
                                        number of applicants
                                    </div>
                                    <div className={styles.trip__details__visa__order__fee__price}>
                                        {applicantInformation && applicantInformation.length}
                                    </div>
                                </div>
                                <div className={styles.trip__details__visa__order__fee__item}>
                                    <div className={styles.trip__details__visa__order__fee__name}>Government fee</div>
                                    <div className={styles.trip__details__visa__order__fee__price}>
                                        {dataOrder?.xref_visa_country_info?.visa_detail_info?.government_fee} USD
                                    </div>
                                </div>
                                <div className={styles.trip__details__visa__order__fee__item}>
                                    <div className={styles.trip__details__visa__order__fee__name}>Standard fee</div>
                                    <div className={styles.trip__details__visa__order__fee__price}>
                                        {getStandardFee(dataOrder?.detail_price)} USD
                                    </div>
                                </div>
                                <div className={styles.trip__details__visa__order__fee__item}>
                                    <div className={styles.trip__details__visa__order__fee__name}>
                                        <div className={styles.trip__details__visa__order__fee__name__title}>
                                            Processing speed
                                        </div>
                                    </div>
                                    <div className={styles.trip__details__visa__order__fee__price}>
                                        {dataOrder?.total_price - dataOrder?.original_price} USD
                                    </div>
                                </div>
                            </div>
                            <div className={styles.trip__details__visa__order__divider}></div>
                            <div className={styles.trip__details__visa__order__fee__item}>
                                <div className={styles.trip__details__visa__order__fee__total}>
                                    <div className={styles.trip__details__visa__order__fee__total__title}>
                                        Total Fee
                                    </div>
                                </div>
                                <div className={styles.trip__details__visa__order__fee__price__total}>
                                    <div className={styles.trip__details__visa__order__fee__price__total__price}>
                                        {dataOrder?.total_price} USD
                                    </div>
                                </div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__price__total__desc}>
                                (For all applicants, Includes Government fee, Service fee and Tax)
                            </div>
                            <div className="w-full">
                                <PayPalComponent orderID={orderParam} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default CheckOrderPage;
