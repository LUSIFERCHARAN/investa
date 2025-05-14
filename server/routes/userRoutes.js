const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the path is correct

// Middleware to authenticate
const authenticateUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // Attach user data to request object
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// GET profile
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user); // Return full user object including mobile
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ msg: "Server error while fetching profile" });
  }
});

// PUT profile (update profile)
router.put("/profile", authenticateUser, async (req, res) => {
  const { username, email, mobile } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user data only if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;

    await user.save();
    res.json({ msg: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ msg: "Server error while updating profile" });
  }
});

module.exports = router;
