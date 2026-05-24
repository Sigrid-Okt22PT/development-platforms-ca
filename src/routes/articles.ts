import { Router } from "express";

import { pool } from "../database";

import {
  authenticateToken,
} from "../middleware/auth-validation";

import {
  validateArticle,
} from "../middleware/article-validation";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT * FROM articles
      ORDER BY created_at DESC
      `
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch articles",
    });
  }
});

router.post(
  "/",
  authenticateToken,
  validateArticle,
  async (req, res) => {
    try {
      const { title, body, category } = req.body;

      const userId = req.user!.id;

      await pool.execute(
        `
        INSERT INTO articles
        (title, body, category, submitted_by)
        VALUES (?, ?, ?, ?)
        `,
        [title, body, category, userId]
      );

      res.status(201).json({
        message: "Article created",
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to create article",
      });
    }
  }
);

export default router;