import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TaskItem from "./TaskItem" 


function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <Box textAlign="center" py={8} color="text.secondary">
        <Typography fontSize="2.5rem" mb={1}>📋</Typography>
        <Typography variant="body2">Nothing here. Add a task above!</Typography>
      </Box>
    )
  }

   return (
    <Box display="flex" flexDirection="column" gap={1}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Box>
  )
}

export default TaskList