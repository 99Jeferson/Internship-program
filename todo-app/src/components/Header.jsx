function Header({total, completed}) {
  return (
    <div className="app-header">
      <h1>My Task</h1>
      <p>{completed} of {total} tasks completed</p>
    </div>
  )
}

export default Header