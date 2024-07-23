'use client';
import { useState } from 'react';
import styles from './Blog.module.css';
import Image from 'next/image';
import defaultPost from '/public/page/post/default_image_thuml.png';
import { Pagination } from '@mui/material';
import PostSkeleton from '@/components/Page/Skeleton/PostSkeleton';
import moment from 'moment';
import ContactUs from '@/components/Page/ChildComponent/Post/ContactUs/contactUs';
import { settingsData } from '/settings';
import CheckVisa from '@/components/Page/CheckVisa/checkVisa';
import WhyApplyWithUs from '@/components/Page/WhyApplyWithUs/whyApplyWithUs';
import { customPagination } from '@/components/Page/CustomMUI/customMUI';
import { useGetAllPostsQuery } from '@/redux/services/client/post';

export default function BlogPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = settingsData.defaultLimitPagination;
    const { data, isLoading } = useGetAllPostsQuery({ page: currentPage, limit: limit });

    const handleChangePage = (event, value) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setCurrentPage(value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.blog__container}>
                <div className={styles.blog__main}>
                    <h1 className={styles.blog__main__title}>Recent post</h1>
                    <div className={styles.blog__post__container}>
                        {isLoading ? (
                            <PostSkeleton />
                        ) : data.data && data.data.length > 0 ? (
                            data.data.map((item) => (
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
                                        <div>
                                            <h3 className={styles.blog__post__item__info__title}>{item.title}</h3>
                                        </div>
                                        <div className={styles.blog__post__item__info__time}>
                                            {moment(item.created_at).format('DD/MM/YYYY HH:mm')} by{' '}
                                            {`${item.created_by_info?.first_name} ${item.created_by_info?.last_name}`}
                                        </div>
                                        <div className={styles.blog__post__item__info__desc}>{item.meta_desc}</div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            'Empty recent post.'
                        )}
                        <div className={styles.blog__post__pagination}>
                            <Pagination
                                count={data?.pagination.totalPages}
                                shape="rounded"
                                onChange={handleChangePage}
                                color="primary"
                                sx={customPagination}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.blog__right}>
                    <CheckVisa />
                    <div className={styles.blog__most__popular}>
                        <div className={styles.blog__most__popular__title}>Most popular</div>
                        <div className={styles.blog__most__popular__list}>
                            {data && data.length > 0
                                ? data.slice(0, 5).map((item) => (
                                      <a
                                          href={
                                              item.category_info?.length > 0
                                                  ? `/${item.category_info[0]?.slug}/${item.slug}`
                                                  : `/${item.slug}`
                                          }
                                          className={styles.blog__most__popular__item}
                                      >
                                          <div className={styles.blog__most__popular__item__title}>{item.title}</div>
                                          <div className={styles.blog__most__popular__item__time}>
                                              {moment(item.created_at).format('DD/MM/YYYY HH:mm')}
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
    );
}
