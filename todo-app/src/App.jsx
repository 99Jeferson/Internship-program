import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title) => {
    setTasks((prev) => [...prev, {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    }])
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, title: newTitle } : t)
    )
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const completedCount = tasks.filter((t) => t.completed).length
  const remainingCount = tasks.length - completedCount

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Header total={tasks.length} completed={completedCount} />

      <TaskInput onAdd={addTask} />

      {/* Filter buttons */}
      <Box display="flex" gap={1} mb={2}>
        {['all', 'active', 'completed'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setFilter(f)}
            sx={{ borderRadius: 5, textTransform: 'capitalize' }}
          >
            {f}
          </Button>
        ))}
      </Box>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      {/* Footer */}
      {tasks.length > 0 && (
        <>
          <Divider sx={{ mt: 3, mb: 2 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {remainingCount} task{remainingCount !== 1 ? 's' : ''} remaining
            </Typography>
            {completedCount > 0 && (
              <Button
                size="small"
                color="error"
                onClick={clearCompleted}
                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
              >
                Clear completed
              </Button>
            )}
          </Box>
        </>
      )}
    </Container>
  )
}

export default App