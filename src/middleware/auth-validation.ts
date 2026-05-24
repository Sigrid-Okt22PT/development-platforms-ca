import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "development-secret";

const registerSchema = z.object({
  email: z.email("Email must be a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.email("Email must be a valid email"),
  password: z.string(),
});

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
}

export function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Token must be in format: Bearer <token>",
    });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as { id: number };

    next();
  } catch (error) {
    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }
}