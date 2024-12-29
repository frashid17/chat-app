import { createTheme } from '@mui/material';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#667eea',
      dark: '#5a67d8',
      light: '#7f9cf5',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#1a1a2e',
      paper: mode === 'light' ? '#ffffff' : '#242444',
    },
    text: {
      primary: mode === 'light' ? '#2d3748' : '#e2e8f0',
      secondary: mode === 'light' ? '#718096' : '#a0aec0',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
}); 