'use client';
import { CircularProgress } from '@mui/material';
import styles from './Checkout.module.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { checkValidityType } from '@/utils/validation';
import { getStandardFee } from '@/components/apply-visa/functions';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import PayPalComponent from '../../Paypal';

const Checkout = ({ token, dataServices, dataOrderID, dataVisaDetail }) => {
    const [loadingCalcPrice, setLoadingCalcPrice] = useState(false);
    const [dataCalc, setDataCalc] = useState({});
    const [dataOrder, setDataOrder] = useState({});

    const getDataOrder = async () => {
        setLoadingCalcPrice(true);
        try {
            const order = await fetch(`/api/orders/${dataOrderID.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token || localStorage.getItem('guest_token'),
                },
            });
            if (order.status === 200) {
                const resp = await order.json();
                setDataOrder(resp);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingCalcPrice(false);
        }
    };

    useEffect(() => {
        getDataOrder();
    }, []);

    return (
        <>
            <div className={styles.visa__services__info}>
                <PayPalComponent orderID={dataOrderID?.id} />
            </div>
            <div className={styles.visa__services__visa}>
                <div className={styles.trip__details__visa__order__title}>
                    <div className="text-[20px] font-[700] text-[#312F2F]">Order Summary</div>
                </div>

                <div className="text-[14px]">
                    Your E-visa is valid from{' '}
                    <label className="underline font-[600]">{moment(dataOrder?.arrival_date).format('LL')}</label> to{' '}
                    <label className="underline font-[600]">
                        {moment(dataOrder?.arrival_date)
                            .add(parseInt(dataOrder?.xref_visa_country_info?.visa_detail_info?.validity), 'days')
                            .format('LL')}
                    </label>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Number of entries:</div>

                        <div className={`${styles.trip__details__visa__item__text} capitalize`}>
                            {dataOrder?.xref_visa_country_info?.visa_detail_info?.entry_type + ' entry'}
                        </div>
                    </div>
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Visa Duration:</div>

                        <div className={styles.trip__details__visa__item__text}>
                            {dataOrder?.xref_visa_country_info?.visa_detail_info?.validity}{' '}
                            {checkValidityType(dataOrder?.xref_visa_country_info?.visa_detail_info?.validity_type)}
                        </div>
                    </div>
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Your stay cannot exceed:</div>
                        <div className={styles.trip__details__visa__item__text}>
                            {dataOrder?.xref_visa_country_info?.visa_detail_info?.length_of_stay}{' '}
                            {checkValidityType(
                                dataOrder?.xref_visa_country_info?.visa_detail_info?.length_of_stay_type,
                            )}
                        </div>
                    </div>
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Date of Arrival:</div>

                        <div className={styles.trip__details__visa__item__text}>
                            {moment(dataOrder?.arrival_date).format('DD/MM/YYYY')}
                        </div>
                    </div>
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Date of Departure:</div>
                        <div className={styles.trip__details__visa__item__text}>
                            {moment(dataOrder?.departure_date).format('DD/MM/YYYY')}
                        </div>
                    </div>
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Port of arrival:</div>
                        <div className={styles.trip__details__visa__item__text}>{dataOrder?.arrival_port}</div>
                    </div>
                    <div className={styles.trip__details__visa__order__fee__item}>
                        <div className={styles.trip__details__visa__item__title}>Nationality:</div>
                        <div className={styles.trip__details__visa__item__text}>
                            {listCountries.find((item) => item.code == dataOrder?.nationality)?.name}
                        </div>
                    </div>
                </div>
                <div className={styles.trip__details__visa__order__divider}></div>
                <div className={styles.trip__details__visa__order__visa}>
                    <div className="text-[20px] font-[700] text-[#312F2F] font-dmsans pb-2">Contact Information</div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className={styles.trip__details__visa__item__title}>
                            First name: <label className="font-[600] text-[#312f2f]">{dataOrder.first_name}</label>
                        </div>
                        <div className={styles.trip__details__visa__item__title}>
                            Last name: <label className="font-[600] text-[#312f2f]">{dataOrder.last_name}</label>
                        </div>
                        <div className={styles.trip__details__visa__item__title}>
                            Email: <label className="font-[600] text-[#312f2f]">{dataOrder.email}</label>
                        </div>
                        <div className={styles.trip__details__visa__item__title}>
                            Phone number: <label className="font-[600] text-[#312f2f]">{dataOrder.phone_number}</label>
                        </div>
                        {dataOrder?.another_people &&
                            JSON.parse(dataOrder?.another_people).map((item, index) => (
                                <div key={item.id}>
                                    <div>Traveler {index + 1}:</div>
                                    <div className={styles.trip__details__visa__item__title}>
                                        First name:{' '}
                                        <label className="font-[600] text-[#312f2f]">{item.first_name}</label>
                                    </div>
                                    <div className={styles.trip__details__visa__item__title}>
                                        Last name: <label className="font-[600] text-[#312f2f]">{item.last_name}</label>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                {loadingCalcPrice ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className={styles.trip__details__visa__order__divider}></div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className={styles.trip__details__visa__order__fee__item}>
                                <div className={styles.trip__details__visa__order__fee__name}>Applicants:</div>
                                <div className="text-[#312f2f] text-[14px] font-[600]">
                                    {dataServices?.numberPeople || 'No info'}
                                </div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__item}>
                                <div className={styles.trip__details__visa__order__fee__name}>Government fee:</div>
                                <div className="text-[#312f2f] text-[14px] font-[600]">
                                    {dataVisaDetail.visa_detail_info?.government_fee} USD
                                </div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__item}>
                                <div className={styles.trip__details__visa__order__fee__name}>Standard fee:</div>
                                <div className="text-[#312f2f] text-[14px] font-[600]">
                                    {dataCalc.hasOwnProperty('visaStandardFee')
                                        ? dataCalc.visaStandardFee
                                        : getStandardFee(dataVisaDetail.visa_detail_info?.services)}{' '}
                                    USD
                                </div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__item}>
                                <div className={styles.trip__details__visa__order__fee__name}>
                                    <div className={styles.trip__details__visa__order__fee__name__title}>
                                        Additional services:
                                    </div>
                                </div>
                                <div className="text-[#312f2f] text-[14px] font-[600]">
                                    {dataServices?.totalPriceService || 0} USD
                                </div>
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__divider}></div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__total}>
                                <div className={styles.trip__details__visa__order__fee__total__title}>Total Fee</div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__price__total}>
                                <div className={styles.trip__details__visa__order__fee__price__total__price}>
                                    {dataServices?.totalPrice} USD
                                </div>
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__price__total__desc}>
                            (For all applicants, Includes Government fee, Service fee and Tax)
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
export default Checkout;
