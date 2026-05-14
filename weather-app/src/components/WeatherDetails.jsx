import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

function StatBox({ label, value, icon }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, textAlign: 'center', flex: 1, minWidth: 120 }}
    >
      <Typography fontSize="1.8rem">{icon}</Typography>
      <Typography variant="h6" fontWeight={700} mt={0.5}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  )
}

function WeatherDetails({ data }) {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" mt={3}>
      <StatBox
        icon="💧"
        label="Humidity"
        value={`${data.main.humidity}%`}
      />
      <StatBox
        icon="💨"
        label="Wind Speed"
        value={`${Math.round(data.wind.speed * 3.6)} km/h`}
      />
      <StatBox
        icon="🌡️"
        label="Feels Like"
        value={`${Math.round(data.main.feels_like)}°C`}
      />
      <StatBox
        icon="👁️"
        label="Visibility"
        value={`${(data.visibility / 1000).toFixed(1)} km`}
      />
    </Box>
  )
}

export default WeatherDetails