import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();  
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);
  const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  navigate("/");
};
  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get("tasks/");
      setTasks(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  // Add Task
  const addTask = async () => {
    if (title.trim() === "") return;

    try {
      await api.post("tasks/", {
        title: title,
        is_completed: false,
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err.response);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to delete task");
    }
  };

  // Toggle Complete
  const toggleComplete = async (task) => {
    try {
      await api.put(`tasks/${task.id}/`, {
        title: task.title,
        is_completed: !task.is_completed,
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  // Update Task
  const updateTask = async () => {
    try {
      const task = tasks.find((t) => t.id === editingId);

      await api.put(`tasks/${editingId}/`, {
        title: editingTitle,
        is_completed: task.is_completed,
      });

      setEditingId(null);
      setEditingTitle("");

      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>My Tasks</h1>
        <button
  onClick={logout}
  style={{
    background: "#333",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
    float: "right",
  }}
>
  Logout
</button>  
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <button onClick={addTask}>Add Task</button>

        <br />
        <br />

        {tasks.length === 0 ? (
          <p>No Tasks Yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleComplete(task)}
                />

                {editingId === task.id ? (
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: task.is_completed
                        ? "line-through"
                        : "none",
                      color: task.is_completed ? "gray" : "black",
                    }}
                  >
                    {task.title}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                {editingId === task.id ? (
                  <button
                    onClick={updateTask}
                    style={{
                      background: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditingTitle(task.title);
                    }}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Dashboard;