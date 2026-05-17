import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function ErrorMessage({ message }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: 'center',
        borderColor: 'error.main',
        bgcolor: 'rgba(255,77,77,0.05)'
      }}
    >
      <Typography fontSize="2rem" mb={1}>⚠️</Typography>
      <Typography color="error" fontWeight={500}>{message}</Typography>
      <Typography variant="caption" color="text.secondary" mt={1} display="block">
        Check the city name and try again
      </Typography>
    </Paper>
  )
}