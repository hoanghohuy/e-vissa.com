'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, CircularProgress, Grid, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import stylesUpload from '../../admin/posts/css/Post.module.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import stylesAdmin from '../Admin.module.css';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { isSuccessStatus } from '@/utils/validation';

export default function ModuleAdd({ onAdd, token, handleAfterUpload }) {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [loadingAdd, setLoadingAdd] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setSelectedFile();
        setSelectedImage('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddModule = () => {
        if (1 !== 1) {
            const newData = {};
            // onAdd(newData);
            setOpen(false);
        } else {
            toast.error('Please complete all information (*) required.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            ToastNotify('Please select a file.');
            return;
        }
        try {
            setLoadingAdd(true);
            let fd = new FormData();
            fd.append('images', selectedFile);
            const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: fd,
            });
            if (isSuccessStatus(resp.status)) {
                ToastNotify('Upload sucessfully', 'success');
                setOpen(false);
                handleAfterUpload();
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingAdd(false);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                disableElevation
                onClick={handleClickOpen}
                className={stylesSystem.admin__button__primary}
            >
                Upload
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Upload image</DialogTitle>
                <DialogContentText></DialogContentText>
                <DialogContent>
                    <Grid item lg={12} xs={12} md={12} sm={12}>
                        <div className="pl-[16px] flex gap-2">
                            <div className={stylesUpload.preview__image}>
                                {selectedImage ? (
                                    <>
                                        <img
                                            style={{
                                                objectFit: 'cover',
                                                width: '280px',
                                                height: '180px',
                                                border: '1px solid #ccc',
                                                padding: '4px',
                                                borderRadius: '4px',
                                            }}
                                            src={selectedImage}
                                            alt="avatar default"
                                        />
                                        <button
                                            className={stylesUpload.btn__close}
                                            onClick={(e) => {
                                                setSelectedFile();
                                                setSelectedImage();
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                fontSize={'28px'}
                                                color="var(--primary-color)"
                                                icon={faSquareXmark}
                                            />
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-[280px] h-[180px] border-[1px] border-gray-300 border-dashed flex items-center justify-center">
                                        No image selected
                                    </div>
                                )}
                            </div>
                            <input
                                required
                                style={{ display: 'none' }}
                                type="file"
                                size="small"
                                fullWidth
                                id="upload_image"
                                // label={'Image'}
                                name="upload_image"
                                accept="image/*"
                                onChange={({ target }) => {
                                    if (target.files) {
                                        const file = target.files[0];
                                        if (file) {
                                            setSelectedImage(URL ? URL?.createObjectURL(file) : '');
                                            setSelectedFile(file);
                                        }
                                    }
                                }}
                            />
                            <div className="flex items-start flex-col justify-center">
                                <div className="font-bold">{selectedFile && `${selectedFile?.name}`}</div>
                                <label className={stylesUpload.label__upload} for="upload_image">
                                    <DriveFolderUploadIcon /> Select...
                                </label>
                                <span className="text-sm">(Supported image types are: jpg, jpeg, png, jfif)</span>
                            </div>
                        </div>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    {loadingAdd ? (
                        <Button className={stylesSystem.admin__button__primary}>
                            <CircularProgress className="!h-[20px] !w-[20px] !text-white" />
                        </Button>
                    ) : (
                        <Button className={stylesSystem.admin__button__primary} onClick={handleUpload}>
                            Upload
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
