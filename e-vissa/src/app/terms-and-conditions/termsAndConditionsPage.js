'use client';
import styles from '@/app/posts/DetailPost.module.css';
import CheckVisa from '@/components/Page/CheckVisa/checkVisa';
import ContactForm from '@/components/Page/ContactForm/contactForm';
import WhyApplyWithUs from '@/components/Page/WhyApplyWithUs/whyApplyWithUs';
import ContactUs from '@/components/Page/ChildComponent/Post/ContactUs/contactUs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Fab, Fade, Toolbar, useScrollTrigger } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import defaultPost from '/public/page/post/default_image_thuml.png';
import Image from 'next/image';

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 20, left: 16 }}>
                {children}
            </Box>
        </Fade>
    );
}

export default function TermsAndConditionsPage({ props }) {
    return (
        <>
            <Toolbar id="back-to-top-anchor" style={{ minHeight: 0 }} />
            <div className={`${styles.container} dark:bg-[#121212]`}>
                <div className={styles.blog__detail__container}>
                    <div className={styles.blog__detail__main}>
                        <div className={styles.blog__detail__title__container}>
                            <h1 className={`${styles.blog__detail__title} dark:text-[#EDF0FC]`}>
                                {'Terms and Conditions'}
                            </h1>
                            <div className={styles.blog__detail__more}>
                                <div className={styles.blog__detail__more__left}>
                                    <div className={styles.blog__detail__more__left__author}>
                                        <AccountCircleIcon /> {'Admin'}
                                    </div>
                                    <div className={styles.blog__detail__more__left__view}>
                                        <VisibilityIcon /> {'10.2K'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.blog__detail__content} dark:text-[#EDF0FC]`}>
                            <h2>
                                <strong>TERMS AND CONDITIONS</strong>
                            </h2>
                            <p>
                                "We, our, and us'' in these Terms and Conditions refer to E-vissa.com. When utilizing
                                any of the services of E-vissa.com, please read these Terms and Conditions in a careful
                                manner.
                            </p>
                            <p>
                                By using this website, submitting or delivering your application(s) and/or other
                                document(s) to E-vissa.com, and making use of any service offered by E-vissa.com, you
                                agree to comply with our policies and acknowledge that you have read and accepted these
                                terms and conditions.
                            </p>
                            <p>
                                You consent to adhere to all applicable laws and regulations, and not use this site for
                                any illegal purposes.
                            </p>
                            <p>
                                You consent not to use the website in any way that could decrease performance, corrupt
                                any of the content, or adversely affect its functionality overall.
                            </p>
                            <p>
                                You acknowledge that we will be entitled to recover incurred expenses, including legal
                                fees, from you for any claim, legal liability, loss, or expense resulting from your
                                violation of the terms and conditions stated in this agreement.
                            </p>
                            <p>
                                You should quit the website right away and not use any of the goods or services offered
                                there if you disagree with any of the terms and conditions included in this agreement.
                            </p>
                            <h2>
                                <strong>MODIFICATION</strong>
                            </h2>
                            <p>
                                Without prior notice, E-vissa.com retains the right to change any portion of this
                                agreement, and it will not be responsible for any incurred issues related to
                                modifications. This agreement will be interpreted as having been accepted when you use
                                the website. Therefore, it is suggested that you review these agreements's terms and
                                conditions on a frequent basis.
                            </p>
                            <h2>
                                <strong>VOCABULARY</strong>
                            </h2>
                            <p>Date format: DD/MM/YYYY (example: 12 January 2024)</p>
                            <p>Time Zone: Vietnam time (GMT +7)</p>
                            <p>Working days: From Monday to Friday (except Saturday, Sunday, and national holidays)</p>
                            <p>Working hours: Every working day from 9:00 a.m. to 4:00 p.m.</p>
                            <p>
                                Multiple or single entry: It refers to multiple entries rather than multiple candidates.
                            </p>
                            <p>
                                Single entry: Within the time frame specified in their visa and visa approval letter,
                                passport holders are only permitted to visit and exit the destination country{' '}
                                <strong>ONCE</strong> (1 or 3 months).
                            </p>
                            <p>
                                Multiple entries: Throughout the duration of their visa validity, passport holders are
                                permitted <strong>MULTIPLE</strong> entries and exits from the country of destination.
                            </p>
                            <p></p>
                            <p></p>
                            <h2>
                                <strong>PROCESSING TIME</strong>
                            </h2>
                            <p>
                                The normal processing time is 5-7 working days; the urgent processing time is 3/2/1
                                working days; the super urgent processing time is 5 hours; 2 hours; or the last-minute
                                service is 1 hour; and the visa will be completed on schedule once we receive and verify
                                your <strong>FULL</strong> payment and all additional documents (your passport copy,
                                photo, and flight ticket, among other necessary documents), not from the time you filled
                                out the online application. Depending on the circumstances surrounding the government's
                                processing time, extra documents might be needed in some situations, and processing
                                times might be longer than normal. In these circumstances, we'll monitor your case and
                                provide you with timely updates.
                            </p>
                            <p>
                                Once the E-Visa result is delivered to the email address you provided during the
                                application procedure, our service will be terminated. Please let us know if you will
                                not be receiving the letter on time. If we do not hear from you by email within a day,
                                the service will be finished. Applications that provide incorrect email addresses or
                                fail to tell us via email that an E-Visa was not obtained will not be reimbursed for any
                                delays or losses.
                            </p>
                            <h2>
                                <strong>RULES FOR GETTING EVISA OF LAST MINUTES SERVICE</strong>
                            </h2>
                            <p>
                                The cutoff period for international flights is typically 60 minutes before boarding; if
                                you arrive after this, you might not be allowed to check in.
                            </p>
                            <ul>
                                <li>
                                    Your registered email will receive the E-Visa within an hour if the documents are
                                    submitted to us more than 60 minutes prior to your scheduled boarding time.
                                </li>
                                <li>
                                    In the event that we receive documents from you less than 60 minutes before your
                                    scheduled departure time, authorities will often require new electronic tickets with
                                    a check-in time of at least 60 minutes. If you request a new flight, your visa will
                                    be approved within one hour.
                                </li>
                            </ul>
                            <p>
                                E-vissa.com disclaims any liability for any delay, cancellation, monetary losses, or
                                other damages resulting from visa delays in the above situations.
                            </p>
                            <p>
                                You must confirm by phone or email after applying for and paying for this service, and
                                you must then regularly check your inbox. Should you neglect to keep track of your email
                                for the authorized visa letter or to contact us by phone, we will not be responsible for
                                any unforeseen issues.
                            </p>
                            <h2>
                                <strong>FEES AND PAYMENTS</strong>
                            </h2>
                            <p>
                                For the services provided by E-vissa.com, you are obliged to pay all fees and charges.
                            </p>
                            <p>
                                Requirements and fees related to visa processing are subject to change at any time.
                                Application forms and documents required for visa issuance, which may change without
                                notice, are included in applicable objects.
                            </p>
                            <h2>
                                <strong>CANCELLATIONS AND REFUNDS</strong>
                            </h2>
                            <p>
                                All E-Visa applications submitted through E-Vissa.com are subject to the No-refund
                                policy. To avoid any unexpected expenses, please get in touch with us right away if you
                                would like to cancel your visa application.
                            </p>
                            <p>
                                No refund: The visa fees shall <strong>NOT</strong> be reimbursed in the following
                                cases:
                            </p>
                            <ul>
                                <li>
                                    Any justification for canceling after the government has received your visa
                                    application.
                                </li>
                                <li>
                                    The immigration officer at the airport may refuse to grant you entry permission
                                    (visa on arrival) or a stamped visa based on your background.
                                </li>
                                <li>Refusal to utilize the E-Visa approval provided by E-Vissa.com.</li>
                                <li>
                                    Notifying us in advance of any changes to your arrival date or flight information.
                                </li>
                            </ul>
                            <p>
                                Please be aware that refund requests will be invalid once you have obtained the E-Visa
                                result.
                            </p>
                            <p>
                                Based on the slots that are available for urgent confirmation (in 7 days, 3 days, 2
                                days, 1 day, 5 hours, 2 hours, 1 hour, or last-minute service within 1 hour), we
                                guarantee to deliver the services as required with the accurate processing time as
                                stated on our website. However, as each client's timing of entry varies, we cannot be
                                held responsible for it. Applicants may enter the destination nation at any time while
                                the visa is valid.
                            </p>
                            <p>
                                At the time of your intended departure, please make sure that you have given us all the
                                accurate information needed for your desired visa. When a visa is wrongly issued or
                                denied entry because of false information on the visa, E-vissa.com is not liable for any
                                resultant losses. No refund will be given if fraudulent or erroneous information is
                                submitted at the time of submission, even though we will make every attempt to resolve
                                any visa concerns before departure. It is highly advised that you compare the details on
                                your visa confirmation letter to those on your passport. To prevent{' '}
                                <strong>MISTAKES</strong> brought on by the applicants or system malfunctions, the{' '}
                                <strong>VISA INFORMATION</strong>
                            </p>
                            <h2>
                                <strong>MUST BE CAREFULLY DOUBLE CHECKED UPON RECEIPT</strong>
                            </h2>
                            <p>
                                Errors from the system can <strong>ONLY</strong> be fixed in a day by:
                                <ol>
                                    <li>
                                        Sending an EMAIL or calling the 24/7 hotline
                                        <p>
                                            =&gt;&gt; Within 24 hours of sending out the E-Visa approval, if we do not
                                            get an email from you asking for a mistake correction, neither the
                                            government nor E-vissa.com will be held accountable for any unsuccessful
                                            applications, rejected entries, lost visa fees, or other connected issues.
                                        </p>
                                    </li>
                                    <li>
                                        In order to receive a new E-Visa approval, applicants who make mistakes must pay
                                        the fee again. Get in touch with us as soon as possible by email or hotline.
                                    </li>
                                </ol>
                            </p>
                            <p>
                                By using our website to apply for a visa, you consent to following the government's visa
                                policy in order to have your visa printed. This pertains to the requirements for
                                permitted ports and airlines of entry for the visa. If you do not comply with the E-Visa
                                criteria after your visa is accepted, we will not reimburse the service charge.
                            </p>
                            <p>
                                If your application is rejected, the service charge (less the government fee) will be
                                reimbursed.
                            </p>
                            <h2>
                                <strong>COMMUNICATIONS</strong>
                            </h2>
                            <p>
                                By using our website and our services, you authorize E-vissa.com to contact you by phone
                                or email for any purpose, including the delivery of marketing and promotional materials.
                            </p>
                            <h2>
                                <strong>PRIVACY STATEMENT</strong>
                            </h2>
                            <p>
                                Please review{' '}
                                <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`} target="_blank">
                                    our privacy statement's details.
                                </a>
                            </p>

                            <h2>
                                <strong>DISCLAIMERS</strong>
                            </h2>
                            <p>
                                An E-Visa application will normally be processed in 3–7 working days; however, there can
                                be exceptions if there are unanticipated issues that cause delays or cancellations (such
                                as government system maintenance). Thus, in order to prevent any unforeseen problems, we
                                highly advise that you apply for an E-Visa at least one to two weeks before your planned
                                departure date.
                            </p>
                            <p>
                                Sometimes your background may cause your E-Visa application or entry to be denied; in
                                these situations, we won't reimburse you the full amount you paid, and we won't be held
                                accountable for any lost, delayed, or canceled airline, tour, or hotel reservations you
                                made for your trip to the destination nation. In the event that the Immigration
                                Department or airport officials reject your visa application, we also disclaim all
                                liability for any misplacement, delay, or cancellation of your airline ticket, tour, or
                                hotel reservation. We suggest completing an E-Visa procedure before making any other
                                service reservations.
                            </p>
                        </div>
                        <ContactForm />
                        <div className={styles.blog__detail__related}>
                            <h2 className={`${styles.blog__main__title} dark:text-[#EDF0FC]`}>Related post</h2>
                            <div className={styles.blog__post__container}>
                                <a key={1} href={'/privacy-policy'} className={styles.blog__post__item}>
                                    <div className={styles.blog__post__item__image}>
                                        <Image
                                            className={styles.blog__post__item__image__img}
                                            src={defaultPost}
                                            alt="Vietnam eVisa Latest News from Vietnam Authorities"
                                        />
                                    </div>
                                    <div className={styles.blog__post__item__info}>
                                        <div className={`${styles.blog__post__item__info__title} dark:text-[#EDF0FC]`}>
                                            Privacy Policy
                                        </div>
                                        <div className={styles.blog__post__item__info__time}>by Admin</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.blog__detail__right}>
                        <CheckVisa />
                        <div className={styles.blog__most__popular}>
                            <div className={`${styles.blog__most__popular__title} dark:text-[#EDF0FC]`}>
                                Related post
                            </div>
                            <div className={styles.blog__most__popular__list}>
                                <a key={1} href={'/privacy-policy'} className={styles.blog__most__popular__item}>
                                    <div className="font-[500] text-[#222]">{'Privacy Policy'}</div>
                                    <div className={styles.blog__most__popular__item__time}>{'Admin'}</div>
                                </a>
                            </div>
                        </div>
                        <WhyApplyWithUs />
                        {/* Start Component Contact Us */}
                        <ContactUs />
                        {/* End Component Contact Us */}
                    </div>
                </div>
            </div>
            <ScrollTop {...props}>
                <Fab
                    sx={{ backgroundColor: 'var(--primary-color) !important' }}
                    size="small"
                    aria-label="scroll back to top"
                >
                    <FontAwesomeIcon icon={faArrowUpLong} color="#fff" />
                </Fab>
            </ScrollTop>
        </>
    );
}
