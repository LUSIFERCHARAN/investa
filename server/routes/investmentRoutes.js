const express = require("express");
const router = express.Router();
const Investment = require("../models/Investment");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  try {
    const { stockName, quantity, price } = req.body;

    const investment = new Investment({
      stockName,
      quantity,
      price,
      user: req.userId,
    });

    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.userId });
    res.json(investments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
