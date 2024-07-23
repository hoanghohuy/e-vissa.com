import DialogActions from '@mui/material/DialogActions';
import { Alert, Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import React, { useState } from 'react';
import stylesSystem from '@/app/page.module.css';
import styles from './FileLibrary.module.css';
import stylesUpload from '../admin/posts/css/Post.module.css';
import Image from 'next/image';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';
import { ToastNotify } from '../Page/ToastNotify/toastNotify';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import stylesAdmin from '../admin/Admin.module.css';

export default function FileLibrary({ token }) {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleSelectImage = (item) => {
        const text = `${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item}`;
        navigator.clipboard.writeText(text);
        ToastNotify('Copied image! Paste it on your editor.', 'success');
        setOpen(false);
    };

    const getAllImage = async () => {
        const images = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const data = await images.json();
        setList(data.uploadedImageNames);
    };
    const handleClickOpen = () => {
        setOpen(true);
        getAllImage(token);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onUpload = async (file) => {
        if (file) {
            let fd = new FormData();
            Object.keys(file).map((item) => {
                fd.append('images', file[item]);
            });
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                    },
                    body: fd,
                });
                if (resp.status != 200) {
                    ToastNotify('Notice: Max file: 10, Max size: 5MB');
                    return;
                }
                const respJson = await resp.json();
                const pathImagePost = await respJson?.uploadedImageNames;
                let copyList = [...list];
                pathImagePost.map((image) => {
                    copyList.unshift(image);
                });
                setList(copyList);
            } catch (error) {
                ToastNotify('Notice: Max file: 10, Max size: 5MB');
                return;
            }
        }
    };
    return (
        <>
            <Button
                variant="outlined"
                disableElevation
                onClick={handleClickOpen}
                className={styles.file__library__button}
            >
                <FontAwesomeIcon icon={faImage} style={{ marginRight: '4px' }} /> <div>Add media</div>
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>File library</div>
                        <div>
                            <Button className="min-w-0" onClick={handleClose}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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
                    <>
                        <Alert style={{ marginTop: '16px' }} icon={false} severity="warning">
                            Upload: Max file: 10, Max size: 5MB, Recommended resolution: 700x450 pixels. Click image and
                            paste it on your editor
                        </Alert>
                        <div className={styles.list__image}>
                            {list &&
                                list.length > 0 &&
                                list.map((item, index) => (
                                    <div className={styles.image__item}>
                                        <img
                                            onClick={() => handleSelectImage(item)}
                                            className={styles.image__item__img}
                                            src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${item}`}
                                        />
                                        <label className="absolute bottom-0 bg-black/[.5] w-full text-[10px] text-white">
                                            {item.split('_') && item.split('_').length > 1 && item.split('_')[1]}
                                        </label>
                                    </div>
                                ))}
                            {/* <Grid item lg={1} xs={2} sm={2} md={2}>
                                <div className={styles.image__item}>
                                    {selectedImage ? (
                                        <img
                                            className={styles.image__item__img}
                                            src={selectedImage}
                                            alt="avatar default"
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Grid> */}
                        </div>
                    </>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Grid
                        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                        item
                        lg={12}
                        xs={12}
                        md={12}
                        sm={12}
                    >
                        <input
                            className={stylesSystem.admin__button__primary}
                            required
                            style={{ display: 'none' }}
                            type="file"
                            size="small"
                            fullWidth
                            id="new_image_library"
                            // label={'Image'}
                            name="upload_image"
                            multiple
                            accept="image/*"
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files;
                                    if (file) {
                                        onUpload(file);
                                    }
                                }
                            }}
                        />
                        <label
                            className={stylesUpload.label__upload}
                            style={{ marginLeft: '8px', width: '160px' }}
                            for="new_image_library"
                        >
                            <DriveFolderUploadIcon /> Upload image
                        </label>
                    </Grid>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
}
