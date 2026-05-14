import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function TaskInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleAdd = () => {
    if (inputValue.trim() === '') {
      setError('Please enter a task')
      return
    }
    if (inputValue.trim().length < 3) {
      setError('Task must be at least 3 characters')
      return
    }
    setError('')
    onAdd(inputValue.trim())
    setInputValue('')
  }

  return (
    <Box display="flex" gap={1.5} mb={2} alignItems="flex-start">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add a new task and press Enter..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          if (error) setError('')
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        error={!!error}
        helperText={error}
        size="small"
        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleAdd}
        startIcon={<AddIcon />}
        sx={{ height: 40, whiteSpace: 'nowrap', flexShrink: 0 }}
      >
        Add
      </Button>
    </Box>
  )
}

export default TaskInput