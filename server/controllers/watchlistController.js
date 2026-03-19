const User = require("../models/User");

// ADD TO WATCHLIST
const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const user = await User.findById(userId);

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding to watchlist" });
  }
};

// REMOVE FROM WATCHLIST
const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const user = await User.findById(userId);

    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: "Error removing from watchlist" });
  }
};

// GET WATCHLIST
const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("watchlist");

    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist" });
  }
};

module.exports = {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
};