'use client';
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Header.module.css';
import { signOut, useSession } from 'next-auth/react';
import { Box, Button, Drawer, LinearProgress, Menu, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import moment from 'moment-timezone';
import image_user_default from '/public/avatar/user_default_header.png';
import Image from 'next/image';
import logo_svg from '/public/logo.svg';
import phone from '/public/icons/header-phone.png';
import clock from '/public/icons/header-clock.png';
import search from '/public/icons/search.svg';
import { settingsData } from '/settings';
import { ToastNotify } from '../Page/ToastNotify/toastNotify';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLoadingProgress } from '../LoadingProgress/LoadingProgress';

const Header = ({ dataCategory }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [dataSearch, setDataSearch] = useState('');
    const [state, setState] = useState({
        left: false,
    });
    const pathName = usePathname();
    const [, slug] = pathName.split('/');
    const { showProgress, progress, handleLoadingProgress } = useLoadingProgress();

    const onSubmit = (e) => {
        try {
            e.preventDefault();
            const search = parseInt(dataSearch.match(/\d+/)[0], 10);
            window.location.assign(`/check-order?order=${search}`);
        } catch (error) {
            ToastNotify('Order ID not valid!');
        }
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const RecursiveCategory = ({ category, slug, handleLoadingProgress, handleCategoryClick }) => (
        <TreeItem
            sx={{
                '.MuiTreeItem-content': {
                    padding: '0',
                    '.MuiTreeItem-iconContainer': {
                        width: 'unset',
                        marginRight: '0',
                    },
                },
                '.MuiTreeItem-content:hover': {
                    background: 'none',
                },
            }}
            nodeId={category.slug}
            label={
                <Link
                    onClick={() => handleLoadingProgress(category.slug)}
                    href={`/${category.slug}`}
                    prefetch={false}
                    className={`font-dmsans text-[15px] font-[700] text-black dark:text-[#EDF0FC] hover:text-primary ${
                        styles.header__link__sub
                    } ${category.slug === slug && styles.header__link__active}`}
                >
                    {category.name}
                </Link>
            }
        >
            {category.sub_category && category.sub_category.length > 0 && (
                <>
                    {category.sub_category.map((subItem) => (
                        <RecursiveCategory
                            key={subItem.slug}
                            category={subItem}
                            slug={slug}
                            handleLoadingProgress={handleLoadingProgress}
                            handleCategoryClick={handleCategoryClick}
                        />
                    ))}
                </>
            )}
        </TreeItem>
    );

    const MyTreeView = ({ dataCategory, slug, handleLoadingProgress, handleCategoryClick }) => (
        <TreeView
            className={styles.custom__tree}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ display: 'flex', gap: '24px' }} // Set the container to display as flex
        >
            {' '}
            {dataCategory &&
                dataCategory
                    .filter((item) => item.term === 'category')
                    .map((item, index) => (
                        <RecursiveCategory
                            key={item.slug}
                            category={item}
                            slug={slug}
                            handleLoadingProgress={handleLoadingProgress}
                            handleCategoryClick={handleCategoryClick}
                        />
                    ))}
        </TreeView>
    );

    const handleCategoryClick = (slug) => {
        handleLoadingProgress(slug);
    };

    // MENU MOBILE
    const list = (anchor) => (
        <Box sx={{ width: 300 }} role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
            <div className={styles.menu__mobile__container}>
                <div className="w-full flex items-center gap-1 pb-2">
                    <Image src={logo_svg} width={40} height={40} alt="logo" />
                    <div className="font-dmsans font-[800] text-[28px] leading-7">eVisa</div>
                </div>
                {dataCategory &&
                    dataCategory
                        .filter((cate) => cate.term == 'category')
                        .map((item, index) => (
                            <a
                                key={item.slug}
                                onClick={toggleDrawer(anchor, false)}
                                href={`/${item.slug}`}
                                className={`${styles.menu__mobile__link} ${
                                    item.slug === `/${slug}` ? styles.header__link__active : ''
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                <a
                    onClick={toggleDrawer(anchor, false)}
                    href="/contact"
                    className={`${styles.menu__mobile__link} ${'contact' === slug ? styles.header__link__active : ''}`}
                >
                    Contact
                </a>
                <a
                    onClick={toggleDrawer(anchor, false)}
                    href="/about"
                    className={`${styles.menu__mobile__link} ${'about' === slug ? styles.header__link__active : ''}`}
                >
                    About Us
                </a>
                <a
                    onClick={toggleDrawer(anchor, false)}
                    href="/faqs"
                    className={`${styles.menu__mobile__link} ${'faqs' === slug ? styles.header__link__active : ''}`}
                >
                    FAQs
                </a>
            </div>
        </Box>
    );
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        signOut();
    };

    useLayoutEffect(() => {
        setCurrentTime(moment().tz('Europe/London').format('llll'));
    }, []);

    useEffect(() => {
        if (session && session.accessToken) {
            if (session.accessToken == {}) {
                signOut();
                return;
            }
            setAccessToken(session.accessToken);
            localStorage.setItem('client_session_user_id', session.user?.id);
        }
    }, [status]);
    return (
        <header className="z-[2] mx-auto shadow-header">
            <div className="bg-[#fff] border-b-[1px] border-solid border-[#d8d8d8] xl:px-12 sm:px-8 dark:bg-[#121212] dark:border-none sx:px-5">
                <div className={styles.header__info}>
                    <div className={styles.header__info__left}>
                        <div className={styles.header__info__left__item}>
                            <Image src={phone} alt="phone" />
                            <a
                                className="text-[#222] dark:text-white"
                                href={`tel:${settingsData.siteContactPhone.replace(/\s/g, '')}`}
                            >
                                {settingsData.siteContactPhone}
                            </a>
                        </div>
                        <div className={`${styles.header__info__left__item} ${styles.mobile}`}>
                            <Image src={clock} alt="phone" />
                            <span className="text-[#222] dark:text-white">{currentTime} (GMT+1)</span>
                        </div>
                    </div>
                    <form
                        className={styles.form__checkorder__mobile}
                        onSubmit={onSubmit}
                        style={{ position: 'relative' }}
                        autoComplete="off"
                    >
                        <input
                            name="search_order"
                            placeholder="Check order..."
                            type="text"
                            autoComplete="off"
                            className={`${styles.input__check__order} dark:bg-[#3B3B3B] dark:text-[#EDF0FC] hover:border-black`}
                            onChange={(e) => setDataSearch(e.target.value)}
                        />
                        <label onClick={onSubmit} className={styles.input__check__order__icon}>
                            <Image src={search} alt="search" />
                        </label>
                    </form>
                    <div className={styles.header__info__right}>
                        <form onSubmit={onSubmit} style={{ position: 'relative' }} autoComplete="off">
                            <input
                                name="search_order"
                                placeholder="Check order..."
                                type="text"
                                autoComplete="off"
                                className={`${styles.input__check__order} dark:bg-[#3B3B3B] dark:text-[#EDF0FC]`}
                                onChange={(e) => setDataSearch(e.target.value)}
                            />
                            <button className={styles.input__check__order__icon} onClick={onSubmit}>
                                <Image src={search} alt="search" />
                            </button>
                        </form>
                        <Link
                            href="/about"
                            className="font-inter text-[#222] text-[13px] font-[400] dark:text-white hover:underline"
                            onClick={() => handleLoadingProgress('about')}
                        >
                            About us
                        </Link>
                        <Link
                            href="/faqs"
                            className="font-inter text-[#222] text-[13px] font-[400] dark:text-white hover:underline"
                            onClick={() => handleLoadingProgress('faqs')}
                        >
                            FAQs
                        </Link>
                        <Link
                            href="/contact"
                            className="font-inter text-[#222] text-[13px] font-[400] dark:text-white hover:underline"
                            onClick={() => handleLoadingProgress('contact')}
                        >
                            Contact
                        </Link>
                        {/* <DarkModeToggle /> */}
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#fcfcfd] dark:bg-[#1D1D1E]">
                {showProgress && <LinearProgress variant="determinate" value={progress} />}
                <div className={styles.header__main}>
                    <div className={styles.header__main__left}>
                        <Link href="/" className={styles.header__link__logo}>
                            <Image src={logo_svg} alt={'logo'} />
                            <div className="font-dmsans text-black2 font-[700] text-[24px] dark:text-white">eVisa</div>
                        </Link>
                        <div className="w-[1px] h-8 bg-[#e6e8ec] xl:hidden"></div>
                        <MyTreeView
                            dataCategory={dataCategory}
                            slug={slug}
                            handleLoadingProgress={handleLoadingProgress}
                            handleCategoryClick={handleCategoryClick}
                        />
                    </div>
                    <div className={styles.header__main__right}>
                        {accessToken == '' && (
                            <div className="flex gap-2">
                                <Link
                                    href={'/login'}
                                    className="h-9 leading-9 px-5 bg-primary rounded-lg text-white font-dmsans transition-all duration-300 sm:w-full hover:bg-[#2955bf]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={'/register'}
                                    className="text-primary h-9 leading-9 px-5 border-[1px] border-primary rounded-lg font-dmsans transition-all hover:bg-[#E9F0FF] duration-300 sx:hidden"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                        {accessToken !== '' && (
                            <>
                                <Button
                                    sx={{
                                        padding: '2px 2px 2px 8px',
                                        minWidth: 'unset',
                                        '&.MuiButton-root': {
                                            textTransform: 'none',
                                        },
                                        '&.MuiButton-root:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                    id="user-menu"
                                    aria-controls={open ? 'user-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {session?.user?.name && (
                                        <div className="pr-2 text-[16px] font-dmsans text-black font-[600] text-md sx:hidden">
                                            Hi, {session?.user?.name}
                                        </div>
                                    )}
                                    {session && session.user && session.user.image && session.user.image !== '' ? (
                                        <img
                                            style={{
                                                objectFit: 'cover',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                            }}
                                            src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${session.user.image}`}
                                            alt="avatar default"
                                        />
                                    ) : (
                                        <Image
                                            src={image_user_default}
                                            alt="user default"
                                            style={{ width: '36px', height: '36px' }}
                                        />
                                    )}
                                </Button>
                                <Menu
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    id="user-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'user-menu',
                                    }}
                                    sx={{
                                        marginTop: '12px',
                                        '& .MuiMenu-list': {
                                            padding: '8px',
                                        },
                                        '& .MuiMenu-paper': {
                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                        },
                                    }}
                                    className={styles.menu__item__container__menu}
                                >
                                    <div className={styles.menu__item__container}>
                                        {accessToken !== '' && session?.user?.role !== 'guest' && (
                                            <MenuItem className="rounded-md">
                                                <a
                                                    onClick={handleClose}
                                                    href={'/admin'}
                                                    className="flex items-center gap-2"
                                                    style={{ width: '100%' }}
                                                >
                                                    <label className={styles.menu__item__title}>Admin</label>
                                                </a>
                                            </MenuItem>
                                        )}
                                        <MenuItem className="rounded-md">
                                            <a onClick={handleClose} href={'/my_account'} style={{ width: '100%' }}>
                                                <label className={styles.menu__item__title}>My account</label>
                                            </a>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogOut} className="rounded-md">
                                            <label className="text-[14px] font-inter font-[500] text-[#B80000] cursor-pointer">
                                                Log out
                                            </label>
                                        </MenuItem>
                                    </div>
                                </Menu>
                            </>
                        )}
                        {/* ICON TOGGLE MENU MOBILE */}
                        <div className={styles.header__menu__mobile}>
                            <button
                                className={styles.header__menu__mobile__button}
                                onClick={toggleDrawer('left', true)}
                            >
                                <img src={'/icons/mobile-menu-icon.svg'} alt="menu mobile" />
                            </button>
                            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                                {list('left')}
                            </Drawer>
                        </div>
                        {/* END ICON TOGGLE MENU MOBILE */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
