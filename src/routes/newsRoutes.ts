import express from "express";
import Article from "../models/Article";

const router = express.Router();

// সিঙ্গেল নিউজের রুট
router.get("/", async (req, res) => {
  try {
    const {
      category,
      language,
      country,
      creator,
      datatype,
      startDate,
      endDate,
    } = req.query;

    let query: any = {};

    // AND Logic Implementation
    if (category) query.category = { $all: [category] };
    if (language) query.language = language;
    if (country) query.country = { $all: [country] };
    if (creator) query.creator = { $in: [creator] };
    if (datatype) query.datatype = datatype;

    // Date Range Filter
    if (startDate || endDate) {
      query.pubDate = {};
      if (startDate) query.pubDate.$gte = new Date(startDate as string);
      if (endDate) query.pubDate.$lte = new Date(endDate as string);
    }

    const news = await Article.find(query).sort({ pubDate: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Filtering failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findOne({ article_id: articleId });

    if (!article) {
      return res.status(404).json({ message: "Sorry, article not found." });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export const newsRoutes = router;
