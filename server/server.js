require("dotenv").config();
console.log(">>> RUNNING SERVER FILE: D:\\ott-platform\\server\\server.js");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes"); // ✅ ADD THIS

// USE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/watchlist", watchlistRoutes); // ✅ ADD THIS

// ROOT
app.get("/", (req, res) => {
  res.send("Server is running");
});

// CONFIG
const PORT = process.env.PORT || 5050;

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/test-route", (req, res) => {
  res.send("TEST WORKING");
});