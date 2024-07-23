'use client';
import { FormControl, MenuItem, Select } from '@mui/material';
import { customSelectAdmin } from '@/components/Page/CustomMUI/customMUI';

const StatusPost = ({ published = 1, setPublished }) => {
    return (
        <div id="box-admin" className="border-[#eee] rounded-sm overflow-hidden border-solid border-[1px]">
            <div id="admin-box-header" className="font-dmsans py-1 px-2 bg-[#f5f5f5] text-black font-[600] text-[14px]">
                STATUS
            </div>
            <div className="px-2 py-2">
                <FormControl size="small" fullWidth>
                    <Select
                        defaultValue={published}
                        size="small"
                        id="Published"
                        onChange={(e) => setPublished(e.target.value)}
                        sx={customSelectAdmin}
                    >
                        <MenuItem value={1}>Published</MenuItem>
                        <MenuItem value={2}>Draft</MenuItem>
                        <MenuItem value={0}>Disabled</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default StatusPost;
