import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import WeatherDetails from './WeatherDetails'

const getBackground = (code) => {
  if (code >= 200 && code < 300) return 'linear-gradient(135deg, #1a1a2e, #16213e)'
  if (code >= 300 && code < 600) return 'linear-gradient(135deg, #1a2a3a, #2d4a6e)'
  if (code >= 600 && code < 700) return 'linear-gradient(135deg, #2a2a3e, #4a4a6e)'
  if (code === 800) return 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
  return 'linear-gradient(135deg, #1a1a2e, #2d3561)'
}

export default function WeatherCard({ data }) {
  const temp = Math.round(data.main.temp)
  const tempMin = Math.round(data.main.temp_min)
  const tempMax = Math.round(data.main.temp_max)
  const description = data.weather[0].description
  const iconCode = data.weather[0].icon
  const conditionCode = data.weather[0].id

  return (
    <Paper
      sx={{
        p: 4,
        background: getBackground(conditionCode),
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="h4" fontWeight={800}>{data.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {data.sys.country} • {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric'
            })}
          </Typography>
        </Box>
        <Chip
          label={description.charAt(0).toUpperCase() + description.slice(1)}
          size="small"
          sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'text.primary' }}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" mt={3} mb={1}>
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={description}
          width={80}
          height={80}
        />
        <Typography variant="h1" fontWeight={800} fontSize="5rem" lineHeight={1}>
          {temp}°C
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" gap={3} mb={1}>
        <Typography variant="body2" color="text.secondary">↓ {tempMin}°C</Typography>
        <Typography variant="body2" color="text.secondary">↑ {tempMax}°C</Typography>
      </Box>

      <WeatherDetails data={data} />
    </Paper>
  )
}