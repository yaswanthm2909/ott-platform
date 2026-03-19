const express = require("express");
const router = express.Router();

const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/watchlistController");

const { protect } = require("../middleware/authMiddleware");

console.log("✅ Watchlist routes loaded");


router.get("/", protect, (req, res, next) => {
  console.log("🔥 GET /api/watchlist hit");
  next();
}, getWatchlist);


router.post("/", protect, (req, res, next) => {
  console.log("🔥 POST /api/watchlist hit");
  next();
}, addToWatchlist);


router.delete("/", protect, (req, res, next) => {
  console.log("🔥 DELETE /api/watchlist hit");
  next();
}, removeFromWatchlist);

module.exports = router;