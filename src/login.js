import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const loginImage = "https://img.freepik.com/premium-photo/isolated-investment-growth-3d-illustration_839035-121179.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // Save token and navigate after successful login
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");  // Navigate to Dashboard
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <div
        className="right"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
