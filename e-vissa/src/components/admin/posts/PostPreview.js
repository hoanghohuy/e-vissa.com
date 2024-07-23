'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import stylesSystem from '@/app/page.module.css';
import './css/custom_ckeditor.css';
import { Tooltip } from '@mui/material';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import stylesAdmin from '../Admin.module.css';
import PreviewPage from './previewPage';
import { customDialogTransition } from '@/components/Page/CustomMUI/customMUI';

export default function PostPreview({ selectedRow }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [postSlug, setPostSlug] = useState('');

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            ToastNotify('Please select only one field to show detail.');
            return;
        }

        setPostSlug(selectedRow[0].slug);
        setOpen(true);
    };

    const handleLink = () => {
        window.open(`/admin/posts/${postSlug}`, '_blank');
    };

    const handlePublicLink = () => {
        const categoryList = selectedRowEdit[0]?.category_info;
        if (categoryList.length !== 0) {
            const categoryPost = categoryList[0]?.slug;
            window.open(`/${categoryPost}/${postSlug}`, '_blank');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedRowEdit(selectedRow);
    }, [selectedRow]);

    return (
        <div>
            <Tooltip title="VIEW THIS POST" placement="top">
                <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickDetail}>
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xl'}
                fullScreen
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Preview post {selectedRow[0].title}</div>
                        <div>
                            <Button className="min-w-0" onClick={handleClose}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                >
                                    <path
                                        d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L4 3.29289L6.64645 0.646447C6.84171 0.451184 7.15829 0.451184 7.35355 0.646447C7.54882 0.841709 7.54882 1.15829 7.35355 1.35355L4.70711 4L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L4 4.70711L1.35355 7.35355C1.15829 7.54882 0.841709 7.54882 0.646447 7.35355C0.451184 7.15829 0.451184 6.84171 0.646447 6.64645L3.29289 4L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                                        fill="white"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <br />
                    <PreviewPage detail={selectedRow[0]} />
                </DialogContent>
                <DialogActions style={{ paddingRight: '12px', borderTop: '1px solid #ccc' }}>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleLink}>
                        View Internal Link
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handlePublicLink}>
                        View Public Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
