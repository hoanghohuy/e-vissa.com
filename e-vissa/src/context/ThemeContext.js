'use client';
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggle = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ toggle, mode }}>
            <div className={`${mode}`}>{children}</div>
        </ThemeContext.Provider>
    );
};
