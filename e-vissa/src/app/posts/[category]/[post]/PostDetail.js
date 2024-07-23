'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/app/posts/DetailPost.module.css';
import stylesPost from '@/app/posts/Blog.module.css';
import Image from 'next/image';
import { Box, Button, Fab, Fade, Toolbar, useScrollTrigger } from '@mui/material';
import defaultPost from '/public/page/post/default_image_thuml.png';
import moment from 'moment/moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import facebook from '/public/social/facebook.png';
import linkedIn from '/public/social/linkedin.png';
import twitter from '/public/social/twitter.png';
import share from '/public/social/share.svg';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import CheckVisa from '@/components/Page/CheckVisa/checkVisa';
import WhyApplyWithUs from '@/components/Page/WhyApplyWithUs/whyApplyWithUs';
import ContactUs from '@/components/Page/ChildComponent/Post/ContactUs/contactUs';
import ContactForm from '@/components/Page/ContactForm/contactForm';
import Rating from '@mui/material/Rating';
import { getAllDataCommentByPostID } from '@/components/Page/Post/getDataPost';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { isSuccessStatus } from '@/utils/validation';
import TableOfContents from '../../../../components/Page/TableOfContent/tableOfContents';
import PostFaqs from '@/components/PostFaqs';
import { useGetAllPostsQuery } from '@/redux/services/client/post';

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

