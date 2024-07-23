'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { usePathname } from 'next/navigation';
import { links } from './dataSidebar';
import styles from './AdminSidebar.module.css';
import { useSession } from 'next-auth/react';
import { roleData } from '@/dbx/e-vissa/models/data/role_data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '/public/logo.svg';
import Image from 'next/image';

export default function AdminSidebar() {
    const pathName = usePathname();
    const [linkPermissions, setLinkPermissions] = useState([]);
    const [expanded, setExpanded] = useState(['user', 'visa', 'post']);
    const { data: session, status } = useSession();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
    };

    useEffect(() => {
        if (session && session.accessToken) {
            const role = session?.user?.role;
            const listPermissionObj = roleData.data.find((item) => item.value == role);
            if (listPermissionObj) {
                const listPermission = listPermissionObj.permissions;
                const filteredArray = links.filter((obj) => listPermission.includes(obj.name));
                setLinkPermissions(filteredArray);
            }
        }
    }, [status]);

    return (
        <>
            <aside className={styles.admin__sidebar__list}>
                <a href="/" className={'h-[50px] pl-4 flex items-center gap-2'}>
                    <Image className={styles.logo__sidebar} src={logo} width={24} height={24} alt="logo-admin" />
                    <label className={styles.logo__name}>Evisa</label>
                </a>
                <div className="px-3">
                    {linkPermissions &&
                        linkPermissions.length > 0 &&
                        // GET LIST PARENT => MAPPING ACCORDITION BY PARRENT
                        [...new Set(linkPermissions.map((link) => link.parent))].map((parrentItem, index) => (
                            <Accordion
                                key={parrentItem}
                                sx={{
                                    border: `none`,
                                    boxShadow: 'none',
                                    '&.MuiAccordion-root.Mui-expanded': {
                                        margin: '0',
                                    },
                                    '&:before': {
                                        display: 'none',
                                    },
                                }}
                                expanded={expanded.includes(parrentItem) ? true : false}
                                onChange={handleChange(parrentItem)}
                                className={styles.customAccordionSidebar}
                            >
                                <AccordionSummary
                                    sx={{
                                        minHeight: '40px',
                                        padding: '0 8px',
                                        '&.MuiAccordionSummary-root': {
                                            borderRadius: '4px',
                                            '&.Mui-expanded': {
                                                minHeight: 'unset',
                                                // backgroundColor: '#E0F3FF',
                                            },
                                            '& .MuiAccordionSummary-content': {
                                                margin: '8px 0',
                                                '&.Mui-expanded': {
                                                    margin: '8px 0',
                                                },
                                            },
                                        },
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={parrentItem}
                                    id={parrentItem}
                                    className={styles.preview__preview__item__container__summary}
                                >
                                    <div className="font-inter font-bold capitalize sx:hidden">{parrentItem}</div>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        padding: '0',
                                    }}
                                >
                                    {linkPermissions && linkPermissions.length > 0
                                        ? linkPermissions
                                              .filter((parent) => parent.parent === parrentItem)
                                              .map((itemChild, index) => (
                                                  <Link
                                                      className={`flex gap-2 items-center rounded-lg pl-2 py-[8px] my-1 hover:bg-[#eee] ${
                                                          pathName == itemChild.url && 'bg-[#EFEFEF]'
                                                      }`}
                                                      key={itemChild.name}
                                                      href={itemChild.url}
                                                  >
                                                      <div>{itemChild.icon}</div>
                                                      <div
                                                          className={`font-inter font-[600] text-[13px] text-[#6F767E] ${
                                                              pathName == itemChild.url ? '!text-[#1A1D1F]' : ''
                                                          } sx:hidden`}
                                                      >
                                                          {itemChild.title}
                                                      </div>
                                                  </Link>
                                              ))
                                        : 'Loading'}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </div>
            </aside>
        </>
    );
}
