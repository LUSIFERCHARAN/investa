const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  mobile: { type: String },
  password: { type: String, required: true },
  favorites: [{ type: String }]  // 👈 Add this line
});

module.exports = mongoose.model("User", userSchema);
