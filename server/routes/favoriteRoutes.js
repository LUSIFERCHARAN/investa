const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Mock User ID for testing – Replace with real auth later
const mockUserId = "PUT_A_REAL_USER_ID_HERE"; // use a valid MongoDB user _id

// GET: Get favorite stocks
router.get("/", async (req, res) => {
  const user = await User.findById(mockUserId);
  res.json(user.favorites || []);
});

// POST: Add a favorite stock
router.post("/", async (req, res) => {
  const { symbol } = req.body;
  const user = await User.findById(mockUserId);
  if (!user.favorites.includes(symbol)) {
    user.favorites.push(symbol.toUpperCase());
    await user.save();
  }
  res.json(user.favorites);
});

// DELETE: Remove a favorite stock
router.delete("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const user = await User.findById(mockUserId);
  user.favorites = user.favorites.filter((s) => s !== symbol.toUpperCase());
  await user.save();
  res.json(user.favorites);
});

module.exports = router;
