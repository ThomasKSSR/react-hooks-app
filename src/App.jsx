import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const { darkMode, toggleTheme } = useTheme();

  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskText("");
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "active":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="App">
      <button onClick={toggleTheme}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <h1>📝 Smart To-Do List</h1>

      <input
        type="text"
        placeholder="Add a task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul>
        {getFilteredTasks().map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                setTasks(
                  tasks.map((t) =>
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                  )
                )
              }
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {tasks.some((task) => task.completed) && (
        <button
          onClick={() => setTasks(tasks.filter((task) => !task.completed))}
        >
          Clear Completed
        </button>
      )}

      <p>{tasks.filter((task) => !task.completed).length} task(s) remaining</p>
    </div>
  );
}

export default App;
