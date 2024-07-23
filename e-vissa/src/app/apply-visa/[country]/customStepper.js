export const stepperCustom = {
    '& .MuiStepLabel-iconContainer .MuiStepIcon-root': {
        fontSize: '30px !important',
        borderRadius: '50%',
        background: '#eee',
    },
    paddingLeft: '8px',
    '& .MuiStepButton-root.Mui-disabled': {
        backgroundColor: 'transparent',
    },
    '&. Mui-disabled': {
        '&. MuiStepIcon-root': {
            fontSize: '32px',
            color: '#e6e8ec',
            borderRadius: '50%',
            border: '2px solid #23C58A',
        },
        '& .MuiStepLabel-iconContainer': {
            '& .MuiStepIcon-root': {
                fontSize: '32px',
            },
        },
    },
    '& .Mui-active': {
        color: '#23262F',
        '&.MuiStepIcon-root': {
            backgroundColor: '#e6e8ec',
            fontSize: '32px !important',
            color: '#fff',
            borderRadius: '50%',
            border: '2px solid #23C58A',
            padding: '0',
        },
        '&.MuiStepLabel-labelContainer': {
            height: '34px',
        },
        '& .MuiStepIcon-text': {
            fill: '#23262F',
            fontWeight: '600',
            lineHeight: '32px',
        },
    },
    '& .Mui-completed': {
        '& .MuiStepButton-root': {
            backgroundColor: 'transparent',
        },
        '&.MuiStepIcon-root': {
            color: '#23C58A',
            border: 'none',
            fontSize: '24px',
        },
    },
    '& .MuiStepConnector-root': {
        marginLeft: '17px',
    },
    '& .MuiStepConnector-line': {
        borderColor: '#9A9B9F',
        borderLeftStyle: 'dotted',
        borderLeftWidth: '2px',
        minHeight: '32px',
    },
    '& .MuiStepLabel-iconContainer': {
        paddingRight: '6px',
        '& .MuiStepIcon-root': {
            fontSize: '24px',
        },
    },
    '& .MuiStepConnector-line': {
        minHeight: '24px',
    },
};
