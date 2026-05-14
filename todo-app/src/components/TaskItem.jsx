import {useState} from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)

  const handleEdit = () => {
    if (editValue.trim() === "") return
    onEdit(task.id, editValue.trim())
    setIsEditing(false)
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input
          className="task-title-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
        />
      ) : (
        <span className="task-title">{task.title}</span>
      )}
      <div className="task-actions">
        {isEditing ? (
          <button className="icon-btn" onClick={handleEdit}>Save</button>   
        ) : (
            <button className="icon-btn" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="icon-btn delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  )
}

export default TaskItem