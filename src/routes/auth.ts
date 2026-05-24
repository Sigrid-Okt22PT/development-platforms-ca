import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../database";
import { User } from "../interfaces";
import {
  validateRegister,
  validateLogin,
} from "../middleware/auth-validation";

const router = Router();

const JWT_SECRET =
  process.env.JWT_SECRET || "development-secret";

router.post(
  "/register",
  validateRegister,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      const users = rows as User[];

      if (users.length > 0) {
        return res.status(409).json({
          error: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.execute(
        `
        INSERT INTO users
        (email, password_hash)
        VALUES (?, ?)
        `,
        [email, hashedPassword]
      );

      res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      console.error("Registration error:", error);

      res.status(500).json({
        error: "Registration failed",
      });
    }
  }
);

router.post(
  "/login",
  validateLogin,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      const users = rows as User[];

      if (users.length === 0) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }

      const user = users[0];

      const validPassword = await bcrypt.compare(
        password,
        user.password_hash!
      );

      if (!validPassword) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.json({
        token,
      });
    } catch (error) {
      console.error("Login error:", error);

      res.status(500).json({
        error: "Login failed",
      });
    }
  }
);

export default router;