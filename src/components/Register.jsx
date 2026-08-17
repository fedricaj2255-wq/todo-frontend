import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("register/", {
        username,
        password,
      });

      alert("Registration Successful!");

      navigate("/");

    } catch (err) {
  console.log(err.response);
  console.log(err.response?.data);

  alert(JSON.stringify(err.response?.data));
}
  };

  return (
    <div className="container">
      <div className="card">

        <h1>Register</h1>

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

        <button onClick={register}>Register</button>

        <br /><br />

        <Link to="/">Already have an account? Login</Link>

      </div>
    </div>
  );
}

export default Register;