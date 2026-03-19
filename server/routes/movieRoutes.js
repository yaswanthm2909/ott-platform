const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");


router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error("Get movies error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    console.error("Get movie by id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, poster } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const movie = await Movie.create({
      title,
      description: description || "",
      poster: poster || "",
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error("Create movie error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
