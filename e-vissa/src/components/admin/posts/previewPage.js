'use client';
import React, { useState } from 'react';
import stylesSystem from '@/app/page.module.css';
import styles from '@/app/posts/[category]/[post]/page.module.css';
// import styles from '@/app/posts/[...slug]/page.module.css';
import stylesPost from '@/app/posts/Blog.module.css';
import Image from 'next/image';
import { Box, Button, Fab, Fade, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import defaultPost from '/public/page/post/default_image_thuml.png';
import moment from 'moment/moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import facebook from '/public/social/facebook.png';
import linkedIn from '/public/social/linkedin.png';
import twitter from '/public/social/twitter.png';
import share from '/public/social/share.svg';
import { ToastContainer, toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import { listReason } from '@/utils/constants';
import PropTypes from 'prop-types';
import { settingsData } from '../../../../settings';
import check from '/public/icons/check.png';
import phone from '/public/icons/contact_us-phone.png';
import email from '/public/icons/contact_us-email.png';
import clock from '/public/icons/contact_us-clock.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import CheckVisa from '@/components/Page/CheckVisa/checkVisa';
import ContactForm from '@/components/Page/ContactForm/contactForm';
import PostFaqs from '@/components/PostFaqs';

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
            <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 52, right: 16 }}>
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const PreviewPage = ({ allPosts, detail, props }) => {
    const pathName = usePathname();
    const lengthPath = pathName.split('/').length;
    if (typeof detail !== 'object') {
        switch (lengthPath) {
            case 4: {
                const [, type, category, slug] = pathName.split('/');
                window.location.assign(`/${type}/${category}`);
                break;
            }
            case 3: {
                const [, type, slug] = pathName.split('/');
                window.location.assign(`/${type}`);
                break;
            }
            default:
                break;
        }
    }
    // const [listCountries, setlistCountries] = useState([]);
    const [dataAPI, setDataAPI] = useState({});
    const [popularPost, setPopularPost] = useState([]);
    const [availablePost, setAvailablePost] = useState(true);

    return (
        <>
            {/* {detail?.published !== 1 && notFound()} */}
            <Toolbar id="back-to-top-anchor" style={{ minHeight: 0 }} />
            <div className={styles.container}>
                <div className={styles.blog__detail__container}>
                    {/* <Link href={'/blog'} className={styles.blog__detail__back}>
                    <ChevronLeftIcon /> Recent post
                </Link> */}
                    {!availablePost ? (
                        <div>
                            <Typography variant="h3" gutterBottom>
                                Page not found
                            </Typography>
                            <Button variant="outlined" className={stylesSystem.admin__button__primary} href={'/posts'}>
                                Back to Post
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.blog__detail__main}>
                            <div className={styles.blog__detail__title__container}>
                                <h1 className={styles.blog__detail__title}>
                                    {dataAPI.title ? dataAPI.title : detail?.title}
                                </h1>
                                <div className={styles.blog__detail__more}>
                                    <div className={styles.blog__detail__more__left}>
                                        <div className={styles.blog__detail__more__left__date}>
                                            <DateRangeIcon /> {moment(detail?.updated_at).format('llll')}
                                        </div>
                                        <div className={styles.blog__detail__more__left__author}>
                                            <AccountCircleIcon />{' '}
                                            {detail?.created_by_info
                                                ? `${detail?.created_by_info.first_name} ${detail?.created_by_info.last_name}`
                                                : 'Admin'}
                                        </div>
                                        <div className={styles.blog__detail__more__left__view}>
                                            <VisibilityIcon /> {detail?.views}
                                        </div>
                                    </div>
                                    <div className={styles.blog__detail__more__right}>
                                        <Image width={24} height={24} src={share} alt="share" />
                                        <Image
                                            width={24}
                                            height={24}
                                            src={facebook}
                                            alt="share this post to facebook"
                                        />
                                        <Image width={24} height={24} src={twitter} alt="twitter share" />
                                        <Image width={24} height={24} src={linkedIn} alt="linkedIn share" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className={styles.blog__detail__thumnail}>
                                {detail.image && detail.image.length > 0 ? (
                                    <img
                                        loading="lazy"
                                        className={styles.blog__detail__thumnail__img}
                                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${detail.image}`}
                                        alt={detail.title}
                                    />
                                ) : (
                                    <Image
                                        src={defaultPost}
                                        alt={detail?.title}
                                        className={styles.blog__detail__thumnail__img}
                                    />
                                )}
                            </div> */}
                            <div className={styles.blog__detail__content}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dataAPI.content ? dataAPI.content : detail?.content,
                                    }}
                                ></div>
                            </div>
                            {detail.faq && JSON.parse(detail.faq)?.published == 1 && (
                                <PostFaqs listFaqs={detail.faq ? JSON.parse(detail.faq) : {}} />
                            )}
                            <ContactForm />
                            <div className={styles.blog__detail__related}>
                                <h2 className={styles.blog__main__title}>Related post</h2>
                                <div className={styles.blog__post__container}>
                                    {popularPost &&
                                        popularPost.length > 0 &&
                                        popularPost.slice(0, 3).map((item) => (
                                            <a
                                                key={item.id}
                                                href={
                                                    item.category_info?.length > 0
                                                        ? `/${item.category_info[0]?.slug}/${item.slug}`
                                                        : `/${item.slug}`
                                                }
                                                className={styles.blog__post__item}
                                            >
                                                <div className={styles.blog__post__item__image}>
                                                    {item.image && item.image.length > 0 ? (
                                                        <img
                                                            loading="lazy"
                                                            className={styles.blog__post__item__image__img}
                                                            src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item.image}`}
                                                            alt={item.title}
                                                        />
                                                    ) : (
                                                        <Image
                                                            className={styles.blog__post__item__image__img}
                                                            src={defaultPost}
                                                            alt="Vietnam eVisa Latest News from Vietnam Authorities"
                                                        />
                                                    )}
                                                </div>
                                                <div className={styles.blog__post__item__info}>
                                                    <div className={styles.blog__post__item__info__title}>
                                                        {item.title}
                                                    </div>
                                                    <div className={styles.blog__post__item__info__time}>
                                                        {moment(item.created_at).format('DD/MM/YYYY HH:mm')} by{' '}
                                                        {`${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`}
                                                    </div>
                                                    {/* <div className={styles.blog__post__item__info__desc}>{item.desc}</div> */}
                                                </div>
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.blog__detail__right}>
                        <CheckVisa />
                        <div className={styles.blog__most__popular}>
                            <div className={styles.blog__most__popular__title}>Most popular</div>
                            <div className={styles.blog__most__popular__list}>
                                {popularPost && popularPost.length > 0
                                    ? popularPost.slice(0, 5).map((item) => (
                                          <a
                                              key={item.id}
                                              href={
                                                  item.category_info?.length > 0
                                                      ? `/${item.category_info[0]?.slug}/${item.slug}`
                                                      : `/${item.slug}`
                                              }
                                              className={styles.blog__most__popular__item}
                                          >
                                              <div className={stylesPost.blog__most__popular__item__title}>
                                                  {item.title}
                                              </div>
                                              <div className={styles.blog__most__popular__item__time}>
                                                  {moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                                              </div>
                                          </a>
                                      ))
                                    : 'Empty popular post.'}
                            </div>
                        </div>
                        <div className={styles.why__apply}>
                            <div className={styles.why__apply__titles}>Why apply with us?</div>
                            {listReason.map((item) => (
                                <div key={item.id} className={styles.why__apply__item}>
                                    <div className={styles.why__apply__item__check}>
                                        <Image src={check} alt="check" />
                                    </div>
                                    <div className={styles.why__apply__item__text}>{item.text}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.contact__us}>
                            <div className={styles.contact__us__title}>Contact us</div>
                            <div className={styles.contact__us__list}>
                                <div className={styles.contact__us__item}>
                                    <div className={styles.contact__us__item__icon}>
                                        <Image src={phone} alt="phone" />
                                    </div>
                                    <a
                                        href={`tel:${settingsData.siteContactPhone}`}
                                        className={styles.contact__us__item__text}
                                    >
                                        {settingsData.siteContactPhone}
                                    </a>
                                </div>
                                <div className={styles.contact__us__item}>
                                    <div className={styles.contact__us__item__icon}>
                                        <Image src={email} alt="email" />
                                    </div>
                                    <a
                                        href={`mailto:${settingsData.siteContactEmail}`}
                                        className={styles.contact__us__item__text}
                                    >
                                        {settingsData.siteContactEmail}
                                    </a>
                                </div>
                                <div className={styles.contact__us__item}>
                                    <div className={styles.contact__us__item__icon}>
                                        <Image src={clock} alt="clock" />
                                    </div>
                                    <div className={styles.contact__us__item__text}>24/7 services</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <FontAwesomeIcon icon={faArrowUpLong} />
                </Fab>
            </ScrollTop>
        </>
    );
};

export default PreviewPage;
