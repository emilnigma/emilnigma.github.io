import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../assets/index.css'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { AppContext, AppStore } from '../core/Mobx.ts';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as de from '../translations/de.json'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffeb3b',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff'
    },
    action: {
      disabled: '#fff'
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white',
          padding: 0,
          minHeight: '48px',
          textTransform: 'none',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          textTransform: 'none',
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: '10px'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Segoe UI"',
    allVariants: {
      color: '#fff'
    }
  },
});

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('language') ?? "us",
  fallbackLng: "us",
  resources: { de },
  interpolation: { escapeValue: false }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={responsiveFontSizes(theme)}>
    <React.StrictMode>
      <AppContext.Provider value={AppStore.getInstance()}>
        <RouterProvider router={createBrowserRouter([{ path: "", element: <App /> } ])} />
      </AppContext.Provider>
    </React.StrictMode>
  </ThemeProvider>
)
