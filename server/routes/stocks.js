// routes/stocks.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const apiKey = process.env.FINNHUB_API_KEY;
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock data." });
  }
});

module.exports = router;
