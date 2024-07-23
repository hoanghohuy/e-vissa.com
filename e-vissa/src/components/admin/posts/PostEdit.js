'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import stylesSystem from '@/app/page.module.css';
import stylesUpload from './css/Post.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
import './css/custom_ckeditor.css';
import { ToastNotify } from '../../Page/ToastNotify/toastNotify';
import stylesAdmin from '../Admin.module.css';
import FileLibrary from '../../FileLibrary/FileLibrary';
import { useRef } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { validateSlug } from '../../../utils/validation';
import { customDialogTransition, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import { faFilePen, faQ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAddIdForHeading } from './functions/PostFunction';
import StatusPost from '../Status/StatusPost';
import FaqComponent from './FaqComponent';
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function PostEdit({ accessToken, selectedRow, categoryProps, handleAfterEdit }) {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [metaDes, setMetaDes] = useState('');
    const [postSlug, setPostSlug] = useState('');
    const [keyword, setKeyword] = useState('');
    const [content, setContent] = useState('');
    const [autoContent, setAutoContent] = useState('');
    const [image, setImage] = useState('');
    const [published, setPublished] = useState();
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState([]);
    const [loadingUpdateCategory, setLoadingUpdateCategory] = useState(false);
    const [checkSlug, setcheckSlug] = useState('');
    const editorRef = useRef(null);
    const [delay, setDelay] = useState(null);
    const [faqsList, setFaqsList] = useState({ published: 0, data: [{ id: 1, q: '', a: '' }] });

    const handleClickOpen = () => {
        setTitle(selectedRow[0].title);
        setMetaDes(selectedRow[0].meta_desc);
        setPostSlug(selectedRow[0].slug);
        setKeyword(selectedRow[0].keyword);
        setContent(selectedRow[0].content);
        setImage(selectedRow[0].image);
        setPublished(selectedRow[0].published);
        setListCategory(categoryProps);
        setCategory(selectedRow[0].category_info);
        handleSetDefaultListCategory(selectedRow[0].category_info);
        if (selectedRow[0].faq) {
            const dataParsed = JSON.parse(selectedRow[0].faq);
            setFaqsList(dataParsed);
        }
        setOpen(true);
    };

    const handleSetDefaultListCategory = (listSelected) => {
        let list = [];
        listSelected &&
            listSelected.length > 0 &&
            listSelected.map((item, index) => {
                list.push(categoryProps?.find((itemFind) => itemFind.name == item.name));
            });
        setDefaultCategory(list);
    };

    const handleChangeCategory = async () => {
        if (category.length == 0) {
            ToastNotify('Please enter a category');
            return;
        }
        try {
            setLoadingUpdateCategory(true);
            const data = {
                post_id: selectedRow[0].id,
                cat_ids: category.map((obj) => obj.id),
            };
            const request = await fetch(`/api/admin/xref_post_category`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(data),
            });
            if (request.status == 200) {
                ToastNotify('Update category sucessfully.', 'success');
                handleAfterEdit();
            }
        } catch (error) {
            ToastNotify('Update category failed.');
        } finally {
            setLoadingUpdateCategory(false);
        }
    };

    const handleToggleFaq = (e) => {
        let currentFaq = Object.assign({}, faqsList);
        currentFaq.published = e.target.checked ? 1 : 0;
        setFaqsList(currentFaq);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditPost = async () => {
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
        const editedData = {
            id: selectedRow[0].id,
            slugAfterEdit: selectedRow[0].slug,
            title: title,
            meta_desc: metaDes,
            slug: postSlug,
            keyword: keyword,
            content: dataHeadingsAndContents.newContent,
            heading_tags,
            published: published,
            image: selectedFile,
        };
        try {
            setLoadingEdit(true);
            let pathImagePost;
            if (editedData.image) {
                let fd = new FormData();
                fd.append('images', editedData.image);
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
                    method: 'POST',
                    headers: {
                        Authorization: accessToken,
                    },
                    body: fd,
                });
                const respJson = await resp.json();
                pathImagePost = await respJson?.uploadedImageNames?.[0];
            }
            const id = editedData.id;
            const newDataEdit = {
                title: editedData.title,
                meta_desc: editedData.meta_desc,
                content: editedData.content,
                heading_tags,
                slug: editedData.slug,
                keyword: editedData.keyword,
                published: editedData.published,
                image: pathImagePost,
                faq: JSON.stringify(faqsList),
            };
            const resp = await fetch(`/api/admin/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify(newDataEdit),
            });
            if (resp.status == 200) {
                ToastNotify('Updated post successfully', 'success');
                handleAfterEdit();
            } else {
                ToastNotify(`${resp.status}, ${resp.statusText}`);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoadingEdit(false);
        }
    };

    const handleEditorChange = (content, editor) => {
        if (delay) {
            clearTimeout(delay);
            setDelay(null);
        }
        setDelay(
            setTimeout(async () => {
                setLoadingEdit(true);
                await fetch(`/api/admin/posts/${selectedRow[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({ content: content }),
                });

                setLoadingEdit(false);
                selectedRow[0].content = content;
                setAutoContent(content);
            }, 10000),
        );
    };

    useEffect(() => {
        // Using a setTimeout to get the latest text after a delay
        const timeoutId = setTimeout(async () => {
            if (postSlug.length === 0 || postSlug === selectedRow[0].slug) {
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

    return (
        <div>
            <Tooltip title="EDIT THIS POST" placement="top">
                <Button variant="outlined" onClick={handleClickOpen} className={stylesAdmin.custom__action__edit}>
                    <FontAwesomeIcon icon={faFilePen} />
                </Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xl'}
                fullWidth
                disableEnforceFocus
                fullScreen
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Edit post {selectedRow[0].title}</div>
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
                                        sx={customTextFieldAdmin}
                                        fullWidth
                                        size="small"
                                        type="text"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => {
                                            let text = e.target.value;
                                            setTitle(text);
                                        }}
                                    />
                                </Grid>
                                <Grid item xl={4} lg={4} xs={12} md={12} sm={12}>
                                    <label className={stylesAdmin.admin__label__required}>
                                        Link (auto generated by title):
                                    </label>
                                    <TextField
                                        fullWidth
                                        size="small"
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
                                <Grid item lg={12} xs={12} md={12} sm={12}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <FileLibrary token={accessToken} />
                                    </div>
                                    <Editor
                                        onInit={(evt, editor) => (editorRef.current = editor)}
                                        initialValue={content}
                                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                        init={{
                                            height: 800,
                                            menubar: true,
                                            image_dimensions: true,
                                            image_advtab: true,
                                            image_title: true,
                                            object_resizing: 'img',
                                            resize_img_proportional: true,
                                            image_class_list: [{ title: 'Watermark', value: 'watermark' }],
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
                                        onEditorChange={handleEditorChange}
                                    />
                                </Grid>
                                <FaqComponent faqsList={faqsList} setFaqsList={setFaqsList} />
                            </Grid>
                        </Grid>
                        {/* RIGHT LAYOUT */}
                        <Grid item xl={2} lg={3} xs={12} md={12} sm={12}>
                            <div id="admin-listbox" className="flex flex-col gap-2">
                                <StatusPost published={published} setPublished={setPublished} />
                                <div
                                    id="box-admin"
                                    className="border-[#eee] rounded-sm overflow-hidden border-solid border-[1px]"
                                >
                                    <div
                                        id="admin-box-header"
                                        className="font-dmsans bg-[#f5f5f5] py-1 px-2 text-black font-[600] text-[14px]"
                                    >
                                        Descriptions
                                    </div>
                                    <div className="px-2 py-2">
                                        <TextField
                                            multiline
                                            minRows={2}
                                            size="small"
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            value={metaDes}
                                            onChange={(e) => setMetaDes(e.target.value)}
                                            sx={customTextFieldAdmin}
                                        />
                                    </div>
                                </div>
                                <div
                                    id="box-admin"
                                    className="border-[#eee] rounded-sm overflow-hidden border-solid border-[1px]"
                                >
                                    <div
                                        id="admin-box-header"
                                        className="font-dmsans bg-[#f5f5f5] py-1 px-2 text-black font-[600] text-[14px]"
                                    >
                                        Keywords
                                    </div>
                                    <div className="px-2 py-2">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            sx={customTextFieldAdmin}
                                            multiline
                                            minRows={2}
                                        />
                                    </div>
                                </div>
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
                                            defaultValue={defaultCategory}
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
                                                <TextField {...params} sx={customTextFieldAdmin} />
                                            )}
                                            onChange={(event, newInputValue) => {
                                                setCategory(newInputValue);
                                            }}
                                        />
                                        <div className="pt-2">
                                            {loadingUpdateCategory ? (
                                                <Button
                                                    fullWidth
                                                    disabled={loadingUpdateCategory}
                                                    variant="contained"
                                                    className={stylesSystem.admin__button__primary}
                                                >
                                                    <CircularProgress className="!h-[20px] !w-[20px] !text-white" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    className={stylesSystem.admin__button__primary}
                                                    onClick={handleChangeCategory}
                                                    fullWidth
                                                >
                                                    Save category
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

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
                                        <div className="flex flex-col gap-2 items-start">
                                            <div className={stylesUpload.preview__image}>
                                                <div className="absolute top-3 left-3">
                                                    {selectedFile && (
                                                        <div className="text-[12px] bg-white">
                                                            {selectedFile ? selectedFile?.name : image ? image : ''}
                                                        </div>
                                                    )}
                                                </div>
                                                {selectedImage ? (
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
                                                ) : image ? (
                                                    <img
                                                        style={{
                                                            objectFit: 'cover',
                                                            width: '280px',
                                                            height: '180px',
                                                            border: '1px solid #ccc',
                                                            padding: '4px',
                                                            borderRadius: '4px',
                                                        }}
                                                        src={`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/${process.env.NEXT_PUBLIC_SITE_NAME}${image}`}
                                                        alt="avatar default"
                                                    />
                                                ) : (
                                                    <div className="w-full h-[180px] border-[1px] border-gray-300 border-dashed flex items-center text-[14px] justify-center">
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
                                                        setSelectedImage(URL ? URL?.createObjectURL(file) : '');
                                                        setSelectedFile(file);
                                                    }
                                                }}
                                            />
                                            <div className="block">
                                                <label className={stylesUpload.label__upload} for="upload_image">
                                                    Upload
                                                </label>
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
                    <div className="font-inter text-sm mr-2">Auto saving every 10s.</div>
                    {loadingEdit ? (
                        <Button disabled={loadingEdit} className={stylesSystem.admin__button__primary}>
                            <CircularProgress className="!h-[20px] !w-[20px] !text-white" />
                        </Button>
                    ) : (
                        <Button className={stylesSystem.admin__button__primary} onClick={handleEditPost}>
                            Save
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
