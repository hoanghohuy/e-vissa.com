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
import { useRouter } from 'next/navigation';
import './../css/custom_ckeditor.css';
import { Tooltip } from '@mui/material';
import { ToastNotify } from '../../../Page/ToastNotify/toastNotify';
import stylesAdmin from '../../Admin.module.css';
import PreviewPage from './../previewPage';
import Swal from 'sweetalert2';

export default function PostRestore({ selectedRow, accessToken, handleAfterRestore }) {
    const [open, setOpen] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(selectedRow);
    const [title, setTitle] = useState('');
    const [metaDes, setMetaDes] = useState('');
    const [postSlug, setPostSlug] = useState('');
    const [keyword, setKeyword] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [published, setPublished] = useState();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [category, setCategory] = useState([]);

    const handleClickDetail = () => {
        if (selectedRowEdit.length !== 1) {
            ToastNotify('Please select only one field to show detail.');
            return;
        }

        setTitle(selectedRow[0].title);
        setMetaDes(selectedRow[0].meta_desc);
        setPostSlug(selectedRow[0].slug);
        setKeyword(selectedRow[0].keyword);
        setContent(selectedRow[0].content);
        setImage(selectedRow[0].image);
        setPublished(selectedRow[0].published);
        setCategory(selectedRow[0].category_info);
        setOpen(true);
    };

    const handleRestore = async () => {
        try {
            const newDataEdit = {
                published: 0,
            };
            const resp = await fetch(`/api/posts/${selectedRow[0].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newDataEdit),
            });
            if (resp.status == 200) {
                ToastNotify('Updated post successfully', 'success');
                setOpen(false);
                handleAfterRestore();
            } else {
                Swal.fire({
                    title: resp.status,
                    text: resp.statusText,
                    icon: 'info',
                });
            }
        } catch (error) {
            throw error;
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
                    Restore
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullScreen>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Preview post {title} </DialogTitle>
                <DialogContent>
                    <br />
                    <PreviewPage detail={selectedRow[0]} />
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleRestore}>
                        Restore
                    </Button>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
