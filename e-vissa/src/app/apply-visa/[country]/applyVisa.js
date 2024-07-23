'use client';
import { Step, StepButton, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
const steps = ['Trip details', 'Your infomations', 'Services', 'Payment method', 'Checkout'];
import styles from './ApplyVisa.module.css';
import { stepperCustom } from './customStepper';
import { useEffect } from 'react';
import TripDetails from '@/components/apply-visa/TripDetails/tripDetails';
import Information from '@/components/apply-visa/Infomations/information';
import Services from '@/components/apply-visa/Services/services';
import Checkout from '@/components/apply-visa/Checkout/Checkout';
import Method from '@/components/apply-visa/PaymentMethod/paymentMethod';
import { useSession } from 'next-auth/react';

export default function ApplyVisa({ createOrder }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [orderID, setOrderID] = useState('');
    const [dataVisaDetail, setDataVisaDetail] = useState({});
    const [dataOrder, setDataOrder] = useState({});
    const [dataStep1, setDataStep1] = useState({});
    const [dataStep2, setDataStep2] = useState({});
    const [dataStep3, setDataStep3] = useState({});
    const [dataServices, setDataServices] = useState({});
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState('');

    const writeDataStep1 = (dataStep1) => {
        setDataStep1(dataStep1);
    };
    const writeDataStep2 = (dataStep2) => {
        setDataStep2(dataStep2);
    };
    const writeDataStep3 = (dataStep3) => {
        setDataStep3(dataStep3);
    };
    const writeOrderID = (id) => {
        setOrderID(id);
    };

    const writeVisaDetail = (detail) => {
        setDataVisaDetail(detail);
    };

    const writeDataOrder = (data) => {
        setDataOrder(data);
    };

    const writeDataServices = (data) => {
        setDataServices(data);
    };

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
        window.scrollTo({ top: 0, left: 0 });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    useEffect(() => {
        if (session && session.accessToken) {
            setAccessToken(session.accessToken);
        }
    }, [status]);

    return (
        <div className={styles.page}>
            <div className={styles.trip__details__container}>
                <div className={styles.trip__details__step}>
                    <Stepper orientation={`vertical`} nonLinear activeStep={activeStep} sx={stepperCustom}>
                        {steps.map((label, index) => (
                            <Step
                                className={`${
                                    index == activeStep
                                        ? 'bg-white px-2 rounded-full -translate-x-[8px] w-[228px] shadow-md'
                                        : ''
                                }`}
                                key={label}
                                completed={completed[index]}
                                disabled={completed[index] ? false : true}
                                sx={{
                                    '& .MuiStepButton-root': {
                                        backgroundColor: '#fff',
                                        borderRadius: '30px',
                                        padding: '1px 0 1px 11px',
                                        height: '40px',
                                    },
                                }}
                            >
                                <StepLabel
                                    icon={
                                        <div
                                            className={`${
                                                index <= activeStep ? 'text-[#23262F] !border-[#23C58A] font-[700]' : ''
                                            } ${
                                                index < activeStep ? '!bg-[#23C58A]' : ''
                                            } w-8 h-8 rounded-full border-[2px] border-[#B1B5C3] flex items-center justify-center font-[600] text-[#B1B5C3] text-[14px]`}
                                        >
                                            {index < activeStep ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M4 8.00065L6.66667 10.6673L12 5.33398"
                                                        stroke="#FCFCFD"
                                                        stroke-width="2"
                                                        stroke-miterlimit="10"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                    }
                                    sx={{
                                        gap: '16px !important',
                                        '& .MuiStepLabel-label': { fontFamily: 'unset', fontWeight: '600' },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                                {/* <StepButton
                                    sx={{
                                        '& .MuiStepLabel-root': {
                                            gap: '16px',
                                        },
                                        '& .MuiStepLabel-label': {
                                            fontFamily: 'Poppins',
                                            fontSize: '14px',
                                            color: '#686A6C',
                                            fontWeight: '600',
                                            padding: '4px 20px 4px 0',
                                            borderRadius: '0px 999px 999px 0',
                                        },
                                    }}
                                    color="inherit"
                                    onClick={handleStep(index)}
                                >
                                    {label}
                                </StepButton> */}
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <div className={styles.trip__details__main}>
                    {activeStep == 0 && (
                        <TripDetails
                            orderID={orderID}
                            complete={handleComplete}
                            data={dataStep1}
                            writeData={writeDataStep1}
                            // writeOrderID={writeOrderID}
                            writeVisaDetail={writeVisaDetail}
                            token={accessToken}
                        />
                    )}
                    {activeStep === 1 && (
                        <Information
                            dataStep1={dataStep1}
                            dataOrder={dataOrder}
                            complete={handleComplete}
                            dataStep={dataStep2}
                            writeData={writeDataStep2}
                            writeDataOder={writeDataOrder}
                            dataVisaDetail={dataVisaDetail}
                            createOrder={createOrder}
                        />
                    )}
                    {activeStep === 2 && (
                        <Services
                            dataOrder={dataOrder}
                            complete={handleComplete}
                            token={accessToken}
                            dataStep={dataStep3}
                            writeData={writeDataStep3}
                            writeDataServices={writeDataServices}
                            dataVisaDetail={dataVisaDetail}
                        />
                    )}
                    {activeStep === 3 && (
                        <Method
                            token={accessToken}
                            complete={handleComplete}
                            dataStep={dataStep3}
                            orderID={orderID}
                            dataOrder={dataOrder}
                            dataServices={dataServices}
                            dataVisaDetail={dataVisaDetail}
                            dataOrderID={dataOrder}
                        />
                    )}

                    {activeStep === 4 && (
                        <Checkout
                            dataOrderID={dataOrder}
                            token={accessToken}
                            orderID={orderID}
                            dataServices={dataServices}
                            dataVisaDetail={dataVisaDetail}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
