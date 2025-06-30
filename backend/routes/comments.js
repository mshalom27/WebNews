const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { auth, adminOnly } = require("../middleware/auth");

// POST /api/comments/:articleId - Add comment
router.post("/:articleId", auth, async (req, res) => {
  try {
    const comment = new Comment({
      articleId: req.params.articleId,
      userId: req.user.id,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch {
    res.status(400).json({ message: "Invalid comment data" });
  }
});

// GET /api/comments/:articleId - Get comments for article
router.get("/:articleId", async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId }).populate("userId", "name").sort({ date: -1 });
    res.json(comments);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/comments/:id - Edit comment (only owner)
router.put("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch {
    res.status(400).json({ message: "Invalid comment data" });
  }
});

// DELETE /api/comments/:id - Delete comment (owner or admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await comment.delete();
    res.json({ message: "Comment deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
