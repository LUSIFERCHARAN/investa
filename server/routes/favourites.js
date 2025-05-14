const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to simulate user (Replace with real auth in prod)
const mockUserId = "YOUR_USER_ID"; // Replace with actual login logic

// Get favorites
router.get('/', async (req, res) => {
  const user = await User.findById(mockUserId);
  res.json(user.favorites);
});

// Add favorite
router.post('/', async (req, res) => {
  const { symbol } = req.body;
  const user = await User.findById(mockUserId);
  if (!user.favorites.includes(symbol)) {
    user.favorites.push(symbol);
    await user.save();
  }
  res.json(user.favorites);
});

// Remove favorite
router.delete('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const user = await User.findById(mockUserId);
  user.favorites = user.favorites.filter(s => s !== symbol);
  await user.save();
  res.json(user.favorites);
});

module.exports = router;
