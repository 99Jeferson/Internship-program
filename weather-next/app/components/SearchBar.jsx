'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  const handleSearch = () => {
    if (city.trim() === '') {
      setError('Please enter a city name')
      return
    }
    setError('')
    onSearch(city.trim())
  }

  return (
    <Box display="flex" gap={1.5} alignItems="flex-start" mb={4}>
      <TextField
        fullWidth
        placeholder="Enter city name e.g. Kampala"
        value={city}
        onChange={(e) => {
          setCity(e.target.value)
          if (error) setError('')
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        error={!!error}
        helperText={error}
        size="small"
        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={loading}
        startIcon={<SearchIcon />}
        sx={{ height: 40, flexShrink: 0 }}
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </Box>
  )
}