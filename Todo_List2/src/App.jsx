import React, { useState, useEffect } from "react";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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