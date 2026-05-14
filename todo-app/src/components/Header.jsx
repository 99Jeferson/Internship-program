import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

function Header({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <Box textAlign="center" mb={5}>
      <Typography
        variant="h3"
        fontWeight={800}
        color="primary"
        gutterBottom
      >
        My Tasks
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {total === 0
          ? 'No tasks yet — add one below'
          : `${completed} of ${total} tasks completed`}
      </Typography>

      {total > 0 && (
        <Box maxWidth={300} mx="auto">
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      )}
    </Box>
  )
}

export default Header