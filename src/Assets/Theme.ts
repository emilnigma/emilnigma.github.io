import { createTheme } from '@mui/material';
import mechanics from './Mechanics';

export const sizes = {
  S: 28,
  M: 40,
  L: 48,
};

export const theme = createTheme({
  palette: {
    primary: {
      main: mechanics.phase.rgb,
    },
    secondary: {
      main: mechanics.score.rgb,
    },
    background: {
      default: '#222222',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"PT Serif", "Garamond"',
    fontWeightRegular: 400,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#222222',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#222222',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'white',
        },
      },
    },
  },
});
