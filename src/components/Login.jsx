import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const response = await api.post("login/", {
      username,
      password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (err) {
    console.log(err);
    alert("Invalid username or password");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h1>Todo App Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;