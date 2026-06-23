import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);
  const [wishlist, setWishlist] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task) return;

    const newTask = {
      id: Date.now(),
      task,
      date,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setDate("");
    setPriority("Medium");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addWishlist = () => {
    if (!wishlist) return;

    setWishlistItems([...wishlistItems, wishlist]);
    setWishlist("");
  };

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;
  const progress =
    tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {!started ? (
        <div className="home">
          <h1>📝 Todo List Manager</h1>
          <p>Manage your daily tasks efficiently.</p>

          <button onClick={() => setStarted(true)}>
            Get Started
          </button>
        </div>
      ) : (
        <div className="dashboard">
          <div className="top">
            <h1>📝 Todo Dashboard</h1>

            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="form">
            <input
              type="text"
              placeholder="Task Name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <button onClick={addTask}>Add Task</button>
          </div>

          <h2>📋 Task List</h2>

          {tasks.map((t) => (
            <div className="task-card" key={t.id}>
              <div>
                <h3>{t.task}</h3>
                <p>📅 {t.date}</p>
                <p>⭐ {t.priority}</p>
              </div>

              <div>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => completeTask(t.id)}
                />

                <button
                  className="delete"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h2>❤️ Wishlist</h2>

          <div className="wishlist">
            <input
              type="text"
              placeholder="Add Wishlist Item"
              value={wishlist}
              onChange={(e) => setWishlist(e.target.value)}
            />

            <button onClick={addWishlist}>Add</button>
          </div>

          {wishlistItems.map((item, index) => (
            <div className="wish-card" key={index}>
              {item}
            </div>
          ))}

          <h2>📊 Statistics</h2>

          <div className="stats">
            <p>Total: {tasks.length}</p>
            <p>Completed: {completed}</p>
            <p>Pending: {pending}</p>

            <div className="progress">
              <div
                className="fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;