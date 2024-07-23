import React from 'react';
import styles from './ImportantNote.module.css';

export default function ImportantNote() {
    return (
        <div className={styles.note}>
            <div className={styles.note__container}>
                <h2 className={styles.note__title}>Important Notices</h2>
                <div className={styles.note__content}>
                    E-vissa.com is one of the top portals for travel and associated services. This website is not an
                    official government representative website, and it is private or commercial in nature. The official
                    procedure for applying for an ETA to get permission for entry into another foreign country can be
                    done by utilizing this commercial website.
                    <br />
                    In accordance with our procedure, you will be required to pay a service fee for consultation,
                    application preparation and submission, status updates, and outcome updates. We charge a larger
                    application fee than if you applied at a certain diplomatic mission of your destination country or
                    directly through that nation's government system. Visit the government system if you would rather
                    use an unguided service.
                    <br />
                    Disclaimer: There is no legal connection between this business and the official websites of your
                    destination country's government. The purpose of E-vissa.com is to assist individuals and legal
                    companies with the administrative travel documentation needed to enter their country of destination
                    for a brief visit. To put it briefly, E-vissa.com is your pass to hassle-free visa services, which
                    can greatly simplify your trip arrangements!
                </div>
            </div>
        </div>
    );
}
