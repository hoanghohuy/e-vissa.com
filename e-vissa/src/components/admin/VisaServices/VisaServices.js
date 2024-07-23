'use client';
import { Button, FormControl, Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import stylesSystem from '@/app/page.module.css';
import stylesAdmin from '../Admin.module.css';

const VisaServices = ({ setServices, services }) => {
    const handleServiceFieldChange = (index, field, value) => {
        let updatedServices = [...services];
        const indexofArr = updatedServices.findIndex((item) => item.id == index);
        updatedServices[indexofArr][field] = value;
        setServices(updatedServices);
    };

    const findMaxId = (arr) => {
        let max = 1;
        arr.length > 0 &&
            arr.map((item) => {
                if (item.id > max) {
                    max = item.id;
                }
            });
        return max + 1;
    };

    // Function to handle addition of a new service item
    const handleAddService = () => {
        const newItem = {
            id: findMaxId(services),
            label: '',
            processing_times: 0,
            fee: 0,
            type: 'd',
            published: 1,
        }; // Initial values for the new item
        setServices((prevServices) => [...prevServices, newItem]);
    };

    const handleRemoveService = (idToRemove) => {
        const removedData = services.filter((item) => item.id !== idToRemove);
        setServices(removedData);
    };
    return (
        <div className="border-[2px] p-4 rounded-lg">
            {services &&
                services.length > 0 &&
                services.map((item) => (
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }} key={item.id}>
                        <Grid item lg={3} md={3} xs={3}>
                            <div className={stylesAdmin.admin__label__required}>Service Label:</div>
                            <TextField
                                fullWidth
                                id={`label_${item.id}`}
                                name={`label_${item.id}`}
                                size="small"
                                variant="outlined"
                                value={item.label}
                                disabled={item.published == -1 ? true : false}
                                onChange={(e) => handleServiceFieldChange(item.id, 'label', e.target.value)}
                                sx={customTextFieldAdmin}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} xs={3}>
                            <div className={stylesAdmin.admin__label__required}>Processing Times: </div>
                            <TextField
                                type="number"
                                fullWidth
                                id={`processing_times_${item.id}`}
                                name={`processing_times_${item.id}`}
                                size="small"
                                variant="outlined"
                                value={item.processing_times}
                                sx={customTextFieldAdmin}
                                onChange={(e) => handleServiceFieldChange(item.id, 'processing_times', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FormControl
                                                fullWidth
                                                style={{
                                                    width: '100px',
                                                    transform: 'translateX(15px)',
                                                    border: 'none',
                                                }}
                                            >
                                                <Select
                                                    size="small"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    defaultValue={item.type || 'h'}
                                                    onChange={(e) =>
                                                        handleServiceFieldChange(item.id, 'type', e.target.value)
                                                    }
                                                >
                                                    <MenuItem value={'h'}>hours</MenuItem>
                                                    <MenuItem value={'d'}>days</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item lg={2} md={2} xs={3}>
                            <div className={stylesAdmin.admin__label__required}>
                                {item.published == -1 ? 'Service Fee' : 'Plus Fee'} (USD):
                            </div>
                            <TextField
                                type="number"
                                fullWidth
                                id={`fee_${item.id}`}
                                name={`fee_${item.id}`}
                                size="small"
                                variant="outlined"
                                value={item.fee}
                                sx={customTextFieldAdmin}
                                onChange={(e) => handleServiceFieldChange(item.id, 'fee', e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={2} md={2} xs={2}>
                            <div className={stylesAdmin.admin__label__required}>Service Status:</div>
                            <TextField
                                fullWidth
                                id={`published_${item.id}`}
                                name={`published_${item.id}`}
                                size="small"
                                variant="outlined"
                                value={item.published}
                                defaultValue={1}
                                disabled={item.published == -1 ? true : false}
                                sx={customTextFieldAdmin}
                                onChange={(e) => handleServiceFieldChange(item.id, 'published', e.target.value)}
                                select
                            >
                                {item.published == -1 && (
                                    <MenuItem key={-1} value={-1}>
                                        Default
                                    </MenuItem>
                                )}
                                <MenuItem key={1} value={1}>
                                    Active
                                </MenuItem>
                                <MenuItem key={2} value={0}>
                                    Disabled
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item lg={1} md={2} xs={1}>
                            <div className={stylesSystem.label__normal}>Action</div>
                            <Button
                                disabled={item.published == -1}
                                className={stylesSystem.admin__button__danger}
                                onClick={() => handleRemoveService(item.id)}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            <Grid item xs={2} className="pt-2">
                <Button className={stylesSystem.admin__button__primary} onClick={handleAddService}>
                    Add service
                </Button>
            </Grid>
        </div>
    );
};

export default VisaServices;
