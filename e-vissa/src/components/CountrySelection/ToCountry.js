import Autocomplete from '@mui/material/Autocomplete';
import { PopupIcon } from '@/components/Icons/Icons';
import { Box, TextField } from '@mui/material';
import styles from './CountrySelection.module.css';

export const ToCountry = ({ dataCountryTo, setTo, customTextField, setInputToRef, page }) => {
    return (
        <>
            <Autocomplete
                sx={customTextField}
                popupIcon={<PopupIcon />}
                openOnFocus
                className={`${styles[`${page}__input__left__input`]} dark__custom`}
                id="to"
                options={dataCountryTo}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <div style={{ fontFamily: 'Poppins' }} {...props} key={option.code}>
                        <img
                            className="mr-2"
                            loading="lazy"
                            width="20"
                            src={`flags/png100px/${option.code.toLowerCase()}.png`}
                            srcSet={`flags/png100px/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        <div className="text-[15px]">{option?.name}</div>
                    </div>
                )}
                renderInput={(params) => (
                    <TextField
                        type="text"
                        inputRef={(input) => {
                            setInputToRef(input);
                        }}
                        {...params}
                        placeholder="Where am I going?"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off',
                            endadornment: <>{params.InputProps.endadornment}</>,
                        }}
                    />
                )}
                onChange={(_event, newInputValue) => {
                    if (newInputValue?.code) {
                        setTo(newInputValue.code);
                    } else {
                        setTo('');
                    }
                }}
            />
        </>
    );
};
