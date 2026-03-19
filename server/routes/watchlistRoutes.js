const express = require("express");
const router = express.Router();

const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/watchlistController");

const { protect } = require("../middleware/authMiddleware");

// GET watchlist
router.get("/", protect, getWatchlist);

// ADD to watchlist
router.post("/", protect, addToWatchlist);

// REMOVE from watchlist
router.delete("/", protect, removeFromWatchlist);

module.exports = router;