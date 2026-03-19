require("dotenv").config();
console.log(">>> RUNNING SERVER FILE: D:\\ott-platform\\server\\server.js");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes"); 


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/watchlist", watchlistRoutes); // 


app.get("/", (req, res) => {
  res.send("Server is running");
});


const PORT = process.env.PORT || 5050;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/test-route", (req, res) => {
  res.send("TEST WORKING");
});