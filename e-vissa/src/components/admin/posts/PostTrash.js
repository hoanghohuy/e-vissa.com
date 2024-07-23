'use client';
import stylesSystem from '@/app/page.module.css';
import stylesUpload from './css/Post.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import {
    Autocomplete,
    Box,
    Checkbox,
    CircularProgress,
    DialogContentText,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Tooltip,
} from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import stylesAdmin from '../Admin.module.css';
import './css/custom_ckeditor.css';
import FileLibrary from '../../FileLibrary/FileLibrary.js';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify.js';
import { validateSlug } from '../../../utils/validation.js';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import slugify from 'slugify';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { customDataGrid, customSelect } from '@/components/Page/CustomMUI/customMUI';
import { columns } from './PostModel';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import PostRestore from './Trash/PostRestore';
import moment from 'moment';
import Swal from 'sweetalert2';
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function PostTrash({ data, accessToken, onAdd, newTab, categoryProps, handleAfterRestoreTable }) {
    const [open, setOpen] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
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
    const [valueTab, setValueTab] = useState('1');
    const editorRef = useRef(null);

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 110,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title={'Post restore'}>
                            <PostRestore
                                selectedRow={[params.row]}
                                accessToken={accessToken}
                                handleAfterRestore={handleAfterRestore}
                            />
                        </Tooltip>
                    }
                    label="Delete"
                />,
            ],
        },
        // { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Post title', width: 400 },
        {
            field: 'category_info',
            headerName: 'Category',
            width: 130,
            renderCell: (params) => {
                const list = params.value;
                const nameList = list.map((item) => item.name);
                const nameString = nameList.join(', ');
                return nameString;
            },
        },
        // { field: 'meta_desc', headerName: 'Description (meta description)', width: 250 },
        // { field: 'keyword', headerName: 'Keywords', width: 200 },
        // { field: 'content', headerName: 'Content', width: 200 },
        {
            field: 'image',
            headerName: 'Thumbnail',
            width: 140,
            renderCell: (params) => {
                return params.value ? (
                    <img
                        onClick={(params) => onShowThumbnail(params)}
                        style={{ border: '1px solid #ccc' }}
                        className="w-auto h-[40px] object-cover"
                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${params.value}`}
                    />
                ) : (
                    ''
                );
            },
        },
        { field: 'author', headerName: 'Author', width: 160 },
        {
            field: 'published',
            headerName: 'Status',
            renderCell: (params) => {
                return (
                    <div className={`${params.value == '1' ? stylesAdmin.published : stylesAdmin.unPublished}`}>
                        {params.value == '1' ? 'Published' : params.value == '0' ? 'Disabled' : 'Draft'}
                    </div>
                );
            },
            width: 120,
        },
        {
            field: 'created_at',
            headerName: 'Created at',
            width: 160,
            renderCell: (params) => {
                return <div>{moment(params.value).format('HH:mm:ss - DD/MM/YYYY')}</div>;
            },
        },
        {
            field: 'updated_at',
            headerName: 'Updated at',
            width: 160,
            renderCell: (params) => {
                return <div>{moment(params.value).format('HH:mm:ss - DD/MM/YYYY')}</div>;
            },
        },
    ];
    const handleClickOpen = () => {
        if (newTab) {
            // router.push('admin/dashboard/posts/add');
        } else {
            setListCategory(categoryProps);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAfterRestore = () => {
        setOpen(false);
        handleAfterRestoreTable();
    };

    const onShowThumbnail = (params) => {
        console.log(params.target?.currentSrc);
        Swal.fire({
            imageUrl: `${params.target.currentSrc}`,
            imageAlt: 'link',
            showConfirmButton: false,
            customClass: {
                popup: 'p-4',
                image: 'm-0',
            },
        });
    };

    return (
        <div style={{ position: 'relative' }}>
            <Tooltip title="SHOW TRASH">
                <Button className={stylesSystem.admin__button__danger} variant="contained" onClick={handleClickOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M5.5 5.5C5.77614 5.5 6 5.72386 6 6V12C6 12.2761 5.77614 12.5 5.5 12.5C5.22386 12.5 5 12.2761 5 12V6C5 5.72386 5.22386 5.5 5.5 5.5Z"
                            fill="white"
                        />
                        <path
                            d="M8 5.5C8.27614 5.5 8.5 5.72386 8.5 6V12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12V6C7.5 5.72386 7.72386 5.5 8 5.5Z"
                            fill="white"
                        />
                        <path
                            d="M11 6C11 5.72386 10.7761 5.5 10.5 5.5C10.2239 5.5 10 5.72386 10 6V12C10 12.2761 10.2239 12.5 10.5 12.5C10.7761 12.5 11 12.2761 11 12V6Z"
                            fill="white"
                        />
                        <path
                            d="M14.5 3C14.5 3.55228 14.0523 4 13.5 4H13V13C13 14.1046 12.1046 15 11 15H5C3.89543 15 3 14.1046 3 13V4H2.5C1.94772 4 1.5 3.55228 1.5 3V2C1.5 1.44772 1.94772 1 2.5 1H6C6 0.447715 6.44772 0 7 0H9C9.55229 0 10 0.447715 10 1H13.5C14.0523 1 14.5 1.44772 14.5 2V3ZM4.11803 4L4 4.05902V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V4.05902L11.882 4H4.11803ZM2.5 3H13.5V2H2.5V3Z"
                            fill="white"
                        />
                    </svg>
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xl'}
                fullWidth
                disableEnforceFocus
                fullScreen
                disableEscapeKeyDown
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Trash</div>
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
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                        <DataGrid
                            sx={customDataGrid}
                            autoHeight
                            // onRowSelectionModelChange={handleSelectRow}
                            // loading={loading}
                            rows={data}
                            columns={columns}
                        />
                    </Grid>
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
