'use client';
import * as React from 'react';
import stylesSystem from '@/app/page.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { Autocomplete, Box, Checkbox, Grid, Typography } from '@mui/material';
import { customDialogTransition, customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import Swal from 'sweetalert2';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import stylesAdmin from '../Admin.module.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getDataVisaByCountry } from '../visa/api/VisaAPI';
import { handleDataVisaForAutocomplete } from '../Function_Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function VisaAddCountry({ mode, onEdit, onAddCountry, listTypeVisa, listCountries, selectedRow }) {
    const [open, setOpen] = useState(false);
    // const [listCountries, setlistCountries] = useState()
    const [country, setCountry] = useState('');
    const [allowedCountry, setAllowedCountry] = useState([]);
    const [listVisaAllowed, setListVisaAllowed] = useState([]);
    const [typeVisa, setTypeVisa] = useState();
    const [loadingVisa, setLoadingVisa] = useState(true);
    const [newAllowedCountry, setNewAllowedCountry] = useState([]);
    const [removedAllowedCountry, setRemovedAllowedCountry] = useState([]);
    const [valueAutocomplete, setValueAutocomplete] = useState([]);

    const getOnlyCodeCountry = (array) => {
        let newArr = [];
        array.map((item, index) => {
            newArr.push(item.code);
        });
        return newArr;
    };

    const handleSetDefaultlistCountries = (listSelected) => {
        let list = [];
        listSelected &&
            listSelected.length > 0 &&
            listSelected?.map((item, index) => {
                list.push(listCountries?.find((itemFind) => itemFind.code == item));
            });
        setAllowedCountry(list);
        setValueAutocomplete(list);
    };

    const handleClickOpen = () => {
        if (selectedRow.length !== 1) {
            Swal.fire({
                text: 'Please choose a only one row to add country',
                icon: 'info',
                showConfirmButton: false,
            });
            return;
        } else {
            handleSetDefaultlistCountries(selectedRow[0]?.allowed_country_info);
            setCountry(selectedRow[0]?.country);
            setTypeVisa(selectedRow[0]?.visa);
            setNewAllowedCountry([]);
            setRemovedAllowedCountry([]);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddAllowedVisa = () => {
        // let convertAllowedCountry = [];
        // allowedCountry.map((item, index) => {
        //     convertAllowedCountry.push(item.code);
        // });
        // const newDataAllowedVisa = {
        //     country: country,
        //     visa_detail: selectedRow[0].id,
        //     allowed_country: convertAllowedCountry,
        // };
        // onAddCountry(newDataAllowedVisa);
        const x = getOnlyCodeCountry(newAllowedCountry);
        const y = getOnlyCodeCountry(removedAllowedCountry);
        onEdit({
            visa_detail: selectedRow[0]?.id,
            country: country,
            rm_allowed_country: y,
            new_allowed_country: x,
        });
        setOpen(false);
    };

    const updateAllowedVisa = async (code) => {
        try {
            const dataVisa = await getDataVisaByCountry(code);
            handleDataVisaForAutocomplete(dataVisa);
            setListVisaAllowed(dataVisa);
        } catch (error) {
            throw error;
        } finally {
            setLoadingVisa(false);
        }
    };

    const handleSelectAll = () => {
        setValueAutocomplete(listCountries);
        const addedItem = listCountries.filter((item) => !allowedCountry.includes(item));
        setNewAllowedCountry(addedItem);
    };

    return (
        <>
            <Button variant="outlined" className={stylesAdmin.custom__action__edit} onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faEarthAmericas} />
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'body'}
                maxWidth={'lg'}
                fullWidth
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>Insert countries</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Thêm quốc gia được chấp thuận.</DialogContentText> */}
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <div className={stylesSystem.label__normal}>Evisa:</div>
                            <TextField
                                size="small"
                                fullWidth
                                disabled
                                id="country"
                                defaultValue={selectedRow[0]?.country}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div className={stylesSystem.label__normal}>Type visa:</div>
                            <TextField
                                size="small"
                                fullWidth
                                disabled
                                id="visa-type"
                                defaultValue={
                                    listTypeVisa &&
                                    listTypeVisa.length > 0 &&
                                    listTypeVisa.find((item) => item.id === typeVisa)?.name
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={`${stylesSystem.label__normal} flex justify-between`}>
                                <div>Allowed with:</div>
                                <button onClick={handleSelectAll} className="text-[--primary-color]">
                                    Select all
                                </button>
                            </div>
                            <Autocomplete
                                multiple
                                size="small"
                                options={listCountries}
                                defaultValue={allowedCountry}
                                value={valueAutocomplete}
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
                                limitTags={10}
                                fullWidth
                                renderInput={(params) => <TextField {...params} placeholder="Allowed with" />}
                                onChange={(event, newInputValue) => {
                                    if (newInputValue.length < allowedCountry.length) {
                                        const removedItem = allowedCountry.filter(
                                            (item) => !newInputValue.includes(item),
                                        );
                                        setRemovedAllowedCountry(removedItem);
                                    }
                                    if (newInputValue.length > allowedCountry.length) {
                                        const addedItem = newInputValue.filter(
                                            (item) => !allowedCountry.includes(item),
                                        );
                                        setNewAllowedCountry(addedItem);
                                    }
                                    setValueAutocomplete(newInputValue);
                                }}
                            />
                            <Typography variant="caption" display="block" gutterBottom>
                                Selected {valueAutocomplete.length} country.
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={stylesSystem.admin__button__primary} onClick={handleAddAllowedVisa}>
                        Add country
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
