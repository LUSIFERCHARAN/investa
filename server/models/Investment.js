const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  stockName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Investment", investmentSchema);
