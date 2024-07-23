import { Step, StepButton, StepIcon, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import classes from './Step.module.css';
import { redirect } from 'next/navigation';

const stepStyles = {
    '& .MuiStepButton-root.Mui-disabled': {
        backgroundColor: 'transparent',
    },
    '&. Mui-disabled': {
        backgroundColor: 'red',
        '&.MuiStepIcon-root': {
            backgroundColor: 'red',
            fontSize: '32px',
            color: '#e6e8ec',
            borderRadius: '50%',
            border: '2px solid #23C58A',
        },
    },
    '& .Mui-active': {
        '&.MuiStepIcon-root': {
            backgroundColor: '#e6e8ec',
            fontSize: '32px',
            color: '#fff',
            borderRadius: '50%',
            border: '2px solid #23C58A',
        },
        '& .MuiStepIcon-text': {
            fill: '#23262F',
            fontWeight: '600',
        },
    },
    '& .Mui-completed': {
        '& .MuiStepButton-root': {
            backgroundColor: 'transparent',
        },
        '&.MuiStepIcon-root': {
            color: '#23C58A',
            border: 'none',
            fontSize: '30px',
        },
    },
    '&. MuiStepIcon-root': {
        backgroundColor: '#e6e8ec',
        fontSize: '30px',
        color: '#e6e8ec',
        borderRadius: '50%',
        border: '2px solid #23C58A',
        '&. MuiStepIcon-text': {
            fill: 're',
        },
    },
    '& .MuiStepConnector-line': {
        borderColor: '#9A9B9F',
        borderLeftStyle: 'dotted',
        borderLeftWidth: '2px',
    },
};

export default function Page_Step({ list, active }) {
    return (
        <Stepper activeStep={active} orientation="vertical" sx={stepStyles}>
            {list?.map((item, index) => (
                <Step
                    key={item.label}
                    sx={{
                        '& .MuiStepButton-root': {
                            backgroundColor: '#fff',
                            borderRadius: '30px',
                            padding: '1px 0 1px 11px',
                        },
                    }}
                >
                    <StepButton
                        sx={{
                            fontFamily: 'Poppins',
                            '& .MuiStepIcon-root': {
                                border: '2px solid #9A9B9F',
                                borderRadius: '50%',
                                color: 'transparent',
                                fontSize: '32px',
                                '&. MuiStepIcon-text': {
                                    fill: 'red',
                                },
                            },
                            '& .MuiStepIcon-text': {
                                fill: '#9A9B9F',
                                fontWeight: '600',
                                fontSize: '13px',
                            },
                        }}
                        color="inherit"
                    >
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label': {
                                    fontFamily: 'Poppins',
                                },
                            }}
                        >
                            {item.label}
                        </StepLabel>
                    </StepButton>
                </Step>
            ))}
        </Stepper>
    );
}
