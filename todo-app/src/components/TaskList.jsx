import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="empty-states">No tasks yet. Add one above!</p>
  }

  return (
    <div className="task-list">
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        ))} 
    </div>
    )
}

export default TaskList