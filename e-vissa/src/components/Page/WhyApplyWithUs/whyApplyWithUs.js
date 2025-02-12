import React from 'react';
import { listReason } from '@/utils/constants';
import styles from './WhyApply.module.css';

export default function WhyApplyWithUs() {
    return (
        <div className={`${styles.why__apply} dark:bg-[#1D1D1E]`}>
            <div className={styles.why__apply__titles}>Why apply with us?</div>
            {listReason.map((item) => (
                <div key={item.id} className={styles.why__apply__item}>
                    <div className={styles.why__apply__item__check}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.0013 18.3332C14.6037 18.3332 18.3346 14.6022 18.3346 9.99984C18.3346 5.39746 14.6037 1.6665 10.0013 1.6665C5.39893 1.6665 1.66797 5.39746 1.66797 9.99984C1.66797 14.6022 5.39893 18.3332 10.0013 18.3332ZM14.8751 8.20694C15.2656 7.81642 15.2656 7.18325 14.8751 6.79273C14.4846 6.40221 13.8514 6.40221 13.4609 6.79273L9.16797 11.0856L7.37508 9.29273C6.98455 8.90221 6.35139 8.90221 5.96086 9.29273C5.57034 9.68325 5.57034 10.3164 5.96086 10.7069L8.46086 13.2069C8.85139 13.5975 9.48455 13.5975 9.87508 13.2069L14.8751 8.20694Z"
                                fill="#58BD7D"
                            />
                        </svg>
                    </div>
                    <div className={`text-[#23262F] text-[14px] dark:text-[#EDF0FC]`}>{item.text}</div>
                </div>
            ))}
        </div>
    );
}
