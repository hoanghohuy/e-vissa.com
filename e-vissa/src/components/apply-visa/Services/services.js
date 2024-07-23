'use client';
import { Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import { redirect, usePathname, useRouter } from 'next/navigation';
import styles from './Services.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { getServices } from '../api/ServiceAPI';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import ButtonApply from '../../Page/ButtonApply/ButtonApply';
import { settingsData } from '../../../../settings';
import Swal from 'sweetalert2';

const Services = ({
    complete,
    token,
    writeData,
    dataStep,
    dataOrder,
    writeDataOder,
    writeDataServices,
    dataVisaDetail,
}) => {
    const pathName = usePathname();
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingCalcPrice, setLoadingCalcPrice] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const [totalProcessing, setTotalProcessing] = useState(0);
    const [totalAdditionServices, setTotalAdditionServices] = useState(0);
    const [processing_time_service, setProcessing_time_service] = useState();
    const [disabledButton, setDisabledButton] = useState(true);
    const [additional_service, setAdditional_service] = useState([]);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [, , country, currentStep] = pathName.split('/');
    const [dataTravelPlus, setDataTravelPlus] = useState([]);
    const [labelService, setLabelService] = useState('STANDARD SERVICE');
    const [swiftPass, setSwiftPass] = useState([]);
    const [dataCalc, setDataCalc] = useState({});
    const [listServices, setListServices] = useState(
        dataVisaDetail.visa_detail_info.services ? JSON.parse(dataVisaDetail.visa_detail_info.services) : [],
    );
    const [selectedService, setSelectedService] = useState(
        dataVisaDetail.visa_detail_info.services && dataVisaDetail.visa_detail_info.services.length > 0
            ? JSON.parse(dataVisaDetail.visa_detail_info.services)[0]
            : {},
    );
    if (listServices.length == 0) {
        window.location.assign('/thankyou');
    }
    // const [dataOrder, setDataOrder] = useState({});
    const router = useRouter();
    const timeout = useRef();

    const getAllServices = async () => {
        try {
            const servicesData = await getServices();
            if (servicesData.data) {
                const services = servicesData.data;
                setSwiftPass(services.filter((service) => service.type === 'SwiftPass'));
                setDataTravelPlus(services.filter((service) => service.type === 'TravelPlus'));
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingServices(false);
        }
    };

    const handleChangeCheckBox = (event) => {
        if (event.target.checked) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
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

    const handleChangeProcessingTimeService = (e) => {
        setLabelService(e.target.name);
        setSelectedService(parseInt(e.target.value));
        const data = {
            order_id: dataOrder.id,
            visa_service: parseInt(e.target.value),
        };
        writeData({ additional_service, processing_time_service: parseInt(e.target.value) });
        calculatePrice(data);
    };

    const calculatePrice = async (data) => {
        // if (!data.order_id) {
        //     ToastNotify('Something went wrong.');
        //     window.location.assign('/');
        // }
        clearTimeout(timeout.current);
        setLoadingCalcPrice(true);
        timeout.current = setTimeout(async () => {
            try {
                const calc = await fetch(`/api/orders`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token || localStorage.getItem('guest_token'),
                    },
                    body: JSON.stringify(data),
                });
                const calcData = await calc.json();
                setDataCalc(calcData);
                writeDataServices(calcData);
            } catch (error) {
                throw error;
            } finally {
                setLoadingCalcPrice(false);
            }
        }, 500);
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
        }
    }, [status]);

    useEffect(() => {
        let servicesSaved = [];
        if (dataStep?.processing_time_service) {
            setProcessing_time_service(dataStep?.processing_time_service);
            servicesSaved.push(dataStep?.processing_time_service);
        }
        if (dataStep.additional_service) {
            setAdditional_service(dataStep?.additional_service);
            servicesSaved = servicesSaved.concat(dataStep?.additional_service);
        }
        const data = {
            order_id: dataOrder.id,
            service_ids: selectedService.id,
        };
        calculatePrice(data);
    }, []);

    return (
        <>
            <div className={styles.visa__services__info}>
                <div className={styles.visa__services__time__fee}>
                    <div className={styles.visa__services__time__fee__header}>
                        <div className={styles.visa__services__time__fee__title}>Estimated processing time and fee</div>
                        <div className={styles.visa__services__time__fee__desc}>
                            Elevate your travel experience with E-vissa.com's premium services ensuring seamless entry
                            to your destination and added trip protection.
                        </div>
                    </div>
                    <div className={styles.visa__services__time__fee__list}>
                        <FormControl className={styles.visa__services__time__fee__list__form__control}>
                            <RadioGroup
                                defaultValue={selectedService.id}
                                style={{ gap: '24px' }}
                                onChange={handleChangeProcessingTimeService}
                            >
                                {listServices && listServices.length > 0
                                    ? listServices.map((service) => (
                                          <FormControlLabel
                                              className={`${styles.visa__services__time__fee__list__control} ${
                                                  selectedService.id == service.id ? styles.selected : ''
                                              }`}
                                              value={service.id}
                                              name={service.label}
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
                                                      <div className={styles.visa__services__time__fee__list__title}>
                                                          {service.label}
                                                      </div>
                                                      <div className={styles.visa__services__time__fee__list__desc}>
                                                          {service.processing_times} working{' '}
                                                          {service.type == 'h' ? 'hours' : 'days'}
                                                      </div>
                                                      <div className={styles.visa__services__time__fee__list__price}>
                                                          USD ${service.fee}
                                                      </div>
                                                  </>
                                              }
                                          />
                                      ))
                                    : 'No services'}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                {dataTravelPlus && dataTravelPlus.length > 0 && (
                    <div className={styles.visa__services__additional}>
                        <div className={styles.visa__services__additional__header}>
                            <div className={styles.visa__services__additional__title}>
                                <div className={styles.visa__services__additional__title__title}>
                                    Additional Services
                                </div>
                                <div className={styles.visa__services__additional__optional}>Optional</div>
                            </div>
                            <div className={styles.visa__services__additional__desc}>
                                Ensure smooth entry to your destination and travel with confidence using our additional
                                services.
                            </div>
                        </div>
                        <div className={styles.visa__services__additional__list}>
                            <FormGroup className={styles.visa__services__additional__form__group}>
                                {loadingServices ? (
                                    <CircularProgress />
                                ) : (
                                    dataTravelPlus.map((travelPlus) => (
                                        <FormControlLabel
                                            className={styles.visa__services__additional__item}
                                            name={travelPlus.id}
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        '&.MuiButtonBase-root': {
                                                            padding: '0',
                                                        },
                                                    }}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            const current = [...additional_service];
                                                            const check = current.includes(parseInt(e.target.name));
                                                            if (!check) {
                                                                setAdditional_service([
                                                                    ...additional_service,
                                                                    parseInt(e.target.name),
                                                                ]);
                                                                let listService = [
                                                                    ...additional_service,
                                                                    parseInt(e.target.name),
                                                                ];
                                                                if (processing_time_service) {
                                                                    listService.push(processing_time_service);
                                                                }
                                                                const data = {
                                                                    order_id: dataOrder.id,
                                                                    service_ids: listService,
                                                                };
                                                                writeData({
                                                                    additional_service: [
                                                                        ...additional_service,
                                                                        parseInt(e.target.name),
                                                                    ],
                                                                    processing_time_service,
                                                                });
                                                                calculatePrice(data);
                                                            }
                                                        }
                                                        if (!e.target.checked) {
                                                            const current = [...additional_service];
                                                            const newCurrent = current.filter(
                                                                (item) => item !== parseInt(e.target.name),
                                                            );
                                                            setAdditional_service([...newCurrent]);
                                                            let listService = [...newCurrent];
                                                            if (processing_time_service) {
                                                                listService.push(processing_time_service);
                                                            }
                                                            const data = {
                                                                order_id: dataOrder.id,
                                                                service_ids: listService,
                                                            };
                                                            writeData({
                                                                additional_service: [...newCurrent],
                                                                processing_time_service,
                                                            });

                                                            calculatePrice(data);
                                                        }
                                                    }}
                                                    defaultChecked={additional_service.includes(travelPlus.id)}
                                                />
                                            }
                                            label={
                                                <>
                                                    <div className={styles.visa__services__time__fee__list__title}>
                                                        {travelPlus.name}
                                                    </div>
                                                    <div className={styles.visa__services__time__fee__list__desc}>
                                                        {travelPlus.desc}
                                                    </div>
                                                    <div className={styles.visa__services__time__fee__list__price}>
                                                        USD ${travelPlus.value}
                                                        {travelPlus.value_on === 'person' && '/person'}
                                                    </div>
                                                </>
                                            }
                                        />
                                    ))
                                )}
                            </FormGroup>
                        </div>
                    </div>
                )}
                <div className="flex pt-2">
                    <FormGroup
                        sx={{
                            '& .MuiFormControlLabel-root': {
                                marginRight: 0,
                            },
                        }}
                    >
                        <FormControlLabel
                            sx={{
                                '& .MuiTypography-root': {
                                    fontFamily: 'DM Sans',
                                    fontSize: '14px',
                                },
                            }}
                            control={
                                <Checkbox
                                    sx={{
                                        '&.MuiCheckbox-root': {
                                            paddingTop: '2px',
                                        },
                                    }}
                                    onChange={handleChangeCheckBox}
                                />
                            }
                        />
                    </FormGroup>

                    <div className="text-[14px]">
                        I have read and accepted the provisions of the Evisa system including{' '}
                        <a className="underline" href="/privacy-policy" target="_blank">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a className="underline" href="/terms-and-conditions" target="_blank">
                            Terms and Conditions
                        </a>{' '}
                        of this website.
                    </div>
                </div>
                <div className={`${styles.trip__details__submit} ${styles.large}`}>
                    <div className={styles.trip__details__submit__policy}>
                        <div className={styles.trip__details__submit__policy__icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    d="M25.1733 8.17758C25.1446 7.54619 25.1446 6.9435 25.1446 6.34081C25.1446 5.85291 24.7715 5.47982 24.2837 5.47982C20.6962 5.47982 17.9698 4.44664 15.7025 2.23677C15.3581 1.92108 14.8415 1.92108 14.4971 2.23677C12.2298 4.44664 9.50339 5.47982 5.91594 5.47982C5.42805 5.47982 5.05496 5.85291 5.05496 6.34081C5.05496 6.9435 5.05496 7.54619 5.02626 8.17758C4.91146 14.2045 4.73926 22.47 14.8128 25.9426L15.0998 26L15.3868 25.9426C25.4316 22.47 25.2881 14.2332 25.1733 8.17758ZM14.411 16.5291C14.2388 16.6726 14.0379 16.7587 13.8083 16.7587H13.7796C13.55 16.7587 13.3204 16.6439 13.1769 16.4717L10.5079 13.5157L11.7994 12.3677L13.8944 14.6924L18.5437 10.2726L19.7204 11.5354L14.411 16.5291Z"
                                    fill="#3772FF"
                                />
                            </svg>
                        </div>
                        <div className={styles.trip__details__submit__policy__text}>
                            <div className={styles.trip__details__submit__policy__title}>
                                Your info is safe with us!
                            </div>
                            <div className={styles.trip__details__submit__policy__desc}>
                                For more details see the E-vissa Data Security Promise
                            </div>
                        </div>
                    </div>
                    <div className={styles.trip__details__submit__button}>
                        {loadingButton ? (
                            <CircularProgress />
                        ) : !disabledButton ? (
                            <button onClick={handleSubmit} className={'button__booking__primary'}>
                                Save & Continue
                            </button>
                        ) : (
                            <button disabled className={'button__booking__primary disabled:'}>
                                Save & Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.visa__services__visa}>
                <div className={styles.trip__details__visa__order__title}>Order Summary</div>
                <div className={styles.trip__details__visa__order__visa}>
                    {listCountries?.find((item) => item.code == country)?.name.split('-')[0]} evisa - 30 days, Multiple
                    Entry
                    <div className={styles.trip__details__visa__order__visa__applicants}>
                        {dataCalc.hasOwnProperty('numberPeople') && dataCalc.numberPeople} applicants
                    </div>
                </div>
                {loadingCalcPrice ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className={styles.trip__details__visa__order__divider}></div>
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
                            <div className={styles.trip__details__visa__order__fee__name}>standard fee</div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataCalc.hasOwnProperty('visaStandardFee')
                                    ? dataCalc.visaStandardFee
                                    : dataOrder?.xref_visa_country_info?.visa_detail_info?.standard_fee}{' '}
                                USD
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__name}>
                                <div className={styles.trip__details__visa__order__fee__name__title}>
                                    Processing speed
                                </div>
                                <div className={styles.trip__details__visa__order__fee__name__desc}>{labelService}</div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__price}>
                                {dataCalc.hasOwnProperty('totalPriceService')
                                    ? dataCalc.totalPriceService
                                    : totalProcessing && totalProcessing}{' '}
                                USD
                            </div>
                        </div>
                        <div className={styles.trip__details__visa__order__divider}></div>
                        <div className={styles.trip__details__visa__order__fee__item}>
                            <div className={styles.trip__details__visa__order__fee__total}>
                                <div className={styles.trip__details__visa__order__fee__total__title}>Total Fee</div>
                            </div>
                            <div className={styles.trip__details__visa__order__fee__price__total}>
                                <div className={styles.trip__details__visa__order__fee__price__total__price}>
                                    {dataCalc.hasOwnProperty('totalPrice')
                                        ? dataCalc.totalPrice
                                        : dataOrder?.xref_visa_country_info?.visa_detail_info?.standard_fee +
                                          dataOrder?.xref_visa_country_info?.visa_detail_info?.government_fee}{' '}
                                    USD
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
                <div className={styles.trip__details__submit__policy}>
                    <div className={styles.trip__details__submit__policy__icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path
                                d="M25.1733 8.17758C25.1446 7.54619 25.1446 6.9435 25.1446 6.34081C25.1446 5.85291 24.7715 5.47982 24.2837 5.47982C20.6962 5.47982 17.9698 4.44664 15.7025 2.23677C15.3581 1.92108 14.8415 1.92108 14.4971 2.23677C12.2298 4.44664 9.50339 5.47982 5.91594 5.47982C5.42805 5.47982 5.05496 5.85291 5.05496 6.34081C5.05496 6.9435 5.05496 7.54619 5.02626 8.17758C4.91146 14.2045 4.73926 22.47 14.8128 25.9426L15.0998 26L15.3868 25.9426C25.4316 22.47 25.2881 14.2332 25.1733 8.17758ZM14.411 16.5291C14.2388 16.6726 14.0379 16.7587 13.8083 16.7587H13.7796C13.55 16.7587 13.3204 16.6439 13.1769 16.4717L10.5079 13.5157L11.7994 12.3677L13.8944 14.6924L18.5437 10.2726L19.7204 11.5354L14.411 16.5291Z"
                                fill="#3772FF"
                            />
                        </svg>
                    </div>
                    <div className={styles.trip__details__submit__policy__text}>
                        <div className={styles.trip__details__submit__policy__title}>Your info is safe with us!</div>
                        <div className={styles.trip__details__submit__policy__desc}>
                            For more details see the E-vissa Data Security Promise
                        </div>
                    </div>
                </div>
                <div className={styles.trip__details__submit__button}>
                    {loadingButton ? (
                        <CircularProgress />
                    ) : (
                        <button onClick={handleSubmit} className={`button__booking__primary sm:w-full`}>
                            Save & Continue
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
export default Services;
