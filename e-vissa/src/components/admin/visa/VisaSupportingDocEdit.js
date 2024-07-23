'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import stylesSystem from '@/app/page.module.css';
import { useState } from 'react';
import stylesAdmin from '../Admin.module.css';
import Swal from 'sweetalert2';
import { CircularProgress, Grid } from '@mui/material';
import { customDialogTransition } from '@/components/Page/CustomMUI/customMUI';
import { listCountries } from '@/dbx/e-vissa/models/data/countryData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';

export default function VisaSupportingDocEdit({ selectedRow, onEdit, accessToken }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataSupportingDoc, setDataSupportingDoc] = useState('');

    const handleClickOpen = () => {
        if (selectedRow.length !== 1) {
            Swal.fire({
                text: 'Please select only one field to edit!',
                icon: 'info',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setDataSupportingDoc(selectedRow[0]?.supporting_doc);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditSupportingDoc = async () => {
        try {
            setLoading(true);
            const id = selectedRow[0].id;
            const resp = await fetch(`/api/admin/xref_visa_country/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
                body: JSON.stringify({
                    supporting_doc: dataSupportingDoc,
                }),
            });
            if (resp.status == 200) {
                onEdit((prevData) => {
                    const updatedData = [...prevData];
                    // Find the index of the edited row
                    const rowIndex = updatedData.findIndex((item) => item.id === id);
                    // Update the supporting_doc field in the data
                    updatedData[rowIndex].supporting_doc = dataSupportingDoc;
                    return updatedData;
                });

                Swal.fire({
                    text: 'Updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: resp.status,
                    text: resp.statusText,
                    icon: 'error',
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className={stylesAdmin.custom__action__edit}>
                <FontAwesomeIcon icon={faFilePen} />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xl'}
                fullWidth
                TransitionComponent={customDialogTransition}
            >
                <DialogTitle className={stylesAdmin.custom__header__dialog}>
                    <div className="flex justify-between">
                        <div>Edit SupportingDoc</div>
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
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item md={12} sx={12}>
                            <div className={stylesSystem.label__normal}>Evisa </div>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                readOnly
                                value={listCountries.find((item) => item.code === selectedRow[0]?.country)?.name}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <div className={stylesSystem.label__normal}>For region</div>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                readOnly
                                value={
                                    listCountries.find((item) => item.code === selectedRow[0]?.allowed_country)?.name
                                }
                            />
                        </Grid>
                        <Grid item md={12}>
                            <div className={stylesSystem.label__normal}>Supporting docs</div>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={5}
                                value={dataSupportingDoc}
                                onChange={(e) => setDataSupportingDoc(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button className={stylesSystem.admin__button__primary__default} onClick={handleClose}>
                        Close
                    </Button>

                    <Button className={stylesSystem.admin__button__primary} onClick={handleEditSupportingDoc}>
                        {loading ? <CircularProgress /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
