'use client'
import { createTheme } from '@mui/icons-material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '6c63ff' },
        background: {
            default: '#0f0f0f',
            paper: '#1a1a1a',
        },
    },
    Typography: { fontFamily: 'Roboto, sans-serif'},
    shape: { borderRadius: 12 },
    components: {
        MuiButton: {
            styleOverrives: {
                root: { textTransform: 'none', fontWeight: 600 }
            }
        }
    }
})

export default theme