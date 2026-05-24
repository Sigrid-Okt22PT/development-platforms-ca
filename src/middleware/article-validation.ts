import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const articleSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  category: z.string().min(1),
});

export function validateArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = articleSchema.safeParse(
    req.body
  );

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  next();
}