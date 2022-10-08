import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@fontsource/noto-sans-jp/400.css"
import "@fontsource/noto-sans-jp/700.css"

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
  typography: {
    fontFamily: [
     'Roboto',
     '"Noto Sans JP"', 
     '"Helvetica"',
     'Arial',
     'sans-serif',
   ].join(','),
   h5: {
    fontWeight: 700
   }
  }
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
