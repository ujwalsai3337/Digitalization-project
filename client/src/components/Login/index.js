import React, { useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";

function Login({ authenticateUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    // Here you can add your authentication logic
    // For demo purposes, let's assume authentication is successful
    // You can replace this with your actual authentication logic

    if (username === "admin" && password === "admin123") {
      authenticateUser(); // Set isLoggedIn to true
      navigate('/home');
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </div>
    </div>
  );
}

export default Login;
