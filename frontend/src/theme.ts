import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF5722',
      light: '#FF7043',
      dark: '#E64A19',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    }
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Righteous", cursive',
      fontSize: '3.5rem',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Righteous", cursive',
      fontSize: '2.8rem',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Righteous", cursive',
      fontSize: '2.2rem',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Righteous", cursive',
      fontSize: '1.8rem',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Righteous", cursive',
      fontSize: '1.4rem',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Righteous", cursive',
      fontSize: '1.2rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F5F5F5',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});
