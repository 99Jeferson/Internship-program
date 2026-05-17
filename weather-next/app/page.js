'use client'
import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ErrorMessage from './components/ErrorMessage'

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)
    setWeatherData(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      setWeatherData(data)

    } catch {
      setError('Network error. Check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
          🌤 Weather App
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Search any city in the world for live weather data
        </Typography>
      </Box>

      <SearchBar onSearch={fetchWeather} loading={loading} />

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && !loading && <ErrorMessage message={error} />}

      {weatherData && !loading && <WeatherCard data={weatherData} />}

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