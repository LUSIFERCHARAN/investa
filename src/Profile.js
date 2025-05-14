import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "", mobile: "" });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p style={{ textAlign: "center", color: "#fff" }}>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>

      <div className="profile-field">
        <label className="profile-label">Username</label>
        <input className="profile-input" value={user.username} disabled />
      </div>

      <div className="profile-field">
        <label className="profile-label">Email</label>
        <input className="profile-input" value={user.email} disabled />
      </div>

      <div className="profile-field">
        <label className="profile-label">Mobile</label>
        <input className="profile-input" value={user.mobile || ""} disabled />
      </div>
    </div>
  );
};

export default Profile;
