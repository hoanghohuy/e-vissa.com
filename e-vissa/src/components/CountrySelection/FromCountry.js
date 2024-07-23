import Autocomplete from '@mui/material/Autocomplete';
import { PopupIcon } from '@/components/Icons/Icons';
import { Box, TextField } from '@mui/material';
import styles from './CountrySelection.module.css';

export const FromCountry = ({
    listCountries,
    from,
    countryAlias,
    customTextField,
    onChangeFrom,
    setInputFromRef,
    page,
}) => {
    return (
        <>
            <Autocomplete
                sx={customTextField}
                popupIcon={<PopupIcon />}
                className={`${styles[`${page}__input__left__input`]} dark__custom`}
                key={'from'}
                id="from"
                options={listCountries}
                autoHighlight
                openOnFocus
                getOptionLabel={(option) => countryAlias ?? option.name + ' ' + option.alias}
                defaultValue={
                    listCountries && listCountries.length > 0 ? listCountries?.find((item) => item.code === from) : null
                }
                renderOption={(props, option) => (
                    <div style={{ fontFamily: 'Poppins' }} {...props} key={option.code}>
                        <img
                            className="mr-2"
                            loading="lazy"
                            width="20"
                            src={`flags/png100px/${option?.code.toLowerCase()}.png`}
                            srcSet={`flags/png100px/${option?.code.toLowerCase()}.png 2x`}
                            alt="flag"
                        />
                        <div className="text-[15px]">{option?.name}</div>
                    </div>
                )}
                renderInput={(params) => (
                    <TextField
                        type="text"
                        inputRef={(input) => {
                            setInputFromRef(input);
                        }}
                        {...params}
                        placeholder="Where am I from?"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                            endadornment: <>{params.InputProps.endadornment}</>,
                        }}
                    />
                )}
                onChange={onChangeFrom}
            />
        </>
    );
};
