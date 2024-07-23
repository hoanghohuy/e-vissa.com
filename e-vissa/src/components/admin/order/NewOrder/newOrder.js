import { useRef, useState } from 'react';
import stylesAdmin from '@/app/admin/Admin.module.css';
import AdminBreadcrumb from '../../Breadcrumb/AdminBreadcrumb';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import stylesSystem from '@/app/page.module.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function NewOrder({ site }) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [countryID, setCountryID] = useState('');
    const [visaXrefId, setVisaXrefId] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [data, setData] = useState([{ id: 1, first_name: '', last_name: '', passport: '' }]);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();

    const handleChangeFirstName = (e) => {
        const dataCurrent = [...data];
        const index = dataCurrent.findIndex((item) => item.id === parseInt(e.target.name));
        if (index != -1) {
            dataCurrent[index].first_name = e.target.value;
        }
        setData(dataCurrent);
    };
    const handleChangeLastName = (e) => {
        const dataCurrent = [...data];
        const index = dataCurrent.findIndex((item) => item.id === parseInt(e.target.name));
        if (index != -1) {
            dataCurrent[index].last_name = e.target.value;
        }
        setData(dataCurrent);
    };

    const handleAddPersion = () => {
        const dataCurrent = [...data];
        const newPersion = {
            id: dataCurrent.length + 1,
            first_name: null,
            last_name: null,
            passport: '',
        };
        dataCurrent.push(newPersion);
        setData(dataCurrent);
    };

    const handleDeletePersion = (event) => {
        Swal.fire({
            title: 'Are you sure delete this person?',
            text: "You won't be able to revert this information.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                const dataCurrent = [...data];
                const idSelected = event.target.value;
                const newData = dataCurrent.filter((item) => item.id !== parseInt(idSelected));
                setData(newData);
            }
        });
    };

    const getVisaDetailById = async (id) => {
        try {
            const turkeyURL = `https://turkey-evisagov.com`;
            const reqData = await fetch(`${turkeyURL}/api/xref_visa_country/TR?from=${id}`);
            const data = await reqData.json();
            console.log('data', data);
        } catch (error) {}
    };

    const handleSelectCountry = async (event, value) => {
        if (value) {
            getVisaDetailById(value.code);
            setCountryID(value.code);
        } else {
            setCountryID('');
        }
    };

    const handleAddOrder = async () => {
        const dataNewOrder = {
            arrival_date: arrivalDate,
            xref_visa_country: parseInt(visaXrefId),
            country_of_residence: countryID,
            nationality: countryID,
            another_people: JSON.stringify(data),
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            phone_number: phoneRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            currency: 'USD',
            customer_note: '',
            gRecaptchaToken: await executeRecaptcha('inquirySubmit'),
        };
        console.log('dataNewOrder', dataNewOrder);
    };

    return (
        <div className={stylesAdmin.layout__content}>
            <AdminBreadcrumb screen={`New ${site} order`} />
            <div className="flex flex-col mt-4">
                <div className="flex gap-4">
                    <div className="w-[20%]">
                        <div className="px-4">
                            <div className={stylesAdmin.admin__label__required}>Country/Region</div>
                            <Autocomplete
                                size="small"
                                id="country_id"
                                options={listCountries}
                                renderInput={(params) => (
                                    <TextField {...params} sx={customTextFieldAdmin} variant="outlined" />
                                )}
                                onChange={handleSelectCountry}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.code}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`/flags/png100px/${option.code.toLowerCase()}.png`}
                                                srcSet={`/flags/png100px/${option.code.toLowerCase()}.png 2x`}
                                                alt=""
                                                className="mr-2"
                                            />
                                            {option.name}
                                        </li>
                                    );
                                }}
                                value={listCountries.find((item) => item.code == countryID)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={stylesAdmin.admin__label__required}>Date of arrival</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                disablePast
                                showDaysOutsideCurrentMonth
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setArrivalDate(moment(newValue.$d).format('L'));
                                    } else {
                                        setArrivalDate('');
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div>
                    <div className="flex flex-wrap">
                        <div className="w-[20%]">
                            <div className="px-4">
                                <div>First name</div>
                                <TextField
                                    sx={customTextFieldAdmin}
                                    placeholder="First name"
                                    inputRef={firstNameRef}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    // onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div className="w-[20%]">
                            <div className="px-4">
                                <div>Last name</div>
                                <TextField
                                    sx={customTextFieldAdmin}
                                    placeholder="Last name"
                                    inputRef={lastNameRef}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    // onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div className="w-[20%]">
                            <div className="px-4">
                                <div>Phone number</div>
                                <TextField
                                    sx={customTextFieldAdmin}
                                    placeholder="Phone number"
                                    inputRef={phoneRef}
                                    fullWidth
                                    size="small"
                                    type="number"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className="w-[20%]">
                            <div className="px-4">
                                <div>Email</div>
                                <TextField
                                    sx={customTextFieldAdmin}
                                    placeholder="Email"
                                    inputRef={emailRef}
                                    fullWidth
                                    size="small"
                                    type="email"
                                    variant="outlined"
                                    // onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div className="w-[20%]">
                            <div className="px-4">
                                <div>Address</div>
                                <TextField
                                    sx={customTextFieldAdmin}
                                    placeholder="Address"
                                    inputRef={addressRef}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    // onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="px-4">
                                {data.map((item, index) => (
                                    <div>
                                        <div className="flex justify-between sm:flex-col sm:justify-start sm:items-start">
                                            <div>{`Applicant #${index + 1} personal details`}</div>
                                            {index !== 0 && (
                                                <button
                                                    key={item.id}
                                                    value={item.id}
                                                    onClick={handleDeletePersion}
                                                    variant="text"
                                                    disableElevation
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex gap-4">
                                            <div>
                                                <div>
                                                    <label>First name</label>
                                                </div>
                                                <TextField
                                                    key={item.id}
                                                    name={item.id}
                                                    fullWidth
                                                    sx={customTextFieldAdmin}
                                                    type="text"
                                                    value={item.first_name}
                                                    onChange={handleChangeFirstName}
                                                    placeholder={'Enter your first name'}
                                                    size="small"
                                                />
                                            </div>
                                            <div>
                                                <div>
                                                    <label>Last name</label>
                                                </div>
                                                <TextField
                                                    size="small"
                                                    key={item.id}
                                                    name={item.id}
                                                    fullWidth
                                                    sx={customTextFieldAdmin}
                                                    type="text"
                                                    value={item.last_name}
                                                    onChange={handleChangeLastName}
                                                    placeholder={'Enter your last name'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    className={stylesSystem.admin__button__primary}
                                    variant="contained"
                                    onClick={handleAddPersion}
                                >
                                    Add another person
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Button
                        className={`${stylesSystem.admin__button__primary} ml-4 mt-4`}
                        variant="contained"
                        onClick={handleAddOrder}
                    >
                        Add order
                    </Button>
                </div>
            </div>
        </div>
    );
}
