'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Box, DialogContentText, Grid, Tooltip } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import stylesAdmin from '../Admin.module.css';
import './css/custom_ckeditor.css';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import alt from '/public/guidance/post/alt.gif';
import Image from 'next/image';
import { customDialogTransition } from '@/components/Page/CustomMUI/customMUI';

export default function PostGuide({ accessToken, onAdd, newTab, categoryProps }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [metaDes, setMetaDes] = useState('');
    const [postSlug, setPostSlug] = useState('');
    const [keyword, setKeyword] = useState('');
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [published, setPublished] = useState(1);
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [valueTab, setValueTab] = React.useState('1');
    const router = useRouter();
    const editorRef = useRef(null);
    const handleClickOpen = () => {
        if (newTab) {
            // router.push('admin/dashboard/posts/add');
        } else {
            setListCategory(categoryProps);
            setOpen(true);
        }
    };

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Tooltip title="Instruction Document" placement="top">
                <Button className={stylesSystem.admin__button__primary} variant="contained" onClick={handleClickOpen}>
                    Instruction document
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xl'}
                fullWidth
                disableEnforceFocus
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Instruction document</div>
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
                <DialogContentText></DialogContentText>
                <DialogContent>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            <Grid item lg={12} xs={12} md={12} sm={12}>
                                <h3>Add "Alt" Text or Edit Size for a image:</h3>
                                <Image src={alt} style={{ width: '100%', height: 'auto' }} />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
