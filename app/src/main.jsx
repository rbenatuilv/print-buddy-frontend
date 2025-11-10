import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';


import theme from './theme.js';

import App from './App.jsx'

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App />
        </ThemeProvider>
    </StrictMode>,
)
