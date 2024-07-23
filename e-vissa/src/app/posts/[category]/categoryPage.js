'use client';
import React, { useState } from 'react';
import styles from '../Blog.module.css';
import stylesCategory from './Category.module.css';
import Image from 'next/image';
import defaultPost from '/public/page/post/default_image_thuml.png';
import { Pagination } from '@mui/material';
import PostSkeleton from '@/components/Page/Skeleton/PostSkeleton';
import moment from 'moment';
import ContactUs from '@/components/Page/ChildComponent/Post/ContactUs/contactUs';
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation';
import { settingsData } from '/settings';
import { getAllDataPostPublishedByCategory } from '@/components/admin/posts/api/PostAPI';
import LabelCategorySkeleton from '@/components/Page/Skeleton/LabelCategorySkeleton/LabelCategorySkeleton';
import TopCategorySkeleton from '@/components/Page/Skeleton/TopCategorySkeleton/TopCategorySkeleton';
import CheckVisa from '@/components/Page/CheckVisa/checkVisa';
import WhyApplyWithUs from '@/components/Page/WhyApplyWithUs/whyApplyWithUs';
import { customPagination } from '@/components/Page/CustomMUI/customMUI';

export default function CategoryPage({ listPost }) {
    const pathName = usePathname();

    const [data, setData] = useState(() => listPost?.posts || []); // Added a check for listPost and its properties
    const [categoryInfo, setCategoryInfo] = useState(() => listPost.category);
    const [loading, setLoading] = useState(false); // Set initial loading state
    const [totalPage, setTotalPage] = useState(() => listPost.pagination?.totalPages);
    const limit = settingsData.defaultLimitPagination;
    const [, slug] = pathName.split('/');

    async function getAllPostByCategory(page, limit) {
        setLoading(true);
        try {
            const resp = await getAllDataPostPublishedByCategory(slug, page, limit);

            if (Object.keys(resp) == 0) {
                const [, type, slug] = pathName.split('/');
                window.location.assign(`/${type}`);
                return;
            }
            if (resp.posts) setData(resp.posts);
            if (resp.category) setCategoryInfo(resp.category);
            if (resp.pagination?.totalPages) setTotalPage(resp.pagination?.totalPages);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleChangePage = (event, value) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getAllPostByCategory(value, limit);
    };

    return (
        <>
            <div className={`${styles.container} dark:bg-[#121212]`}>
                <div className={stylesCategory.top__category}>
                    <h1 className={`${stylesCategory.top__category__title} dark:text-[#EDF0FC]`}>
                        {loading ? (
                            <LabelCategorySkeleton />
                        ) : Object.keys(categoryInfo).length !== 0 ? (
                            `Top ${categoryInfo.name}`
                        ) : (
                            'Top Post'
                        )}
                    </h1>
                    <div className={stylesCategory.top__category__container}>
                        {loading ? (
                            <TopCategorySkeleton />
                        ) : data && data.length > 0 ? (
                            data.slice(0, 4).map((item) => (
                                <a
                                    key={item.slug}
                                    href={item.slug ? `/${categoryInfo?.slug}/${item.slug}` : `/${item.slug}`}
                                    className={`${stylesCategory.top__category__item} dark:bg-[#121212]`}
                                >
                                    <div className={stylesCategory.top__category__image}>
                                        {item.image && item.image.length > 0 ? (
                                            <img
                                                className={stylesCategory.top__category__image__img}
                                                src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item.image}`}
                                                alt={item.title}
                                            />
                                        ) : (
                                            <Image
                                                loading="lazy"
                                                className={stylesCategory.top__category__image__img}
                                                src={defaultPost} // default thumb
                                                alt={item.title}
                                            />
                                        )}
                                    </div>
                                    <div className={stylesCategory.top__category__info}>
                                        <div
                                            href={item.slug ? `/${categoryInfo?.slug}/${item.slug}` : `/${item.slug}`}
                                            className={`${stylesCategory.top__category__info__title} dark:text-[#EDF0FC]`}
                                        >
                                            {item.title}
                                        </div>
                                        <div className={stylesCategory.top__category__info__info}>
                                            <div className={stylesCategory.top__category__info__time}>
                                                {moment(item.created_at).format('ll')}
                                            </div>
                                            <div className={stylesCategory.top__category__info_author}>
                                                <img
                                                    className="w-5 h-5"
                                                    src={`/page/post/default_author.png`}
                                                    alt="default author"
                                                />
                                                {`${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`}
                                            </div>
                                        </div>
                                        <div className={stylesCategory.top__category__info__desc}>{item.meta_desc}</div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            `Empty top post for ${categoryInfo.name}.`
                        )}
                    </div>
                </div>
                <div className={styles.blog__container}>
                    <div className={styles.blog__main}>
                        <h2 className={`${styles.blog__main__title} dark:text-[#EDF0FC]`}>
                            {Object.keys(categoryInfo).length !== 0 ? `Popular ${categoryInfo?.name}` : 'Popular post'}
                        </h2>
                        <div className={styles.blog__post__container}>
                            {loading ? (
                                <PostSkeleton />
                            ) : data && data.length > 0 ? (
                                data.map((item) => (
                                    <div
                                        key={item.slug}
                                        href={item.slug ? `/${categoryInfo?.slug}/${item.slug}` : `/${item.slug}`}
                                        className={`${styles.blog__post__item} dark:bg-[#121212]`}
                                    >
                                        <div className={styles.blog__post__item__image}>
                                            {item.image && item.image.length > 0 ? (
                                                <img
                                                    className={styles.blog__post__item__image__img}
                                                    src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item.image}`}
                                                    alt={item.title}
                                                />
                                            ) : (
                                                <Image
                                                    loading="lazy"
                                                    className={styles.blog__post__item__image__img}
                                                    src={defaultPost} // default thumb
                                                    alt={item.title}
                                                />
                                            )}
                                        </div>
                                        <div className={styles.blog__post__item__info}>
                                            <a
                                                href={
                                                    item.slug ? `/${categoryInfo?.slug}/${item.slug}` : `/${item.slug}`
                                                }
                                            >
                                                <h3
                                                    className={`${styles.blog__post__item__info__title} dark:text-[#EDF0FC]`}
                                                >
                                                    {item.title}
                                                </h3>
                                            </a>
                                            <div className={styles.blog__post__item__info__time}>
                                                <div>{moment(item.created_at).format('ll')}</div>
                                                <div className="flex gap-2 items-center">
                                                    <img
                                                        className="w-5 h-5"
                                                        src={`/page/post/default_author.png`}
                                                        alt="default author"
                                                    />
                                                    <div>{`${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`}</div>
                                                </div>
                                            </div>
                                            <div className={styles.blog__post__item__info__desc}>{item.meta_desc}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                `Empty popular post for ${categoryInfo.name}.`
                            )}
                            <div className={styles.blog__post__pagination}>
                                <Pagination
                                    count={totalPage}
                                    shape="rounded"
                                    onChange={handleChangePage}
                                    sx={customPagination}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.blog__right}>
                        <CheckVisa />
                        <div className={styles.blog__most__popular}>
                            <div className={`${styles.blog__most__popular__title} dark:text-[#EDF0FC]`}>
                                Most popular
                            </div>
                            <div className={styles.blog__most__popular__list}>
                                {data && data.length > 0
                                    ? data.slice(0, 5).map((item) => (
                                          <a
                                              key={item.slug}
                                              href={item.slug ? `/${categoryInfo?.slug}/${item.slug}` : `/${item.slug}`}
                                              className={styles.blog__most__popular__item}
                                          >
                                              <div
                                                  className={`${styles.blog__most__popular__item__title} dark:text-[#EDF0FC]`}
                                              >
                                                  {item.title}
                                              </div>
                                              <div className={styles.blog__most__popular__item__time}>
                                                  {moment(item.created_at).format('lll')}
                                              </div>
                                          </a>
                                      ))
                                    : 'Empty popular post.'}
                            </div>
                        </div>
                        <WhyApplyWithUs />
                        {/* Start Component Contact Us */}
                        <ContactUs />
                        {/* End Component Contact Us */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
