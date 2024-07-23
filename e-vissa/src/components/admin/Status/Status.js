'use client';
import { MenuItem, TextField } from '@mui/material';
import { customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';

const Status = ({ published = 1, setPublished, label = true }) => {
    return (
        <TextField
            size="small"
            fullWidth
            variant="outlined"
            defaultValue={published}
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            sx={customTextFieldAdmin}
            select
        >
            <MenuItem key={1} value={1}>
                Active
            </MenuItem>
            <MenuItem key={2} value={0}>
                Disabled
            </MenuItem>
        </TextField>
    );
};

export default Status;
