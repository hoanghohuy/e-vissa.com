import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import stylesSystem from '@/app/page.module.css';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { settingsData } from '/settings';
import { useSession } from 'next-auth/react';
import { PageNotify } from '../../Page/PageNotify/PageNotify';
import { roleData } from '@/dbx/e-vissa/models/data/role_data';
import orderStatus from '@/dbx/e-vissa/seeders/data/order_data.json';
import { ToastNotify } from '@/components/Page/ToastNotify/toastNotify';
import { validateEmail } from '../../../utils/validation';

export default function Settings() {
    const [maintenance, setMaintenance] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keyword, setKeyword] = useState('');
    // const [ogMeta, setOgData] = useState({ title: '', url: '', type: '', description: '', image: '' });
    const [ogTitle, setOgTitle] = useState('');
    const [ogUrl, setOgUrl] = useState('');
    const [ogType, setOgType] = useState('');
    const [ogDesc, setOgDesc] = useState('');
    const [ogImage, setOgImage] = useState('');
    // const [twitterMeta, setTwitterMeta] = useState('');
    const [twTitle, setTwTitle] = useState('');
    const [twDescription, setTwDescription] = useState('');
    const [twSite, setTwSite] = useState('');
    const [twCreator, setTwCreator] = useState('');
    const [twCard, setTwCard] = useState('');
    const [twUrl, setTwUrl] = useState('');
    const [twImage, setTwImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [favicon, setFavicon] = useState('');
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');
    const [testingEmail, setTestingEmail] = useState('');

    const handleRadioChange = (event) => {
        setMaintenance(event.target.value);
    };

    const onChangeSettings = async () => {
        // if (title !== '' && description !== '' && keyword !== '') {
        if (true) {
            PageNotify('warning', 'Contact Administrator to change settings', 'OK');
            return;
            setLoading(true);
            try {
                const ogMeta = {
                    title: ogTitle,
                    url: ogUrl,
                    type: ogType,
                    description: ogDesc,
                    image: ogImage,
                };
                const twitter = {
                    card: twCard,
                    url: twUrl,
                    title: twTitle,
                    description: twDescription,
                    image: twImage,
                    site: twSite,
                    creator: twCreator,
                };
                const newData = {
                    maintenance: maintenance,
                    title: title,
                    description: description,
                    keyword: keyword,
                    favicon: favicon,
                    ogMeta: ogMeta,
                    twitterMeta: twitter,
                };
                const resp = await fetch(`/api/settings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    },
                    body: JSON.stringify(newData),
                });
                if (resp.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Settings dữ liệu thành công!',
                        icon: 'success',
                    });
                    setLoading(false);
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
        }
    };

    const handleSendTestingMail = async () => {
        if (!validateEmail(testingEmail)) {
            return ToastNotify('Email invalid');
        }

        setLoading(true);

        const response = await fetch('/api/admin/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: session.accessToken,
            },
            body: JSON.stringify({ testingEmail }),
        });

        setLoading(false);

        if (response.status == 200) {
            return ToastNotify('Email sent successfully', 'success');
        }

        return ToastNotify('Email invalid');
    };

    useEffect(() => {
        if (session && session.accessToken) setAccessToken(session.accessToken);
    }, [status]);

    useEffect(() => {
        setMaintenance(settingsData.maintenance);
        setTitle(settingsData.title);
        setDescription(settingsData.description);
        setKeyword(settingsData.keyword);
        setFavicon(settingsData.favicon);
        // setOgData(settingsData.ogMeta);
        setOgTitle(settingsData.ogMeta.title);
        setOgUrl(settingsData.ogMeta.url);
        setOgType(settingsData.ogMeta.type);
        setOgDesc(settingsData.ogMeta.description);
        setOgImage(settingsData.ogMeta.image);
        // setTwitterMeta(settingsData.twitterMeta);
        setTwTitle(settingsData.twitterMeta.title);
        setTwUrl(settingsData.twitterMeta.url);
        setTwSite(settingsData.twitterMeta.site);
        setTwCard(settingsData.twitterMeta.card);
        setTwCreator(settingsData.twitterMeta.creator);
        setTwDescription(settingsData.twitterMeta.description);
        setTwImage(settingsData.twitterMeta.image);
    }, []);

    return (
        <>
            <div className={stylesSystem.admin__container}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Title:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={settingsData?.title}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Description:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={settingsData?.description}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Keyword:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            // defaultValue={settingsData?.keyword}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Link favicon:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={settingsData?.favicon}
                            value={favicon}
                            onChange={(e) => setFavicon(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Open graph title:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={ogTitle}
                            value={ogTitle}
                            onChange={(e) => {
                                setOgTitle(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Open graph url:</label>
                        <TextField
                            disabled
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={ogUrl}
                            value={ogUrl}
                            onChange={(e) => {
                                setOgUrl(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Open graph type:</label>
                        <TextField
                            disabled
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={ogType}
                            value={ogType}
                            onChange={(e) => {
                                setOgType(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Open graph description:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={ogDesc}
                            value={ogDesc}
                            onChange={(e) => {
                                setOgDesc(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Open graph image:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={ogImage}
                            value={ogImage}
                            onChange={(e) => setOgImage(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter title:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twTitle}
                            value={twTitle}
                            onChange={(e) => {
                                setTwTitle(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter url:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twUrl}
                            value={twUrl}
                            onChange={(e) => {
                                setTwUrl(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter site:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twSite}
                            value={twSite}
                            onChange={(e) => {
                                setTwSite(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter creator:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twCreator}
                            value={twCreator}
                            onChange={(e) => {
                                setTwCreator(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter card:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twCard}
                            value={twCard}
                            onChange={(e) => {
                                setTwCard(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter description:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twDescription}
                            value={twDescription}
                            onChange={(e) => {
                                setTwDescription(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Twitter image:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={twImage}
                            value={twImage}
                            onChange={(e) => setTwImage(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Data list roles:</label>
                        <FormControl size="small" fullWidth>
                            <Select
                                size="small"
                                id="demo-simple-select"
                                defaultValue={'administrator'}
                                // value={age}
                                // onChange={handleChange}
                            >
                                {roleData.data.map((item) => (
                                    <MenuItem value={item.value}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Data order statuses:</label>
                        <FormControl size="small" fullWidth>
                            <Select
                                size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={0}
                            >
                                {orderStatus.map((item, index) => (
                                    <MenuItem value={index}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} xs={12} md={12} sm={12}>
                        <label className={stylesSystem.label__normal}>Default pagination:</label>
                        <FormControl size="small" fullWidth>
                            <Select
                                size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={10}
                                // value={age}
                                // onChange={handleChange}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} xs={12} md={6} sm={12}>
                        <label className={stylesSystem.label__normal}>Email website:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            defaultValue={process.env.NEXT_PUBLIC_WEBSITE_MAILER}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12} md={6} sm={12}>
                        <label className={stylesSystem.label__normal}>Test Email:</label>
                        <TextField
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            placeholder="example@email.com"
                            value={testingEmail}
                            onChange={(e) => setTestingEmail(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LoadingButton onClick={() => handleSendTestingMail()} disabled={loading}>
                                            {loading ? <CircularProgress size={20} /> : 'Send Mail'}
                                        </LoadingButton>{' '}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    {/* <Grid item lg={6} xs={12} md={12} sm={12}>
                        <LoadingButton
                            style={{ marginBottom: '20px' }}
                            className={stylesSystem.admin__button__primary}
                            onClick={onChangeSettings}
                            loading={loading}
                            variant="contained"
                        >
                            Edit settings
                        </LoadingButton>
                    </Grid> */}
                </Grid>
            </div>
        </>
    );
}
