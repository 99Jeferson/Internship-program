import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.jsx'

// Define your custom dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6c63ff',
    },
    background: {
      default: '#0f0f0f',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#888888',
    },
  },
  typography: {
    fontFamily: 'Roboto, Segoe UI, sans-serif',
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />  {/* MUI's version of CSS reset */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)