'use client';
import { CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './Method.module.css';
import { useEffect, useState } from 'react';
import ButtonApply from '../../Page/ButtonApply/ButtonApply';
import moment from 'moment';
import { checkValidityType } from '@/utils/validation';
import { upperFirstLetter } from '../../../utils/validation';
import { getStandardFee } from '@/components/apply-visa/functions';

const Method = ({ complete, dataStep, dataServices, token, dataOrderID, dataVisaDetail }) => {
    const pathName = usePathname();
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingCalcPrice, setLoadingCalcPrice] = useState(false);
    const [listMethod, setListMethod] = useState([
        { id: 1, name: 'Paypal', desc: 'You will be directed to the payment page of Paypal for continuing the deal.' },
    ]);
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

    const handleSubmit = async () => {
        setLoadingButton(true);
        try {
            complete();
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getDataOrder();
    }, []);

    return (
        <>
            <div className={styles.visa__services__info}>
                <div className={styles.visa__services__time__fee}>
                    <div className={styles.visa__services__time__fee__header}>
                        <div className={styles.visa__services__time__fee__title}>Check out</div>
                    </div>
                    <div className={styles.visa__services__time__fee__list}>
                        <FormControl className={styles.visa__services__time__fee__list__form__control}>
                            <RadioGroup defaultValue={1} style={{ gap: '24px' }}>
                                {listMethod &&
                                    listMethod.length > 0 &&
                                    listMethod.map((item) => (
                                        <FormControlLabel
                                            className={`${styles.visa__services__time__fee__list__control} ${styles.selected}`}
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    width: '100%',
                                                },
                                            }}
                                            value={item.id}
                                            name={item.value}
                                            control={
                                                <Radio
                                                    sx={{
                                                        '&.MuiButtonBase-root': {
                                                            padding: '0',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={
                                                <>
                                                    <div className="flex justify-between">
                                                        <div className={styles.visa__services__time__fee__list__title}>
                                                            {item.name}
                                                        </div>
                                                        <img
                                                            className="w-[60px] h-4"
                                                            src="/payment_method/paypal.png"
                                                            alt="paypal"
                                                        />
                                                    </div>
                                                    <div className={styles.visa__services__time__fee__list__desc}>
                                                        {item.desc}
                                                    </div>
                                                </>
                                            }
                                        />
                                    ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <div className={`${styles.trip__details__submit} ${styles.large}`}>
                    <div className={styles.trip__details__submit__button}>
                        {loadingButton ? (
                            <CircularProgress />
                        ) : (
                            <button onClick={handleSubmit} className={'button__booking__primary'}>
                                Save & Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.visa__services__visa}>
                {loadingCalcPrice ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className={styles.trip__details__visa__order__title}>
                            <div className="text-[20px] font-[700] text-[#312F2F]">Order Summary</div>
                        </div>
                        <div className="text-[14px]">
                            Your e-visa is valid from{' '}
                            <label className="underline font-[600]">
                                {moment(dataOrder?.arrival_date).format('LL')}
                            </label>{' '}
                            to{' '}
                            <label className="underline font-[600]">
                                {moment(dataOrder?.arrival_date)
                                    .add(
                                        parseInt(dataOrder?.xref_visa_country_info?.visa_detail_info?.validity),
                                        'days',
                                    )
                                    .format('LL')}
                            </label>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__item__title}>Number of entries</div>

                            <div className={styles.trip__details__visa__item__text}>
                                {upperFirstLetter(dataOrder?.xref_visa_country_info?.visa_detail_info?.entry_type) +
                                    ' entry'}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__item__title}>Visa Duration</div>

                            <div className={styles.trip__details__visa__item__text}>
                                {dataOrder?.xref_visa_country_info?.visa_detail_info?.validity}{' '}
                                {checkValidityType(dataOrder?.xref_visa_country_info?.visa_detail_info?.validity_type)}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__item__title}>Your stay cannot exceed</div>
                            <div className={styles.trip__details__visa__item__text}>
                                {dataOrder?.xref_visa_country_info?.visa_detail_info?.length_of_stay}{' '}
                                {checkValidityType(
                                    dataOrder?.xref_visa_country_info?.visa_detail_info?.length_of_stay_type,
                                )}
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__divider}></div>
                        <div className={styles.trip__details__visa__order__title}>
                            <div className="text-[20px] font-[700] text-[#312F2F]">Order Summary</div>
                        </div>

                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Applicants:</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataServices?.numberPeople || 'No info'}
                            </div>
                        </div>

                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Government fee</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataCalc.hasOwnProperty('visaGovernmentFee')
                                    ? dataCalc.visaGovernmentFee
                                    : dataVisaDetail.visa_detail_info?.government_fee}{' '}
                                USD
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>Standard fee</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataCalc.hasOwnProperty('visaStandardFee')
                                    ? dataCalc.visaStandardFee
                                    : getStandardFee(dataVisaDetail.visa_detail_info?.services)}{' '}
                                USD
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>
                                <div className={styles.trip__details__visa__order__fee__name__title}>
                                    Processing speed
                                </div>
                                {/* <div className={styles.trip__details__visa__order__fee__name__desc}>
                                    Expedited Service
                                </div> */}
                            </div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataServices?.totalPriceService || 0} USD
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
            <div className={`${styles.trip__details__submit} ${styles.small}`}>
                <div className={styles.trip__details__submit__button}>
                    {loadingButton ? (
                        <CircularProgress />
                    ) : (
                        <button onClick={handleSubmit} className={'button__booking__primary'}>
                            Save & Continue
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
export default Method;
