import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaTachometerAlt,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Investa</h2>
      <ul className="nav-links">
        <li>
          <Link to="/"><FaHome /> Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
            <li><Link to="/profile"><FaUser /> Profile</Link></li>
            <li><Link to="/stock">Stock</Link></li>
            {/* <li><Link to="/FavouriteStock">fav stock </Link></li>
            <li><Link to="/AddFavorite">Saved</Link></li> */}
            <li><button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Logout</button></li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
            <li><Link to="/signup"><FaUserPlus /> Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
