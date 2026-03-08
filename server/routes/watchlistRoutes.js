const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Temporary in-memory watchlist (for testing)
let watchlist = [];

// Add to watchlist (protected)
router.post("/", protect, (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: "movieId is required" });
  }

  watchlist.push({
    user: req.user._id,
    movieId,
  });

  res.json({ message: "Added to watchlist", watchlist });
});

// Get watchlist (protected)
router.get("/", protect, (req, res) => {
  const userList = watchlist.filter(
    (item) => String(item.user) === String(req.user._id)
  );

  res.json(userList);
});

module.exports = router;