const PostDetail = ({ params, detail, props }) => {
    const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split('/');
    if (segments[1] !== params.category) {
        router.push(`/${params.category}/${params.post}`, undefined, { shallow: true });
    }
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [ratingValue, setRatingValue] = useState(5);
    const [ratingText, setRatingText] = useState('');
    const [listComment, setListComment] = useState([]);

    const { data: popularPost, isLoading } = useGetAllPostsQuery({ page: 1, limit: 10 });

    async function getAllCommentPost() {
        try {
            const resp = await getAllDataCommentByPostID(detail.id);
            if (resp.length > 0) {
                setListComment(resp);
            }
        } catch (error) {}
    }

    const handleSocialMediaShare = (page) => {
        const currentUrl = window.location.href;
        let linkShare;
        switch (page) {
            case 'facebook':
                linkShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                break;
            case 'twitter':
                linkShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    currentUrl,
                )}&text=${encodeURIComponent('Check out this post!')}`;

                break;
            case 'linkedIn':
                linkShare = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                    currentUrl,
                )}&title=${encodeURIComponent('Post Title')}&summary=${encodeURIComponent('Post summary')}`;

                break;
            default:
                break;
        }

        window.open(linkShare, '_blank');
    };

    const onComment = async () => {
        if (!session) {
            ToastNotify('You must be login to comment this post');
            return;
        }
        if (ratingText.trim().length < 3) {
            ToastNotify('Your comment must be at least 3 characters.');
            return;
        }
        try {
            setLoading(true);
            const newComment = {
                post_id: detail.id,
                star: ratingValue,
                desc: ratingText,
            };
            const request = await fetch(`/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: session.accessToken,
                },
                body: JSON.stringify(newComment),
            });
            if (isSuccessStatus(request.status)) {
                getAllCommentPost();
            } else {
                ToastNotify(`Something went wrong. Please try again later.`);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* {detail?.published !== 1 && notFound()} */}
            <Toolbar id="back-to-top-anchor" style={{ minHeight: 0 }} />
            <Toolbar id="sticky-toc" style={{ minHeight: 0 }} />
            <div className={`${styles.container} dark:bg-[#121212]`}>
                <div className={styles.blog__detail__container}>
                    <div className={styles.blog__detail__main}>
                        <div className={styles.blog__detail__title__container}>
                            <h1 className={`${styles.blog__detail__title} dark:text-[#EDF0FC]`}>
                                {detail?.title}
                                {session?.accessToken &&
                                    (session?.user?.role == 'editor' || session?.user?.role == 'administrator') && (
                                        <Button
                                            onClick={() => router.push(`/admin/posts?search=${detail?.title}`)}
                                            className="!ml-2"
                                            variant="outlined"
                                        >
                                            Edit this post
                                        </Button>
                                    )}
                            </h1>
                            <div className={styles.blog__detail__more}>
                                <div className={styles.blog__detail__more__left}>
                                    <div className={styles.blog__detail__more__left__date}>
                                        <DateRangeIcon /> {moment(detail?.updated_at).format('lll')}
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
                                        alt="facebook share"
                                        onClick={() => handleSocialMediaShare('facebook')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Image
                                        width={24}
                                        height={24}
                                        src={twitter}
                                        alt="twitter share"
                                        onClick={() => handleSocialMediaShare('twitter')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Image
                                        width={24}
                                        height={24}
                                        src={linkedIn}
                                        alt="linkedIn share"
                                        onClick={() => handleSocialMediaShare('linkedIn')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="hidden">
                            {detail.heading_tags
                                ? JSON.parse(detail.heading_tags).map((headingTag) => <span>{headingTag.text}</span>)
                                : []}
                        </div>

                        <TableOfContents headingTags={detail.heading_tags ? JSON.parse(detail.heading_tags) : []} />

                        <div className={`${styles.blog__detail__content} dark:text-[#EDF0FC]`}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detail?.content,
                                }}
                            ></div>
                        </div>
                        {detail.faq && JSON.parse(detail.faq)?.published == 1 && (
                            <PostFaqs listFaqs={detail.faq ? JSON.parse(detail.faq) : {}} />
                        )}
                        <ContactForm />
                        {/* COMMENT BOX */}
                        {/* <div id="comment-box">
                            {session ? (
                                <div id="write-comment" className="flex items-end justify-between gap-4">
                                    <div className="flex gap-3 items-center w-full">
                                        <img src="/avatar/user_default_header.png" />
                                        <div className="flex flex-col w-full gap-1">
                                            <div className="flex gap-2 items-center">
                                                <div className="text-[14px] font-[600]">{session?.user?.name}</div>
                                                <Rating
                                                    name="rating-comment"
                                                    value={ratingValue}
                                                    onChange={(event, newValue) => {
                                                        setRatingValue(newValue);
                                                    }}
                                                />
                                            </div>

                                            <input
                                                placeholder="Type your comment"
                                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-[9px]"
                                                onChange={(e) => setRatingText(e.target.value)}
                                                value={ratingText}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        disabled={loading}
                                        onClick={onComment}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-blue-400"
                                    >
                                        {loading ? 'Loading...' : 'Comment'}
                                    </button>
                                </div>
                            ) : (
                                <div className="italic text-[14px] dark:text-[#EDF0FC]">
                                    You must{' '}
                                    <a href="/login" className="underline">
                                        Login
                                    </a>{' '}
                                    to comment this post.
                                </div>
                            )}
                            <div id="comment-container" className="pt-4">
                                <div className="flex gap-2 font-dmsans font-[900]">
                                    <div className="dark:text-[#EDF0FC]">Comments</div>
                                    <div className="dark:text-[#EDF0FC]">{listComment.length}</div>
                                </div>
                                <div id="list-comment">
                                    {listComment.map((item, index) => (
                                        <div
                                            key={item}
                                            className="w-full border-[1px] border-solid rounded-md p-2 mt-3"
                                        >
                                            <div className="flex gap-3 items-center w-full">
                                                {item.created_by_info?.image ? (
                                                    <img
                                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item.created_by_info?.image}`}
                                                        alt="avatar default"
                                                    />
                                                ) : (
                                                    <img
                                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                                        src="/avatar/user_default_header.png"
                                                    />
                                                )}

                                                <div className="flex flex-col w-full gap-1">
                                                    <div className="flex gap-2 items-center">
                                                        <div className="text-[14px] font-[600] dark:text-[#EDF0FC]">
                                                            {`${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`}
                                                        </div>
                                                        <Rating name="rating-comment" value={item.star} readOnly />
                                                        <div className="text-[13px] dark:text-[#EDF0FC]">
                                                            {moment(item.created_at).fromNow()}
                                                        </div>
                                                    </div>
                                                    <div className="text-[14px] dark:text-[#EDF0FC]">{item.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                        {/*END COMMENT BOX */}
                        <div className={styles.blog__detail__related}>
                            <h2 className={`${styles.blog__main__title} dark:text-[#EDF0FC]`}>Related post</h2>
                            <div className={styles.blog__post__container}>
                                {popularPost &&
                                    popularPost.data &&
                                    popularPost.data.length > 0 &&
                                    popularPost.data.slice(0, 3).map((item) => (
                                        <a
                                            key={item.slug}
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
                                                <div
                                                    className={`${styles.blog__post__item__info__title} dark:text-[#EDF0FC]`}
                                                >
                                                    {item.title}
                                                </div>
                                                <div className={styles.blog__post__item__info__time}>
                                                    {moment(item.created_at).format('DD/MM/YYYY HH:mm')} by{' '}
                                                    {`${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.blog__detail__right}>
                        <CheckVisa />
                        <div className={styles.blog__most__popular}>
                            <div className={`${styles.blog__most__popular__title} dark:text-[#EDF0FC]`}>
                                Most popular
                            </div>
                            <div className={styles.blog__most__popular__list}>
                                {popularPost && popularPost.data && popularPost.data.length > 0
                                    ? popularPost.data.slice(0, 5).map((item) => (
                                          <a
                                              key={item.slug}
                                              href={
                                                  item.category_info?.length > 0
                                                      ? `/${item.category_info[0]?.slug}/${item.slug}`
                                                      : `/${item.slug}`
                                              }
                                              className={styles.blog__most__popular__item}
                                          >
                                              <div
                                                  className={`${stylesPost.blog__most__popular__item__title} dark:text-[#EDF0FC]`}
                                              >
                                                  {item.title}
                                              </div>
                                              <div className={styles.blog__most__popular__item__time}>
                                                  {moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                                              </div>
                                          </a>
                                      ))
                                    : 'Loading...'}
                            </div>
                        </div>
                        <WhyApplyWithUs />
                        {/* Start Component Contact Us */}
                        <ContactUs />
                        {/* End Component Contact Us */}
                        <div className="sticky top-8 ">
                            <TableOfContents
                                headingTags={detail.heading_tags ? JSON.parse(detail.heading_tags) : []}
                                mode={'sticky'}
                            />
                        </div>
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
};

export default PostDetail;
