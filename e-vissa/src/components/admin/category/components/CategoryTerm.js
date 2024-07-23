'use client';
import * as React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import stylesSystem from '@/app/page.module.css';

export default function CategoryTerm({ term, setTerm }) {
    return (
        <>
            <label className={stylesSystem.required}>Term</label>
            <FormControl size="small" fullWidth>
                <Select
                    size="small"
                    fullWidth
                    defaultValue={term}
                    onChange={(e) => setTerm(e.target.value)}
                    value={term}
                >
                    <MenuItem key={1} value={'category'}>
                        Category (Show on Header)
                    </MenuItem>
                    <MenuItem key={2} value={'metadata'}>
                        Metadata
                    </MenuItem>
                    <MenuItem key={3} value={'info-page'}>
                        Info page
                    </MenuItem>
                    <MenuItem key={4} value={'tag'}>
                        Tag
                    </MenuItem>
                    <MenuItem key={5} value={'menu'}>
                        Menu (Show on Footer)
                    </MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
