import { useState } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ErrorMessage from './components/ErrorMessage'

const API_KEY = process.env.WEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastCity, setLastCity] = useState('')

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)
    setWeatherData(null)
    setLastCity(city)

    try {
      // Axios makes the HTTP request and parses JSON automatically
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'   // gives us Celsius directly
        }
      })

      setWeatherData(response.data)

    } catch (err) {
      // Axios puts HTTP errors inside err.response
      if (err.response) {
        if (err.response.status === 404) {
          setError(`City "${city}" not found. Check the spelling and try again.`)
        } else if (err.response.status === 401) {
          setError('Invalid API key. Check your .env file.')
        } else {
          setError(`Something went wrong (${err.response.status}). Try again.`)
        }
      } else {
        setError('Network error. Check your internet connection.')
      }
    } finally {
      setLoading(false)  // always runs whether success or error
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
          🌤 Weather App
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Search any city in the world for live weather data
        </Typography>
      </Box>

      {/* Search */}
      <SearchBar onSearch={fetchWeather} loading={loading} />

      {/* Loading spinner */}
      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Error */}
      {error && !loading && <ErrorMessage message={error} />}

      {/* Weather result */}
      {weatherData && !loading && <WeatherCard data={weatherData} />}

      {/* Empty state */}
      {!weatherData && !loading && !error && (
        <Box textAlign="center" py={8} color="text.secondary">
          <Typography fontSize="3rem" mb={2}>🌍</Typography>
          <Typography variant="body2">
            Search for a city above to see its current weather
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default App