const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// App initialization
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/investment-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/investments", require("./routes/investmentRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes")); // ⭐ New favorites route

// Default route
app.get("/", (req, res) => {
  res.send("Investment Portfolio Tracker API is running.");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
