import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const loginImage = "https://img.freepik.com/premium-photo/isolated-investment-growth-3d-illustration_839035-121179.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        username,
        mobile,
        password,
      });
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
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
        <form onSubmit={handleSignup}>
          <h2>Signup</h2>
          <div className="input-group">
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Mobile Number" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Re-enter Password" required value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
          </div>
          <button type="submit">Signup</button>
          <p className="signup-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
