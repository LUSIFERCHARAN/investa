import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="intro-section">
        <h1>Welcome to <span className="brand">Investa</span></h1>
        <p className="slogan">
          Your futuristic command center to manage, analyze, and grow your investments.
        </p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn start-btn">Launch Investa 🚀</Link>
          <Link to="/login" className="btn login-btn">Login</Link>
        </div>
      </div>

      <div className="highlight-cards">
        <div className="card">
          <h3>Total Portfolio</h3>
          <p>$72,350</p>
        </div>
        <div className="card">
          <h3>Today's Gain</h3>
          <p className="green">+ $1,530</p>
        </div>
        <div className="card">
          <h3>Top Asset</h3>
          <p>Apple Inc. (AAPL)</p>
        </div>
      </div>

      <footer className="home-footer">
        <p>💼S.M.LAKSHMANAN, ASHLEY MARIZKA R, VIGNESH</p>
      </footer>
    </div>
  );
};

export default Home;
