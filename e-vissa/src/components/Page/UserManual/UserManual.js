import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import styles from './css/UserManual.module.css';

export default function UserManual({ content }) {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={styles.container}>
                <h1>{content.title}</h1>
                <span>{content.content}</span>
            </div>
        </Box>
    );

    return (
        <>
            <>
                <Button className={styles.button} onClick={toggleDrawer('right', true)}>
                    ?
                </Button>
                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                    {list('right')}
                </Drawer>
            </>
        </>
    );
}
