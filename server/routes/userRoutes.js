const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// ================= PROFILE =================

// GET user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("watchlist")
      .populate("continueWatching.movie");

    res.json({
      name: user.name,
      email: user.email,
      watchlist: user.watchlist,
      continueWatching: user.continueWatching,
      ratings: user.ratings || {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= WATCHLIST =================

// GET watchlist
router.get("/watchlist", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");
    res.json(user.watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD to watchlist
router.post("/watchlist/:movieId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = req.params.movieId;

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json({ message: "Added to watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// REMOVE from watchlist
router.delete("/watchlist/:movieId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = req.params.movieId;

    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= CONTINUE WATCHING =================

// GET progress list
router.get("/progress", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("continueWatching.movie");
    res.json(user.continueWatching);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE progress
router.post("/progress", protect, async (req, res) => {
  try {
    const { movieId, progress } = req.body;

    const user = await User.findById(req.user.id);

    const existing = user.continueWatching.find(
      (item) => item.movie.toString() === movieId
    );

    if (existing) {
      existing.progress = progress;
    } else {
      user.continueWatching.push({ movie: movieId, progress });
    }

    await user.save();

    res.json({ message: "Progress updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= RATINGS =================

// GET ratings
router.get("/ratings", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.ratings || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// SET rating
router.post("/ratings", protect, async (req, res) => {
  try {
    const { movieId, rating } = req.body;

    const user = await User.findById(req.user.id);

    user.ratings.set(movieId, rating);
    await user.save();

    res.json({ message: "Rating saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
