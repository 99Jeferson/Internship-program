import {useState} from "react";
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const [editError, setEditError] = useState('')

  const handleEditSave = () => {
    if (editValue.trim().length < 3) {
      setEditError('Task must be at least 3 characters')
      return
    }
    onEdit(task.id, editValue.trim())
    setIsEditing(false)
    setEditError('')
  }

  const handleEditCancel = () => {
    setEditValue(task.title)
    setIsEditing(false)
    setEditError('')
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        p: 1.5,
        transition: 'border-color 0.2s',
        opacity: task.completed ? 0.6 : 1,
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      {/* Checkbox */}
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        color="primary"
        size="small"
        sx={{ mt: 0.2, p: 0.5 }}
      />

      {/* Body */}
      <Box flex={1} minWidth={0}>
        {isEditing ? (
          <TextField
            fullWidth
            variant="standard"
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value)
              if (editError) setEditError('')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSave()
              if (e.key === 'Escape') handleEditCancel()
            }}
            error={!!editError}
            helperText={editError}
            autoFocus
            size="small"
          />
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
                wordBreak: 'break-word',
              }}
            >
              {task.title}
            </Typography>
            {task.createdAt && (
              <Typography variant="caption" color="text.secondary">
                {task.createdAt}
              </Typography>
            )}
          </>
        )}
      </Box>

      {/* Actions */}
      <Box display="flex" gap={0.5} flexShrink={0}>
        {isEditing ? (
          <>
            <Tooltip title="Save">
              <IconButton size="small" color="primary" onClick={handleEditSave}>
                <CheckIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton size="small" onClick={handleEditCancel}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Edit task">
              <span>
                <IconButton
                  size="small"
                  onClick={() => setIsEditing(true)}
                  disabled={task.completed}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(task.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Paper>
  )
}

export default TaskItem