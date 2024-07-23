'use client';
import { Button, Link } from '@mui/material';
import React from 'react';
import stylesSystem from '@/app/page.module.css';

export default function TypeVisaExport() {
    return (
        <div>
            <Link href="/api/admin/settings" title="Export File">
                <Button variant="contained" disableElevation className={stylesSystem.admin__button__primary}>
                    Export Data
                </Button>
            </Link>
        </div>
    );
}
