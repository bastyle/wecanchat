import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data.status) {
        console.log("Login successful:", response.data);
        navigate("/announcement");
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "An error occurred during login.";
      console.error("Login error:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="homepage">
      <div className="logo-container">
        <div className="logo"></div>
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>LOG IN</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <div className="signup-link">
            <Link to="/signup">Sign Up Here!</Link>
          </div>
          <div className="contiune-link">
            <Link to="/announcements">Continue as Guest</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
