const User = require("../models/User");
const Movie = require("../models/Movie");

// ADD TO WATCHLIST
const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);

    if (user.watchlist.includes(movieId)) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchlist.push(movieId);
    await user.save();

    res.status(200).json({ message: "Movie added to watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE FROM WATCHLIST
const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;

    await User.findByIdAndUpdate(userId, {
      $pull: { watchlist: movieId },
    });

    res.status(200).json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET WATCHLIST
const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("watchlist");

    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
};
