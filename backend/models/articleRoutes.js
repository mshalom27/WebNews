const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// GET /api/articles - return all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
