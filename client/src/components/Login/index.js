import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

function AdminLogin({ authenticateUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "admin123") {
      authenticateUser();
      navigate("/home");
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
          <br />
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function TeamLeaderLogin({ authenticateUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (username === "teamleader" && password === "team123") {
      authenticateUser();
      navigate("/home");
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
          <br />
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function ReviewerLogin({ authenticateUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (username === "reviewer" && password === "review123") {
      authenticateUser();
      navigate("/track-progress");
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
          <br />
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
function Login({ authenticateUser }) {
  const [loginType, setLoginType] = useState("");

  const handleLogin = (type) => {
    setLoginType(type);
  };

  return (
    <div className="container1">
      <div className="login-page1">
        <div className="button-box">
          <button
            id="admin"
            style={{ backgroundColor: loginType === "admin" ? "orange" : "rgb(26, 195, 35)" }}
            className="loginbutton"
            onClick={() => handleLogin("admin")}
          >
            Admin Login
          </button>
          <button
            id="teamleader"
            style={{ backgroundColor: loginType === "teamleader" ? "orange" : "rgb(26, 195, 35)" }}
            className="loginbutton"
            onClick={() => handleLogin("teamleader")}
          >
            Team Leader Login
          </button>
          <button
            id="reviewer"
            style={{ backgroundColor: loginType === "reviewer" ? "orange" : "rgb(26, 195, 35)" }}
            className="loginbutton"
            onClick={() => handleLogin("reviewer")}
          >
            Reviewer Login
          </button>
        </div>
        {loginType === "admin" && <AdminLogin authenticateUser={authenticateUser} />}
        {loginType === "teamleader" && <TeamLeaderLogin authenticateUser={authenticateUser} />}
        {loginType === "reviewer" && <ReviewerLogin authenticateUser={authenticateUser} />}
      </div>
    </div>
  );
}

export default Login;

