import App from './App';
import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
export const theme = createTheme({
    primaryColor: 'red',
    defaultRadius: 2,
    colors: {
        button: ['#C6D2DE']
    }
})
root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light" theme={theme}>
            <App/>
        </MantineProvider>
    </React.StrictMode>
);