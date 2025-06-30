const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { auth, adminOnly } = require("../middleware/auth");

// GET /api/articles - List articles with pagination, filter & search
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, category, tags, search } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (tags) filter.tags = { $in: tags.split(",") };
  if (search) filter.$or = [
    { title: { $regex: search, $options: "i" } },
    { content: { $regex: search, $options: "i" } },
  ];

  try {
    const articles = await Article.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const count = await Article.countDocuments(filter);
    res.json({ articles, total: count, page: parseInt(page), pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/articles/:id - Article details
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/articles - Create article (admin only)
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch {
    res.status(400).json({ message: "Invalid article data" });
  }
});

// PUT /api/articles/:id - Update article (admin only)
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch {
    res.status(400).json({ message: "Invalid article data" });
  }
});

// DELETE /api/articles/:id - Delete article (admin only)
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
