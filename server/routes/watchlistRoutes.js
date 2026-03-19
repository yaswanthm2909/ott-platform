const express = require("express");
const router = express.Router();

const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/watchlistController");

const { protect } = require("../middleware/authMiddleware");

// 🔥 DEBUG (remove later if you want)
console.log("✅ Watchlist routes loaded");

// ================= ROUTES =================

// GET WATCHLIST
router.get("/", protect, (req, res, next) => {
  console.log("🔥 GET /api/watchlist hit");
  next();
}, getWatchlist);

// ADD TO WATCHLIST
router.post("/", protect, (req, res, next) => {
  console.log("🔥 POST /api/watchlist hit");
  next();
}, addToWatchlist);

// REMOVE FROM WATCHLIST
router.delete("/", protect, (req, res, next) => {
  console.log("🔥 DELETE /api/watchlist hit");
  next();
}, removeFromWatchlist);

module.exports = router;