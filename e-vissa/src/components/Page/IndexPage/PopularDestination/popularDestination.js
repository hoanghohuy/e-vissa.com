'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/page.module.css';
import stylesPage from './css/popularDestination.module.css';
import { Link } from '@mui/material';
import { dataPopularDestination, settingsSlider } from './data';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import ButtonApply from '../../ButtonApply/ButtonApply';
import { settingsData } from '/settings';
import Slider from 'react-slick';
import APIClient from '@/libs/APIClient';

export default function PopularDestinationPage() {
    const [dataDestination, setDataDestination] = useState([]);
    const [currentListDestination, setCurrentListDestination] = useState([]);

    const getAvailableDestinations = async () => {
        try {
            const api = new APIClient();
            const visaCountries = await api.get(`api/visa_country_detail`);
            if (visaCountries && visaCountries.length > 0) {
                setDataDestination(visaCountries);
                setCurrentListDestination(visaCountries.slice(0, 15));
            }
        } catch (error) {}
    };

    useEffect(() => {
        getAvailableDestinations();
    }, []);

    const onSearchDestinations = (e) => {
        let dataOrigin = dataDestination;
        const valueSearch = e.target.value;
        const dataFilter = dataDestination.filter((item) =>
            item.country.toLowerCase().includes(valueSearch.toLowerCase()),
        );
        setCurrentListDestination(dataFilter);
        dataOrigin = dataDestination;
    };
    return (
        <>
            <div className={`${styles.page__most__popular} dark:bg-[#222323] dark:border-none`}>
                <div className={styles.page__most__popular__container}>
                    <h2 className={`${styles.page__most__popular__title} dark:text-[#EDF0FC]`}>
                        Most Popular Destinations
                    </h2>
                    <div className={styles.page__most__popular__post}>
                        <div className={`w-full h-auto`}>
                            <Slider {...settingsSlider}>
                                {dataPopularDestination &&
                                    dataPopularDestination.map((item) => (
                                        <div className="px-4" key={item.code}>
                                            <Link
                                                key={item.code}
                                                href={`/visa/${item.code}?from=${settingsData.defaultCodeFrom}`}
                                                className={`${styles.page__most__popular__post__item} dark:bg-[#121212]`}
                                            >
                                                <div className={stylesPage.page__most__popular__post__image}>
                                                    {/* <Image
                                                        style={{ borderRadius: '12px', objectFit: 'cover' }}
                                                        src={item.image}
                                                        className={styles.page__most__popular__post__image__image}
                                                        alt={item.country}
                                                        width={259}
                                                        height={154}
                                                    /> */}
                                                    <img
                                                        loading="lazy"
                                                        src={`/flags/png250px/${item.flag.toLowerCase()}.png`}
                                                        srcSet={`/flags/png250px/${item.flag.toLowerCase()}.png 2x`}
                                                        alt={item.country}
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </div>
                                                <div className={styles.page__most__popular__post__item__title}>
                                                    {/* <img
                                                        loading="lazy"
                                                        width="24"
                                                        src={`/flags/png100px/${item.flag.toLowerCase()}.png`}
                                                        srcSet={`/flags/png100px/${item.flag.toLowerCase()}.png 2x`}
                                                        alt={item.country}
                                                        style={{
                                                            height: '24px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                        }}
                                                    /> */}
                                                    <span
                                                        className="dark:text-[#EDF0FC]"
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        {item.country}
                                                    </span>
                                                </div>
                                                <div className={styles.page__most__popular__post__item__more}>
                                                    <div
                                                        className={styles.page__most__popular__post__item__more__title}
                                                    >
                                                        Learn more
                                                    </div>
                                                    <div>
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
                                                                d="M10.4589 7.79289C10.0684 8.18342 10.0684 8.81658 10.4589 9.20711L13.2518 12L10.4589 14.7929C10.0684 15.1834 10.0684 15.8166 10.4589 16.2071C10.8494 16.5976 11.4826 16.5976 11.8731 16.2071L15.3731 12.7071C15.7636 12.3166 15.7636 11.6834 15.3731 11.2929L11.8731 7.79289C11.4826 7.40237 10.8494 7.40237 10.4589 7.79289Z"
                                                                fill="#3772FF"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </Slider>
                        </div>
                    </div>
                    <div className={styles.page__most__popular__select}>
                        <div className={styles.page__most__popular__select__header}>
                            <div className={`${styles.page__most__popular__select__header__title} dark:text-[#EDF0FC]`}>
                                Select Destinations
                            </div>
                            <div className={styles.page__most__popular__select__header__search}>
                                <input
                                    onChange={onSearchDestinations}
                                    placeholder="Search destinations"
                                    className={`${styles.page__most__popular__select__header__input} dark:bg-[#222] dark:text-[#EDF0FC]`}
                                ></input>
                                <button className={styles.page__most__popular__select__search__btn}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.4207 13.6C11.2918 14.4775 9.87327 15.0001 8.33268 15.0001C4.65078 15.0001 1.66602 12.0153 1.66602 8.33342C1.66602 4.65152 4.65078 1.66675 8.33268 1.66675C12.0146 1.66675 14.9993 4.65152 14.9993 8.33342C14.9993 9.87401 14.4768 11.2925 13.5992 12.4215L18.0886 16.9108C18.414 17.2363 18.414 17.7639 18.0886 18.0893C17.7632 18.4148 17.2355 18.4148 16.9101 18.0893L12.4207 13.6ZM13.3327 8.33342C13.3327 11.0948 11.0941 13.3334 8.33268 13.3334C5.57126 13.3334 3.33268 11.0948 3.33268 8.33342C3.33268 5.57199 5.57126 3.33341 8.33268 3.33341C11.0941 3.33341 13.3327 5.57199 13.3327 8.33342Z"
                                            fill="#777E91"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles.page__most__popular__select__list}>
                            {currentListDestination && currentListDestination.length > 0
                                ? currentListDestination.map((item) => (
                                      <Link
                                          key={item.country}
                                          href={`/visa/${item.country}?from=${settingsData.defaultCodeFrom}`}
                                          className={`${styles.page__most__popular__select__list__item} dark:bg-[#121212] dark:hover:bg-[#121212]`}
                                      >
                                          <img
                                              width={24}
                                              height={24}
                                              src={`/flags/png100px/${item.country.toLowerCase()}.png`}
                                              style={{ height: '24px', objectFit: 'cover', borderRadius: '50%' }}
                                              alt="flag image country"
                                          />
                                          <div className="dark:text-[#EDF0FC]">
                                              {listCountries.find((country) => country.code == item.country)?.name}
                                          </div>
                                      </Link>
                                  ))
                                : ''}
                            {dataDestination.length !== currentListDestination.length && (
                                <div
                                    onClick={() => setCurrentListDestination(dataDestination)}
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    <ButtonApply type="secondary" title="Show more" />
                                </div>
                            )}
                            {dataDestination.length == listCountries.length && (
                                <div
                                    onClick={() => setCurrentListDestination(dataDestination.slice(0, 15))}
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    <ButtonApply type="secondary" title="Show less" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
