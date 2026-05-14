import { useState, useEffect } from "react"
import Header from "./components/Header"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"

function App() {
  const [filter, setFilter] = useState("all")  // "all" | "active" | "completed"

const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks")
  return saved ? JSON.parse(saved) : []
})

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Add a new task
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),       // unique id using timestamp
      title,
      completed: false
    }
    setTasks([...tasks, newTask])  // spread old tasks, add new one
  }

  // Toggle completed status
  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Edit a task title
  const editTask = (id, newTitle) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    ))
  }

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true  // "all"
  })

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="app">
      <Header total={tasks.length} completed={completedCount} />

      <TaskInput onAdd={addTask} />

      <div className="filters">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      {tasks.length > 0 && (
        <p className="summary">
          {tasks.length - completedCount} task{tasks.length - completedCount !== 1 ? "s" : ""} remaining
        </p>
      )}
    </div>
  )
}

export default App