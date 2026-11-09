import React, { useState, useEffect } from "react";

// Reads saved tasks; returns [] if storage is unavailable or holds bad data,
// so a corrupted entry can't crash the app on startup.
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (!Array.isArray(saved)) return [];
    return saved.filter(
      task => task && typeof task === "object" && typeof task.text === "string"
    );
  } catch {
    return [];
  }
}

function App() {

  const [tasks, setTasks] = useState(loadTasks);

  const [input, setInput] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch {
      // Storage full or blocked: keep working with in-memory tasks.
    }
  }, [tasks]);

  function addTask(e){
    e.preventDefault();

    if(input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function deleteTask(id){
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={addTask}>
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button>Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={()=>deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;