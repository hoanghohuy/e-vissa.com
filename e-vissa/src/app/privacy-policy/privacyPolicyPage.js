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
import { settingsData } from '../../../settings';

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

export default function PrivacyPolicyPage({ props }) {
    return (
        <>
            <Toolbar id="back-to-top-anchor" style={{ minHeight: 0 }} />
            <div className={`${styles.container} dark:bg-[#121212]`}>
                <div className={styles.blog__detail__container}>
                    <div className={styles.blog__detail__main}>
                        <div className={styles.blog__detail__title__container}>
                            <h1 className={`${styles.blog__detail__title} dark:text-[#EDF0FC]`}>{'Privacy Policy '}</h1>
                            <div className={styles.blog__detail__more}>
                                <div className={styles.blog__detail__more__left}>
                                    <div className={styles.blog__detail__more__left__author}>
                                        <AccountCircleIcon /> {'Admin'}
                                    </div>
                                    <div className={styles.blog__detail__more__left__view}>
                                        <VisibilityIcon /> {'8.3K'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.blog__detail__content} dark:text-[#EDF0FC]`}>
                            <p>We utilize Secure Socket Layer (SSL) security to protect your personal information.</p>
                            <p>
                                As stated in this privacy policy, we make a commitment to safeguarding the privacy of
                                users who visit E-vissa.com (henceforth referred to as "we" or "us"). You shall accept
                                the terms stated in our privacy policy once you use our website to apply for a visa.
                            </p>
                            <h2>
                                <strong>1. What types of data do we collect?</strong>
                            </h2>
                            <p>
                                Once you (the applicant) request our services, either as part of the process of applying
                                for your E-Visa, E-vissa.com has the authority to gather your personal data. Although
                                the personal information that E-vissa.com needs from you may change based on the nation
                                in which you applied for the E-Visa or permit, it is noteworthy that the personal data
                                that E-vissa.com will collect, use, and transfer on your behalf is always under the
                                control of the client Government or diplomatic mission.
                            </p>
                            <p>
                                The personal data needed to complete your visa application, including your full name,
                                passport number, date of birth, nationality, expiration date, and arrival date in the
                                destination nation, will be gathered, stored, and utilized by us.
                            </p>
                            <p>
                                Our services are not purposely targeted at or created for children. We will need
                                parental approval before processing any data belonging to minors.
                            </p>
                            <h2>
                                <strong>2. Making use of your personal information</strong>
                            </h2>
                            <p>
                                Personal information provided on this website will be utilized by E-vissa.com to
                                undertake the E-Visa application procedure. Up until the time you leave the destination
                                country, your information will remain in the Government System. In order to satisfy our
                                statutory duties, we are legally compelled to keep some types of data for a longer time
                                (for example, invoices under tax legislation).
                            </p>
                            <p>
                                As part of the procedure for applying for your visa or permit, the data gathered by
                                E-vissa.com is sent to the Government or diplomatic mission for the purpose of assessing
                                your applications.
                            </p>
                            <p>
                                Please take note that E-vissa.com (or any member of its group or employees) has no
                                influence over whether an application for a visa or permit is approved or denied.
                            </p>
                            <p>
                                The Government or diplomatic mission has the exclusive authority to do this assessment.
                                They hold the right to reject any application for a visa or permit, as well as to ask
                                for further relevant information and supporting documentation from you. If you want your
                                application to be kept under consideration, you will need to submit such information and
                                documentation.
                            </p>
                            <p>
                                You will receive the E-Visa after the service is finished. All of your personal data
                                will be immediately erased after you have arrived safely in the destination country. Our
                                website shall not be liable for any troubles or complaints pertaining to privacy and
                                personal data.
                            </p>
                            <p>
                                Your request for a visa will be canceled, and all of your submitted information will be
                                automatically erased after 72 hours in the event that you provide the requested
                                information without paying for the visa services.
                            </p>
                            <h2>
                                <strong>3. Security</strong>
                            </h2>
                            <p>
                                We guarantee to provide the best security and privacy on our website. Secure Socket
                                Layer (SSL) technology is not only used for all user authentication transactions,
                                including credit card processing, but is also supported by your browser. All data
                                transferred to us is encrypted thanks to this technology. Our security certificate has
                                been validated, utilizing the finest commercially available encryption on the internet.
                                Through the implementation of policies and procedures to guarantee that your personal
                                data is preserved solely for the reasons for which it was obtained, we take every
                                precaution to safeguard your personal data against loss, misuse, disclosure,
                                modification, unauthorized access, or destruction.
                            </p>
                            <h2>
                                <strong>4. Cookies</strong>
                            </h2>
                            <p>
                                With the aim of personalizing the experience of our clients, our website uses cookies to
                                identify them when they get access to it. To register, your browser may need to have
                                cookies ‘turned on’ or enabled; however, you can still use the website even if you
                                decide to disable cookies. We do not keep any of your personal information in cookies.
                                All data is kept completely private and is never shared with or sold to third parties.
                                We might show advertisements or links to other websites and businesses that also employ
                                cookies. In such circumstances, we disclaim any liability for any data that these
                                parties get via the use of cookies. We recommend that you familiarize yourself with the
                                privacy policies and information sharing standards of these websites because of their
                                differences in comparison to our website's policies and standards.
                            </p>
                            <h2>
                                <strong>5. Updating, altering, or adapting data</strong>
                            </h2>
                            <p>
                                Kindly inform us if there are any updates or corrections that need to be made to the
                                personal data we have on you. Please take note that you are unable to amend the data
                                once the Government has given the acceptance letter. However, you can opt to reapply for
                                a new visa instead.
                            </p>
                            <h2>
                                <strong>6. System data</strong>
                            </h2>
                            <p>
                                The right to gather and retain data, including your IP address, browser type, and
                                operating system type, is reserved by our website. We will only use the data for system
                                administration needs, and it is all kept in the strictest confidence. The data is useful
                                for traffic and site usage tracking as well as for problem diagnosis.
                            </p>
                            <h2>
                                <strong> 7. Policy modifications</strong>
                            </h2>
                            <p>
                                We have the authority to update or modify this privacy policy at any time. We will
                                notify you of the policy modifications by posting an updated version on our website. We
                                recommend that you periodically visit our website to stay updated on any changes.
                            </p>

                            <h2>
                                <strong>8. Websites from third parties</strong>
                            </h2>
                            <p>
                                Links to other external websites can be found on the website. The privacy practices or
                                policies of websites owned by third parties are not our responsibility.
                            </p>
                            <h2>
                                <strong>9. Third-party payments (financial transactions)</strong>
                            </h2>
                            <p>
                                We not only approve pocket electronic payments but also accept online payments through
                                the integration of our website. Credit cards and direct bank transfers online are also
                                acceptable for your convenience. All credit card data needed to cover visa fees is
                                handled by a reliable third-party partner and secured by SSL encryption from Verisign.
                                It is advised that you review their privacy policy and terms of service.
                            </p>
                            <p>
                                Please be aware that we have no legal liability for the privacy practices or policies of
                                third-party payment gateways.
                            </p>
                            <h2>
                                <strong>10. Contact</strong>
                            </h2>
                            <p>
                                For any inquiries concerning our privacy policy, kindly reach out to us at{' '}
                                <a href={`mailto:${settingsData.siteContactEmail}`}>{settingsData.siteContactEmail}</a>
                            </p>
                        </div>
                        <ContactForm />
                        <div className={styles.blog__detail__related}>
                            <h2 className={`${styles.blog__main__title} dark:text-[#EDF0FC]`}>Related post</h2>
                            <div className={styles.blog__post__container}>
                                <a key={1} href={'/terms-and-conditions'} className={styles.blog__post__item}>
                                    <div className={styles.blog__post__item__image}>
                                        <Image
                                            className={styles.blog__post__item__image__img}
                                            src={defaultPost}
                                            alt="Vietnam eVisa Latest News from Vietnam Authorities"
                                        />
                                    </div>
                                    <div className={styles.blog__post__item__info}>
                                        <div className={`${styles.blog__post__item__info__title} dark:text-[#EDF0FC]`}>
                                            Terms and Conditions
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
                                <a key={1} href={'/terms-and-conditions'} className={styles.blog__most__popular__item}>
                                    <div className="font-[500] text-[#222]">{'Terms and Conditions'}</div>
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
