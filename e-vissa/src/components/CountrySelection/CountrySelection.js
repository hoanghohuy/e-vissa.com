'use client';
import { customTextField, customTextFieldMobile } from '@/components/Page/CustomMUI/customMUI';
import styles from './CountrySelection.module.css';
import { useState } from 'react';
import APIClient from '@/libs/APIClient';
import { isEmptyObject } from '@/utils/validation';
import listCountries from '@/dbx/e-vissa/seeders/data/country_data.json';
import ButtonApply from '../Page/ButtonApply/ButtonApply';
import { FromCountry } from './FromCountry';
import { ToCountry } from './ToCountry';

export const CountrySelection = ({ page = 'index', isMobile = false }) => {
    const [countryAlias, setCountryAlias] = useState();
    const [dataCountryTo, setDataCountryTo] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [inputToRef, setInputToRef] = useState();
    const [inputFromRef, setInputFromRef] = useState();
    let colorButton = '';

    switch (page) {
        case 'application':
            colorButton = '#58BD7D';
            break;
        default:
            colorButton = '';
            break;
    }

    async function onChangeFrom(event, newInputValue) {
        if (newInputValue?.code) {
            setCountryAlias(newInputValue.name);
            setFrom(newInputValue.code);
            try {
                const api = new APIClient();
                const visaCountries = await api.post(`api/xref_visa_country/${newInputValue.code}`);
                const dataCountryTo = filterVisaCountries(visaCountries);
                setDataCountryTo(dataCountryTo);
                inputToRef.focus();
            } catch (error) {
                alert('Something went wrong');
            }
        } else {
            // Click to X
            setDataCountryTo([]);
            setFrom('');
            setCountryAlias(undefined);
        }
    }

    const handleOnClickButton = () => {
        if (!from || from === '') {
            inputFromRef.focus();
            return;
        }
        if (!to || to === '') {
            inputToRef.focus();
            return;
        }

        window.location.assign(`/visa/${to}?from=${from}`);
    };

    function filterVisaCountries(visaCountries) {
        let result = [];
        if (!isEmptyObject(visaCountries)) {
            visaCountries.map((item) => {
                const match = listCountries.find((item2) => item2.code == item.country);
                if (match) {
                    result.push(match);
                }
            });
        }
        result.sort((a, b) => a.name.localeCompare(b.name));
        return result;
    }

    return (
        <>
            <div className={styles[`${page}__input__left__container`]}>
                <div className={styles[`${page}__input__left__item`]}>
                    <div className={`${styles[`${page}__input__left__item__label`]} dark:text-white`}>
                        Where am I from?
                    </div>
                    <FromCountry
                        customTextField={isMobile ? customTextFieldMobile : customTextField}
                        listCountries={listCountries}
                        from={from}
                        countryAlias={countryAlias}
                        onChangeFrom={onChangeFrom}
                        setInputFromRef={setInputFromRef}
                        page={page}
                    />
                </div>
                <div className={styles[`${page}__input__left__item`]}>
                    <div className={`${styles[`${page}__input__left__item__label`]} dark:text-white`}>
                        Where am I going?
                    </div>
                    <ToCountry
                        customTextField={isMobile ? customTextFieldMobile : customTextField}
                        dataCountryTo={dataCountryTo}
                        setTo={setTo}
                        setInputToRef={setInputToRef}
                        page={page}
                    />
                </div>
            </div>
            <div className={styles[`${page}__input__left__button`]}>
                <button
                    onClick={handleOnClickButton}
                    className="float-right h-12 px-6 bg-primary rounded-full text-white font-dmsans font-[500] transition-all duration-300 sm:w-full hover:bg-[#2955bf]"
                >
                    Get started now
                </button>
            </div>
        </>
    );
};
