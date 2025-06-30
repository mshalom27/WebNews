const express = require("express");
const router = express.Router();
const SavedArticle = require("../models/SavedArticle");
const { auth } = require("../middleware/auth");

// POST /api/save/:articleId - Save article for user
router.post("/:articleId", auth, async (req, res) => {
  try {
    const exists = await SavedArticle.findOne({ userId: req.user.id, articleId: req.params.articleId });
    if (exists) return res.status(400).json({ message: "Article already saved" });

    const saved = new SavedArticle({ userId: req.user.id, articleId: req.params.articleId });
    await saved.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/saved - Get saved articles for user
router.get("/", auth, async (req, res) => {
  try {
    const saved = await SavedArticle.find({ userId: req.user.id }).populate("articleId");
    res.json(saved);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/saved/:articleId - Remove saved article
router.delete("/:articleId", auth, async (req, res) => {
  try {
    const saved = await SavedArticle.findOneAndDelete({ userId: req.user.id, articleId: req.params.articleId });
    if (!saved) return res.status(404).json({ message: "Saved article not found" });
    res.json({ message: "Removed from saved articles" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
