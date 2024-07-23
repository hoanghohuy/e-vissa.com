'use client';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import stylesSystem from '@/app/page.module.css';
import styles from '@/app/visa/[country]/page.module.css';
import visa_banner from '/public/page/banner_choose_visa.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import tourist from '/public/page/visa_select/tourist.png';
import relatives_friends from '/public/page/visa_select/relatives_friends.png';
import business_trip from '/public/page/visa_select/business_trip.png';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { ToastContainer, toast } from 'react-toastify';
import { customSelectPages, customTextField } from '../../../components/Page/CustomMUI/customMUI';
import { checkValidityType } from '@/utils/validation';
import { settingsData } from '/settings';
import VisaSkeleton from '../../../components/Page/Skeleton/VisaSkeleton/VisaSkeleton';
import { upperFirstLetter } from '../../../utils/validation';
import { FormControl, MenuItem, Select } from '@mui/material';

export default function VisaPage() {
    const searchParams = useSearchParams();
    const fromStr = searchParams.get('from');
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingAllowedVisa, setLoadingAllowedVisa] = useState(true);
    const [fromCountry, setFromCountry] = useState('');
    const [from, setFrom] = useState('');
    const [fromObj, setFromObj] = useState({});
    const [to, setTo] = useState();
    const [toObj, setToObj] = useState({});
    const [listAllowedVisa, setListAllowedVisa] = useState([]);
    const [dataCountryTo, setDataCountryTo] = useState(listCountries);
    const [defaultTo, setDefaultTo] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    // const [listCountries, setlistCountries] = useState([]);
    const [inputToRef, setInputToRef] = useState();
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const pathName = usePathname();
    const [, , slug] = pathName.split('/');
    const [selectedEntryType, setSelectedEntryType] = useState({});
    const [selectedLengthOfStay, setSelectedLengthOfStay] = useState({});
    const [dataVisaSelect, setDataVisaSelect] = useState([]);

    const handleChangeEntryType = (value, visaType) => {
        let copyselectedEntryType = Object.assign({}, selectedEntryType);
        copyselectedEntryType[visaType] = value;
        setSelectedEntryType(copyselectedEntryType);
    };

    const handleChangeLengthOfStay = (value, visaType) => {
        let copyselectedLengthOfStay = Object.assign({}, selectedLengthOfStay);
        copyselectedLengthOfStay[visaType] = value;
        setSelectedLengthOfStay(copyselectedLengthOfStay);
    };

    const handleDataForSelect = (data) => {
        let dataVisaSelect = []; // new list visa
        let dataSelectedEntryType = {}; // khai bao data mac dinh cua EntryType
        let dataSelectedLengthOfStay = {};
        const listVisaTypes = [...new Set(data.map((item) => item.visa_detail_info.visa_info.name))]; // find list type Visa
        listVisaTypes.map((visaType) => {
            // duyet tung loai visa
            let dataForType = {}; // tao object rong de push item vao list visa dataVisaSelect
            dataForType.name = visaType; // them ten cua visa vao Object
            const listVisaHasType = data.filter((item) => item.visa_detail_info.visa_info.name == visaType); // tim danh sach visa thuoc loai visa visaType dang duyet
            const listEntry = [...new Set(listVisaHasType.map((item) => item.visa_detail_info.entry_type))]; // tim danh sach entry type
            dataForType.listEntry = listEntry; // them list entry type vao Object
            dataSelectedEntryType[visaType] = listEntry[0]; // chon phan tu dau tien lam mac dich select option
            const lengthOfStay = [
                // tim cap danh sach length_of_stay va validity
                ...new Set(
                    listVisaHasType.map((item) => {
                        return `${item.visa_detail_info.length_of_stay}-${item.visa_detail_info.validity}-${item.visa_detail_info.validity_type}`;
                    }),
                ),
            ];
            dataSelectedLengthOfStay[visaType] = lengthOfStay[0]; // chon phan tu dau tien lengthOfStay lam mac dich select option
            dataForType.lengthOfStay = lengthOfStay; // them list cap danh sach length_of_stay va validity vao Object
            dataVisaSelect.push(dataForType); // push object vao new list visa
        });
        setSelectedEntryType(dataSelectedEntryType); // set data mac dinh entry type
        setSelectedLengthOfStay(dataSelectedLengthOfStay); // set data mac dinh LengthOfStay
        setDataVisaSelect(dataVisaSelect);
    };

    const renderOptionValidityLengthOfStay = (value) => {
        const [length_of_stay, validity, validity_type] = value.split('-');
        return `${length_of_stay} days - Validity ${validity} ${checkValidityType(validity_type)}`;
    };

    async function getAllowedVisa(from, to) {
        setLoadingAllowedVisa(true);
        try {
            setFromCountry(from);
            const resp = await fetch(`/api/xref_visa_country/${to}?from=${from}`);
            const dataJson = await resp.json();
            setListAllowedVisa(dataJson);
            handleDataForSelect(dataJson);
        } catch (error) {
            throw error;
        } finally {
            setLoadingAllowedVisa(false);
        }
    }

    const calcStandardFeeVisaSelected = (visaType) => {
        if (listAllowedVisa && listAllowedVisa.length > 0) {
            const [length_of_stay, validity, validity_type] = selectedLengthOfStay[visaType].split('-');
            const visaSelected = listAllowedVisa.find(
                (item) =>
                    item.visa_detail_info?.visa_info.name == visaType && // check visa type
                    item.visa_detail_info?.entry_type == selectedEntryType[visaType] && // check entry type
                    item.visa_detail_info?.length_of_stay == length_of_stay && // check length of stay
                    item.visa_detail_info?.validity == validity, // check length of stay
            );
            if (visaSelected) {
                if (visaSelected.visa_detail_info.services) {
                    const services = JSON.parse(visaSelected.visa_detail_info.services); // JSON to Array
                    const standardSevice = services.find((item) => item.published == -1); // get default service
                    if (standardSevice) {
                        return visaSelected.visa_detail_info.government_fee + parseInt(standardSevice.fee); // get fee on service
                    } else {
                        return visaSelected.visa_detail_info.government_fee;
                    }
                } else {
                    return visaSelected.visa_detail_info.government_fee;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    const getValidity = (visaType) => {
        const [length_of_stay, validity, validity_type] = selectedLengthOfStay[visaType].split('-');
        const visaSelected =
            listAllowedVisa.length > 0 &&
            listAllowedVisa.find(
                (item) =>
                    item.visa_detail_info?.visa_info.name == visaType && // check visa type
                    item.visa_detail_info?.length_of_stay == length_of_stay && // check length of stay
                    item.visa_detail_info?.validity == validity, // check length of stay
            );
        if (visaSelected) {
            const validity_type =
                visaSelected.visa_detail_info?.validity_type == 'd'
                    ? 'days'
                    : visaSelected.visa_detail_info?.validity_type == 'm'
                    ? 'months'
                    : 'years';
            return `${visaSelected.visa_detail_info.validity} ${validity_type}`;
        } else {
            return null;
        }
    };

    const getLengOfStay = (visaType) => {
        const [length_of_stay, validity, validity_type] = selectedLengthOfStay[visaType].split('-');
        const visaSelected =
            listAllowedVisa.length > 0 &&
            listAllowedVisa.find(
                (item) =>
                    item.visa_detail_info?.visa_info.name == visaType && // check visa type
                    item.visa_detail_info?.length_of_stay == length_of_stay && // check length of stay
                    item.visa_detail_info?.validity == validity, // check length of stay
            );
        if (visaSelected) {
            return `${visaSelected.visa_detail_info.length_of_stay}`;
        } else {
            return null;
        }
    };

    function getDataLocal(fromStr) {
        const toObject = listCountries.find((item) => item.code === slug);
        if (toObject) {
            setToObj(toObject);
        } else {
            redirect('/');
        }
        const fromObject = listCountries.find((item) => item.code === fromStr);
        if (fromObject) {
            setFromObj(fromObject);
        }
    }

    async function onChangeFrom(event, newInputValue) {
        if (newInputValue) {
            setFrom(newInputValue.code);
            try {
                inputToRef.focus();
                setLoadingData(true);
                const data = await fetch(`/api/xref_visa_country/${newInputValue.code}`, {
                    method: 'POST',
                });
                if (data.status == 200) {
                    const dataJson = await data.json();
                    let filteredArray = [];
                    dataJson.map((item) => {
                        const temp = listCountries.find((item2) => item2.code == item.country);
                        if (temp) {
                            filteredArray.push(temp);
                        }
                    });
                    setDataCountryTo(filteredArray);
                }
            } catch (error) {
                throw error;
            } finally {
                setLoadingData(false);
            }
        } else {
            setFrom('');
            setDefaultTo(false);
            setDataCountryTo(listCountries);
        }
    }

    const handleApplyNow = async (visaType) => {
        setLoadingButton(true);
        const [length_of_stay, validity, validity_type] = selectedLengthOfStay[visaType].split('-');
        const visaSelected =
            listAllowedVisa.length > 0 &&
            listAllowedVisa.find(
                (item) =>
                    item.visa_detail_info?.visa_info.name == visaType && // check visa type
                    item.visa_detail_info?.entry_type == selectedEntryType[visaType] && // check entry type
                    item.visa_detail_info?.length_of_stay == length_of_stay && // check length of stay
                    item.visa_detail_info?.validity == validity, // check length of stay
            );
        const visaID = visaSelected.id;
        if (visaID) {
            // router.push(`/visa-apply/${slug}/step-1?from=${fromCountry}&visa=${visaID}`);
            window.location.assign(`/apply-visa/${slug}?from=${fromCountry}&visa=${visaID}`);
        }
        // router.push(`/visa-apply/${slug}/step-1?from=${fromCountry}&visa=${visaID}`);
        window.location.assign(`/apply-visa/${slug}?from=${fromCountry}&visa=${visaID}`);
    };

    useEffect(() => {
        if (session && session.accessToken) setAccessToken(session.accessToken);
    }, [status]);

    useEffect(() => {
        getDataLocal(fromStr);
        // getAllCountry();
        getAllowedVisa(fromStr, slug);
        setFrom(fromStr);
        setTo(slug);
    }, []);

    const handleOnCheckDocument = () => {
        if (!from) {
            toast.error('Please select your country', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        if (!to) {
            toast.error('Where are you going?', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        window.location.assign(`/visa/${to}?from=${from}`);
    };

    return (
        <>
            <div className={stylesSystem.page}>
                <div className={styles.visa__banner__container}>
                    <Image src={visa_banner} className={styles.visa__banner__image} alt="visa banner" />
                    <div className={styles.visa__banner__container__text}>
                        <h1 className={styles.visa__banner__title}>
                            {toObj?.name?.split('-')?.[0]} - Open for Tourism, here's what you'll need
                        </h1>
                        <div className={styles.visa__banner__desc}>21,750+ Travel Documents processed by E-Vissa</div>
                        <div className={styles.visa__banner__form}>
                            <div className={styles.visa__banner__form__item}>
                                <div className={styles.visa__banner__form__item__label}>Where am I from?</div>
                                <Autocomplete
                                    sx={customTextField}
                                    popupIcon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                                                fill="#23262F"
                                            />
                                        </svg>
                                    }
                                    className={styles.page__input__left__input}
                                    key={'from'}
                                    id="from"
                                    options={listCountries}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={() => {
                                        if (fromStr) {
                                            const from = listCountries.find((item) => item.code === fromStr);
                                            if (from) {
                                                return from;
                                            }
                                        }
                                    }}
                                    renderOption={(props, option) => (
                                        <Box
                                            {...props}
                                            key={option.code}
                                            component="li"
                                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        >
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`/flags/png100px/${option.code.toLowerCase()}.png`}
                                                srcSet={`/flags/png100px/${option.code.toLowerCase()}.png 2x`}
                                                alt={option.code}
                                            />
                                            {option.label}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Where am I From?"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'off',
                                            }}
                                        />
                                    )}
                                    onChange={onChangeFrom}
                                />
                            </div>
                            <div className={styles.visa__banner__form__item}>
                                <div className={styles.visa__banner__form__item__label}>Where am I going?</div>
                                <Autocomplete
                                    sx={customTextField}
                                    popupIcon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z"
                                                fill="#23262F"
                                            />
                                        </svg>
                                    }
                                    openOnFocus
                                    className={styles.page__input__left__input}
                                    key={'to'}
                                    id="to"
                                    options={dataCountryTo}
                                    autoHighlight
                                    loading={loadingData}
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={() => {
                                        if (slug) {
                                            if (defaultTo) {
                                                const countrySlug = listCountries.find((item) => item.code === slug);
                                                if (countrySlug) {
                                                    return countrySlug;
                                                }
                                            }
                                        }
                                    }}
                                    renderOption={(props, option) => (
                                        <Box
                                            {...props}
                                            key={option.code}
                                            component="li"
                                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        >
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`/flags/png100px/${option.code.toLowerCase()}.png`}
                                                srcSet={`/flags/png100px/${option.code.toLowerCase()}.png 2x`}
                                                alt={option.code}
                                            />
                                            {option.label}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            inputRef={(input) => {
                                                setInputToRef(input);
                                            }}
                                            {...params}
                                            placeholder="Where am I going?"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'off',
                                            }}
                                        />
                                    )}
                                    onChange={(event, newInputValue) => {
                                        if (newInputValue) {
                                            setTo(newInputValue.code);
                                            // handleOnCheckDocument();
                                            // getAllowedVisa(from, to);
                                        } else {
                                            setTo('');
                                        }
                                    }}
                                />
                            </div>
                            <div className={styles.visa__banner__form__item__check}>
                                <button
                                    className="button__booking__primary w-full min-w-[190px]"
                                    onClick={handleOnCheckDocument}
                                >
                                    Check Document
                                </button>
                                {/* <ButtonApply type="primary" title={'Check Document'} fullWidth minWidth={'186px'} /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.visa__page}>
                    <div className={styles.visa__page__container}>
                        {listAllowedVisa.length > 0 && (
                            <Alert
                                sx={{
                                    backgroundColor: '#FFFBE6',
                                }}
                                severity="warning"
                                className={styles.visa__page__alert}
                            >
                                <AlertTitle className={styles.visa__page__alert__header}>
                                    Visa Required For Travel
                                </AlertTitle>
                                <div className={styles.visa__page__alert__content}>
                                    You need a Visa to travel to {toObj?.name.split(' - ')?.[0]} if you have a passport
                                    from {fromObj?.name?.split(' - ')?.[0]}.
                                </div>
                            </Alert>
                        )}
                        {loadingAllowedVisa ? (
                            <VisaSkeleton />
                        ) : (
                            <div className={styles.visa__list}>
                                {dataVisaSelect.length > 0 ? (
                                    dataVisaSelect.map((item, index) => (
                                        <div className={styles.visa__item} key={item}>
                                            <div className={styles.visa__item__info}>
                                                <div className={styles.visa__item__info__main}>
                                                    <div className={styles.visa__item__info__main__header}>
                                                        <div className={styles.visa__item__info__main__logo}>
                                                            <Image
                                                                src={
                                                                    item.name == 'Tourist'
                                                                        ? tourist
                                                                        : item.name == 'Business'
                                                                        ? business_trip
                                                                        : relatives_friends
                                                                }
                                                                alt={'visa type'}
                                                            />
                                                        </div>
                                                        <div className={styles.visa__item__info__main__title}>
                                                            <div>
                                                                {item.name}
                                                                {' Evisa'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={styles.visa__item__info__main__select}>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                value={item.listEntry.find(
                                                                    (entry) => entry == selectedEntryType[item.name],
                                                                )}
                                                                onChange={(e) =>
                                                                    handleChangeEntryType(e.target.value, item.name)
                                                                }
                                                                sx={customSelectPages}
                                                                IconComponent={() => (
                                                                    <div className="min-w-6 pr-4">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="25"
                                                                            height="24"
                                                                            viewBox="0 0 25 24"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M16.8731 9.79289C16.4826 9.40237 15.8494 9.40237 15.4589 9.79289L12.666 12.5858L9.87312 9.79289C9.4826 9.40237 8.84943 9.40237 8.45891 9.79289C8.06838 10.1834 8.06838 10.8166 8.45891 11.2071L11.9589 14.7071C12.3494 15.0976 12.9826 15.0976 13.3731 14.7071L16.8731 11.2071C17.2636 10.8166 17.2636 10.1834 16.8731 9.79289Z"
                                                                                fill="#23262F"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            >
                                                                {item.listEntry && item.listEntry.length > 0
                                                                    ? item.listEntry.map((entry) => (
                                                                          <MenuItem
                                                                              sx={{ fontFamily: 'unset' }}
                                                                              value={entry}
                                                                              key={entry}
                                                                          >
                                                                              {upperFirstLetter(entry)} Entry
                                                                          </MenuItem>
                                                                      ))
                                                                    : ''}
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                    <div className={styles.visa__item__info__main__select}>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                value={selectedLengthOfStay[item.name]}
                                                                onChange={(e) =>
                                                                    handleChangeLengthOfStay(e.target.value, item.name)
                                                                }
                                                                sx={customSelectPages}
                                                                IconComponent={() => (
                                                                    <div className="min-w-6 pr-4">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="25"
                                                                            height="24"
                                                                            viewBox="0 0 25 24"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M16.8731 9.79289C16.4826 9.40237 15.8494 9.40237 15.4589 9.79289L12.666 12.5858L9.87312 9.79289C9.4826 9.40237 8.84943 9.40237 8.45891 9.79289C8.06838 10.1834 8.06838 10.8166 8.45891 11.2071L11.9589 14.7071C12.3494 15.0976 12.9826 15.0976 13.3731 14.7071L16.8731 11.2071C17.2636 10.8166 17.2636 10.1834 16.8731 9.79289Z"
                                                                                fill="#23262F"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            >
                                                                {item.lengthOfStay && item.lengthOfStay.length > 0
                                                                    ? item.lengthOfStay.map(
                                                                          (itemValiditylengthOfStay) => (
                                                                              <MenuItem
                                                                                  sx={{ fontFamily: 'unset' }}
                                                                                  value={itemValiditylengthOfStay}
                                                                              >
                                                                                  {renderOptionValidityLengthOfStay(
                                                                                      itemValiditylengthOfStay,
                                                                                  )}
                                                                              </MenuItem>
                                                                          ),
                                                                      )
                                                                    : ''}
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                    <div className={styles.visa__item__info__price}>
                                                        <div className={styles.visa__item__info__main__price__price}>
                                                            $ {calcStandardFeeVisaSelected(item.name)}
                                                        </div>
                                                        <div className={styles.visa__item__info__main__price__desc}>
                                                            *Includes Govement Fee, Standard fee.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.visa__item__info__detail}>
                                                    <div className="font-[500]">Processing details</div>
                                                    <div className={styles.visa__item__info__detail__item}>
                                                        <div className={styles.visa__item__info__detail__item__left}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="21"
                                                                viewBox="0 0 20 21"
                                                                fill="none"
                                                            >
                                                                <g clipPath="url(#clip0_150_1588)">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M10.3007 11.5835L9.47993 16.5082L14.2403 9.91681H9.69917L10.52 4.99212L5.75953 11.5835H10.3007ZM12.7486 1.75813C12.8934 0.889265 11.7668 0.419136 11.251 1.13322L3.45417 11.9289C3.05615 12.48 3.44993 13.2501 4.12974 13.2501H8.33327L7.25127 19.7422C7.10646 20.611 8.2331 21.0811 8.74883 20.3671L16.5457 9.57138C16.9437 9.02028 16.55 8.25014 15.8701 8.25014H11.6666L12.7486 1.75813Z"
                                                                        fill="#777E91"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_150_1588">
                                                                        <rect
                                                                            width="20"
                                                                            height="20"
                                                                            fill="white"
                                                                            transform="translate(0 0.75)"
                                                                        />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            Validity
                                                        </div>
                                                        <div className={styles.visa__item__info__detail__item__right}>
                                                            {getValidity(item.name)}
                                                        </div>
                                                    </div>
                                                    <div className={styles.visa__item__info__detail__item}>
                                                        <div className={styles.visa__item__info__detail__item__left}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="21"
                                                                viewBox="0 0 20 21"
                                                                fill="none"
                                                            >
                                                                <g clipPath="url(#clip0_155_1597)">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M13.334 8.25016L15.9757 5.16815C16.9024 4.08703 16.1342 2.41683 14.7103 2.41683L3.33398 2.41683L3.33398 14.0835L14.7103 14.0835C16.1342 14.0835 16.9024 12.4133 15.9757 11.3322L13.334 8.25016ZM5.00065 12.4168L14.7103 12.4168L11.1389 8.25016L14.7103 4.0835L5.00065 4.0835L5.00065 12.4168Z"
                                                                        fill="#777E91"
                                                                    />
                                                                    <path
                                                                        d="M3.33398 1.58333C3.33398 1.1231 3.70708 0.75 4.16732 0.75C4.62756 0.75 5.00065 1.1231 5.00065 1.58333L5.00065 19.9167C5.00065 20.3769 4.62756 20.75 4.16732 20.75C3.70708 20.75 3.33398 20.3769 3.33398 19.9167L3.33398 1.58333Z"
                                                                        fill="#777E91"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_155_1597">
                                                                        <rect
                                                                            width="20"
                                                                            height="20"
                                                                            fill="white"
                                                                            transform="translate(0 0.75)"
                                                                        />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            Duration of stay
                                                        </div>
                                                        <div className={styles.visa__item__info__detail__item__right}>
                                                            up to {getLengOfStay(item.name)} days
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.visa__item__button}>
                                                {loadingButton ? (
                                                    <div className="w-full text-center">
                                                        <CircularProgress thickness={5} className="text-primary" />
                                                    </div>
                                                ) : (
                                                    <button
                                                        disabled={calcStandardFeeVisaSelected(item.name) ? false : true}
                                                        id={item.id}
                                                        onClick={() => handleApplyNow(item.name)}
                                                        className={'button__booking__primary w-full'}
                                                    >
                                                        Apply now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.empty__visa}>
                                        {/* empty__visa */}
                                        <h3>Please contact us to get more information.</h3>
                                        <a href={`tel:${settingsData.siteContactPhone}`}>
                                            Phone: {settingsData.siteContactPhone}
                                        </a>
                                        <a href={`mailto:${settingsData.siteContactEmail}`}>
                                            Email: {settingsData.siteContactEmail}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
