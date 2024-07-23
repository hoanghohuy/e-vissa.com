'use client';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './css/TypeVisa.module.css';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export default function TypeVisaImport({ onImport }) {
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSaveInfo = () => {
        let formDataImport = new FormData();
        formDataImport.append('csvFile', selectedFile);
        onImport(formDataImport);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" disableElevation onClick={handleClickOpen}>
                Import File
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth>
                <DialogTitle>Import</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} marginTop={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            size="small"
                            fullWidth
                            id="upload_image"
                            // label={'Image'}
                            name="upload_image"
                            accept="csv/*"
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files[0];
                                    setSelectedFile(file);
                                }
                            }}
                        />
                        <label className={styles.label__upload} for="upload_image">
                            <DriveFolderUploadIcon /> Import
                        </label>
                        <label style={{ marginLeft: '12px', lineHeight: '36px' }}>
                            {selectedFile ? selectedFile.name : ''}
                        </label>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={onSaveInfo}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
