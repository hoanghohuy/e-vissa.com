'use client';
import { useEffect, useState } from 'react';
import image_user_default from '/public/avatar/user_default_header.png';
import { Button, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../Header/Header.module.css';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NewOrder from '@/components/FirebaseRealTimeDb/NewOrder';

export default function AdminHeader() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const { data: session, status } = useSession();

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

    const handleMyAccount = () => {
        router.push('/my_account');
    };

    useEffect(() => {
        if (session && session.accessToken) {
            if (session.accessToken == {}) {
                signOut();
                return;
            }
        }
    }, [status]);

    return (
        <div className="h-[50px] w-full flex items-center pl-6 pr-4 justify-end">
            <div className="py-1 flex items-center gap-3">
                <NewOrder accessToken={session?.accessToken} />
                <Button
                    id="admin__btn__user"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        minWidth: 'unset !important',
                        borderRadius: '99px',
                    }}
                >
                    {session && session.user && session.user.image && session.user.image !== '' ? (
                        <img
                            style={{
                                objectFit: 'cover',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                borderImageSource: 'linear-gradient(to left, #743ad5, #d53a9d)',
                            }}
                            src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${session.user.image}`}
                            alt="avatar default"
                        />
                    ) : (
                        <Image src={image_user_default} alt="user default" className="w-7 h-7" />
                    )}
                </Button>
            </div>
            <Menu
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    marginTop: '12px',
                    '& .MuiMenu-list': {
                        padding: '8px',
                    },
                    '& .MuiMenu-paper': {
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        borderRadius: '8px',
                    },
                }}
                className={styles.menu__item__container__menu}
            >
                <div className={styles.menu__item__container}>
                    <div className="py-2 px-4 font-dmsans font-[600]">
                        Hi, {session?.user?.name && `${session?.user?.name}`}
                    </div>
                    <MenuItem onClick={handleMyAccount} className="rounded-md">
                        <Link onClick={handleClose} href={'/my_account'} style={{ width: '100%' }}>
                            <label className={styles.menu__item__title}>My account</label>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogOut} className="cursor-pointer rounded-md">
                        <label className="text-[14px] font-[500] text-[#B80000] cursor-pointer font-poppins">
                            Log out
                        </label>
                    </MenuItem>
                </div>
            </Menu>
        </div>
    );
}
