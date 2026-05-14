import { useState } from "react";

function TaskInput({ onAdd}) {
  const [inputValue, setInputValue] = useState("")

  const handleAdd = () => {
    if (inputValue.trim() === "") return
    onAdd(inputValue.trim()) 
    setInputValue("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd()
    }

    return (
        <div className="task-wrapper">
            <input
                type="text"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="btn" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default TaskInput
