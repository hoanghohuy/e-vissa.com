import styles from '@/app/page.module.css';
import { settingsData } from 'settings';
import { CountrySelection } from '@/components/CountrySelection/CountrySelection';
import LogoIndex from '/public/index-banner.png';
import Image from 'next/image';

export default function ApplyComponent() {
    return (
        <section className="w-full dark:bg-[#121212]">
            <div className={styles.page__input__info__container}>
                <div className={styles.page__input__info__left}>
                    <div className={styles.page__input__info__text}>
                        <h1
                            className={
                                'font-dmsans text-[#23262f] text-[64px] leading-[76px] font-[700] dark:text-[#EDF0FC] tracking-[-1px] xl:text-[45px] xl:leading-normal md:text-[36px]'
                            }
                        >
                            Explore{' '}
                            <span
                                className={`${styles.page__input__info__left__title__custom} bg-[#f4fef5] dark:bg-[#19201A]`}
                            >
                                Global Visas.
                            </span>
                            Your Travel Visa Information Source.
                        </h1>
                        <div className={styles.page__input__info__left__desc}>
                            Seamlessly Explore the World with Trusted Visa Services.
                        </div>
                    </div>
                    <CountrySelection />
                </div>
                <div className={styles.page__input__info__right}>
                    <Image src={LogoIndex} alt={settingsData.title} className={styles.page__input__info__right__img} />
                </div>
            </div>
            <div className={styles.page__input__info__container__mobile}>
                <CountrySelection page={'index__mobile'} isMobile={true} />
            </div>
        </section>
    );
}
