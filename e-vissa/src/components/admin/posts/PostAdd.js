'use client';
import stylesSystem from '@/app/page.module.css';
import stylesUpload from './css/Post.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import {
    Autocomplete,
    Checkbox,
    CircularProgress,
    DialogContentText,
    FormControlLabel,
    Grid,
    InputAdornment,
    Tooltip,
} from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import stylesAdmin from '../Admin.module.css';
import './css/custom_ckeditor.css';
import FileLibrary from '../../FileLibrary/FileLibrary.js';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import { validateSlug } from '../../../utils/validation';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import slugify from 'slugify';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { customDialogTransition, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import { handleAddIdForHeading } from './functions/PostFunction.js';
import StatusPost from '../Status/StatusPost.js';
import FaqComponent from './FaqComponent';
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function PostAdd({ accessToken, newTab, categoryProps, handleAfterAdd }) {
    const [open, setOpen] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [title, setTitle] = useState('');
    const [metaDes, setMetaDes] = useState('');
    const [postSlug, setPostSlug] = useState('');
    const [keyword, setKeyword] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [published, setPublished] = useState(1);
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [checkSlug, setcheckSlug] = useState('');
    const [faqsList, setFaqsList] = useState({ published: 0, data: [{ id: 1, q: '', a: '' }] });
    const editorRef = useRef(null);

    useEffect(() => {
        // Using a setTimeout to get the latest text after a delay
        const timeoutId = setTimeout(async () => {
            if (postSlug.length === 0) {
                setcheckSlug('');
                return () => clearTimeout(timeoutId);
            }

            const resp = await fetch(`/api/admin/posts/${postSlug}`, {
                method: 'GET',
                headers: {
                    Authorization: accessToken,
                },
            });
            if (resp.status === 200 && resp.ok === true) {
                setcheckSlug('green');
            } else {
                setcheckSlug('red');
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [postSlug]);

    const handlePostSlugChange = (e) => {
        const newText = e.target.value.replace(/\s/g, ''); // Remove spaces using a regular expression
        setPostSlug(newText);
    };

    const handleTitleChange = (e) => {
        const text = e.target.value;
        setTitle(text);

        const textSlug = slugify(text, {
            locale: 'vi',
            trim: true,
            remove: /[*+~.()'"!:;<>@]/g,
        });
        setPostSlug(`${textSlug.toLowerCase()}.html`);
    };

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

    const handleAddPost = async () => {
        if (title.trim() == '') {
            ToastNotify('Please enter post title.');
            return;
        }
        if (!validateSlug(postSlug)) {
            ToastNotify('Post slug is not valid');
            return;
        }

        if (category.length == 0) {
            ToastNotify('Please enter post category');
            return;
        }
        const copyContent = editorRef.current.getContent();
        const dataHeadingsAndContents = handleAddIdForHeading(copyContent);
        const heading_tags = dataHeadingsAndContents.heading_tags
            ? JSON.stringify(dataHeadingsAndContents.heading_tags)
            : null;
        const validTitle = title.trim().replace(/\s{2,}/g, ' ');
        const validSlug = postSlug.replace(/\s/g, '');
        const newData = {
            title: validTitle,
            meta_desc: metaDes,
            slug: validSlug,
            keyword: keyword,
            content: dataHeadingsAndContents.newContent,
            heading_tags,
            image: '',
            file: selectedFile,
            cat_ids: category.map((obj) => obj.id),
            published: published,
            faq: JSON.stringify(faqsList),
        };
        try {
            setLoadingAdd(true);
            let fd = new FormData();
            fd.append('images', newData.file);
            const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
                method: 'POST',
                headers: {
                    Authorization: accessToken,
                },
                body: fd,
            });
            const respJson = await resp.json();
            const pathImagePost = await respJson?.uploadedImageNames?.[0];
            newData.image = pathImagePost;
            const respAddPost = await fetch(`/api/admin/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newData),
            });
            if (respAddPost.status == 201) {
                setOpen(false);
                handleAfterAdd();
            } else {
                const err = await respAddPost.json();
                ToastNotify(err.error);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingAdd(false);
        }
    };

    const handleToggleFaq = (e) => {
        let currentFaq = Object.assign({}, faqsList);
        currentFaq.published = e.target.checked ? 1 : 0;
        setFaqsList(currentFaq);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Tooltip title="ADD NEW POST" placement="top">
                <Button className={stylesSystem.admin__button__primary} variant="contained" onClick={handleClickOpen}>
                    New post
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
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>New post</div>
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
                        {/* LEFT LAYOUT */}
                        <Grid item xl={10} lg={9} xs={12} md={12} sm={12}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                                <Grid item xl={8} lg={8} xs={12} md={12} sm={12}>
                                    <label className={stylesAdmin.admin__label__required}>Title:</label>
                                    <TextField
                                        autoFocus
                                        sx={customTextFieldAdmin}
                                        placeholder="Enter title here"
                                        value={title}
                                        fullWidth
                                        size="small"
                                        // label={<label className={stylesSystem.required}>Post title</label>}
                                        type="text"
                                        variant="outlined"
                                        onChange={handleTitleChange}
                                    />
                                </Grid>
                                <Grid item xl={4} lg={4} xs={12} md={12} sm={12}>
                                    <label className={stylesAdmin.admin__label__required}>
                                        Link (auto generated by title):
                                    </label>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter title to genarate link"
                                        size="small"
                                        // label={<label className={stylesSystem.required}>Post slug (link)</label>}
                                        type="text"
                                        variant="outlined"
                                        value={postSlug}
                                        onChange={handlePostSlugChange}
                                        sx={customTextFieldAdmin}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CheckCircleOutlineOutlinedIcon style={{ color: checkSlug }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12} md={12} sm={12}>
                                    <label className={stylesAdmin.admin__label}>Descriptions:</label>
                                    <TextField
                                        size="small"
                                        placeholder="Enter description here"
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        value={metaDes}
                                        onChange={(e) => setMetaDes(e.target.value)}
                                        sx={customTextFieldAdmin}
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12} md={12} sm={12}>
                                    <label className={stylesAdmin.admin__label}>Keywords:</label>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type="text"
                                        placeholder="Enter keywords here"
                                        variant="outlined"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        sx={customTextFieldAdmin}
                                    />
                                </Grid>
                                <Grid item lg={12} xs={12} md={12} sm={12}>
                                    <br />
                                    <div style={{ marginBottom: '4px' }}>
                                        <FileLibrary token={accessToken} />
                                    </div>
                                    <Editor
                                        onInit={(evt, editor) => (editorRef.current = editor)}
                                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                        init={{
                                            // file_browser_callback_types: 'file image media',
                                            // automatic_uploads: true,
                                            // file_picker_types: 'file image media',
                                            // images_upload_handler: example_image_upload_handler,
                                            // paste_data_images: true,
                                            // smart_paste: true,
                                            // init_instance_callback: 'insert_contents',
                                            // images_upload_url: true,
                                            // paste_data_images: true,
                                            image_dimensions: true,
                                            image_advtab: true,
                                            image_title: true,
                                            object_resizing: 'img',
                                            resize_img_proportional: true,
                                            image_class_list: [{ title: 'Watermark', value: 'watermark' }],
                                            height: 800,
                                            menubar: true,
                                            plugins: [
                                                'advlist',
                                                'lists',
                                                'link',
                                                'image',
                                                'charmap',
                                                'preview',
                                                'anchor',
                                                'searchreplace',
                                                'visualblocks',
                                                'fullscreen',
                                                'insertdatetime',
                                                'media',
                                                'table',
                                                'help',
                                                'wordcount',
                                            ],
                                            toolbar:
                                                'undo redo casechange blocks bold italic forecolor backcolor ' +
                                                'alignleft aligncenter alignright alignjustify link autolink anchor image table media fullscreen ' +
                                                'bullist numlist checklist outdent indent removeformat a11ycheck code help',
                                            toolbar_mode: 'wrap',
                                            content_style:
                                                'body { font-family: Poppins, sans-serif ,Arial,sans-serif; font-size:14px }',
                                        }}
                                    />
                                </Grid>
                                <FaqComponent faqsList={faqsList} setFaqsList={setFaqsList} />
                            </Grid>
                        </Grid>
                        {/* RIGHT LAYOUT */}
                        <Grid item xl={2} lg={3} xs={12} md={12} sm={12}>
                            <div id="admin-listbox" className="flex flex-col gap-2">
                                <div
                                    id="box-admin"
                                    className="border-[#eee] rounded-sm overflow-hidden border-solid border-[1px]"
                                >
                                    <div
                                        id="admin-box-header"
                                        className="font-dmsans bg-[#f5f5f5] py-1 px-2 text-black font-[600] text-[14px]"
                                    >
                                        CATEGORY
                                    </div>
                                    <div className="px-2 py-2">
                                        <Autocomplete
                                            size="small"
                                            multiple
                                            aria-multiline
                                            options={listCategory}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.name}
                                                </li>
                                            )}
                                            fullWidth
                                            renderInput={(params) => (
                                                <TextField
                                                    placeholder="Select category"
                                                    {...params}
                                                    sx={customTextFieldAdmin}
                                                />
                                            )}
                                            onChange={(event, newInputValue) => {
                                                setCategory(newInputValue);
                                            }}
                                            value={category}
                                        />
                                    </div>
                                </div>
                                <StatusPost published={published} setPublished={setPublished} />

                                <div
                                    id="box-admin"
                                    className="border-[#eee] rounded-sm overflow-hidden border-solid border-[1px]"
                                >
                                    <div
                                        id="admin-box-header"
                                        className="font-dmsans py-1 px-2 bg-[#f5f5f5] text-black font-[600] text-[14px]"
                                    >
                                        BANNER
                                    </div>
                                    <div className="px-2 py-2">
                                        <div>
                                            <div className="flex flex-col gap-2 w-full items-start">
                                                <div className={stylesUpload.preview__image}>
                                                    <div className="absolute top-3 left-3">
                                                        {selectedFile && (
                                                            <div className="text-[12px] bg-white">
                                                                {selectedFile && selectedFile?.name}
                                                            </div>
                                                        )}
                                                    </div>
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
                                                                    fontSize={'20px'}
                                                                    color="white"
                                                                    icon={faSquareXmark}
                                                                />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className="w-full h-[180px] border-[#eee] border-[1px] border-gray-300 border-dashed flex items-center text-[14px] justify-center">
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M0.539587 3.87024L0.500031 3C0.500031 1.89543 1.39546 1 2.50003 1H6.1716C6.70204 1 7.21074 1.21071 7.58582 1.58579L8.41424 2.41421C8.78932 2.78929 9.29803 3 9.82846 3H13.81C14.986 3 15.9082 4.00984 15.8018 5.18107L15.5455 8H14.5414L14.8059 5.09054C14.8591 4.50492 14.398 4 13.81 4H2.1901C1.60207 4 1.14097 4.50492 1.19421 5.09054L1.83057 12.0905C1.8774 12.6056 2.30926 13 2.82647 13H9.00003V14H2.82647C1.79206 14 0.928332 13.2112 0.834681 12.1811L0.198318 5.18107C0.154263 4.69647 0.286313 4.23949 0.539587 3.87024ZM6.87871 2.29289C6.69117 2.10536 6.43682 2 6.1716 2H2.50003C1.95405 2 1.51027 2.43755 1.50021 2.98112L1.5065 3.11964C1.7193 3.04231 1.94939 3 2.1901 3H7.58582L6.87871 2.29289Z"
                                                                    fill="black"
                                                                />
                                                                <path
                                                                    d="M11.8536 10.1464C11.6583 9.95118 11.3417 9.95118 11.1465 10.1464C10.9512 10.3417 10.9512 10.6583 11.1465 10.8536L12.2929 12L11.1465 13.1464C10.9512 13.3417 10.9512 13.6583 11.1465 13.8536C11.3417 14.0488 11.6583 14.0488 11.8536 13.8536L13 12.7071L14.1465 13.8536C14.3417 14.0488 14.6583 14.0488 14.8536 13.8536C15.0488 13.6583 15.0488 13.3417 14.8536 13.1464L13.7071 12L14.8536 10.8536C15.0488 10.6583 15.0488 10.3417 14.8536 10.1464C14.6583 9.95118 14.3417 9.95118 14.1465 10.1464L13 11.2929L11.8536 10.1464Z"
                                                                    fill="black"
                                                                />
                                                            </svg>
                                                            <div className="ml-1">Empty</div>
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
                                                                console.log(file);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <div className="block">
                                                    <label className={stylesUpload.label__upload} for="upload_image">
                                                        <DriveFolderUploadIcon /> Upload
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={<Checkbox checked={faqsList.published} />}
                                        onChange={(e) => handleToggleFaq(e)}
                                        label="Show Faqs ?"
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '12px', borderTop: '1px solid #ccc' }}>
                    {loadingAdd ? (
                        <Button className={stylesSystem.admin__button__primary}>
                            <CircularProgress className="!h-[20px] !w-[20px] !text-white" />
                        </Button>
                    ) : (
                        <Button className={stylesSystem.admin__button__primary} onClick={handleAddPost}>
                            Add post
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
