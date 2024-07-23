import { Slide } from '@mui/material';
import { forwardRef } from 'react';

export const customTextField = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px !important',
        padding: '4px 12px !important',
        border: '2px solid #E6E8EC !important',
        backgroundColor: '#fff !important',
        fontFamily: 'Poppins',
        '&.Mui-focused': {
            border: '2px solid #777E90 !important',
        },
    },
    '& .MuiOutlinedInput-root:hover': {
        border: '2px solid #777E90 !important',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: 'none !important',
    },
    '& .MuiFormHelperText-root.Mui-error': {
        fontFamily: 'Poppins',
        fontSize: '14px',
    },
};
export const customTextFieldMobile = {
    '& .MuiOutlinedInput-root': {
        fontFamily: 'Poppins',
        // fontSize: '18px !important',
        // height: '54px !important',
        borderRadius: '12px !important',
        padding: '4px 12px !important',
        border: '2px solid #E6E8EC !important',
        backgroundColor: '#fff !important',
        '&.Mui-focused': {
            border: '2px solid #777E90 !important',
        },
    },
    '& .MuiOutlinedInput-root:hover': {
        border: '2px solid #777E90 !important',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: 'none !important',
    },
    '& .MuiFormHelperText-root.Mui-error': {
        fontFamily: 'Poppins',
        fontSize: '14px',
    },
};

export const customDatePicker = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px !important',
        backgroundColor: '#FCFCFD !important',
        height: '48px !important',
    },
    '&:hover .MuiInputLabel-root': {
        color: '#1976D2',
        border: '2px solid #1976D2 !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid #E6E8EC !important',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '2px solid #1976D2 !important',
    },
    '&:hover .MuiSvgIcon-root': {
        color: '#1976D2',
        border: '0px solid transparent',
    },
    '&.Mui-focused .MuiInputLabel-root': {
        color: '#1976D2',
        border: '2px solid #1976D2 !important',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1976D2',
        border: '2px solid #1976D2',
    },
    '&.Mui-focused .MuiSvgIcon-root': {
        color: '#1976D2',
        border: '2px solid #1976D2 ',
    },
};

export const customSmallDatePicker = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px !important',
        backgroundColor: '#FCFCFD !important',
        height: '36px !important',
    },
    '&:hover .MuiInputLabel-root': {
        color: '#1976D2',
        border: '2px solid #1976D2 !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid #E6E8EC !important',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '2px solid #1976D2 !important',
    },
    '&:hover .MuiSvgIcon-root': {
        color: '#1976D2',
        border: '0px solid transparent',
    },
    '&.Mui-focused .MuiInputLabel-root': {
        color: '#1976D2',
        border: '2px solid #1976D2 !important',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1976D2',
        border: '2px solid #1976D2',
    },
    '&.Mui-focused .MuiSvgIcon-root': {
        color: '#1976D2',
        border: '2px solid #1976D2 ',
    },
};

export const customDataGrid = {
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    fontFamily: 'Inter',
    fontSize: '13px',
    backgroundColor: '#fff',
    '& .MuiDataGrid-columnHeaders': {
        background: '#F8FAFC',
        fontSize: '14px',
        fontFamily: 'Inter',
    },
    '& .MuiDataGrid-actionsCell': {
        gridGap: 0,
    },
    // '.MuiDataGrid-row:nth-of-type(odd)': {
    //     backgroundColor: '#eee',
    // },
};

export const customTablePagination = {
    border: 'none',
    '.MuiTablePagination-displayedRows': {
        fontFamily: 'Poppins',
    },
    '& .MuiTablePagination-selectLabel': {
        fontFamily: 'Poppins',
    },
};

export const customSelectAdmin = {
    fontFamily: 'Inter',
    fontSize: '15px',
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: '#eee',
    },
};

export const customTextFieldAdmin = {
    fontFamily: 'Inter',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1px solid rgb(209 213 219)',
            borderRadius: '6px',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(59 130 246)',
        },
        '& .MuiOutlinedInput-input': {
            fontFamily: 'Inter',
            fontSize: '14px',
        },
        '& .MuiOutlinedInput-input::placeholder': {
            fontFamily: 'Inter',
            fontSize: '14px',
            color: 'rgb(107 114 128)',
        },
    },
};

export const customPagination = {
    '& .MuiPaginationItem-root': {
        border: '2px solid #E6E8EC',
        fontWeight: '600',
        fontSize: '15px',
        fontFamily: 'Poppins',
    },
    '& .Mui-selected': {
        color: 'var(--primary-color) !important',
        border: '2px solid var(--primary-color)',
        background: 'none !important',
    },
};

export const customSelectPages = {
    fontFamily: 'unset',
    height: '48px !important',
    border: '2px solid #E6E8EC !important',
    color: '#353945 !important',
    borderRadius: '12px !important',
    backgroundColor: '#F4F5F6 !important',
    fontSize: '12px !important',
    fontWeight: '500 !important',
    '& .MuiOutlinedInput-root:hover': {
        border: '2px solid #777E90 !important',
    },
    fieldset: {
        borderColor: 'transparent !important',
    },
};

export const customDialogTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
