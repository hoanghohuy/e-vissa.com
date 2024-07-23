'use client';
import Image from 'next/image';
import defaultPost from '/public/page/post/default_image_thuml.png';
import styles from '@/app/page.module.css';
import Link from 'next/link';
import moment from 'moment';
import Slider from 'react-slick';
import ButtonApply from '../../ButtonApply/ButtonApply';
import { Skeleton } from '@mui/material';
import { useGetAllPostsQuery } from '@/redux/services/client/post';

const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1392,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

export default function EvisaNewsPage() {
    const { data: listNews, isLoading } = useGetAllPostsQuery({ page: 1, limit: 10 });

    return (
        <div className={`${styles.page__news} dark:bg-[#121212]`}>
            <div className={styles.page__news__container}>
                <h2 className={`${styles.page__news__title} dark:text-[#EDF0FC]`}>Evisa News</h2>
                <div className={styles.page__news__item__container}>
                    <div className={`w-full h-auto`}>
                        {!isLoading ? (
                            <Slider {...settings}>
                                {listNews &&
                                    listNews.data &&
                                    listNews.data.length > 0 &&
                                    listNews.data.map((item) => (
                                        <div key={item.slug} className="pr-6">
                                            <a
                                                href={
                                                    item.category_info?.length > 0
                                                        ? `/${item.category_info[0]?.slug}/${item.slug}`
                                                        : `/${item.slug}`
                                                }
                                                key={item.slug}
                                                className={styles.page__news__item}
                                            >
                                                {item.image && item.image.length > 0 ? (
                                                    <img
                                                        loading="lazy"
                                                        className={styles.page__news__item__image}
                                                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item.image}`}
                                                        // src={item.image} // thumb post
                                                        alt={item.title}
                                                    />
                                                ) : (
                                                    <Image
                                                        className={styles.page__news__item__image}
                                                        src={defaultPost}
                                                        alt="default image post"
                                                    />
                                                )}
                                                <div className={styles.page__news__item__text}>
                                                    <div
                                                        className={`${styles.page__news__item__title} dark:text-[#EDF0FC]`}
                                                    >
                                                        {item.title}
                                                    </div>
                                                    <div className={styles.page__news__item__date}>
                                                        {moment(item.created_at).format('LL')}
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                            </Slider>
                        ) : (
                            <div className="w-full flex gap-4">
                                <Skeleton
                                    className="w-[25%] xl:w-[33.333%] md:w-[50%]"
                                    sx={{ height: 200, borderRadius: '12px' }}
                                    animation="wave"
                                    variant="rectangular"
                                />
                                <Skeleton
                                    className="w-[25%] xl:w-[33.333%] md:w-[50%]"
                                    sx={{ height: 200, borderRadius: '12px' }}
                                    animation="wave"
                                    variant="rectangular"
                                />
                                <Skeleton
                                    className="w-[25%] xl:w-[33.333%] md:hidden"
                                    sx={{ height: 200, borderRadius: '12px' }}
                                    animation="wave"
                                    variant="rectangular"
                                />
                                <Skeleton
                                    className="w-[25%] xl:hidden"
                                    sx={{ height: 200, borderRadius: '12px' }}
                                    animation="wave"
                                    variant="rectangular"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.page__news__more}>
                    <Link href={'/posts'}>
                        <ButtonApply type={'secondary'} title={'Explore more'} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
