const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Return logged-in user's profile
router.get("/profile", protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

module.exports = router;
